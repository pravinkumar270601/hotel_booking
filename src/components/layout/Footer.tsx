import React from 'react';
import { Hotel as HotelIcon, Shield, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold">
                <HotelIcon className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Aura<span className="text-amber-400 font-sans font-light">Stays</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Curating exceptional properties across India and beyond. Distinct hotel categories, configurable room suites, transparent dining meal plans, and instant digital check-ins.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg text-amber-400">
                <Shield className="w-3.5 h-3.5" /> 100% Verified Properties
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" /> Best Rate Guarantee
              </span>
            </div>
          </div>

          {/* Hotel Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Hotel Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link to="/search" className="hover:text-amber-400 transition-colors">Luxury Hotels & Palaces</Link></li>
              <li><Link to="/search" className="hover:text-amber-400 transition-colors">Coastal & Hill Resorts</Link></li>
              <li><Link to="/search" className="hover:text-amber-400 transition-colors">Premium Business Hotels</Link></li>
              <li><Link to="/search" className="hover:text-amber-400 transition-colors">Heritage Havelis & Villas</Link></li>
              <li><Link to="/search" className="hover:text-amber-400 transition-colors">Budget & Smart Express</Link></li>
            </ul>
          </div>

          {/* Meal Plans Explained */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Meal Plan Plans
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><span className="text-white font-medium">Room Only</span> (EP - European)</li>
              <li><span className="text-white font-medium">Bed & Breakfast</span> (CP - Continental)</li>
              <li><span className="text-white font-medium">Half Board</span> (MAP - Bfast + Dinner)</li>
              <li><span className="text-white font-medium">Full Board</span> (AP - All 3 Meals)</li>
              <li><span className="text-white font-medium">All-Inclusive</span> (Meals + Beverages)</li>
            </ul>
          </div>

          {/* Quick Concierge Support */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              24/7 Concierge
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+91 (044) 4920-8000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>concierge@aurastays.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-1" />
                <span>Nungambakkam High Rd, Chennai, TN, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 AuraStays Hospitality Network Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Booking</span>
            <span className="hover:text-stone-300 cursor-pointer">Cancellation & Refunds</span>
            <span className="hover:text-stone-300 cursor-pointer">Hotel Partner Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

