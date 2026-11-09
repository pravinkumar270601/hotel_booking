import React, { useState } from 'react';
import { 
  Building2, 
  Bed, 
  Utensils, 
  TrendingUp, 
  DollarSign, 
  Save, 
  Check, 
  Plus, 
  Users,
  Tag,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  updateRoomAvailableUnits, 
  updateMealPlanPrice,
  addHotelOffer,
  toggleHotelOffer 
} from '../../features/hotels/hotelsSlice';
import { formatCurrency } from '../../utils/formatters';

export const ManagerDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const bookings = useAppSelector((state) => state.hotels.bookings);

  // Focus on the first hotel as the managed property (or allow switcher)
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0].id);
  const hotel = hotels.find((h) => h.id === selectedHotelId) || hotels[0];

  const hotelBookings = bookings.filter((b) => b.hotelId === hotel.id);
  const grossRevenue = hotelBookings
    .filter((b) => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.pricing.grandTotal, 0);

  // Editing state for inventory units
  const [editingInventory, setEditingInventory] = useState<{ [roomId: string]: number }>({});
  // Editing state for meal plan prices
  const [editingMealPlans, setEditingMealPlans] = useState<{ [planId: string]: number }>({});
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // New offer form state
  const [showAddOfferForm, setShowAddOfferForm] = useState(false);
  const [offerCode, setOfferCode] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDesc, setOfferDesc] = useState('');
  const [offerDiscount, setOfferDiscount] = useState(20);
  const [offerMaxDiscount, setOfferMaxDiscount] = useState(3000);
  const [offerPerk, setOfferPerk] = useState('');

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerCode.trim() || !offerTitle.trim()) return;

    dispatch(
      addHotelOffer({
        hotelId: hotel.id,
        offer: {
          id: `off-${Date.now()}`,
          code: offerCode.trim().toUpperCase(),
          title: offerTitle.trim(),
          description: offerDesc.trim() || `${offerDiscount}% off room stays`,
          discountPercent: Number(offerDiscount),
          maxDiscount: Number(offerMaxDiscount),
          badge: 'Limited Promo',
          perkDescription: offerPerk.trim() || undefined,
          validUntil: '31 Dec 2026',
          isActive: true
        }
      })
    );

    setSavedSuccessMsg(`New promotional offer ${offerCode.toUpperCase()} published!`);
    setShowAddOfferForm(false);
    setOfferCode('');
    setOfferTitle('');
    setOfferDesc('');
    setOfferPerk('');
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleSaveInventory = (roomTypeId: string) => {
    const newUnits = editingInventory[roomTypeId];
    if (newUnits !== undefined) {
      dispatch(
        updateRoomAvailableUnits({
          hotelId: hotel.id,
          roomTypeId,
          newUnits
        })
      );
      setSavedSuccessMsg(`Room inventory updated successfully!`);
      setTimeout(() => setSavedSuccessMsg(null), 2500);
    }
  };

  const handleSaveMealPrice = (roomTypeId: string, mealPlanId: string) => {
    const newPrice = editingMealPlans[mealPlanId];
    if (newPrice !== undefined) {
      dispatch(
        updateMealPlanPrice({
          hotelId: hotel.id,
          roomTypeId,
          mealPlanId,
          newPrice
        })
      );
      setSavedSuccessMsg(`Meal plan package price updated successfully!`);
      setTimeout(() => setSavedSuccessMsg(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Manager Header & Hotel Switcher */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Hotel Manager Operations Console
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-100">
                {hotel.name}
              </h1>
              <p className="text-xs text-stone-400">{hotel.address}, {hotel.city}</p>
            </div>
          </div>

          {/* Select which hotel to manage */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">Switch Property:</span>
            <select
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(e.target.value)}
              className="bg-stone-800 text-stone-100 border border-stone-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-hidden"
            >
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {savedSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Gross Booking Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {formatCurrency(grossRevenue)}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">From {hotelBookings.length} total reservations</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Total Available Room Units</span>
              <Bed className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {hotel.roomTypes.reduce((sum, r) => sum + r.availableUnits, 0)} units
            </div>
            <div className="text-[11px] text-stone-400">Across {hotel.roomTypes.length} room types</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Active Stays</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {hotelBookings.filter(b => b.bookingStatus === 'checked_in').length} in-house
            </div>
            <div className="text-[11px] text-blue-700 font-medium">Checked in by reception</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Guest Rating</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {hotel.rating.toFixed(1)} / 5.0
            </div>
            <div className="text-[11px] text-stone-400">{hotel.reviewCount} verified guest reviews</div>
          </div>
        </div>

        {/* Section 1: Daily Room Inventory & Capacity Matrix */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Bed className="w-5 h-5 text-amber-600" />
                <span>Room Types & Live Inventory Matrix</span>
              </h3>
              <p className="text-xs text-stone-500">
                Adjust available physical units in real time. Changes immediately reflect in guest search.
              </p>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {hotel.roomTypes.map((room) => {
              const currentUnits =
                editingInventory[room.id] !== undefined
                  ? editingInventory[room.id]
                  : room.availableUnits;

              return (
                <div key={room.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={room.photos[0]}
                      alt={room.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                        {room.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                        {room.name}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {room.bedType} · {room.roomSizeSqFt} sq.ft · Max {room.maxAdults} Adults
                      </p>
                      <div className="text-xs text-stone-700 font-bold mt-1">
                        Base Nightly Rate: {formatCurrency(room.basePricePerNight)}
                      </div>
                    </div>
                  </div>

                  {/* Live units controls */}
                  <div className="flex items-center gap-4 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-500">
                        Available Inventory
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          min="0"
                          max={room.totalInventoryUnits}
                          value={currentUnits}
                          onChange={(e) =>
                            setEditingInventory({
                              ...editingInventory,
                              [room.id]: Number(e.target.value)
                            })
                          }
                          className="w-20 px-2 py-1 bg-white border border-stone-300 rounded-lg text-sm font-bold text-center"
                        />
                        <span className="text-xs text-stone-500 font-medium">
                          / {room.totalInventoryUnits} total
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveInventory(room.id)}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Meal Plan Pricing Configurator */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-600" />
              <span>Dining Meal Plan Packages & Rate Configuration</span>
            </h3>
            <p className="text-xs text-stone-500">
              Configure independent nightly package rates for Room Only, Bed & Breakfast, Half Board, and Full Board.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {hotel.roomTypes.map((room) => (
              <div key={room.id} className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-3">
                <div className="font-bold text-sm text-stone-900">
                  Meal Packages for: <span className="text-amber-800">{room.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {room.mealPlans.map((plan) => {
                    const price =
                      editingMealPlans[plan.id] !== undefined
                        ? editingMealPlans[plan.id]
                        : plan.pricePerNight;

                    return (
                      <div key={plan.id} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900">{plan.name}</span>
                          <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                            {plan.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1">{plan.regionalName}</p>

                        <div className="pt-2 flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-2.5 top-1.5 text-xs text-stone-400">₹</span>
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={price}
                              onChange={(e) =>
                                setEditingMealPlans({
                                  ...editingMealPlans,
                                  [plan.id]: Number(e.target.value)
                                })
                              }
                              className="w-full pl-6 pr-2 py-1 text-xs font-bold border border-stone-300 rounded-lg"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSaveMealPrice(room.id, plan.id)}
                            className="p-1.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                            title="Save Meal Plan Rate"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Promotional Offers & Campaigns Manager */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <span>Hotel Promotional Offers & Discount Deals</span>
              </h3>
              <p className="text-xs text-stone-500">
                Create and manage active promo codes, flash discounts, and guest perk packages.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddOfferForm(!showAddOfferForm)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddOfferForm ? 'Close Form' : 'Create New Offer'}</span>
            </button>
          </div>

          {/* New Offer Form */}
          {showAddOfferForm && (
            <form onSubmit={handleCreateOffer} className="p-6 bg-stone-50 border-b border-stone-200 space-y-4">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Launch Promotional Campaign
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Offer Promo Code *</label>
                  <input
                    type="text"
                    required
                    value={offerCode}
                    onChange={(e) => setOfferCode(e.target.value)}
                    placeholder="e.g. MONSOON20"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Offer Title *</label>
                  <input
                    type="text"
                    required
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    placeholder="e.g. Monsoon Escape 20% Off"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={offerDiscount}
                    onChange={(e) => setOfferDiscount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Max Cap Discount (₹)</label>
                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={offerMaxDiscount}
                    onChange={(e) => setOfferMaxDiscount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Complimentary Guest Perk</label>
                  <input
                    type="text"
                    value={offerPerk}
                    onChange={(e) => setOfferPerk(e.target.value)}
                    placeholder="e.g. Free High Tea & 30-min spa coupon"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Description</label>
                <input
                  type="text"
                  value={offerDesc}
                  onChange={(e) => setOfferDesc(e.target.value)}
                  placeholder="Short terms or description for guests"
                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddOfferForm(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Publish Campaign
                </button>
              </div>
            </form>
          )}

          {/* Current Active Offers Table */}
          <div className="divide-y divide-stone-100">
            {(hotel.offers || []).length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No active offers configured for this property. Click "Create New Offer" to launch one.
              </div>
            ) : (
              (hotel.offers || []).map((offer) => (
                <div key={offer.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-xs">
                        {offer.code}
                      </span>
                      <span className="text-sm font-bold text-stone-900">{offer.title}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {offer.discountPercent}% Off (Up to {formatCurrency(offer.maxDiscount)})
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">{offer.description}</p>
                    {offer.perkDescription && (
                      <div className="text-[11px] text-amber-800 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Perk: {offer.perkDescription}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-stone-400">Valid until {offer.validUntil}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(toggleHotelOffer({ hotelId: hotel.id, offerId: offer.id }))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                        offer.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {offer.isActive ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-700" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-stone-500" />
                          <span>Paused</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

