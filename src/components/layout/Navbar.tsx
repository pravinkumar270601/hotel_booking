import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  CalendarDays, 
  UserCheck, 
  ShieldCheck, 
  Search,
  ChevronRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Hotel as HotelIcon
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveRole } from '../../features/hotels/hotelsSlice';
import { UserRole } from '../../services/storageService';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeRole = useAppSelector((state) => state.hotels.activeRole);
  const bookings = useAppSelector((state) => state.hotels.bookings);

  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeBookingsCount = bookings.filter(
    (b) => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked_in'
  ).length;

  const handleRoleChange = (role: UserRole) => {
    dispatch(setActiveRole(role));
    setShowRoleMenu(false);
  };

  // MGM Business Divisions for dropdown
  const companies = [
    { title: 'MGM Beach Resorts & Stays', subtitle: '5-Star Hospitality & Heritage', link: '/search' },
    { title: 'MGM Dizzee World', subtitle: 'Entertainment & High-Thrill Fun', link: '/search' },
    { title: 'MGM Gourmet Spirits & Dining', subtitle: 'Artisanal Spirits & Multi-Cuisine', link: '/search' },
    { title: 'MGM Fleet Logistics & Valet', subtitle: 'Luxury Transit & Valet Fleet', link: '/search' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled || !isHomePage
          ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 shadow-2xl py-3.5 px-6 sm:px-12'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-transparent py-5 px-6 sm:px-12'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 1. Brand Logo in Project Theme Color (Luxury Amber / Gold) */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform font-bold">
            <HotelIcon className="w-5 h-5 stroke-[2.3]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                Aura<span className="text-amber-400 font-sans font-light">Stays</span>
              </span>
              <span className="hidden sm:inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                MGM
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-200/80 mt-0.5">
              Hotels & Resorts · M.G. Muthu
            </span>
          </div>
        </Link>

        {/* 2. Center Nav Links with divider slashes */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-white/90 drop-shadow">
          <Link to="/" className="hover:text-amber-300 transition-colors">
            About us
          </Link>
          <span className="text-white/40 font-light">/</span>

          {/* Our companies dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowCompanyMenu(true)}
            onMouseLeave={() => setShowCompanyMenu(false)}
          >
            <button 
              type="button"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              <span>Our companies</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" />
            </button>

            {showCompanyMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-stone-900/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-stone-800 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1.5 border-b border-stone-800">
                  MGM Business Portfolio
                </div>
                {companies.map((c) => (
                  <Link
                    key={c.title}
                    to={c.link}
                    onClick={() => setShowCompanyMenu(false)}
                    className="block px-3 py-2 rounded-xl text-xs hover:bg-stone-800 transition-colors group/item"
                  >
                    <div className="font-semibold text-stone-200 group-hover/item:text-amber-300">
                      {c.title}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {c.subtitle}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span className="text-white/40 font-light">/</span>

          <Link to="/search" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
            <span>Resorts & Stays</span>
          </Link>
          <span className="text-white/40 font-light">/</span>

          {/* Role specific shortcuts or My Bookings */}
          {activeRole === 'customer' ? (
            <Link to="/my-bookings" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {activeBookingsCount}
                </span>
              )}
            </Link>
          ) : activeRole === 'hotel_owner' ? (
            <Link to="/dashboard/manager" className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Manager Console</span>
            </Link>
          ) : activeRole === 'receptionist' ? (
            <Link to="/dashboard/reception" className="text-emerald-300 hover:text-emerald-200 font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Front Desk Console</span>
            </Link>
          ) : (
            <Link to="/dashboard/admin" className="text-indigo-300 hover:text-indigo-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin Console</span>
            </Link>
          )}
        </nav>

        {/* 3. Right CTA: Role Switcher + Search + Pill CONTACT US Button in Theme Color */}
        <div className="flex items-center gap-3">
          {/* Interactive Role Switcher Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold hover:bg-black/60 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="capitalize">
                {activeRole === 'customer'
                  ? 'Customer View'
                  : activeRole === 'hotel_owner'
                  ? 'Hotel Manager'
                  : activeRole === 'receptionist'
                  ? 'Front Desk'
                  : 'Super Admin'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-300" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-stone-900/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-stone-800 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-1">
                  Switch App Role:
                </div>
                {(['customer', 'hotel_owner', 'receptionist', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      activeRole === r
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {r === 'customer'
                      ? 'Customer View'
                      : r === 'hotel_owner'
                      ? 'Hotel Manager'
                      : r === 'receptionist'
                      ? 'Front Desk / Reception'
                      : 'Super Admin'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick search button */}
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Search</span>
          </Link>

          {/* Contact Us Pill with Theme Gold Circle Arrow */}
          <Link
            to="/search"
            className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-stone-950 pl-5 pr-1.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl group transition-all"
          >
            <span>CONTACT US</span>
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-md font-bold">
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
