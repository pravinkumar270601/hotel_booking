import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  MapPin, 
  Search, 
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDestination, setDates, setGuestsAndRooms } from '../../features/search/searchSlice';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;

interface FeaturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  frameTarget: number;
  destination: string;
  buttonText: string;
}

const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'resorts',
    title: 'MGM Beach Resorts & Luxury Stays',
    subtitle: '5-Star Beachfront Hospitality',
    description: 'Making every stay special with genuine hospitality, thoughtful service, and reliable comfort, creating memorable luxury experiences across every touchpoint.',
    thumbnail: '/thumbnails/thumb-1.jpg',
    frameTarget: 1,
    destination: 'Goa',
    buttonText: 'EXPLORE OUR RESORTS'
  },
  {
    id: 'theme-park',
    title: 'MGM Dizzee World',
    subtitle: 'Entertainment & High-Thrill Fun',
    description: 'Making every stay special with genuine hospitality, thoughtful service, and reliable comfort, creating memorable experiences across every touchpoint in entertainment',
    thumbnail: '/thumbnails/thumb-2.jpg',
    frameTarget: 80,
    destination: 'Chennai',
    buttonText: 'EXPLORE OUR BUSINESSES'
  },
  {
    id: 'dining',
    title: 'MGM Gourmet Spirits & Dining',
    subtitle: 'Artisanal Spirits & Multi-Cuisine',
    description: 'Making every meal memorable with chef-crafted menus, private distillery reserves, and authentic coastal dining experiences across all our venues.',
    thumbnail: '/thumbnails/thumb-3.jpg',
    frameTarget: 160,
    destination: 'Mumbai',
    buttonText: 'EXPLORE DINING PLANS'
  },
  {
    id: 'fleet',
    title: 'MGM Fleet Logistics & Valet',
    subtitle: 'Luxury Transit & Commercial Transport',
    description: 'Making every journey smooth with verified chauffeur airport shuttles, luxury coach transfers, and dependable logistics for uninterrupted comfort.',
    thumbnail: '/thumbnails/thumb-4.jpg',
    frameTarget: 260,
    destination: 'Bengaluru',
    buttonText: 'EXPLORE OUR FLEET'
  }
];

