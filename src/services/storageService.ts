import { Hotel, Booking, BookingStatus } from '../types/hotel';
import { INITIAL_HOTELS } from '../data/mockHotels';

const STORAGE_KEYS = {
  HOTELS: 'aurastays_hotels_v1',
  BOOKINGS: 'aurastays_bookings_v1',
  ACTIVE_ROLE: 'aurastays_active_role_v1',
};

export type UserRole = 'customer' | 'hotel_owner' | 'receptionist' | 'admin';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-demo-1',
    bookingReference: 'AST-2026-78421',
    hotelId: 'htl-001',
    hotelName: 'The Grand Residency & Spa',
    hotelCity: 'Chennai',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    hotelAddress: '42 Cathedral Road, Nungambakkam, Chennai',
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-17',
    nights: 2,
    roomsCount: 1,
    adultsCount: 2,
    childrenCount: 0,
    roomTypeId: 'room-gr-std',
    roomTypeName: 'Deluxe King Room',
    roomBedType: '1 King Bed',
    mealPlanCode: 'BB',
    mealPlanName: 'Breakfast Included',
    includedMeals: ['breakfast'],
    guest: {
      title: 'Mr',
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      specialRequests: 'Quiet room on a high floor away from the elevator please.'
    },
    pricing: {
      nightlyRoomRate: 4000,
      nightsCount: 2,
      roomBaseTotal: 8000,
      mealPlanRatePerNight: 500,
      mealPlanTotal: 1000,
      extraGuestsFee: 0,
      subtotal: 9000,
      taxGstRate: 0.12,
      taxAmount: 1080,
      platformServiceFee: 150,
      discountAmount: 0,
      grandTotal: 10230
    },
    payment: {
      paymentId: 'pay_rzp_mock_982103',
      gateway: 'razorpay',
      status: 'completed',
      transactionReference: 'TXN-9821034-RZP',
      paidAt: '2026-11-01T14:30:00.000Z'
    },
    bookingStatus: 'confirmed',
    allocatedRoomNumber: '402',
    createdAt: '2026-11-01T14:30:00.000Z'
  },
  {
    id: 'bkg-demo-2',
    bookingReference: 'AST-2026-31908',
    hotelId: 'htl-002',
    hotelName: 'Azurra Palms Beach Resort',
    hotelCity: 'Goa',
    hotelImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    hotelAddress: 'Benaulim Beach Road, South Goa',
    checkInDate: '2026-10-10',
    checkOutDate: '2026-10-13',
    nights: 3,
    roomsCount: 1,
    adultsCount: 2,
    childrenCount: 1,
    roomTypeId: 'room-az-villa',
    roomTypeName: 'Ocean Breeze Villa',
    roomBedType: '1 King Bed + Daybed',
    mealPlanCode: 'AI',
    mealPlanName: 'All-Inclusive Luxury Resort Plan',
    includedMeals: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'],
    guest: {
      title: 'Ms',
      firstName: 'Priya',
      lastName: 'Nair',
      email: 'priya.nair@example.com',
      phone: '+91 91234 56789',
      specialRequests: 'Celebrating wedding anniversary.'
    },
    pricing: {
      nightlyRoomRate: 6500,
      nightsCount: 3,
      roomBaseTotal: 19500,
      mealPlanRatePerNight: 3900,
      mealPlanTotal: 11700,
      extraGuestsFee: 0,
      subtotal: 31200,
      taxGstRate: 0.18,
      taxAmount: 5616,
      platformServiceFee: 250,
      discountAmount: 2000,
      couponCode: 'AURARESORT',
      grandTotal: 35066
    },
    payment: {
      paymentId: 'pay_rzp_mock_112039',
      gateway: 'card',
      status: 'completed',
      transactionReference: 'TXN-1120394-CARD',
      paidAt: '2026-10-01T10:15:00.000Z'
    },
    bookingStatus: 'checked_out',
    allocatedRoomNumber: 'Villa 108',
    checkedInAt: '2026-10-10T15:10:00.000Z',
    checkedOutAt: '2026-10-13T11:45:00.000Z',
    createdAt: '2026-10-01T10:15:00.000Z'
  }
];

export const getStoredHotels = (): Hotel[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOTELS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(INITIAL_HOTELS));
      return INITIAL_HOTELS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading hotels from localStorage:', err);
    return INITIAL_HOTELS;
  }
};

export const saveHotels = (hotels: Hotel[]): void => {
  localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotels));
};

export const getStoredBookings = (): Booking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return INITIAL_BOOKINGS;
  }
};

export const saveBookings = (bookings: Booking[]): void => {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
};

export const createBookingAtomic = (newBooking: Booking): { success: boolean; error?: string } => {
  const hotels = getStoredHotels();
  const hotel = hotels.find(h => h.id === newBooking.hotelId);
  if (!hotel) return { success: false, error: 'Hotel not found.' };

  const room = hotel.roomTypes.find(r => r.id === newBooking.roomTypeId);
  if (!room) return { success: false, error: 'Room type not found.' };

  if (room.availableUnits < newBooking.roomsCount) {
    return { 
      success: false, 
      error: `Sorry, only ${room.availableUnits} unit(s) remaining for ${room.name}. Please select fewer rooms or another room type.` 
    };
  }

  // Deduct inventory
  room.availableUnits -= newBooking.roomsCount;
  saveHotels(hotels);

  // Save booking
  const bookings = getStoredBookings();
  bookings.unshift(newBooking);
  saveBookings(bookings);

  return { success: true };
};

export const updateBookingStatus = (
  bookingId: string, 
  newStatus: BookingStatus, 
  extra?: { roomNumber?: string }
): Booking | null => {
  const bookings = getStoredBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index === -1) return null;

  const b = bookings[index];
  const oldStatus = b.bookingStatus;
  b.bookingStatus = newStatus;

  if (newStatus === 'checked_in') {
    b.checkedInAt = new Date().toISOString();
    if (extra?.roomNumber) {
      b.allocatedRoomNumber = extra.roomNumber;
    } else if (!b.allocatedRoomNumber) {
      b.allocatedRoomNumber = `Room ${Math.floor(100 + Math.random() * 400)}`;
    }
  } else if (newStatus === 'checked_out') {
    b.checkedOutAt = new Date().toISOString();
  } else if (newStatus === 'cancelled' && oldStatus !== 'cancelled') {
    // Release inventory
    const hotels = getStoredHotels();
    const hotel = hotels.find(h => h.id === b.hotelId);
    if (hotel) {
      const room = hotel.roomTypes.find(r => r.id === b.roomTypeId);
      if (room) {
        room.availableUnits = Math.min(room.totalInventoryUnits, room.availableUnits + b.roomsCount);
        saveHotels(hotels);
      }
    }
  }

  saveBookings(bookings);
  return b;
};

export const getStoredActiveRole = (): UserRole => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE);
    return (raw as UserRole) || 'customer';
  } catch {
    return 'customer';
  }
};

export const setStoredActiveRole = (role: UserRole): void => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, role);
};

