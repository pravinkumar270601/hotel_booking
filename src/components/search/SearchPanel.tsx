import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronDown, 
  Plus, 
  Minus,
  Sparkles,
  BedDouble
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  setDestination, 
  setDates, 
  setGuestsAndRooms, 
  setCategoryFilter 
} from '../../features/search/searchSlice';
import { HotelCategory } from '../../types/hotel';

interface SearchPanelProps {
  variant?: 'hero' | 'compact';
}

const DESTINATION_SUGGESTIONS = [
  { city: 'Chennai', desc: 'Cultural Capital & Coastal Luxury' },
  { city: 'Goa', desc: 'Pristine Beaches & Luxury Resorts' },
  { city: 'Bengaluru', desc: 'Tech Hub & Garden City Stays' },
  { city: 'Udaipur', desc: 'Royal Palaces & Lake Pichola' },
  { city: 'Gurugram', desc: 'Cyber City & Executive Hotels' },
  { city: 'Mumbai', desc: 'Marine Drive & Arabian Sea Views' }
];

export const SearchPanel: React.FC<SearchPanelProps> = ({ variant = 'hero' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  const [dest, setDest] = useState(searchState.destination);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState(searchState.checkIn);
  const [checkOut, setCheckOut] = useState(searchState.checkOut);
  const [adults, setAdults] = useState(searchState.adults);
  const [children, setChildren] = useState(searchState.children);
  const [rooms, setRooms] = useState(searchState.rooms);
  const [showGuestPopover, setShowGuestPopover] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setDestination(dest));
    dispatch(setDates({ checkIn, checkOut }));
    dispatch(setGuestsAndRooms({ adults, children, rooms }));
    navigate('/search');
  };

  const handleSelectCategory = (cat: HotelCategory | 'all') => {
    dispatch(setCategoryFilter(cat));
    navigate('/search');
  };

  return (
    <div className={`w-full ${variant === 'hero' ? 'max-w-5xl mx-auto' : ''}`}>
      {/* Category Quick Tags */}
      {variant === 'hero' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            All Properties
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('luxury')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'luxury'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            Luxury & Palaces
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('resort')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'resort'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            Resorts & Retreats
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('premium')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'premium'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            Premium Hotels
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('business')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'business'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            Business & Tech
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('budget')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-xs ${
              searchState.selectedCategory === 'budget'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
            }`}
          >
            Budget Express
          </button>
        </div>
      )}

      {/* Main Search Bar Form */}
      <form 
        onSubmit={handleSearchSubmit} 
        className="bg-white rounded-2xl shadow-xl border border-stone-200 p-2 sm:p-3 relative z-30"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Destination */}
          <div className="relative md:col-span-4 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              City or Destination
            </label>
            <input
              type="text"
              value={dest}
              onChange={(e) => {
                setDest(e.target.value);
                setShowDestDropdown(true);
              }}
              onFocus={() => setShowDestDropdown(true)}
              placeholder="Where are you going? (e.g. Chennai, Goa)"
              className="w-full mt-1 bg-transparent text-stone-900 text-sm sm:text-base font-semibold focus:outline-hidden placeholder:text-stone-400"
            />

            {/* Destination Autocomplete Suggestions */}
            {showDestDropdown && (
              <div 
                className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5">
                  Popular Destinations
                </div>
                {DESTINATION_SUGGESTIONS.map((item) => (
                  <button
                    key={item.city}
                    type="button"
                    onClick={() => {
                      setDest(item.city);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-stone-900 group-hover:text-amber-900">
                        {item.city}
                      </div>
                      <div className="text-xs text-stone-400 group-hover:text-amber-700">
                        {item.desc}
                      </div>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-stone-300 group-hover:text-amber-500" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check-In / Check-Out Dates */}
          <div className="md:col-span-4 grid grid-cols-2 gap-2 p-2 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200">
            <div className="p-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full mt-1 bg-transparent text-stone-900 text-sm font-semibold focus:outline-hidden"
              />
            </div>
            <div className="p-1 border-l border-stone-200 pl-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Check-Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full mt-1 bg-transparent text-stone-900 text-sm font-semibold focus:outline-hidden"
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="relative md:col-span-3 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              Guests & Rooms
            </label>
            <button
              type="button"
              onClick={() => setShowGuestPopover(!showGuestPopover)}
              className="w-full mt-1 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-stone-900 focus:outline-hidden"
            >
              <span>{adults} Adults · {rooms} Room{rooms > 1 ? 's' : ''}</span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {/* Guest Selector Popover */}
            {showGuestPopover && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-stone-200 p-4 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-amber-600" /> Rooms
                    </div>
                    <div className="text-xs text-stone-400">Total room units</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 10}
                      onClick={() => setRooms(rooms + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-stone-900">Adults</div>
                    <div className="text-xs text-stone-400">Ages 12 or above</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 20}
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-stone-900">Children</div>
                    <div className="text-xs text-stone-400">Ages 0 to 11</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 10}
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuestPopover(false)}
                  className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Submit Search Button */}
          <div className="md:col-span-1 flex items-center">
            <button
              type="submit"
              className="w-full h-full min-h-[52px] bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              title="Search Hotels"
            >
              <Search className="w-5 h-5" />
              <span className="md:hidden">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

