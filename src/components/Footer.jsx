import React from 'react';
import { Instagram, Twitter, Heart, PackageCheck, LifeBuoy, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Footer — fully routed.
 *
 * Anchor links (#shop, #specs, etc.) work from any page:
 *  - If already on "/", they scroll to the section hash.
 *  - From any other page they navigate to "/#hash" so React Router
 *    lands on Home and the browser scrolls to the element.
 *
 * Social icons are placeholder-only (no external URLs yet).
 */
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  /** Navigate to a home-page section hash from any route */
  const handleSectionLink = (e, hash) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already home — just scroll to the anchor
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Go to home page; browser will scroll to hash after mount
      navigate('/' + hash);
    }
  };

  /** Social icon click — no real URL yet, prevent page-jump */
  const handleSocialClick = (e) => {
    e.preventDefault();
    // TODO: wire up real social profile URLs
  };

  return (
    <footer className="bg-[#2B2024] text-white pt-16 pb-10 border-t border-[#D96C8A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* ① Brand column */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-white group-hover:text-[#D96C8A] transition-colors">
                LUMÉA
              </span>
            </Link>
            <p className="text-xs text-[#F4D8DF]/75 max-w-xs leading-relaxed">
              Luméa is dedicated to modern, effortless beauty. One multifunctional
              tint designed to build your unique natural glow — vegan &amp; cruelty-free.
            </p>

            {/* Social Icons — placeholder, no real URLs yet */}
            <div className="flex space-x-4 pt-1">
              <button
                onClick={handleSocialClick}
                aria-label="Luméa on Instagram (coming soon)"
                title="Instagram — coming soon"
                className="w-9 h-9 rounded-full border border-[#F4D8DF]/20 flex items-center justify-center text-[#F4D8DF]/70 hover:text-[#D96C8A] hover:border-[#D96C8A] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={handleSocialClick}
                aria-label="Luméa on Twitter (coming soon)"
                title="Twitter — coming soon"
                className="w-9 h-9 rounded-full border border-[#F4D8DF]/20 flex items-center justify-center text-[#F4D8DF]/70 hover:text-[#D96C8A] hover:border-[#D96C8A] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ② Explore column — all link to home-page sections */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase text-[#D96C8A]">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-[#F4D8DF]/75">
              <li>
                <a
                  href="#shop"
                  onClick={(e) => handleSectionLink(e, '#shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luméa Glow Tint
                </a>
              </li>
              <li>
                <a
                  href="#shades"
                  onClick={(e) => handleSectionLink(e, '#shades')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  6 Color Shades
                </a>
              </li>
              <li>
                <a
                  href="#specs"
                  onClick={(e) => handleSectionLink(e, '#specs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Formula &amp; Specs
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleSectionLink(e, '#reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* ③ Customer Care column — proper <Link> routing */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase text-[#D96C8A]">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs text-[#F4D8DF]/75">
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-white transition-colors flex items-center space-x-1.5 group"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-[#D96C8A]/70 group-hover:text-[#D96C8A] flex-shrink-0" />
                  <span>Track Order</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors flex items-center space-x-1.5 group"
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-[#D96C8A]/70 group-hover:text-[#D96C8A] flex-shrink-0" />
                  <span>Customer Support</span>
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSectionLink(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  100% Vegan &amp; Cruelty Free
                </a>
              </li>
            </ul>

            {/* Mini info pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] bg-[#D96C8A]/15 text-[#F4D8DF] px-2.5 py-0.5 rounded-full font-medium">
                ✦ Free Shipping
              </span>
              <span className="text-[10px] bg-[#D96C8A]/15 text-[#F4D8DF] px-2.5 py-0.5 rounded-full font-medium">
                ✦ COD Available
              </span>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4D8DF]/50 space-y-3 sm:space-y-0">
          <span>© 2026 Luméa Beauty. All rights reserved.</span>
          <span className="flex items-center space-x-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#D96C8A] fill-[#D96C8A]" />
            <span>for everyday beauty</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
