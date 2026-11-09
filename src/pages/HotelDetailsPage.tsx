import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  CheckCircle, 
  Coffee, 
  Info,
  ChevronRight,
  Tag,
  Sparkles,
  Check
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { applyCoupon } from '../features/booking/bookingDraftSlice';
import { RoomCard } from '../components/rooms/RoomCard';
import { formatCurrency, getCategoryBadgeClass, getCategoryLabel } from '../utils/formatters';

export const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const hotel = hotels.find((h) => h.id === id) || hotels[0];

  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'amenities' | 'policies'>('rooms');
  const [selectedPhoto, setSelectedPhoto] = useState(hotel.heroImage);
  const [appliedOfferCode, setAppliedOfferCode] = useState<string | null>(null);

  const handleApplyOffer = (code: string) => {
    dispatch(applyCoupon(code));
    setAppliedOfferCode(code);
    setTimeout(() => setAppliedOfferCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/search" className="hover:text-stone-900 transition-colors">Hotels</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-800 font-bold truncate">{hotel.name}</span>
        </div>

        {/* Hotel Header Title & Category */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-stone-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${getCategoryBadgeClass(hotel.category)}`}>
                {getCategoryLabel(hotel.category)}
              </span>
              <span className="bg-stone-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded-md">
                {hotel.propertyType}
              </span>
              <div className="flex items-center text-amber-500 ml-2">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {hotel.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{hotel.address}, {hotel.city}, {hotel.state} - {hotel.pincode}</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs text-stone-400">Starting from</div>
            <div className="text-3xl font-bold font-serif text-stone-900">
              {formatCurrency(hotel.startingPrice)}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              Free Cancellation Available
            </div>
          </div>
        </div>

        {/* High-Res Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-white p-2">
          {/* Main Large Display */}
          <div className="md:col-span-3 h-[380px] sm:h-[460px] rounded-xl overflow-hidden relative">
            <img
              src={selectedPhoto}
              alt={hotel.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-stone-950/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.rating.toFixed(1)} Excellent · {hotel.reviewCount} guest reviews</span>
            </div>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="grid grid-cols-4 md:grid-cols-1 gap-2.5 h-full">
            {[hotel.heroImage, ...hotel.galleryImages.slice(0, 3)].map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhoto(imgUrl)}
                className={`relative rounded-xl overflow-hidden h-20 md:h-full border-2 transition-all ${
                  selectedPhoto === imgUrl ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Active Property Offers & Promotional Vouchers */}
        {hotel.offers && hotel.offers.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/70 to-stone-100 rounded-2xl p-5 border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Active Property Offers & Exclusive Deals
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 hidden sm:inline">
                Instant discount will apply to your checkout
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hotel.offers.map((offer) => {
                const isApplied = appliedOfferCode === offer.code;

                return (
                  <div
                    key={offer.id}
                    className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                          {offer.badge}
                        </span>
                        <span className="font-bold text-emerald-700 text-xs">
                          Save up to {formatCurrency(offer.maxDiscount)}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-stone-900 mt-1">
                        {offer.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {offer.description}
                      </p>

                      {offer.perkDescription && (
                        <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg flex items-center gap-1.5 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{offer.perkDescription}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-stone-400">Coupon Code:</div>
                        <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          {offer.code}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyOffer(offer.code)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isApplied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-900 hover:bg-stone-800 text-white'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Offer Applied!</span>
                          </>
                        ) : (
                          <span>Apply to Booking</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-stone-200 flex gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('rooms')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'rooms'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Available Room Categories ({hotel.roomTypes.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dining')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'dining'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Dining & Restaurant Menus</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('amenities')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'amenities'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Facilities & Amenities</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'policies'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Property Policies</span>
          </button>
        </div>

        {/* Tab Content 1: Room Selection & Configurable Meal Plans */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <Coffee className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-amber-950">
                  Select Room & Choose Your Meal Package
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Every room offers independently configured dining plans: <strong>Room Only (EP)</strong>, <strong>Bed & Breakfast (CP)</strong>, <strong>Half Board (MAP)</strong>, or <strong>All-Inclusive (AI)</strong>. Choose your favorite plan on any room card below.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {hotel.roomTypes.map((room) => (
                <RoomCard key={room.id} hotel={hotel} roomType={room} />
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Dining & Food Flow */}
        {activeTab === 'dining' && (
          <div className="space-y-6">
            {hotel.restaurants.map((rest) => (
              <div key={rest.id} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      {rest.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {rest.cuisineType} · {rest.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium bg-stone-100 px-3 py-1.5 rounded-lg w-fit">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Serving Timings: {rest.timings}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 pt-2">
                  Signature Dishes & Menu Highlights
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.featuredDishes.map((dish) => (
                    <div key={dish.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                            dish.dietary === 'veg' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}>
                            {dish.dietary === 'veg' ? '● Pure Veg' : '▲ Non-Veg'}
                          </span>
                          <span className="text-xs text-stone-400 font-medium">{dish.category}</span>
                        </div>
                        <h5 className="font-bold text-sm text-stone-900 mt-2">
                          {dish.name}
                        </h5>
                        <p className="text-xs text-stone-500 mt-0.5">{dish.cuisine}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                        <span className="text-stone-400">Serving: {dish.servingTime}</span>
                        <span className="font-bold text-stone-900">{formatCurrency(dish.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Amenities */}
        {activeTab === 'amenities' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Property Amenities & Guest Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
              {hotel.amenities.map((amn, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-stone-100 bg-stone-50 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-stone-800">{amn}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 4: Policies */}
        {activeTab === 'policies' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Check-in, Check-out & Property Policies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-stone-100">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">Standard Check-In Time</div>
                <div className="text-xl font-bold text-stone-900 mt-1">{hotel.checkInTime} hrs</div>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">Standard Check-Out Time</div>
                <div className="text-xl font-bold text-stone-900 mt-1">{hotel.checkOutTime} hrs</div>
              </div>
            </div>

            <ul className="space-y-3 pt-2 text-sm text-stone-600">
              {hotel.policies.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

