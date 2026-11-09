import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  QrCode, 
  MapPin, 
  Calendar, 
  Utensils, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { formatCurrency, formatDisplayDate } from '../utils/formatters';

export const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const bookings = useAppSelector((state) => state.hotels.bookings);
  const booking = bookings.find((b) => b.id === bookingId) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold font-serif text-stone-900">Booking Not Found</h2>
        <Link to="/my-bookings" className="text-amber-700 underline text-sm mt-2">
          View all your bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 text-center space-y-3 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Reservation Confirmed & Inventory Allocated
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Thank You, {booking.guest.firstName}!
          </h1>
          <p className="text-stone-500 text-sm max-w-lg mx-auto leading-relaxed">
            Your reservation at <strong>{booking.hotelName}</strong> is guaranteed. A confirmation email and SMS voucher have been dispatched to <strong>{booking.guest.email}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Official Stay Voucher</span>
            </button>
            <Link
              to="/my-bookings"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Manage in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Printable Official Voucher Section */}
        <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-lg print:border-none print:shadow-none">
          {/* Voucher Header Banner */}
          <div className="bg-stone-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Official Hotel Stay Voucher
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                {booking.hotelName}
              </h2>
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{booking.hotelAddress}</span>
              </p>
            </div>

            <div className="text-left sm:text-right bg-stone-800/80 p-3 rounded-xl border border-stone-700">
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Booking Reference No.
              </div>
              <div className="text-xl font-mono font-bold text-amber-400 tracking-wider">
                {booking.bookingReference}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Status: CONFIRMED</div>
            </div>
          </div>

          {/* Voucher Body Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* 4 Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Guest Name</div>
                <div className="font-bold text-stone-900 mt-1">
                  {booking.guest.title}. {booking.guest.firstName} {booking.guest.lastName}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{booking.guest.phone}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Check-In Date</div>
                <div className="font-bold text-stone-900 mt-1">
                  {formatDisplayDate(booking.checkInDate)}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">From 14:00 hrs</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Check-Out Date</div>
                <div className="font-bold text-stone-900 mt-1">
                  {formatDisplayDate(booking.checkOutDate)}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">Until 11:00 hrs</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Stay Duration</div>
                <div className="font-bold text-stone-900 mt-1">
                  {booking.nights} Night(s) · {booking.roomsCount} Room
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{booking.adultsCount} Adults</div>
              </div>
            </div>

            {/* Room & Meal Entitlement Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-200/60">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Booked Room Category
                  </span>
                  <h4 className="font-bold text-base text-amber-950">
                    {booking.roomTypeName} ({booking.roomBedType})
                  </h4>
                </div>
                <div className="text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-1 rounded-full w-fit">
                  Allocated: {booking.allocatedRoomNumber || 'Assigned at Front Desk'}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Utensils className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-950">
                    Confirmed Meal Entitlement: {booking.mealPlanName} ({booking.mealPlanCode})
                  </div>
                  <div className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Registered guests enjoy complimentary dining as per package: <strong>{booking.includedMeals.join(' + ') || 'Room Only (EP)'}</strong>. Show this voucher at hotel restaurants.
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Breakdown & QR Code validation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-3 border-t border-stone-200 items-center">
              <div className="md:col-span-8 space-y-2 text-xs">
                <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Payment Settlement & Tax Invoice
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Room & Meal Base Total:</span>
                  <span className="font-medium text-stone-800">{formatCurrency(booking.pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST & Service Taxes ({(booking.pricing.taxGstRate * 100).toFixed(0)}%):</span>
                  <span className="font-medium text-stone-800">{formatCurrency(booking.pricing.taxAmount)}</span>
                </div>
                {booking.pricing.discountAmount > 0 && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                    <div className="flex justify-between font-bold">
                      <span>Promo Savings ({booking.pricing.couponCode}):</span>
                      <span>-{formatCurrency(booking.pricing.discountAmount)}</span>
                    </div>
                    {booking.pricing.offerTitle && (
                      <div className="text-[10px] text-emerald-900 mt-0.5 font-medium">
                        {booking.pricing.offerTitle}
                      </div>
                    )}
                    {booking.pricing.offerPerks && (
                      <div className="text-[10px] text-emerald-700 font-normal">
                        Perk: {booking.pricing.offerPerks}
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-amber-900 font-serif text-lg">{formatCurrency(booking.pricing.grandTotal)}</span>
                </div>
                <p className="text-[10px] text-stone-400">
                  Gateway Transaction Ref: <span className="font-mono">{booking.payment.transactionReference}</span>
                </p>
              </div>

              {/* QR Code Placeholder for Front Desk Scan */}
              <div className="md:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center space-y-2 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white border border-stone-300 rounded-xl flex items-center justify-center shadow-xs">
                  <QrCode className="w-16 h-16 text-stone-800" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Front Desk Scan Code
                </div>
                <div className="text-[10px] text-stone-400">
                  Scan on arrival for instant key handoff
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

