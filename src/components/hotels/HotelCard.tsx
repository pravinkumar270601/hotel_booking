import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Utensils, 
  ArrowRight,
  Coffee,
  CheckCircle2,
  Tag,
  Sparkles
} from 'lucide-react';
import { Hotel } from '../../types/hotel';
import { formatCurrency, getCategoryBadgeClass, getCategoryLabel } from '../../utils/formatters';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  // Determine if breakfast or all-inclusive is offered in any room
  const hasBreakfast = hotel.roomTypes.some(r => r.mealPlans.some(mp => mp.code === 'BB' || mp.code === 'HB' || mp.code === 'FB' || mp.code === 'AI'));
  const hasAllInclusive = hotel.roomTypes.some(r => r.mealPlans.some(mp => mp.code === 'AI'));

  // First active promotional offer
  const primaryOffer = hotel.offers?.find(o => o.isActive);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group relative">
      {/* Hotel Image with Badges */}
      <div className="relative md:w-80 h-64 md:h-auto overflow-hidden shrink-0">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent md:hidden" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${getCategoryBadgeClass(hotel.category)}`}>
            {getCategoryLabel(hotel.category)}
          </span>
          <span className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
            {hotel.propertyType}
          </span>
        </div>

        {/* Offer Floating Badge on Image */}
        {primaryOffer && (
          <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>{primaryOffer.discountPercent}% Off</span>
          </div>
        )}

        {/* Rating Score */}
        <div className="absolute bottom-3 left-3 md:bottom-3 md:right-3 md:left-auto bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span className="font-bold text-xs text-stone-900">{hotel.rating.toFixed(1)}</span>
          <span className="text-[10px] text-stone-500 font-medium">({hotel.reviewCount})</span>
        </div>
      </div>

      {/* Hotel Details Body */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Stars & Location */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              {hotel.city}, {hotel.state}
            </span>
          </div>

          {/* Hotel Name */}
          <Link to={`/hotel/${hotel.id}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
              {hotel.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 italic mt-0.5 font-medium line-clamp-1">
            "{hotel.tagline}"
          </p>

          <p className="text-sm text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Hotel Active Promotional Offer Banner */}
          {primaryOffer && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <Tag className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-amber-950 mr-1.5">{primaryOffer.title}:</span>
                  <span className="text-amber-800 text-[11px]">{primaryOffer.perkDescription || primaryOffer.description}</span>
                </div>
              </div>
              <span className="shrink-0 font-mono font-bold text-[11px] bg-white text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                {primaryOffer.code}
              </span>
            </div>
          )}

          {/* Key Amenities */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 4).map((amenity, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[11px] font-medium text-stone-400 px-1 py-0.5">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Meal Plan Highlights */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-amber-600" /> Dining Packages:
            </span>
            <span className="bg-stone-50 text-stone-600 px-2 py-0.5 rounded border border-stone-200 text-[11px]">
              Room Only (EP)
            </span>
            {hasBreakfast && (
              <span className="bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200 text-[11px] flex items-center gap-1">
                <Coffee className="w-3 h-3 text-emerald-600" /> Breakfast Option (CP)
              </span>
            )}
            {hasAllInclusive && (
              <span className="bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                All-Inclusive (AI)
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Free Cancellation Available</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-stone-500 font-medium">Starting from</span>
              <span className="text-2xl font-bold font-serif text-stone-900">
                {formatCurrency(hotel.startingPrice)}
              </span>
              <span className="text-xs text-stone-500 font-medium">/ night</span>
            </div>
            <p className="text-[11px] text-stone-400">+ Applicable taxes & fees</p>
          </div>

          <Link
            to={`/hotel/${hotel.id}`}
            className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm group-hover:shadow"
          >
            <span>Select Rooms & Meals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
