import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  Users, 
  Utensils, 
  ShieldCheck, 
  Tag, 
  Check, 
  Lock, 
  ArrowLeft,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  setGuestDetails, 
  applyCoupon, 
  removeCoupon, 
  setPaymentModalOpen 
} from '../features/booking/bookingDraftSlice';
import { PaymentModal } from '../components/booking/PaymentModal';
import { formatCurrency, formatDisplayDate } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.bookingDraft);

  const [title, setTitle] = useState<'Mr' | 'Mrs' | 'Ms' | 'Dr'>(draft.guestDetails.title || 'Mr');
  const [firstName, setFirstName] = useState(draft.guestDetails.firstName || '');
  const [lastName, setLastName] = useState(draft.guestDetails.lastName || '');
  const [email, setEmail] = useState(draft.guestDetails.email || '');
  const [phone, setPhone] = useState(draft.guestDetails.phone || '');
  const [specialRequests, setSpecialRequests] = useState(draft.guestDetails.specialRequests || '');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // If no draft exists, redirect to search
  if (!draft.hotel || !draft.roomType || !draft.mealPlan || !draft.pricing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold font-serif text-stone-900 mb-2">
          No In-Progress Booking Found
        </h2>
        <p className="text-stone-500 text-sm mb-6 max-w-md">
          Please select a hotel, room type, and meal plan before proceeding to the checkout review.
        </p>
        <Link
          to="/search"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-sm"
        >
          Browse Verified Hotels
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (['AURA10', 'LUXURY20', 'WELCOME500', 'AURARESORT'].includes(code)) {
      dispatch(applyCoupon(code));
    } else {
      setCouponError('Invalid promo code. Try "AURA10" for 10% discount.');
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill in all required guest information fields.');
      return;
    }

    dispatch(
      setGuestDetails({
        title,
        firstName,
        lastName,
        email,
        phone,
        specialRequests
      })
    );
    dispatch(setPaymentModalOpen(true));
  };

  const { pricing, hotel, roomType, mealPlan } = draft;

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <PaymentModal />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to={`/hotel/${hotel.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {hotel.name}</span>
        </Link>

        {/* Stepper Header */}
        <div className="pb-4 border-b border-stone-200">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Review Your Stay & Complete Booking
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Step 2 of 2: Traveller Details & Payment Guarantee
          </p>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Selected Room & Meal Package Summary Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={hotel.heroImage}
                  alt={hotel.name}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {hotel.category} Hotel
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-stone-500">{hotel.address}, {hotel.city}</p>
                </div>
              </div>

              {/* Dates & Room Info Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-stone-100 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Check-In</div>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {formatDisplayDate(draft.checkInDate)}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Check-Out</div>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {formatDisplayDate(draft.checkOutDate)}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Nights & Rooms</div>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {pricing.nightsCount} Night(s) · {draft.roomsCount} Room
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Guests</div>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {draft.adultsCount} Adults
                  </div>
                </div>
              </div>

              {/* Selected Meal Plan confirmation box */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-700" />
                  <div>
                    <span className="font-bold text-amber-950">
                      Meal Package: {mealPlan.name}
                    </span>
                    <span className="text-amber-800 block text-[11px]">
                      {mealPlan.regionalName} · {mealPlan.description}
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-amber-900">
                  {mealPlan.pricePerNight === 0 ? 'Included' : `+${formatCurrency(mealPlan.pricePerNight)}/nt`}
                </span>
              </div>
            </div>

            {/* Guest Form */}
            <form onSubmit={handleProceedToPayment} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>Primary Guest Contact Details</span>
                <span className="text-xs text-stone-400 font-normal">* All fields required for voucher</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Title</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Dr">Dr.</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Rahul"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.sharma@example.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="High floor, twin beds, early check-in, dietary restrictions..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Continue to Secure Payment Gateway</span>
              </button>
            </form>
          </div>

          {/* Right Price Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                Itemized Price Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                {/* Room rate */}
                <div className="flex items-center justify-between text-stone-700">
                  <div>
                    <span className="font-medium">{roomType.name}</span>
                    <span className="text-stone-400 block text-[11px]">
                      {formatCurrency(pricing.nightlyRoomRate)} × {pricing.nightsCount} Night(s) × {draft.roomsCount} Room
                    </span>
                  </div>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(pricing.roomBaseTotal)}
                  </span>
                </div>

                {/* Meal package */}
                <div className="flex items-center justify-between text-stone-700">
                  <div>
                    <span className="font-medium">Meal Plan: {mealPlan.name}</span>
                    <span className="text-stone-400 block text-[11px]">
                      {formatCurrency(pricing.mealPlanRatePerNight)} × {pricing.nightsCount} Night(s)
                    </span>
                  </div>
                  <span className="font-bold text-stone-900">
                    {pricing.mealPlanTotal === 0 ? 'Free' : formatCurrency(pricing.mealPlanTotal)}
                  </span>
                </div>

                {/* Extra guest fee if any */}
                {pricing.extraGuestsFee > 0 && (
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Extra Guest / Bed Allowance</span>
                    <span className="font-bold text-stone-900">
                      {formatCurrency(pricing.extraGuestsFee)}
                    </span>
                  </div>
                )}

                {/* Subtotal */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between font-semibold text-stone-800">
                  <span>Room & Dining Subtotal</span>
                  <span>{formatCurrency(pricing.subtotal)}</span>
                </div>

                {/* GST */}
                <div className="flex items-center justify-between text-stone-600">
                  <div>
                    <span>Taxes & GST ({(pricing.taxGstRate * 100).toFixed(0)}%)</span>
                    <span className="text-[10px] text-stone-400 block">
                      Hospitality GST compliant
                    </span>
                  </div>
                  <span className="font-medium text-stone-900">
                    {formatCurrency(pricing.taxAmount)}
                  </span>
                </div>

                {/* Platform service fee */}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Platform Booking & Concierge Fee</span>
                  <span className="font-medium text-stone-900">
                    {formatCurrency(pricing.platformServiceFee)}
                  </span>
                </div>

                {/* Discount */}
                {pricing.discountAmount > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-emerald-800 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Offer "{pricing.couponCode}" Applied</span>
                      </span>
                      <span>-{formatCurrency(pricing.discountAmount)}</span>
                    </div>
                    {pricing.offerTitle && (
                      <div className="text-[11px] text-emerald-900 font-medium">
                        {pricing.offerTitle}
                      </div>
                    )}
                    {pricing.offerPerks && (
                      <div className="text-[10px] text-emerald-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{pricing.offerPerks}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Grand Total */}
                <div className="pt-3 border-t-2 border-stone-200 flex items-baseline justify-between text-base font-bold text-stone-900">
                  <div>
                    <span className="text-sm font-semibold text-stone-700 block">Total Payable</span>
                    <span className="text-[10px] text-stone-400 font-normal">All taxes included</span>
                  </div>
                  <div className="text-2xl font-serif text-amber-950 font-bold">
                    {formatCurrency(pricing.grandTotal)}
                  </div>
                </div>
              </div>

              {/* Coupon Code Input & Available Offers */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon / Offer Code"
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-xl text-xs uppercase font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                )}
                {pricing.discountAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => dispatch(removeCoupon())}
                    className="text-[11px] text-rose-600 hover:underline mt-1 block font-medium"
                  >
                    Remove applied offer
                  </button>
                )}

                {/* Available Offers for this Hotel */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-600" /> Available Offers for this Hotel
                  </div>

                  <div className="space-y-2">
                    {(hotel.offers || []).map((off) => {
                      const isCurrent = pricing.couponCode === off.code;

                      return (
                        <div
                          key={off.id}
                          className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50/50 transition-colors flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">
                                {off.code}
                              </span>
                              <span className="font-semibold text-stone-800 text-[11px]">
                                {off.title}
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500 mt-0.5">
                              Save up to {formatCurrency(off.maxDiscount)} · {off.perkDescription || off.description}
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={isCurrent}
                            onClick={() => dispatch(applyCoupon(off.code))}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                              isCurrent
                                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                : 'bg-stone-900 hover:bg-stone-800 text-white'
                            }`}
                          >
                            {isCurrent ? 'Applied' : 'Apply'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Guarantee Box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Guaranteed Free Cancellation
              </div>
              <p className="text-emerald-800 leading-relaxed text-[11px]">
                Cancel anytime up to {roomType.cancellationPolicy.freeCancellationBeforeDays} days before check-in for a 100% full instant refund to original source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

