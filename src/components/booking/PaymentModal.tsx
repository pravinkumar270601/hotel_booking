import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPaymentModalOpen, clearDraft } from '../../features/booking/bookingDraftSlice';
import { processNewBooking } from '../../features/hotels/hotelsSlice';
import { Booking } from '../../types/hotel';
import { formatCurrency } from '../../utils/formatters';

export const PaymentModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.bookingDraft);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'pay_at_hotel'>('upi');
  const [upiId, setUpiId] = useState('guest@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('843');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!draft.isPaymentModalOpen || !draft.hotel || !draft.roomType || !draft.mealPlan || !draft.pricing) {
    return null;
  }

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setErrorMsg(null);

    // Simulate network delay & gateway authentication
    setTimeout(() => {
      const bookingRef = `AST-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const paymentId = `pay_rzp_${Math.random().toString(36).substring(2, 10)}`;
      const txnRef = `TXN-${Math.floor(1000000 + Math.random() * 9000000)}-GATEWAY`;

      const newBooking: Booking = {
        id: `bkg-${Date.now()}`,
        bookingReference: bookingRef,
        hotelId: draft.hotel!.id,
        hotelName: draft.hotel!.name,
        hotelCity: draft.hotel!.city,
        hotelImage: draft.hotel!.heroImage,
        hotelAddress: draft.hotel!.address,
        checkInDate: draft.checkInDate,
        checkOutDate: draft.checkOutDate,
        nights: draft.pricing!.nightsCount,
        roomsCount: draft.roomsCount,
        adultsCount: draft.adultsCount,
        childrenCount: draft.childrenCount,
        roomTypeId: draft.roomType!.id,
        roomTypeName: draft.roomType!.name,
        roomBedType: draft.roomType!.bedType,
        mealPlanCode: draft.mealPlan!.code,
        mealPlanName: draft.mealPlan!.name,
        includedMeals: draft.mealPlan!.includedMeals,
        guest: draft.guestDetails,
        pricing: draft.pricing!,
        payment: {
          paymentId,
          gateway: paymentMethod === 'pay_at_hotel' ? 'pay_at_hotel' : 'razorpay',
          status: paymentMethod === 'pay_at_hotel' ? 'pending' : 'completed',
          transactionReference: txnRef,
          paidAt: new Date().toISOString()
        },
        bookingStatus: paymentMethod === 'pay_at_hotel' ? 'pending_payment' : 'confirmed',
        createdAt: new Date().toISOString()
      };

      dispatch(processNewBooking(newBooking));
      setIsProcessing(false);
      dispatch(setPaymentModalOpen(false));

      // Trigger festive confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }

      dispatch(clearDraft());
      navigate(`/booking/confirmed/${newBooking.id}`);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Gateway Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Secured 256-Bit
              </div>
              <h3 className="font-semibold text-stone-100 text-base">
                {draft.hotel.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(setPaymentModalOpen(false))}
            disabled={isProcessing}
            className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-amber-50/70 px-6 py-3 border-b border-amber-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-900 font-medium">Final Payable Amount</div>
            <div className="text-xs text-amber-700">
              Includes {draft.pricing.nightsCount} Night(s) + {draft.mealPlan.name} + 12% GST
            </div>
          </div>
          <div className="text-xl font-bold font-serif text-stone-900">
            {formatCurrency(draft.pricing.grandTotal)}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                paymentMethod === 'upi'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>UPI / QR</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                paymentMethod === 'card'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Building className="w-4 h-4 text-amber-600" />
              <span>NetBanking</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('pay_at_hotel')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                paymentMethod === 'pay_at_hotel'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Pay at Desk</span>
            </button>
          </div>

          {/* Tab 1: UPI */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Virtual Payment Address (UPI ID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    placeholder="mobile@upi or username@okhdfcbank"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Supports Google Pay, PhonePe, Paytm, and BHIM UPI with instant approval.</span>
              </div>
            </div>
          )}

          {/* Tab 2: Cards */}
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: NetBanking */}
          {paymentMethod === 'netbanking' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-700 block">
                Select Your Bank
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank, i) => (
                  <button
                    key={i}
                    type="button"
                    className="p-2.5 text-left rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 font-medium text-stone-800"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Pay at Hotel */}
          {paymentMethod === 'pay_at_hotel' && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                Pay Directly at Front Desk upon Arrival
              </div>
              <p className="leading-relaxed text-amber-800">
                Your room will be guaranteed. You can settle the full amount via Cash, UPI, or Credit Card during check-in at hotel reception.
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleExecutePayment}
            className="w-full mt-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying with Payment Gateway...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {paymentMethod === 'pay_at_hotel' ? 'Confirm Reservation (Pay at Hotel)' : `Pay ${formatCurrency(draft.pricing.grandTotal)}`}
                </span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-stone-400 mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            PCI-DSS Level 1 Encrypted · Instant Booking Reference Generated
          </p>
        </div>
      </div>
    </div>
  );
};

