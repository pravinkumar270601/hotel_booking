import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Maximize2, 
  Bed, 
  CheckCircle, 
  ShieldAlert, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { Hotel, RoomType, MealPlan } from '../../types/hotel';
import { MealPlanSelector } from './MealPlanSelector';
import { formatCurrency } from '../../utils/formatters';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initDraftBooking } from '../../features/booking/bookingDraftSlice';

interface RoomCardProps {
  hotel: Hotel;
  roomType: RoomType;
}

export const RoomCard: React.FC<RoomCardProps> = ({ hotel, roomType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  // Default to first meal plan or breakfast included if available
  const defaultPlan = roomType.mealPlans.find(mp => mp.code === 'BB') || roomType.mealPlans[0];
  const [selectedPlan, setSelectedPlan] = useState<MealPlan>(defaultPlan);

  const totalNightlyPrice = roomType.basePricePerNight + selectedPlan.pricePerNight;
  const isLowInventory = roomType.availableUnits > 0 && roomType.availableUnits <= 3;
  const isSoldOut = roomType.availableUnits <= 0;

  const handleBookNow = () => {
    dispatch(
      initDraftBooking({
        hotel,
        roomType,
        mealPlan: selectedPlan,
        checkInDate: searchState.checkIn,
        checkOutDate: searchState.checkOut,
        roomsCount: searchState.rooms,
        adultsCount: searchState.adults,
        childrenCount: searchState.children
      })
    );
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Room Photo Gallery */}
          <div className="lg:w-72 shrink-0">
            <div className="relative rounded-xl overflow-hidden h-52 lg:h-full min-h-[200px]">
              <img
                src={roomType.photos[0]}
                alt={roomType.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                {roomType.category}
              </div>

              {/* Inventory status pill */}
              <div className="absolute bottom-2.5 left-2.5">
                {isSoldOut ? (
                  <span className="bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Sold Out for Selected Dates
                  </span>
                ) : isLowInventory ? (
                  <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> Only {roomType.availableUnits} room{roomType.availableUnits > 1 ? 's' : ''} left!
                  </span>
                ) : (
                  <span className="bg-stone-900/75 backdrop-blur-md text-emerald-400 text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {roomType.availableUnits} units available
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Room Specs & Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    {roomType.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-2">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Bed className="w-4 h-4 text-amber-600" />
                      {roomType.bedType}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                      {roomType.roomSizeSqFt} sq.ft
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      Max {roomType.maxAdults} Adults, {roomType.maxChildren} Child
                    </span>
                  </div>
                </div>

                {/* Base rate badge */}
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-stone-400">Base Room Rate</div>
                  <div className="text-lg font-bold text-stone-900">
                    {formatCurrency(roomType.basePricePerNight)}
                  </div>
                  <div className="text-[10px] text-stone-400">/ night (Room Only)</div>
                </div>
              </div>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {roomType.description}
              </p>

              {/* Room Amenities Grid */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {roomType.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-medium flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Cancellation Policy note */}
              <div className="mt-3 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{roomType.cancellationPolicy.description}</span>
              </div>
            </div>

            {/* Configurable Meal Plan Selection */}
            <MealPlanSelector
              roomType={roomType}
              selectedMealPlanId={selectedPlan.id}
              onSelectMealPlan={setSelectedPlan}
            />

            {/* Selected Total & Reserve Action */}
            <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-stone-500 font-medium">
                  Selected: <strong className="text-stone-800">{selectedPlan.name}</strong> ({selectedPlan.regionalName})
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-serif text-stone-900">
                    {formatCurrency(totalNightlyPrice)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ night for 2 guests</span>
                </div>
                <div className="text-[11px] text-stone-400">
                  Estimated 2 nights subtotal: {formatCurrency(totalNightlyPrice * 2)} + 12% GST
                </div>
              </div>

              <button
                type="button"
                disabled={isSoldOut}
                onClick={handleBookNow}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-stone-950 font-bold px-7 py-3 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
              >
                <span>Book This Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

