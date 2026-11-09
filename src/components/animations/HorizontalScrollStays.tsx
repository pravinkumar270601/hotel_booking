import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_CAROUSEL_STAYS = [
  {
    id: 'stay-1',
    hotelId: 'htl-004',
    name: 'Maharaja Royal Lakeview Suite',
    hotelName: 'The Lakeview Palace & Spa',
    location: 'Lake Pichola, Udaipur',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Royal Heritage',
    rating: 4.95,
    price: 12500,
    perk: 'Ceremonial Boat Arrival & Butler'
  },
  {
    id: 'stay-2',
    hotelId: 'htl-002',
    name: 'Ocean Breeze Beachfront Villa',
    hotelName: 'Azurra Palms Beach Resort',
    location: 'Benaulim Coast, South Goa',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    tag: 'Beach Resort',
    rating: 4.9,
    price: 6500,
    perk: 'Direct Private Shore Access'
  },
  {
    id: 'stay-3',
    hotelId: 'htl-001',
    name: 'Executive Club Luxury Suite',
    hotelName: 'The Grand Residency & Spa',
    location: 'Nungambakkam, Chennai',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    tag: '5-Star Luxury',
    rating: 4.8,
    price: 7500,
    perk: 'Club Lounge & Champagne Breakfast'
  },
  {
    id: 'stay-4',
    hotelId: 'htl-006',
    name: 'Sea View Premier Grand Room',
    hotelName: 'The Bayview Regency',
    location: 'Marine Drive Promenade, Mumbai',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sea Promenade',
    rating: 4.88,
    price: 8500,
    perk: 'Queen’s Necklace Sunset View'
  },
  {
    id: 'stay-5',
    hotelId: 'htl-005',
    name: 'Executive Soundproof Studio',
    hotelName: 'Nexus Horizon Business Hotel',
    location: 'Cyber City, Gurugram',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    tag: 'Business Tech',
    rating: 4.7,
    price: 5200,
    perk: 'Ergonomic Workspace & Gigabit WiFi'
  }
];

export const HorizontalScrollStays: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 120;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-stone-900 text-white overflow-hidden flex flex-col justify-center">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated Stays Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Signature Suites & Private Villas
            </h2>
          </div>
          <div className="text-xs text-stone-400">
            Scroll vertically to traverse our luxury suite collection →
          </div>
        </div>
      </div>

      {/* Horizontal Traveling Track */}
      <div className="w-full overflow-hidden flex-1 flex items-center">
        <div ref={trackRef} className="flex gap-6 pl-4 sm:pl-8 lg:pl-16 pr-24 will-change-transform">
          {FEATURED_CAROUSEL_STAYS.map((stay) => (
            <div
              key={stay.id}
              className="w-[320px] sm:w-[420px] bg-stone-850 rounded-3xl overflow-hidden border border-stone-700/80 shadow-2xl shrink-0 group flex flex-col justify-between"
            >
              {/* Image with Tag & Rating */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-stone-700">
                  {stay.tag}
                </div>

                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs font-bold text-white">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{stay.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {stay.perk}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-stone-400 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{stay.location}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {stay.name}
                  </h3>
                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {stay.hotelName}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-stone-400">Nightly Rate</div>
                    <div className="text-xl font-bold font-serif text-amber-300">
                      {formatCurrency(stay.price)}
                    </div>
                  </div>

                  <Link
                    to={`/hotel/${stay.hotelId}`}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

