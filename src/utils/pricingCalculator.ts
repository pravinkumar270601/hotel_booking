import { RoomType, MealPlan, BookingPriceBreakdown } from '../types/hotel';
import { differenceInCalendarDays, parseISO } from 'date-fns';

export interface PricingParams {
  roomType: RoomType;
  mealPlan: MealPlan;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  couponCode?: string;
}

export interface CouponRule {
  discountPercent: number;
  maxDiscount: number;
  title: string;
  perks?: string;
}

export const VALID_COUPONS: Record<string, CouponRule> = {
  // General Platform Coupons
  'AURA10': { discountPercent: 10, maxDiscount: 1500, title: 'Platform Welcome 10% Off', perks: 'Priority Customer Concierge' },
  'LUXURY20': { discountPercent: 20, maxDiscount: 4000, title: 'Luxury Collection 20% Off', perks: 'Complimentary Room Upgrade Subject to Availability' },
  'WELCOME500': { discountPercent: 15, maxDiscount: 500, title: 'First Booking Instant 15% Off', perks: 'Flexible Check-In' },
  
  // Hotel-Specific Promotional Offers
  'SUMMER20': { discountPercent: 20, maxDiscount: 2500, title: 'Grand City Retreat 20% Off', perks: 'Complimentary High Tea & 20% Spa Voucher' },
  'WEEKENDCH': { discountPercent: 15, maxDiscount: 1800, title: 'Chennai Weekend Special 15% Off', perks: 'Evening Signature Cocktail at Lounge' },
  'AURARESORT': { discountPercent: 15, maxDiscount: 3500, title: 'Coastal Sunset Escape 15% Off', perks: 'Beach Cabana Setup & Sunset Mocktails' },
  'GOAALLINC': { discountPercent: 20, maxDiscount: 5000, title: 'All-Inclusive Privilege 20% Off', perks: 'Unlimited Cocktails & Airport Drop' },
  'BLOOMFAST': { discountPercent: 15, maxDiscount: 600, title: 'Smart Tech City Saver 15% Off', perks: 'Free Co-Working Pod & Barista Coffee' },
  'ROYAL25': { discountPercent: 25, maxDiscount: 6000, title: 'Regal Lake Palace 25% Off', perks: 'Ceremonial Boat Arrival & Champagne Welcome' },
  'CORPEXEC': { discountPercent: 18, maxDiscount: 2200, title: 'Business Elite Advantage 18% Off', perks: 'Express Laundry & 1-Hr Boardroom Pass' },
  'MARINEDRIVE': { discountPercent: 20, maxDiscount: 4000, title: 'Marine Drive Romance 20% Off', perks: 'Sunset Afternoon Tea & Fruit Platter' }
};

export function calculateBookingPrice(params: PricingParams): BookingPriceBreakdown {
  const {
    roomType,
    mealPlan,
    checkInDate,
    checkOutDate,
    roomsCount,
    adultsCount,
    couponCode
  } = params;

  let nightsCount = 1;
  try {
    const start = parseISO(checkInDate);
    const end = parseISO(checkOutDate);
    const diff = differenceInCalendarDays(end, start);
    nightsCount = diff > 0 ? diff : 1;
  } catch {
    nightsCount = 1;
  }

  const nightlyRoomRate = roomType.basePricePerNight;
  const roomBaseTotal = nightlyRoomRate * nightsCount * roomsCount;

  const mealPlanRatePerNight = mealPlan.pricePerNight;
  const mealPlanTotal = mealPlanRatePerNight * nightsCount * roomsCount;

  // Extra guest charge if adults exceed base allowance of 2 adults per room
  const allowedAdults = roomType.maxAdults * roomsCount;
  const extraAdults = Math.max(0, adultsCount - allowedAdults);
  const extraGuestsFee = extraAdults * roomType.extraPersonFee * nightsCount;

  const subtotal = roomBaseTotal + mealPlanTotal + extraGuestsFee;

  // Indian GST rules for hospitality:
  // Subtotal per night per room <= 7,500 => 12% GST; > 7,500 => 18% GST
  const averageNightlyPricePerRoom = (nightlyRoomRate + mealPlanRatePerNight);
  const taxGstRate = averageNightlyPricePerRoom > 7500 ? 0.18 : 0.12;
  const taxAmount = Math.round(subtotal * taxGstRate);

  const platformServiceFee = 150;

  // Calculate discount and attach offer metadata
  let discountAmount = 0;
  let offerTitle: string | undefined = undefined;
  let offerPerks: string | undefined = undefined;

  const cleanCoupon = couponCode?.trim().toUpperCase();
  if (cleanCoupon && VALID_COUPONS[cleanCoupon]) {
    const rule = VALID_COUPONS[cleanCoupon];
    const calculated = Math.round((subtotal * rule.discountPercent) / 100);
    discountAmount = Math.min(calculated, rule.maxDiscount);
    offerTitle = rule.title;
    offerPerks = rule.perks;
  }

  const grandTotal = Math.max(0, subtotal + taxAmount + platformServiceFee - discountAmount);

  return {
    nightlyRoomRate,
    nightsCount,
    roomBaseTotal,
    mealPlanRatePerNight,
    mealPlanTotal,
    extraGuestsFee,
    subtotal,
    taxGstRate,
    taxAmount,
    platformServiceFee,
    discountAmount,
    couponCode: discountAmount > 0 ? cleanCoupon : undefined,
    offerTitle: discountAmount > 0 ? offerTitle : undefined,
    offerPerks: discountAmount > 0 ? offerPerks : undefined,
    grandTotal
  };
}
