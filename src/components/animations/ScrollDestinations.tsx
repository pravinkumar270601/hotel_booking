import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setDestination } from '../../features/search/searchSlice';

gsap.registerPlugin(ScrollTrigger);

const POPULAR_DESTINATIONS = [
  {
    city: 'Goa',
    tagline: 'Pristine Beaches & Luxury Resorts',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '18 Stays',
    badge: 'Popular'
  },
  {
    city: 'Udaipur',
    tagline: 'Royal Palaces & Lake Pichola',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '12 Stays',
    badge: 'Heritage'
  },
  {
    city: 'Chennai',
    tagline: 'Cultural Heritage & Coastal Suites',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '24 Stays',
    badge: 'Urban Luxury'
  },
  {
    city: 'Mumbai',
    tagline: 'Marine Drive & Arabian Sea Views',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '30 Stays',
    badge: 'Skyline'
  },
  {
    city: 'Bengaluru',
    tagline: 'Garden City & Modern Tech Hub',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '22 Stays',
    badge: 'Business & Leisure'
  },
  {
    city: 'Gurugram',
    tagline: 'Cyber City & Executive Business Stays',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    propertiesCount: '16 Stays',
    badge: 'Corporate Hub'
  }
];

export const ScrollDestinations: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = el.querySelectorAll('.dest-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleDestinationClick = (city: string) => {
    dispatch(setDestination(city));
    navigate('/search');
  };

  return (
    <section ref={containerRef} className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Iconic Escapes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Scroll-Revealed Top Destinations
            </h2>
            <p className="text-stone-500 text-sm mt-1 max-w-lg">
              Explore hand-selected properties in India's most sought-after leisure retreats and business epicenters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.city}
              onClick={() => handleDestinationClick(dest.city)}
              className="dest-card group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-stone-700">
                {dest.badge}
              </div>

              {/* Destination Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.propertiesCount} Available</span>
                </div>
                <h3 className="font-serif text-2xl font-bold group-hover:text-amber-300 transition-colors">
                  {dest.city}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  {dest.tagline}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Hotels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

