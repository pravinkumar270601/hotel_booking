import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  MapPin, 
  Utensils, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateStatus } from '../features/hotels/hotelsSlice';
import { Booking } from '../types/hotel';
import { formatCurrency, formatDisplayDate } from '../utils/formatters';

export const MyBookingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state) => state.hotels.bookings);

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);

  const upcomingBookings = bookings.filter(
    (b) => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked_in' || b.bookingStatus === 'pending_payment'
  );
  const completedBookings = bookings.filter((b) => b.bookingStatus === 'checked_out');
  const cancelledBookings = bookings.filter(
    (b) => b.bookingStatus === 'cancelled' || b.bookingStatus === 'refund_pending' || b.bookingStatus === 'refunded'
  );

  const handleConfirmCancel = () => {
    if (!selectedBookingForCancel) return;

    dispatch(
      updateStatus({
        bookingId: selectedBookingForCancel.id,
        status: 'cancelled'
      })
    );
    setSelectedBookingForCancel(null);
  };

  const currentList = 
    activeTab === 'upcoming' 
      ? upcomingBookings 
      : activeTab === 'completed' 
      ? completedBookings 
      : cancelledBookings;

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              My Hotel Bookings
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage your upcoming vacations, stay vouchers, dining inclusions, and cancellations
            </p>
          </div>
          <Link
            to="/search"
            className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl hover:bg-amber-100 transition-colors w-fit"
          >
            + Book Another Hotel
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Upcoming & Active ({upcomingBookings.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Completed Stays ({completedBookings.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cancelled')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'cancelled'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Cancelled & Refunded ({cancelledBookings.length})</span>
          </button>
        </div>

        {/* Bookings List */}
        {currentList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <CalendarDays className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              No {activeTab} bookings found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Ready to explore your next escape? Search our handpicked luxury resorts and premium hotels.
            </p>
            <Link
              to="/search"
              className="inline-block mt-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
            >
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                {/* Left Info */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img
                    src={b.hotelImage}
                    alt={b.hotelName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {b.bookingReference}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.bookingStatus === 'checked_in'
                            ? 'bg-blue-100 text-blue-800'
                            : b.bookingStatus === 'checked_out'
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {b.bookingStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {b.hotelName}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {b.hotelCity} · {b.hotelAddress}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-stone-600">
                      <span>{b.roomTypeName}</span>
                      <span>•</span>
                      <span>{formatDisplayDate(b.checkInDate)} → {formatDisplayDate(b.checkOutDate)} ({b.nights}N)</span>
                      <span>•</span>
                      <span className="text-amber-800 font-semibold flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-amber-600" />
                        {b.mealPlanName}
                      </span>
                    </div>

                    {b.allocatedRoomNumber && (
                      <p className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded w-fit mt-1">
                        Allocated Room: {b.allocatedRoomNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions & Amount */}
                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-stone-400">Total Billed</div>
                    <div className="text-xl font-bold font-serif text-stone-900">
                      {formatCurrency(b.pricing.grandTotal)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/booking/confirmed/${b.id}`}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Voucher</span>
                    </Link>

                    {b.bookingStatus === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => setSelectedBookingForCancel(b)}
                        className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Stay</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {selectedBookingForCancel && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 text-rose-600">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Cancel Reservation?
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-900">
                  {selectedBookingForCancel.hotelName}
                </div>
                <div className="text-stone-500">
                  Ref: {selectedBookingForCancel.bookingReference} · {selectedBookingForCancel.roomTypeName}
                </div>
                <div className="text-stone-500">
                  Check-in: {formatDisplayDate(selectedBookingForCancel.checkInDate)}
                </div>
              </div>

              {/* Refund calculation message */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  100% Full Refund Guaranteed
                </div>
                <p className="text-[11px] text-emerald-800">
                  You are cancelling within the free cancellation window. The full amount of{' '}
                  <strong>{formatCurrency(selectedBookingForCancel.pricing.grandTotal)}</strong>{' '}
                  will be refunded back to your payment source immediately.
                </p>
              </div>

              <p className="text-xs text-stone-500">
                Are you sure you want to cancel this booking? This will immediately release the room inventory back for other guests.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForCancel(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Keep Reservation
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                >
                  Confirm & Process Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

