# 🏨 AuraStays — Multi-Hotel Booking & Hospitality Platform

A production-grade, full-flow multi-hotel booking web platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

![AuraStays Platform](https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80)

---

## ✨ Key Features & Architectural Layers

### 1. 3 Distinct Hospitality Layers
Unlike legacy platforms that conflate categories, AuraStays models hospitality in three distinct, configurable layers:
- **Layer 1: Hotel Market Category**: Budget / Standard, Premium Urban, 5-Star Luxury Palace, Beach & Hill Resorts, Business Hubs.
- **Layer 2: Room Category & Capacity**: Single, Double, Deluxe King, Executive Suite, Presidential Suite with max occupancy, bed configs, and live inventory tracking.
- **Layer 3: Configurable Dining Meal Plans**:
  - **Room Only (RO / EP)**: Accommodation only.
  - **Bed & Breakfast (BB / CP)**: Room + morning breakfast.
  - **Half Board (HB / MAP)**: Room + breakfast + lunch or dinner.
  - **Full Board (FB / AP)**: Room + all 3 meals (breakfast, lunch, dinner).
  - **All-Inclusive (AI)**: All meals and beverage credits included.

### 2. 🎬 Cinematic Image Sequence Hero (GSAP ScrollTrigger)
- HTML5 Canvas scrubbing across a **300-frame HD image sequence**.
- Powered by GSAP ScrollTrigger with smooth pin-and-scrub physics.
- Interactive multi-chapter navigation with thumbnail previews synchronized to specific sequence chapters.

### 3. 👥 Multi-Role Dashboard Architecture
Interactive instant role switcher for testing end-to-end user journeys:
- **Customer View**: Search hotels, filter by star ratings, meal plans, amenities; room selection, transparent billing, coupon codes, and booking confirmation.
- **Hotel Manager Console**: Manage room types, daily base rates, meal plan supplement pricing, and active occupancy rates.
- **Reception / Front Desk**: Real-time guest arrivals, digital check-in/check-out verification, voucher lookup, and QR pass generation.
- **Super Admin Console**: Platform analytics, commission metrics, verified hotel inventory management, and platform-wide promo campaigns.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit (Search filters, Hotels inventory, Active Bookings, User Roles)
- **Animations**: GSAP (ScrollTrigger, Pinning, Scrubbing) + Lenis (Momentum smooth scroll)
- **Icons**: Lucide React
- **Validation & Forms**: React Hook Form + Zod
- **Linter**: Oxlint

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/pravinkumar270601/hotel_booking.git

# Navigate into the project folder
cd hotel_booking

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
This project is licensed under the MIT License.
