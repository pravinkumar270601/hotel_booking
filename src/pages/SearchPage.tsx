import React, { useMemo } from 'react';
import { 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Star, 
  Utensils, 
  Sparkles, 
  Building,
  Check
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SearchPanel } from '../components/search/SearchPanel';
import { HotelCard } from '../components/hotels/HotelCard';
import { 
  setCategoryFilter, 
  setPriceRange, 
  toggleStarRating, 
  toggleMealPlanFilter, 
  toggleAmenityFilter, 
  setSortBy, 
  resetFilters 
} from '../features/search/searchSlice';
import { HotelCategory, MealPlanCode } from '../types/hotel';
import { formatCurrency } from '../utils/formatters';

const CATEGORIES: { label: string; value: HotelCategory | 'all' }[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Luxury & Palaces', value: 'luxury' },
  { label: 'Beach & Hill Resorts', value: 'resort' },
  { label: 'Premium Hotels', value: 'premium' },
  { label: 'Business & Tech', value: 'business' },
  { label: 'Budget Express', value: 'budget' }
];

const MEAL_PLAN_OPTIONS: { code: MealPlanCode; label: string; desc: string }[] = [
  { code: 'BB', label: 'Breakfast Included (CP)', desc: 'Continental Plan' },
  { code: 'HB', label: 'Half Board (MAP)', desc: 'Breakfast + Dinner' },
  { code: 'FB', label: 'Full Board (AP)', desc: 'All 3 Meals Included' },
  { code: 'AI', label: 'All-Inclusive (AI)', desc: 'Meals & Beverages' }
];

const AMENITIES_LIST = [
  'Swimming Pool',
  'Spa',
  'Wi-Fi',
  'Beach Access',
  'Fitness Center',
  'Parking',
  'Airport Valet'
];

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const searchState = useAppSelector((state) => state.search);

  // Filter and sort logic
  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Destination filter
        if (searchState.destination.trim()) {
          const q = searchState.destination.toLowerCase().trim();
          const matchCity = hotel.city.toLowerCase().includes(q);
          const matchName = hotel.name.toLowerCase().includes(q);
          const matchState = hotel.state.toLowerCase().includes(q);
          if (!matchCity && !matchName && !matchState) return false;
        }

        // Category filter
        if (searchState.selectedCategory && searchState.selectedCategory !== 'all') {
          if (hotel.category !== searchState.selectedCategory) return false;
        }

        // Price range
        if (searchState.minPrice !== undefined && hotel.startingPrice < searchState.minPrice) {
          return false;
        }
        if (searchState.maxPrice !== undefined && hotel.startingPrice > searchState.maxPrice) {
          return false;
        }

        // Star rating
        if (searchState.starRatings && searchState.starRatings.length > 0) {
          if (!searchState.starRatings.includes(hotel.starRating)) return false;
        }

        // Meal plans filter
        if (searchState.mealPlans && searchState.mealPlans.length > 0) {
          const hotelHasMealPlan = hotel.roomTypes.some(r =>
            r.mealPlans.some(mp => searchState.mealPlans?.includes(mp.code))
          );
          if (!hotelHasMealPlan) return false;
        }

        // Amenities filter
        if (searchState.amenities && searchState.amenities.length > 0) {
          const hasAllSelected = searchState.amenities.every(selectedAmn =>
            hotel.amenities.some(a => a.toLowerCase().includes(selectedAmn.toLowerCase()))
          );
          if (!hasAllSelected) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (searchState.sortBy === 'price_low') return a.startingPrice - b.startingPrice;
        if (searchState.sortBy === 'price_high') return b.startingPrice - a.startingPrice;
        if (searchState.sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount; // 'popular'
      });
  }, [hotels, searchState]);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Search Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <SearchPanel variant="compact" />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              {searchState.destination ? `Hotels in "${searchState.destination}"` : 'All Verified Hotels & Resorts'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing <span className="font-bold text-stone-800">{filteredHotels.length}</span> properties matching your travel preferences
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-semibold text-stone-600">Sort by:</span>
            <select
              value={searchState.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as any))}
              className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="popular">Most Popular & Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Guest Rating</option>
            </select>
          </div>
        </div>

        {/* 2-Column Grid: Filter Sidebar + Hotels List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                  <Filter className="w-4 h-4 text-amber-600" />
                  <span>Filters</span>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(resetFilters())}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* 1. Hotel Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-600" />
                  Hotel Category
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => dispatch(setCategoryFilter(cat.value))}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        searchState.selectedCategory === cat.value
                          ? 'bg-amber-100/70 text-amber-900 font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {searchState.selectedCategory === cat.value && (
                        <Check className="w-3.5 h-3.5 text-amber-700" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Price Range Slider */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Max Price / Night
                  </h4>
                  <span className="text-xs font-bold text-stone-900">
                    {formatCurrency(searchState.maxPrice || 30000)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="30000"
                  step="500"
                  value={searchState.maxPrice || 30000}
                  onChange={(e) =>
                    dispatch(
                      setPriceRange({
                        min: searchState.minPrice || 0,
                        max: Number(e.target.value)
                      })
                    )
                  }
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>₹1,500</span>
                  <span>₹30,000+</span>
                </div>
              </div>

              {/* 3. Star Ratings */}
              <div className="pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-600" />
                  Star Rating
                </h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((stars) => {
                    const isChecked = searchState.starRatings?.includes(stars);
                    return (
                      <label
                        key={stars}
                        className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => dispatch(toggleStarRating(stars))}
                          className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                        />
                        <span className="flex items-center gap-1 font-medium">
                          {stars} Stars
                          <span className="flex text-amber-400 ml-1">
                            {Array.from({ length: stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 4. Dining Meal Plans Available */}
              <div className="pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  Meal Packages Offered
                </h4>
                <div className="space-y-2">
                  {MEAL_PLAN_OPTIONS.map((plan) => {
                    const isChecked = searchState.mealPlans?.includes(plan.code);
                    return (
                      <label
                        key={plan.code}
                        className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => dispatch(toggleMealPlanFilter(plan.code))}
                          className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 mt-0.5"
                        />
                        <div>
                          <div className="font-semibold text-stone-900">{plan.label}</div>
                          <div className="text-[10px] text-stone-400">{plan.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 5. Amenities */}
              <div className="pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Hotel Amenities
                </h4>
                <div className="space-y-2">
                  {AMENITIES_LIST.map((amn) => {
                    const isChecked = searchState.amenities?.includes(amn);
                    return (
                      <label
                        key={amn}
                        className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => dispatch(toggleAmenityFilter(amn))}
                          className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                        />
                        <span className="font-medium">{amn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Hotels Results List */}
          <main className="lg:col-span-3 space-y-6">
            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                  <Building className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  No Hotels Found Matching Your Filters
                </h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Try widening your price range, clearing specific meal packages, or searching for a different destination city like Chennai, Goa, or Bengaluru.
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(resetFilters())}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

