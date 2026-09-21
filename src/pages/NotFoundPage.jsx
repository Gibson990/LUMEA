import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Tiny fade-in on mount
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col">
      <Navbar />

      <main
        className={`flex-1 flex flex-col items-center justify-center text-center px-4 py-16 transition-opacity duration-500 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Decorative glow blob */}
        <div
          aria-hidden="true"
          className="absolute w-72 h-72 rounded-full bg-[#D96C8A]/15 blur-3xl pointer-events-none"
          style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        <div className="relative z-10 max-w-md mx-auto space-y-6">
          {/* Giant gradient 404 numeral */}
          <div className="error-code select-none">404</div>

          {/* Icon badge */}
          <div className="w-16 h-16 bg-white border-2 border-[#F4D8DF] rounded-full flex items-center justify-center mx-auto shadow-md">
            <Search className="w-7 h-7 text-[#D96C8A]" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2024]">
              Page Not Found
            </h1>
            <p className="text-sm text-[#6e5f65] leading-relaxed">
              The page you're looking for doesn't exist, may have moved,
              or perhaps the URL was typed incorrectly.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-[#D96C8A] hover:bg-[#c45775] active:scale-95 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-[#D96C8A]/25 text-xs transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
            <Link
              to="/track-order"
              className="inline-flex items-center justify-center space-x-2 bg-white border border-[#F4D8DF] hover:border-[#D96C8A] text-[#2B2024] font-semibold py-3 px-6 rounded-2xl text-xs transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Track My Order</span>
            </Link>
          </div>

          {/* Hint */}
          <p className="text-[11px] text-[#6e5f65]/70 pt-2">
            If this keeps happening, please{' '}
            <Link to="/support" className="text-[#D96C8A] hover:underline font-semibold">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
