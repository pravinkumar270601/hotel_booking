import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import bookingDraftReducer from '../features/booking/bookingDraftSlice';
import hotelsReducer from '../features/hotels/hotelsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    bookingDraft: bookingDraftReducer,
    hotels: hotelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

