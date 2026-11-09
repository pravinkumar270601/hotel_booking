import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel, Booking, BookingStatus, HotelOffer } from '../../types/hotel';
import { 
  getStoredHotels, 
  getStoredBookings, 
  getStoredActiveRole, 
  setStoredActiveRole, 
  createBookingAtomic, 
  updateBookingStatus, 
  saveHotels,
  UserRole
} from '../../services/storageService';

export interface HotelsState {
  hotels: Hotel[];
  bookings: Booking[];
  activeRole: UserRole;
  selectedHotelId: string | null;
  lastBookingResult: {
    success: boolean;
    booking?: Booking;
    error?: string;
  } | null;
}

const initialState: HotelsState = {
  hotels: getStoredHotels(),
  bookings: getStoredBookings(),
  activeRole: getStoredActiveRole(),
  selectedHotelId: null,
  lastBookingResult: null
};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    refreshDataFromStorage: (state) => {
      state.hotels = getStoredHotels();
      state.bookings = getStoredBookings();
    },
    setActiveRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
      setStoredActiveRole(action.payload);
    },
    selectHotel: (state, action: PayloadAction<string>) => {
      state.selectedHotelId = action.payload;
    },
    processNewBooking: (state, action: PayloadAction<Booking>) => {
      const res = createBookingAtomic(action.payload);
      if (res.success) {
        state.bookings = getStoredBookings();
        state.hotels = getStoredHotels();
        state.lastBookingResult = { success: true, booking: action.payload };
      } else {
        state.lastBookingResult = { success: false, error: res.error };
      }
    },
    clearBookingResult: (state) => {
      state.lastBookingResult = null;
    },
    updateStatus: (
      state, 
      action: PayloadAction<{ bookingId: string; status: BookingStatus; roomNumber?: string }>
    ) => {
      updateBookingStatus(action.payload.bookingId, action.payload.status, {
        roomNumber: action.payload.roomNumber
      });
      state.bookings = getStoredBookings();
      state.hotels = getStoredHotels();
    },
    updateRoomAvailableUnits: (
      state,
      action: PayloadAction<{ hotelId: string; roomTypeId: string; newUnits: number }>
    ) => {
      const hotel = state.hotels.find(h => h.id === action.payload.hotelId);
      if (hotel) {
        const room = hotel.roomTypes.find(r => r.id === action.payload.roomTypeId);
        if (room) {
          room.availableUnits = action.payload.newUnits;
          saveHotels(state.hotels);
        }
      }
    },
    updateMealPlanPrice: (
      state,
      action: PayloadAction<{ 
        hotelId: string; 
        roomTypeId: string; 
        mealPlanId: string; 
        newPrice: number 
      }>
    ) => {
      const hotel = state.hotels.find(h => h.id === action.payload.hotelId);
      if (hotel) {
        const room = hotel.roomTypes.find(r => r.id === action.payload.roomTypeId);
        if (room) {
          const plan = room.mealPlans.find(mp => mp.id === action.payload.mealPlanId);
          if (plan) {
            plan.pricePerNight = action.payload.newPrice;
            saveHotels(state.hotels);
          }
        }
      }
    },
    addHotelOffer: (
      state,
      action: PayloadAction<{ hotelId: string; offer: HotelOffer }>
    ) => {
      const hotel = state.hotels.find(h => h.id === action.payload.hotelId);
      if (hotel) {
        if (!hotel.offers) hotel.offers = [];
        hotel.offers.unshift(action.payload.offer);
        saveHotels(state.hotels);
      }
    },
    toggleHotelOffer: (
      state,
      action: PayloadAction<{ hotelId: string; offerId: string }>
    ) => {
      const hotel = state.hotels.find(h => h.id === action.payload.hotelId);
      if (hotel && hotel.offers) {
        const offer = hotel.offers.find(o => o.id === action.payload.offerId);
        if (offer) {
          offer.isActive = !offer.isActive;
          saveHotels(state.hotels);
        }
      }
    }
  }
});

export const {
  refreshDataFromStorage,
  setActiveRole,
  selectHotel,
  processNewBooking,
  clearBookingResult,
  updateStatus,
  updateRoomAvailableUnits,
  updateMealPlanPrice,
  addHotelOffer,
  toggleHotelOffer
} = hotelsSlice.actions;

export default hotelsSlice.reducer;

