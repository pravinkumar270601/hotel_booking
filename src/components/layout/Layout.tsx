import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLenis } from '../../animations/useLenis';

export const Layout: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <main className={`flex-1 ${!isHomePage ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

