import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Utensils, 
  Bed, 
  Building2, 
  ArrowRight,
  Coffee,
  CheckCircle2,
  Clock,
  Layers,
  Compass
} from 'lucide-react';
import { CinematicSequenceHero } from '../components/hero/CinematicSequenceHero';
import { SearchPanel } from '../components/search/SearchPanel';
import { HotelCard } from '../components/hotels/HotelCard';
import { PinnedHotelExperience } from '../components/animations/PinnedHotelExperience';
import { HorizontalScrollStays } from '../components/animations/HorizontalScrollStays';
import { ScrollDestinations } from '../components/animations/ScrollDestinations';
import { useAppSelector } from '../app/hooks';

export const HomePage: React.FC = () => {
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="overflow-hidden bg-stone-50">
      {/* 01 — Cinematic Image Sequence Scroll Hero (MGM reference design) */}
      <CinematicSequenceHero />

      {/* Floating Instant Search Engine Section in Project Theme Color */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-stone-200/80">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Book With Guaranteed Meal Plans
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                Find Your Perfect Luxury Stay
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Direct Rates
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-500" /> Instant Confirmation
              </span>
            </div>
          </div>
          <SearchPanel variant="hero" />
        </div>
      </section>

      {/* 3 Categories Educational Architectural Section */}
      <section className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">
              Architecture & Transparency
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Understanding the 3 Distinct Hospitality Layers
            </h2>
            <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
              We never combine hotel classification, room architecture, and dining meal plans. Each is configured independently for complete flexibility and transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layer 1: Hotel Category */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                Layer 01
              </span>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
                Hotel Market Category
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                How the property is positioned in the market. Budget Express, Premium Urban, 5-Star Luxury, Beach Resort, or Business Hub.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-1.5 text-xs">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Budget</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Premium</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Luxury Palace</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Beach Resort</span>
              </div>
            </div>

            {/* Layer 2: Room Category */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bed className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                Layer 02
              </span>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
                Room Type & Capacity
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                Specific architectural room booked with square footage, bed arrangement (King, Twin), maximum adults, and live daily available units.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-1.5 text-xs">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Standard</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Deluxe King</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Executive Suite</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Royal Villa</span>
              </div>
            </div>

            {/* Layer 3: Meal Plan */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                Layer 03
              </span>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
                Dining Meal Plans
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                Which meals are included in the nightly price. Room Only (EP), Bed & Breakfast (CP), Half Board (MAP), or All-Inclusive (AI).
              </p>
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-1.5 text-xs">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Room Only (EP)</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Breakfast (CP)</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">Half Board (MAP)</span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">All-Inclusive (AI)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Scroll-Revealed Destinations with Staggered Parallax (GSAP ScrollTrigger) */}
      <ScrollDestinations />

      {/* 03 — Pinned Hotel Experience (GSAP Pin & Scrub Animation) */}
      <PinnedHotelExperience />

      {/* 05 — Horizontal Scrolling Gallery (GSAP Horizontal Scroll Scrub) */}
      <HorizontalScrollStays />

      {/* Exclusive Hotel Offers & Seasonal Promotions */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-900 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Limited-Time Promotional Privileges
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Exclusive Hotel Deals & Stay Packages
              </h2>
              <p className="text-stone-400 text-sm mt-1 max-w-xl">
                Apply verified promo codes for guaranteed price deductions, complimentary dining credits, and wellness perks.
              </p>
            </div>
            <Link
              to="/search"
              className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1"
            >
              <span>Explore all special offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.flatMap(h => (h.offers || []).map(o => ({ ...o, hotel: h }))).slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-stone-850/80 backdrop-blur-md rounded-2xl p-6 border border-stone-700/80 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-amber-400 text-lg font-bold font-serif">
                      {item.discountPercent}% OFF
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-amber-200/80 font-medium mt-1">
                    {item.hotel.name} · {item.hotel.city}
                  </div>
                  <p className="text-xs text-stone-400 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>

                  {item.perkDescription && (
                    <div className="mt-3 p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60 text-[11px] text-emerald-300 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                      <span>{item.perkDescription}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                  <div className="bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-700 font-mono text-xs font-bold text-amber-400">
                    {item.code}
                  </div>
                  <Link
                    to={`/hotel/${item.hotel.id}`}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Claim Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Hand-Picked Stays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Featured Luxury & Premium Properties
            </h2>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 font-semibold text-amber-700 hover:text-amber-800 transition-colors text-sm"
          >
            <span>View all verified properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Food Flow Highlight Banner */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-800 to-stone-850 rounded-3xl p-8 sm:p-12 border border-stone-700 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <Coffee className="w-3.5 h-3.5" /> Full Food & Restaurant Flow
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Never Pay Twice for Breakfast or Gourmet Meals
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                When you book Bed & Breakfast (CP) or Half Board (MAP), your vouchers reflect meal entitlements for registered guests automatically. View actual restaurant menus, operating hours, and vegetarian / dietary options before booking.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pure Veg & Non-Veg Menus
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Serving Timings Displayed
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Bill Breakdown
                </span>
              </div>
            </div>

            <Link
              to="/search"
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-xl shrink-0"
            >
              Browse Stays with Meal Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
