export type HotelCategory = 
  | 'budget' 
  | 'standard' 
  | 'premium' 
  | 'luxury' 
  | 'resort' 
  | 'business' 
  | 'boutique';

export type PropertyType = 
  | 'Hotel' 
  | 'Resort' 
  | 'Boutique Hotel' 
  | 'Business Hotel' 
  | 'Heritage Haveli' 
  | 'Serviced Apartment' 
  | 'Beachfront Villa';

export type StarRating = 1 | 2 | 3 | 4 | 5;

export type IncludedMeal = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';

export type MealPlanCode = 'RO' | 'BB' | 'HB' | 'FB' | 'AI';

export interface MealPlan {
  id: string;
  code: MealPlanCode;
  name: string;
  regionalName: string; // e.g. "European Plan (EP)", "Continental Plan (CP)", "Modified American Plan (MAP)"
  description: string;
  includedMeals: IncludedMeal[];
  pricePerNight: number; // additional charge per night for 2 guests
  badge?: string;
  isPopular?: boolean;
}

export type RoomCategoryType = 
  | 'Standard Room' 
  | 'Deluxe Room' 
  | 'Superior Room' 
  | 'Executive Room' 
  | 'Junior Suite' 
  | 'Suite / Presidential Suite' 
  | 'Family Room' 
  | 'Accessible Room';

export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  category: RoomCategoryType;
  description: string;
  photos: string[];
  basePricePerNight: number;
  roomSizeSqFt: number;
  bedType: string; // e.g. "1 King Bed" or "2 Twin Beds"
  maxAdults: number;
  maxChildren: number;
  maxExtraBeds: number;
  extraPersonFee: number;
  totalInventoryUnits: number;
  availableUnits: number; // live simulated inventory
  amenities: string[];
  mealPlans: MealPlan[];
  cancellationPolicy: {
    freeCancellationBeforeDays: number; // e.g. 2 days prior to check-in
    penaltyPercentage: number; // e.g. 100% or 50%
    description: string;
  };
}

export interface RestaurantItem {
  id: string;
  name: string;
  cuisine: string;
  dietary: 'veg' | 'non-veg' | 'vegan';
  price: number;
  servingTime: string; // "7:00 AM - 10:30 AM"
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Room Service';
}

export interface HotelRestaurant {
  id: string;
  name: string;
  cuisineType: string;
  timings: string;
  location: string;
  featuredDishes: RestaurantItem[];
}

export interface HotelOffer {
  id: string;
  code: string; // e.g. "SUMMER20", "SPA15", "EARLYBIRD"
  title: string; // e.g. "Early Bird Summer Special - 20% Off"
  description: string; // e.g. "Book in advance and get 20% off room rate"
  discountPercent: number; // e.g. 20 (for 20%)
  maxDiscount: number; // e.g. 3000
  badge: string; // "Limited Deal", "Exclusive", "Weekend Special"
  perkDescription?: string; // e.g. "Complimentary High Tea & Spa Voucher"
  minNights?: number; // minimum nights needed
  validUntil: string;
  isActive: boolean;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  category: HotelCategory;
  propertyType: PropertyType;
  starRating: StarRating;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  rating: number; // e.g. 4.8
  reviewCount: number;
  startingPrice: number;
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
  roomTypes: RoomType[];
  restaurants: HotelRestaurant[];
  offers: HotelOffer[];
  isFeatured?: boolean;
}

export type BookingStatus = 
  | 'pending_payment' 
  | 'confirmed' 
  | 'checked_in' 
  | 'checked_out' 
  | 'cancellation_requested' 
  | 'cancelled' 
  | 'no_show' 
  | 'refund_pending' 
  | 'refunded';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface BookingGuestDetails {
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  arrivalEstimatedTime?: string;
}

export interface BookingPriceBreakdown {
  nightlyRoomRate: number;
  nightsCount: number;
  roomBaseTotal: number;
  mealPlanRatePerNight: number;
  mealPlanTotal: number;
  extraGuestsFee: number;
  subtotal: number;
  taxGstRate: number; // e.g. 0.12 (12%)
  taxAmount: number;
  platformServiceFee: number;
  discountAmount: number;
  couponCode?: string;
  offerTitle?: string;
  offerPerks?: string;
  grandTotal: number;
}

export interface Booking {
  id: string;
  bookingReference: string; // e.g. "AST-2026-94812"
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelImage: string;
  hotelAddress: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  roomTypeId: string;
  roomTypeName: string;
  roomBedType: string;
  mealPlanCode: MealPlanCode;
  mealPlanName: string;
  includedMeals: IncludedMeal[];
  guest: BookingGuestDetails;
  pricing: BookingPriceBreakdown;
  payment: {
    paymentId: string;
    gateway: 'razorpay' | 'upi' | 'card' | 'pay_at_hotel';
    status: PaymentStatus;
    transactionReference: string;
    paidAt: string;
  };
  bookingStatus: BookingStatus;
  allocatedRoomNumber?: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  createdAt: string;
}

export interface SearchCriteria {
  destination: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  rooms: number;
  selectedCategory?: HotelCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  starRatings?: number[];
  mealPlans?: MealPlanCode[];
  amenities?: string[];
  sortBy?: 'popular' | 'price_low' | 'price_high' | 'rating';
}

