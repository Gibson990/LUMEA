import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Menu, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import MobileNavDrawer from './MobileNavDrawer';

export default function Navbar() {
  const { cartItem, setIsCartOpen } = useCart();
  const { user, logout, openAuthModal } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 glass-navbar shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#2B2024] hover:text-[#D96C8A] rounded-xl hover:bg-white/60 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Clean Elegant Text Logo (No overused star icons) */}
          <Link to="/" className="flex items-center space-x-1 group">
            <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-[#2B2024] group-hover:text-[#D96C8A] transition-colors">
              LUMÉA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          {!isAdmin ? (
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#2B2024]">
              <a href="#shop" className="hover:text-[#D96C8A] transition-colors">Shop</a>
              <a href="#specs" className="hover:text-[#D96C8A] transition-colors">Specs & Formula</a>
              <a href="#shades" className="hover:text-[#D96C8A] transition-colors">Shades</a>
              <a href="#reviews" className="hover:text-[#D96C8A] transition-colors">Reviews</a>
              
              <Link to="/track-order" className="hover:text-[#D96C8A] transition-colors text-xs text-[#6e5f65] font-semibold">
                Track Order
              </Link>
              <Link to="/support" className="hover:text-[#D96C8A] transition-colors text-xs text-[#6e5f65] font-semibold">
                Support
              </Link>
            </div>
          ) : (
            <div className="text-xs font-semibold uppercase tracking-widest text-[#D96C8A] bg-[#F4D8DF]/50 px-3.5 py-1 rounded-full">
              Admin Portal
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            
            {/* User Profile / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full bg-white border border-[#F4D8DF] hover:border-[#D96C8A] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#D96C8A] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-[#2B2024] pr-2">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#F4D8DF] py-2 z-50 text-xs animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#F4D8DF]">
                      <div className="font-bold text-[#2B2024]">{user.name}</div>
                      <div className="text-[10px] text-[#D96C8A] uppercase font-semibold">{user.role} Account</div>
                    </div>

                    <Link
                      to="/track-order"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-[#2B2024] hover:bg-[#FFF8FA] hover:text-[#D96C8A]"
                    >
                      <span>Track Orders</span>
                    </Link>

                    <Link
                      to="/support"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-[#2B2024] hover:bg-[#FFF8FA] hover:text-[#D96C8A]"
                    >
                      <span>Customer Support</span>
                    </Link>

                    {(user.role === 'admin' || user.role === 'subadmin') && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-purple-900 font-bold hover:bg-[#FFF8FA]"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-rose-600 hover:bg-rose-50 border-t border-[#F4D8DF] mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-white border border-[#F4D8DF] text-[#2B2024] hover:border-[#D96C8A] hover:text-[#D96C8A] transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Shopping Bag Button */}
            {!isAdmin ? (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-white border border-[#F4D8DF] hover:border-[#D96C8A] text-[#2B2024] hover:text-[#D96C8A] transition-all shadow-sm group"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItem && (
                  <span className="absolute -top-1 -right-1 bg-[#D96C8A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                    {cartItem.quantity}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to="/"
                className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D96C8A]/30 text-[#D96C8A] hover:bg-[#D96C8A] hover:text-white transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Store</span>
              </Link>
            )}

          </div>

        </div>
      </nav>

      <MobileNavDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