export const CinematicSequenceHero: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  // Default to pillar 1 (MGM Dizzee World) matching the user reference screenshot
  const [activePillar, setActivePillar] = useState<number>(1);
  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Search state
  const [dest, setDest] = useState<string>(searchState.destination);
  const [checkIn, setCheckIn] = useState<string>(searchState.checkIn);
  const [checkOut, setCheckOut] = useState<string>(searchState.checkOut);
  const [adults, setAdults] = useState<number>(searchState.adults);
  const [rooms, setRooms] = useState<number>(searchState.rooms);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Helper: draw frame into canvas in cover mode (declared before use)
  const renderFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const imgRatio = (img.naturalWidth || 1280) / (img.naturalHeight || 720);
    const canvasRatio = w / h;

    let drawWidth = w;
    let drawHeight = h;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = w / imgRatio;
      offsetY = (h - drawHeight) / 2;
    } else {
      drawWidth = h * imgRatio;
      offsetX = (w - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 1. Preload 300 sequence frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/hero-sequence/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loaded++;
        setImagesLoadedCount(loaded);
        if (i === 1) {
          // Render initial frame immediately once ready
          renderFrame(img);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.length = 0;
    };
  }, [renderFrame]);

  // 2. Setup GSAP ScrollTrigger Sequence Scrubbing
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const firstImg = imagesRef.current[0];
      if (firstImg && firstImg.complete) {
        renderFrame(firstImg);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const pIdx = Math.min(3, Math.floor(progress * 4));
            setActivePillar(pIdx);
          }
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // Scrub frame sequence smoothly
      tl.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        duration: 3,
        onUpdate: () => {
          const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(frameObj.frame));
          const currentImg = imagesRef.current[frameIndex];
          if (currentImg && currentImg.complete) {
            renderFrame(currentImg);
          } else {
            // Find closest loaded frame if current isn't yet ready
            for (let offset = 1; offset < 15; offset++) {
              const prev = imagesRef.current[Math.max(0, frameIndex - offset)];
              if (prev && prev.complete) {
                renderFrame(prev);
                break;
              }
            }
          }
        }
      });

      tl.fromTo(
        textOverlayRef.current,
        { opacity: 1 },
        { opacity: 0.95, duration: 1.5 },
        0
      );
    }, container);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [renderFrame]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setDestination(dest));
    dispatch(setDates({ checkIn, checkOut }));
    dispatch(setGuestsAndRooms({ adults, children: searchState.children, rooms }));
    setShowSearchModal(false);
    navigate('/search');
  };

  const handleSelectPillar = (index: number) => {
    setActivePillar(index);
    const pillar = FEATURE_PILLARS[index];
    dispatch(setDestination(pillar.destination));

    // Immediately render targeted frame on canvas
    const targetImg = imagesRef.current[pillar.frameTarget - 1];
    if (targetImg && targetImg.complete) {
      renderFrame(targetImg);
    }

    if (scrollTriggerRef.current && containerRef.current) {
      const targetProgress = index * 0.25 + 0.05;
      const start = scrollTriggerRef.current.start;
      const end = scrollTriggerRef.current.end;
      const targetScroll = start + (end - start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const currentPillar = FEATURE_PILLARS[activePillar];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-stone-950 overflow-hidden select-none font-sans">
      {/* 1. HTML5 Canvas scrubbing video image sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Subtle vignette/contrast overlay so white typography pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/40 z-10 pointer-events-none" />

      {/* 2. Bottom-Left Hero Content (Exact MGM screenshot match) */}
      <div
        ref={textOverlayRef}
        className="absolute bottom-12 sm:bottom-16 left-6 sm:left-14 z-20 max-w-xl text-white space-y-4"
      >
        <h1 className="font-sans text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg">
          {currentPillar.title}
        </h1>

        <p className="text-xs sm:text-sm text-stone-100 leading-relaxed font-normal max-w-lg drop-shadow-md">
          {currentPillar.description}
        </p>

        {/* Pill Shaped White CTA Button with Red Circle Chevron (Exact match) */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            to="/search"
            className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-stone-950 pl-6 pr-2 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl group transition-all"
          >
            <span>{currentPillar.buttonText}</span>
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-md font-bold">
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Rooms & Dining Plans</span>
          </button>
        </div>
      </div>

      {/* 3. Bottom-Right 4 Mini Thumbnail Cards from Sequence */}
      <div className="absolute bottom-10 sm:bottom-14 right-6 sm:right-14 z-20 hidden md:flex items-center gap-3.5">
        {FEATURE_PILLARS.map((pillar, idx) => {
          const isActive = activePillar === idx;

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => handleSelectPillar(idx)}
              className={`relative rounded-2xl overflow-hidden w-32 h-20 sm:w-34 sm:h-21 border-2 transition-all duration-300 shadow-2xl group cursor-pointer text-left ${
                isActive
                  ? 'border-white ring-4 ring-white/40 scale-105 opacity-100 z-10 shadow-black/80'
                  : 'border-white/50 opacity-80 hover:opacity-100 hover:border-white hover:scale-102'
              }`}
            >
              <img
                src={pillar.thumbnail}
                alt={pillar.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              {isActive && (
                <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white shadow-md animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Subtle Scroll Hint Indicator at Center Bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] text-stone-300 font-semibold uppercase tracking-widest bg-stone-950/70 backdrop-blur-md px-4 py-1 rounded-full border border-stone-800">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Scroll to animate video sequence ({imagesLoadedCount}/300 frames)</span>
      </div>

      {/* Quick Search Modal Popover */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Search Hotels, Resorts & Park Stays
                  </h3>
                  <p className="text-xs text-stone-500">MGM & AuraStays verified hospitality</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                  Destination City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    placeholder="Chennai, Goa, Bengaluru, Udaipur, Mumbai..."
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Guests (Adults)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:outline-hidden text-xs"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Rooms Count
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:outline-hidden text-xs"
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Rooms</option>
                    <option value={3}>3 Rooms</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 rounded-xl font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search Available Hotels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
