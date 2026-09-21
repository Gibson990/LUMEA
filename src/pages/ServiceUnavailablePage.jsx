import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

/**
 * ServiceUnavailablePage — full-page 503 error view.
 * Also exported as a component for inline usage (pass `inline` prop).
 *
 * Props:
 *   inline   {boolean} — render without Navbar/Footer (for embedding)
 *   onRetry  {Function} — custom retry handler (defaults to page reload)
 */
export default function ServiceUnavailablePage({ inline = false, onRetry }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const inner = (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 py-16 flex-1 transition-opacity duration-500 relative ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"
        style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Error code numeral */}
        <div
          className="select-none font-serif font-extrabold leading-none"
          style={{
            fontSize: 'clamp(5rem, 20vw, 10rem)',
            background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FDE68A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          503
        </div>

        {/* Icon badge */}
        <div className="w-16 h-16 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto shadow-md">
          <AlertTriangle className="w-7 h-7 text-amber-600" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full">
            Service Unavailable
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2024]">
            We'll Be Right Back
          </h1>
          <p className="text-sm text-[#6e5f65] leading-relaxed">
            Our store is temporarily down for maintenance or experiencing a
            connection issue. Please try again in a few moments.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onRetry || (() => window.location.reload())}
            className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-amber-400/25 text-xs transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          {!inline && (
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-white border border-[#F4D8DF] hover:border-[#D96C8A] text-[#2B2024] font-semibold py-3 px-6 rounded-2xl text-xs transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Go to Store</span>
            </Link>
          )}
        </div>

        {/* Status note */}
        <p className="text-[11px] text-[#6e5f65]/70 pt-2">
          If the issue persists, please{' '}
          <Link to="/support" className="text-amber-600 hover:underline font-semibold">
            contact support
          </Link>{' '}
          and we'll assist you promptly.
        </p>
      </div>
    </div>
  );

  if (inline) return inner;

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col">
      <Navbar />
      {inner}
      <Footer />
    </div>
  );
}
