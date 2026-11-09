import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchCriteria, HotelCategory, MealPlanCode } from '../../types/hotel';
import { addDays, format } from 'date-fns';

const today = new Date();
const defaultCheckIn = format(addDays(today, 2), 'yyyy-MM-dd');
const defaultCheckOut = format(addDays(today, 4), 'yyyy-MM-dd');

const initialState: SearchCriteria = {
  destination: '',
  checkIn: defaultCheckIn,
  checkOut: defaultCheckOut,
  adults: 2,
  children: 0,
  rooms: 1,
  selectedCategory: 'all',
  minPrice: 0,
  maxPrice: 30000,
  starRatings: [],
  mealPlans: [],
  amenities: [],
  sortBy: 'popular'
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setDates: (state, action: PayloadAction<{ checkIn: string; checkOut: string }>) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
    setGuestsAndRooms: (
      state,
      action: PayloadAction<{ adults: number; children: number; rooms: number }>
    ) => {
      state.adults = action.payload.adults;
      state.children = action.payload.children;
      state.rooms = action.payload.rooms;
    },
    setCategoryFilter: (state, action: PayloadAction<HotelCategory | 'all'>) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    toggleStarRating: (state, action: PayloadAction<number>) => {
      const current = state.starRatings || [];
      if (current.includes(action.payload)) {
        state.starRatings = current.filter(r => r !== action.payload);
      } else {
        state.starRatings = [...current, action.payload];
      }
    },
    toggleMealPlanFilter: (state, action: PayloadAction<MealPlanCode>) => {
      const current = state.mealPlans || [];
      if (current.includes(action.payload)) {
        state.mealPlans = current.filter(mp => mp !== action.payload);
      } else {
        state.mealPlans = [...current, action.payload];
      }
    },
    toggleAmenityFilter: (state, action: PayloadAction<string>) => {
      const current = state.amenities || [];
      if (current.includes(action.payload)) {
        state.amenities = current.filter(a => a !== action.payload);
      } else {
        state.amenities = [...current, action.payload];
      }
    },
    setSortBy: (state, action: PayloadAction<'popular' | 'price_low' | 'price_high' | 'rating'>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'all';
      state.minPrice = 0;
      state.maxPrice = 30000;
      state.starRatings = [];
      state.mealPlans = [];
      state.amenities = [];
      state.sortBy = 'popular';
    }
  }
});

export const {
  setDestination,
  setDates,
  setGuestsAndRooms,
  setCategoryFilter,
  setPriceRange,
  toggleStarRating,
  toggleMealPlanFilter,
  toggleAmenityFilter,
  setSortBy,
  resetFilters
} = searchSlice.actions;

export default searchSlice.reducer;

