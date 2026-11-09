import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel, RoomType, MealPlan, BookingGuestDetails, BookingPriceBreakdown } from '../../types/hotel';
import { calculateBookingPrice } from '../../utils/pricingCalculator';

export interface BookingDraftState {
  hotel: Hotel | null;
  roomType: RoomType | null;
  mealPlan: MealPlan | null;
  checkInDate: string;
  checkOutDate: string;
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  guestDetails: BookingGuestDetails;
  couponCode: string;
  pricing: BookingPriceBreakdown | null;
  isPaymentModalOpen: boolean;
}

const initialState: BookingDraftState = {
  hotel: null,
  roomType: null,
  mealPlan: null,
  checkInDate: '',
  checkOutDate: '',
  roomsCount: 1,
  adultsCount: 2,
  childrenCount: 0,
  guestDetails: {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  },
  couponCode: '',
  pricing: null,
  isPaymentModalOpen: false
};

export const bookingDraftSlice = createSlice({
  name: 'bookingDraft',
  initialState,
  reducers: {
    initDraftBooking: (
      state,
      action: PayloadAction<{
        hotel: Hotel;
        roomType: RoomType;
        mealPlan?: MealPlan;
        checkInDate: string;
        checkOutDate: string;
        roomsCount: number;
        adultsCount: number;
        childrenCount: number;
      }>
    ) => {
      const { hotel, roomType, mealPlan, checkInDate, checkOutDate, roomsCount, adultsCount, childrenCount } = action.payload;
      state.hotel = hotel;
      state.roomType = roomType;
      // Default to first meal plan (usually Room Only or popular) if none specified
      state.mealPlan = mealPlan || roomType.mealPlans[0];
      state.checkInDate = checkInDate;
      state.checkOutDate = checkOutDate;
      state.roomsCount = roomsCount;
      state.adultsCount = adultsCount;
      state.childrenCount = childrenCount;

      state.pricing = calculateBookingPrice({
        roomType: state.roomType,
        mealPlan: state.mealPlan,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        roomsCount: state.roomsCount,
        adultsCount: state.adultsCount,
        childrenCount: state.childrenCount,
        couponCode: state.couponCode
      });
    },
    setSelectedMealPlan: (state, action: PayloadAction<MealPlan>) => {
      state.mealPlan = action.payload;
      if (state.roomType && state.checkInDate && state.checkOutDate) {
        state.pricing = calculateBookingPrice({
          roomType: state.roomType,
          mealPlan: state.mealPlan,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          roomsCount: state.roomsCount,
          adultsCount: state.adultsCount,
          childrenCount: state.childrenCount,
          couponCode: state.couponCode
        });
      }
    },
    setGuestDetails: (state, action: PayloadAction<BookingGuestDetails>) => {
      state.guestDetails = action.payload;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
      if (state.roomType && state.mealPlan && state.checkInDate && state.checkOutDate) {
        state.pricing = calculateBookingPrice({
          roomType: state.roomType,
          mealPlan: state.mealPlan,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          roomsCount: state.roomsCount,
          adultsCount: state.adultsCount,
          childrenCount: state.childrenCount,
          couponCode: action.payload
        });
      }
    },
    removeCoupon: (state) => {
      state.couponCode = '';
      if (state.roomType && state.mealPlan && state.checkInDate && state.checkOutDate) {
        state.pricing = calculateBookingPrice({
          roomType: state.roomType,
          mealPlan: state.mealPlan,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          roomsCount: state.roomsCount,
          adultsCount: state.adultsCount,
          childrenCount: state.childrenCount,
          couponCode: ''
        });
      }
    },
    setPaymentModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPaymentModalOpen = action.payload;
    },
    clearDraft: () => initialState
  }
});

export const {
  initDraftBooking,
  setSelectedMealPlan,
  setGuestDetails,
  applyCoupon,
  removeCoupon,
  setPaymentModalOpen,
  clearDraft
} = bookingDraftSlice.actions;

export default bookingDraftSlice.reducer;

