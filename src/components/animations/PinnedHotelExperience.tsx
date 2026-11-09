import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, Utensils, Waves, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: 1,
    title: 'Architectural Grandeur & Arrival',
    subtitle: 'Where timeless heritage meets modern sanctuary',
    description: 'From majestic marble colonnades and ceremonial arrival ceremonies to curated botanic courtyards, every property is positioned as a breathtaking destination in itself.',
    tag: 'Property Experience',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    icon: Compass
  },
  {
    id: 2,
    title: 'Bespoke Luxury Suites & Ergonomics',
    subtitle: 'Designed for peaceful restoration and effortless focus',
    description: 'Sink into custom Simmons pocket-spring mattresses, Italian marble baths with rain showers, high-speed fiber connectivity, and panoramic balconies looking out over iconic skylines.',
    tag: 'Room & Suite Architecture',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    icon: Sparkles
  },
  {
    id: 3,
    title: 'Gastronomy & Chef Curations',
    subtitle: 'Full Board, Half Board, or Continental Breakfast included',
    description: 'Savor Michelin-caliber dining, wood-fired beach grills, authentic royal thalis, and international buffet spreads with transparent meal plan packages that eliminate billing surprises.',
    tag: 'Dining & Food Flow',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
    icon: Utensils
  },
  {
    id: 4,
    title: 'Sanctuary of Serenity & Horizon Pools',
    subtitle: 'Recharge mind, body, and spirit',
    description: 'Immerse yourself in heated Olympic infinity pools, holistic Ayurvedic wellness sanctuaries, private seaside cabanas, and 24/7 dedicated concierge assistance.',
    tag: 'Wellness & Amenities',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
    icon: Waves
  }
];

export const PinnedHotelExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${CHAPTERS.length * 900}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(
            CHAPTERS.length - 1,
            Math.floor(progress * CHAPTERS.length)
          );
          setActiveStep(step);
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const currentChapter = CHAPTERS[activeStep];
  const IconComponent = currentChapter.icon;

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-stone-950 text-white overflow-hidden flex items-center">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {CHAPTERS.map((ch, idx) => (
          <div
            key={ch.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeStep === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={ch.image}
              alt={ch.title}
              className="w-full h-full object-cover filter brightness-[0.45] transition-transform duration-1000 ease-out"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80" />
      </div>

      {/* Synchronized Pinned Content Foreground */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Chapter Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              <IconComponent className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentChapter.tag}</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                CHAPTER 0{currentChapter.id} / 0{CHAPTERS.length}
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                {currentChapter.title}
              </h2>
              <p className="text-base sm:text-lg text-amber-200/90 font-light italic">
                "{currentChapter.subtitle}"
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {currentChapter.description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/search"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Explore This Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Step Indicators & Visual Progress */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-4">
            <div className="bg-stone-900/80 backdrop-blur-md p-5 rounded-3xl border border-stone-800 space-y-3 w-full max-w-sm shadow-2xl">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Experience Timeline
              </div>
              <div className="space-y-2">
                {CHAPTERS.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                      activeStep === idx
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold shadow-xs'
                        : 'bg-stone-950/40 border-stone-800 text-stone-400 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] text-amber-400">0{ch.id}</span>
                      <span>{ch.title}</span>
                    </div>
                    {activeStep === idx && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll progress bar */}
            <div className="w-full max-w-sm h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 rounded-full"
                style={{ width: `${((activeStep + 1) / CHAPTERS.length) * 100}%` }}
              />
            </div>
            <div className="text-[11px] text-stone-400">
              Scroll down to scrub through the hospitality journey
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

