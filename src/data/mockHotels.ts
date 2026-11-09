import { Hotel } from '../types/hotel';

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-001',
    slug: 'the-grand-residency-chennai',
    name: 'The Grand Residency & Spa',
    category: 'premium',
    propertyType: 'Hotel',
    starRating: 5,
    tagline: 'Refined contemporary elegance in the cultural heart of Chennai',
    description: 'Located in upscale Nungambakkam, The Grand Residency features palatial guest rooms, signature wellness therapies, rooftop infinity pool with city skyline views, and 3 award-winning fine dining restaurants.',
    address: '42 Cathedral Road, Nungambakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    pincode: '600086',
    coordinates: { lat: 13.0451, lng: 80.2524 },
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Rooftop Swimming Pool',
      'Ayurvedic Spa & Wellness',
      '24/7 Fitness Center',
      'Concierge & Airport Valet',
      'Meeting & Banquet Halls',
      'Complimentary Parking'
    ],
    rating: 4.8,
    reviewCount: 382,
    startingPrice: 4000,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    policies: [
      'Government-issued photo ID required at check-in (Aadhaar, Passport, or Driving License)',
      'Free cancellation up to 48 hours before check-in date',
      'Pets are strictly not allowed on property premises',
      'Smoking is restricted to designated open-air terraces'
    ],
    roomTypes: [
      {
        id: 'room-gr-std',
        hotelId: 'htl-001',
        name: 'Deluxe King Room',
        category: 'Deluxe Room',
        description: 'Generously proportioned 420 sq.ft room featuring an ergonomic workstation, plush Simmons King Bed, and Italian marble bathroom with rain shower.',
        photos: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 4000,
        roomSizeSqFt: 420,
        bedType: '1 King Bed',
        maxAdults: 2,
        maxChildren: 1,
        maxExtraBeds: 1,
        extraPersonFee: 1200,
        totalInventoryUnits: 15,
        availableUnits: 12,
        amenities: ['City View', '55-inch Smart TV', 'Nespresso Coffee Machine', 'High-Speed Wi-Fi', 'Luxury Toiletries', 'Bathtub'],
        mealPlans: [
          {
            id: 'mp-gr-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Accommodation only. Food and beverage billed upon consumption.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-gr-2',
            code: 'BB',
            name: 'Breakfast Included',
            regionalName: 'Continental Plan (CP)',
            description: 'Lavish international and South Indian buffet breakfast for 2 registered guests.',
            includedMeals: ['breakfast'],
            pricePerNight: 500,
            badge: 'Most Popular',
            isPopular: true
          },
          {
            id: 'mp-gr-3',
            code: 'HB',
            name: 'Breakfast + Dinner',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Includes extensive breakfast spread plus chef curated 4-course dinner for 2 guests.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 1600
          },
          {
            id: 'mp-gr-4',
            code: 'FB',
            name: 'All 3 Meals Included',
            regionalName: 'American Plan (AP)',
            description: 'Complete dining coverage: Breakfast, gourmet Lunch buffet, and Dinner at The Spice Pavilion.',
            includedMeals: ['breakfast', 'lunch', 'dinner'],
            pricePerNight: 2500
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 2,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 48 hours prior to check-in. 1 night fee afterwards.'
        }
      },
      {
        id: 'room-gr-suite',
        hotelId: 'htl-001',
        name: 'Executive Club Suite',
        category: 'Suite / Presidential Suite',
        description: 'Exquisite 780 sq.ft suite with private lounge parlor, dining table for four, deep soaking tub, and exclusive Club Lounge cocktail access.',
        photos: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 7500,
        roomSizeSqFt: 780,
        bedType: '1 Royal King Bed',
        maxAdults: 3,
        maxChildren: 2,
        maxExtraBeds: 1,
        extraPersonFee: 1500,
        totalInventoryUnits: 6,
        availableUnits: 4,
        amenities: ['Skyline Panoramic View', 'Club Lounge Privileges', 'Walk-in Wardrobe', 'Balcony', 'Butler On Demand', '65-inch OLED TV'],
        mealPlans: [
          {
            id: 'mp-gr-suite-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Luxury suite stay without prepaid meals.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-gr-suite-2',
            code: 'BB',
            name: 'Breakfast Included',
            regionalName: 'Continental Plan (CP)',
            description: 'Private in-suite breakfast or buffet at Club Lounge.',
            includedMeals: ['breakfast'],
            pricePerNight: 600,
            isPopular: true
          },
          {
            id: 'mp-gr-suite-3',
            code: 'HB',
            name: 'Breakfast + Dinner',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Includes Champagne breakfast and candlelight dinner for two.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 1900
          },
          {
            id: 'mp-gr-suite-4',
            code: 'AI',
            name: 'All-Inclusive Royalty',
            regionalName: 'All-Inclusive (AI)',
            description: 'Unlimited breakfast, lunch, high tea, dinner and signature mocktails/cocktails throughout your stay.',
            includedMeals: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'],
            pricePerNight: 3600
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 3,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 72 hours before check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-1',
        name: 'The Spice Pavilion',
        cuisineType: 'Chettinad & Pan-Indian',
        timings: '07:00 - 23:00',
        location: 'Ground Floor, Courtyard',
        featuredDishes: [
          { id: 'dish-1', name: 'Chettinad Kozhi Biryani', cuisine: 'South Indian', dietary: 'non-veg', price: 650, servingTime: '12:30 - 15:30', category: 'Lunch' },
          { id: 'dish-2', name: 'Artisan Ghee Roast Dosa Platter', cuisine: 'South Indian', dietary: 'veg', price: 380, servingTime: '07:00 - 10:30', category: 'Breakfast' },
          { id: 'dish-3', name: 'Paneer Malai Tikka', cuisine: 'North Indian', dietary: 'veg', price: 490, servingTime: '19:00 - 23:00', category: 'Dinner' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-gr-1',
        code: 'SUMMER20',
        title: 'Grand City Retreat - 20% Off',
        description: 'Enjoy 20% off room rate plus complimentary artisanal breakfast for 2 registered guests.',
        discountPercent: 20,
        maxDiscount: 2500,
        badge: 'Best Seller Deal',
        perkDescription: 'Includes late 14:00 checkout & 20% luxury spa discount voucher',
        minNights: 2,
        validUntil: '30 Nov 2026',
        isActive: true
      },
      {
        id: 'off-gr-2',
        code: 'WEEKENDCH',
        title: 'Chennai Weekend Special - 15% Off',
        description: 'Book 2+ nights weekend stay and enjoy flat 15% instant savings.',
        discountPercent: 15,
        maxDiscount: 1800,
        badge: 'Weekend Getaway',
        perkDescription: 'Complimentary evening signature mocktail at rooftop lounge',
        validUntil: '15 Dec 2026',
        isActive: true
      }
    ],
    isFeatured: true
  },
  {
    id: 'htl-002',
    slug: 'taj-exotica-resort-goa',
    name: 'Azurra Palms Beach Resort',
    category: 'resort',
    propertyType: 'Resort',
    starRating: 5,
    tagline: 'Sun-drenched Mediterranean luxury nestled along Goa’s pristine coastline',
    description: 'Spread over 56 tranquil acres on Benaulim Beach, Azurra Palms offers sea-facing luxury villas, an Olympic-sized freshwater pool, oceanfront cabanas, and private beach dining.',
    address: 'Benaulim Beach Road, South Goa',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    pincode: '403716',
    coordinates: { lat: 15.2532, lng: 73.9248 },
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Direct Private Beach Access',
      'Lagoon & Olympic Swimming Pools',
      'Water Sports & Jet Ski',
      'Ayurvedic Sanctuary',
      'Kids Beach Club & Arcades',
      'Tennis & Pickleball Courts',
      'Beachside Sunset Bar'
    ],
    rating: 4.9,
    reviewCount: 512,
    startingPrice: 6500,
    checkInTime: '15:00',
    checkOutTime: '12:00',
    policies: [
      'Valid passport or government photo ID required',
      'Cancellations allowed up to 7 days before high-season check-in',
      'Eco-friendly resort: plastic-free property zone'
    ],
    roomTypes: [
      {
        id: 'room-az-villa',
        hotelId: 'htl-002',
        name: 'Ocean Breeze Villa',
        category: 'Deluxe Room',
        description: 'Private 550 sq.ft villa with direct veranda walkout to the manicured palm gardens and beach shores.',
        photos: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 6500,
        roomSizeSqFt: 550,
        bedType: '1 King Bed + Daybed',
        maxAdults: 2,
        maxChildren: 2,
        maxExtraBeds: 1,
        extraPersonFee: 1800,
        totalInventoryUnits: 10,
        availableUnits: 7,
        amenities: ['Sea View', 'Private Patio', 'Hammock', 'Outdoor Rain Shower', 'Minibar Complimentary Water'],
        mealPlans: [
          {
            id: 'mp-az-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Room only stay.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-az-2',
            code: 'BB',
            name: 'Tropical Breakfast Included',
            regionalName: 'Continental Plan (CP)',
            description: 'Buffet breakfast with fresh tropical fruits, organic juices, Goan treats and continental live counters.',
            includedMeals: ['breakfast'],
            pricePerNight: 700,
            isPopular: true
          },
          {
            id: 'mp-az-3',
            code: 'HB',
            name: 'Half Board (Breakfast + Beach Dinner)',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Daily breakfast plus oceanfront seafood barbecue or vegetarian dinner spread.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 2100
          },
          {
            id: 'mp-az-4',
            code: 'AI',
            name: 'All-Inclusive Luxury Resort Plan',
            regionalName: 'All-Inclusive (AI)',
            description: 'Breakfast, lunch, sunset tea, dinner, beach snacks and selected non-alcoholic & alcoholic beverages.',
            includedMeals: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'],
            pricePerNight: 3900,
            badge: 'Best Value'
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 3,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 3 days before check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-az-1',
        name: 'The Fisherman’s Wharf Coastal Grill',
        cuisineType: 'Goan, Seafood & Continental',
        timings: '11:00 - 23:30',
        location: 'Beachfront Deck',
        featuredDishes: [
          { id: 'dish-az-1', name: 'Goan Prawn Curry with Rice', cuisine: 'Goan', dietary: 'non-veg', price: 750, servingTime: '12:30 - 23:00', category: 'Lunch' },
          { id: 'dish-az-2', name: 'Wood-fired Mushroom Truffle Pizza', cuisine: 'Italian', dietary: 'veg', price: 620, servingTime: '12:30 - 23:00', category: 'Dinner' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-az-1',
        code: 'AURARESORT',
        title: 'Coastal Sunset Escape - 15% Off',
        description: 'Unwind along Benaulim Beach with 15% savings on all ocean view villas.',
        discountPercent: 15,
        maxDiscount: 3500,
        badge: 'Beachfront Deal',
        perkDescription: 'Free beach cabana setup & sunset mocktails for 2',
        minNights: 2,
        validUntil: '31 Dec 2026',
        isActive: true
      },
      {
        id: 'off-az-2',
        code: 'GOAALLINC',
        title: 'All-Inclusive Privilege - 20% Off',
        description: 'Save 20% when reserving the All-Inclusive meal plan package.',
        discountPercent: 20,
        maxDiscount: 5000,
        badge: 'Exclusive',
        perkDescription: 'Unlimited cocktails & complimentary airport transfers',
        validUntil: '20 Dec 2026',
        isActive: true
      }
    ],
    isFeatured: true
  },
  {
    id: 'htl-003',
    slug: 'bloom-hub-express-bengaluru',
    name: 'Bloom Express Urban Hub',
    category: 'budget',
    propertyType: 'Hotel',
    starRating: 3,
    tagline: 'Crisp, modern, affordable city stay near Indiranagar',
    description: 'Designed for the smart, modern traveler who desires high-speed Wi-Fi, cloud-comfort beds, refreshing power showers, and instant digital check-ins without paying for unneeded frills.',
    address: '100ft Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pincode: '560038',
    coordinates: { lat: 12.9716, lng: 77.6412 },
    heroImage: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Gigabit Fiber Wi-Fi',
      'Co-Working Pods',
      'Self-Service Laundry',
      'Express Cafe & Grab-and-Go',
      '24/7 Security & CCTV',
      'Daily Housekeeping'
    ],
    rating: 4.4,
    reviewCount: 420,
    startingPrice: 1800,
    checkInTime: '13:00',
    checkOutTime: '11:00',
    policies: [
      'Local IDs accepted with valid address proof',
      'Free cancellation up to 24 hours prior to arrival',
      'Quiet hours observed after 22:30'
    ],
    roomTypes: [
      {
        id: 'room-bl-std',
        hotelId: 'htl-003',
        name: 'Standard Queen Room',
        category: 'Standard Room',
        description: 'Compact 220 sq.ft smartly engineered room with custom pocket-spring mattress, blackout blinds, and work desk.',
        photos: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 1800,
        roomSizeSqFt: 220,
        bedType: '1 Queen Bed',
        maxAdults: 2,
        maxChildren: 1,
        maxExtraBeds: 0,
        extraPersonFee: 600,
        totalInventoryUnits: 25,
        availableUnits: 19,
        amenities: ['43-inch Smart TV', 'In-room Safe', 'Tea/Coffee Maker', 'Rain Shower', 'Desk Workstation'],
        mealPlans: [
          {
            id: 'mp-bl-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Bed & clean room only.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-bl-2',
            code: 'BB',
            name: 'Express Breakfast',
            regionalName: 'Continental Plan (CP)',
            description: 'Hot breakfast buffet: Idli, Vada, Poha, Sandwiches, Tea & artisanal filter coffee.',
            includedMeals: ['breakfast'],
            pricePerNight: 250,
            isPopular: true
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 1,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 24 hours prior to check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-bl-1',
        name: 'Bloom All-Day Cafe',
        cuisineType: 'Fast Casual & Coffee',
        timings: '07:00 - 22:30',
        location: 'Ground Floor Lobby',
        featuredDishes: [
          { id: 'dish-bl-1', name: 'Filter Kaapi & Mysore Masala Dosa', cuisine: 'South Indian', dietary: 'veg', price: 180, servingTime: '07:00 - 11:00', category: 'Breakfast' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-bl-1',
        code: 'BLOOMFAST',
        title: 'Smart Tech City Saver - 15% Off',
        description: 'Instant 15% savings on all stays for modern business & leisure guests.',
        discountPercent: 15,
        maxDiscount: 600,
        badge: 'Budget Saver',
        perkDescription: 'Includes free high-speed fiber Wi-Fi & artisanal filter coffee pass',
        validUntil: '30 Nov 2026',
        isActive: true
      }
    ]
  },
  {
    id: 'htl-004',
    slug: 'leela-palace-udaipur',
    name: 'The Lakeview Palace & Spa',
    category: 'luxury',
    propertyType: 'Heritage Haveli',
    starRating: 5,
    tagline: 'Fairy-tale royal heritage overlooking the shimmering waters of Lake Pichola',
    description: 'A benchmark of regal hospitality in Rajasthan, boasting grand courtyards, gold-leaf domed ceilings, arrival via ceremonial boat, and private butler service for every guest.',
    address: 'Pichola, Lake Pichola Waterfront',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    pincode: '313001',
    coordinates: { lat: 24.5764, lng: 73.6835 },
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Ceremonial Boat Arrival Transfer',
      'Heated Palace Swimming Pool',
      'Royal Spa by ESPA',
      'Private Butler Service 24/7',
      'Heritage Folk & Dance Performances',
      'Astrology & Palmistry Sessions'
    ],
    rating: 4.95,
    reviewCount: 630,
    startingPrice: 12500,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: [
      'Valid passport or Aadhaar mandatory for check-in',
      'Free cancellation up to 5 days prior to arrival'
    ],
    roomTypes: [
      {
        id: 'room-lp-suite',
        hotelId: 'htl-004',
        name: 'Maharaja Royal Lakeview Suite',
        category: 'Suite / Presidential Suite',
        description: 'Spectacular 950 sq.ft suite with ornate jharokha bay windows looking out over Lake Pichola and the City Palace.',
        photos: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 12500,
        roomSizeSqFt: 950,
        bedType: '1 Custom Royal Four-Poster Bed',
        maxAdults: 2,
        maxChildren: 1,
        maxExtraBeds: 1,
        extraPersonFee: 2500,
        totalInventoryUnits: 5,
        availableUnits: 3,
        amenities: ['Direct Lake Pichola View', 'Jacuzzi with Lake View', 'Private Butler', 'Champagne on Arrival', 'Fine Silk Linen'],
        mealPlans: [
          {
            id: 'mp-lp-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Room only accommodation.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-lp-2',
            code: 'BB',
            name: 'Royal Heritage Breakfast',
            regionalName: 'Continental Plan (CP)',
            description: 'Sumptuous multi-course breakfast served at the lakefront terrace with live sitar music.',
            includedMeals: ['breakfast'],
            pricePerNight: 1200,
            isPopular: true
          },
          {
            id: 'mp-lp-3',
            code: 'HB',
            name: 'Royal Half Board (Bfast + Candlelight Thali)',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Breakfast plus a 14-course authentic Mewari Royal Thali under starlit skies.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 3500
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 5,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 5 days before check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-lp-1',
        name: 'Sheesh Mahal (Palace of Mirrors)',
        cuisineType: 'Royal Rajasthani Fine Dining',
        timings: '19:00 - 23:30',
        location: 'Rooftop Open Terrace',
        featuredDishes: [
          { id: 'dish-lp-1', name: 'Dal Baati Churma with Pure Ghee', cuisine: 'Rajasthani', dietary: 'veg', price: 950, servingTime: '19:00 - 23:00', category: 'Dinner' },
          { id: 'dish-lp-2', name: 'Laal Maas (Smoked Lamb Curry)', cuisine: 'Rajasthani', dietary: 'non-veg', price: 1250, servingTime: '19:00 - 23:00', category: 'Dinner' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-lp-1',
        code: 'ROYAL25',
        title: 'Regal Lake Palace Privilege - 25% Off',
        description: 'Immerse in royal heritage on Lake Pichola with 25% savings on royal suites.',
        discountPercent: 25,
        maxDiscount: 6000,
        badge: 'Palace Royalty',
        perkDescription: 'Ceremonial boat arrival transfer, champagne welcome & 30-min spa massage',
        minNights: 2,
        validUntil: '25 Dec 2026',
        isActive: true
      }
    ],
    isFeatured: true
  },
  {
    id: 'htl-005',
    slug: 'hyatt-centric-cybercity-gurugram',
    name: 'Nexus Horizon Business Hotel',
    category: 'business',
    propertyType: 'Business Hotel',
    starRating: 5,
    tagline: 'High-tech efficiency meets executive luxury in the corporate epicenter',
    description: 'Adjoining Cyber City and Rapid Metro, Nexus Horizon features ergonomic sound-proof executive rooms, rapid express laundry, 24/7 business center with video conferencing suites, and a skyline cocktail bar.',
    address: 'DLF Phase 2, Sector 24, Cyber City',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    pincode: '122002',
    coordinates: { lat: 28.4908, lng: 77.0874 },
    heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Direct Skywalk to Rapid Metro',
      'Soundproof Executive Studios',
      'Conference & Boardroom Access',
      'Herman Miller Ergonomic Chairs',
      '24/7 International Coffee Bar',
      'Express Valet & Dry Cleaning'
    ],
    rating: 4.7,
    reviewCount: 310,
    startingPrice: 5200,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: [
      'Corporate GST invoices available on demand',
      'Same-day cancellation allowed up to 18:00 on check-in day for Corporate Tier'
    ],
    roomTypes: [
      {
        id: 'room-nx-exec',
        hotelId: 'htl-005',
        name: 'Executive Business King',
        category: 'Executive Room',
        description: 'Modern 380 sq.ft room with acoustic insulation, dual monitors connectivity, high-speed wired Ethernet, and steam iron station.',
        photos: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 5200,
        roomSizeSqFt: 380,
        bedType: '1 King Bed',
        maxAdults: 2,
        maxChildren: 1,
        maxExtraBeds: 1,
        extraPersonFee: 1400,
        totalInventoryUnits: 30,
        availableUnits: 22,
        amenities: ['Ergonomic Workspace', 'Fast USB-C Charging Hubs', 'Coffee Machine', 'Iron & Board', 'Smart Safe'],
        mealPlans: [
          {
            id: 'mp-nx-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Room only rate.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-nx-2',
            code: 'BB',
            name: 'Executive Power Breakfast',
            regionalName: 'Continental Plan (CP)',
            description: 'Expansive hot breakfast buffet opening early at 06:30 AM with barista coffees and egg station.',
            includedMeals: ['breakfast'],
            pricePerNight: 550,
            isPopular: true
          },
          {
            id: 'mp-nx-3',
            code: 'HB',
            name: 'Corporate Half Board (Bfast + Dinner)',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Breakfast and dinner buffet tailored for business travelers returning late.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 1650
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 1,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 24 hours prior to check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-nx-1',
        name: 'The Silicon Grill & Bistro',
        cuisineType: 'Modern European & Global',
        timings: '06:30 - 23:30',
        location: 'Level 2',
        featuredDishes: [
          { id: 'dish-nx-1', name: 'Smoked Salmon Avocado Benedict', cuisine: 'European', dietary: 'non-veg', price: 550, servingTime: '06:30 - 11:00', category: 'Breakfast' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-nx-1',
        code: 'CORPEXEC',
        title: 'Business Elite Advantage - 18% Off',
        description: '18% discount tailored for business travellers staying near Cyber City.',
        discountPercent: 18,
        maxDiscount: 2200,
        badge: 'Business Special',
        perkDescription: 'Includes express 2-piece laundry & 1-hour boardroom access',
        validUntil: '15 Dec 2026',
        isActive: true
      }
    ]
  },
  {
    id: 'htl-006',
    slug: 'marina-bay-haven-mumbai',
    name: 'The Bayview Regency',
    category: 'luxury',
    propertyType: 'Hotel',
    starRating: 5,
    tagline: 'Timeless Art Deco grandeur fronting the Arabian Sea promenade',
    description: 'Directly overlooking Marine Drive and the Queen’s Necklace, The Bayview Regency features vintage chandeliers, harbor-view suites, sea-facing afternoon teas, and easy proximity to South Mumbai art galleries.',
    address: 'Marine Drive, Churchgate',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pincode: '400020',
    coordinates: { lat: 18.9322, lng: 72.8264 },
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Unobstructed Arabian Sea Views',
      'Harbor View Infinity Pool',
      'Art Deco Cocktail Lounge',
      'Limousine City Transfers',
      '24/7 In-Room Dining',
      'Steam & Sauna Wellness Suite'
    ],
    rating: 4.88,
    reviewCount: 478,
    startingPrice: 8500,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: [
      'Photo ID mandatory at check-in',
      'Free cancellation up to 48 hours before check-in date'
    ],
    roomTypes: [
      {
        id: 'room-bv-sea',
        hotelId: 'htl-006',
        name: 'Sea View Premier Room',
        category: 'Deluxe Room',
        description: 'Graceful 460 sq.ft room with floor-to-ceiling panoramic windows framing the Arabian Sea sunset.',
        photos: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
        ],
        basePricePerNight: 8500,
        roomSizeSqFt: 460,
        bedType: '1 King Bed',
        maxAdults: 2,
        maxChildren: 1,
        maxExtraBeds: 1,
        extraPersonFee: 2000,
        totalInventoryUnits: 14,
        availableUnits: 8,
        amenities: ['Direct Sea View', 'High-Speed Wi-Fi', 'Marble Bath with Tub', 'Bose Sound System'],
        mealPlans: [
          {
            id: 'mp-bv-1',
            code: 'RO',
            name: 'Room Only',
            regionalName: 'European Plan (EP)',
            description: 'Room accommodation only.',
            includedMeals: [],
            pricePerNight: 0
          },
          {
            id: 'mp-bv-2',
            code: 'BB',
            name: 'Breakfast by the Sea',
            regionalName: 'Continental Plan (CP)',
            description: 'Breakfast buffet with French pastries, dim sums, dosas and fresh coconuts.',
            includedMeals: ['breakfast'],
            pricePerNight: 850,
            isPopular: true
          },
          {
            id: 'mp-bv-3',
            code: 'HB',
            name: 'Half Board (Breakfast + Sea Sunset Dinner)',
            regionalName: 'Modified American Plan (MAP)',
            description: 'Breakfast plus 4-course dinner by the sea terrace.',
            includedMeals: ['breakfast', 'dinner'],
            pricePerNight: 2400
          }
        ],
        cancellationPolicy: {
          freeCancellationBeforeDays: 2,
          penaltyPercentage: 100,
          description: 'Free cancellation up to 48 hours prior to check-in.'
        }
      }
    ],
    restaurants: [
      {
        id: 'rest-bv-1',
        name: 'The Queen’s Terrace',
        cuisineType: 'Seafood, Italian & Coastal',
        timings: '12:00 - 00:00',
        location: 'Level 8 Sea Facing',
        featuredDishes: [
          { id: 'dish-bv-1', name: 'Bombay Duck Crisp Fry & Prawn Curry', cuisine: 'Coastal', dietary: 'non-veg', price: 820, servingTime: '12:30 - 23:30', category: 'Dinner' }
        ]
      }
    ],
    offers: [
      {
        id: 'off-bv-1',
        code: 'MARINEDRIVE',
        title: 'Marine Drive Sunset Romance - 20% Off',
        description: '20% off sea-facing premier rooms with views of the Arabian Sea.',
        discountPercent: 20,
        maxDiscount: 4000,
        badge: 'Sea Facing Special',
        perkDescription: 'Complimentary sunset afternoon high tea & fruit platter on arrival',
        validUntil: '31 Dec 2026',
        isActive: true
      }
    ]
  }
];

