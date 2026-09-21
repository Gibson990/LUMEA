import React from 'react';
import { X, ShoppingBag, PackageCheck, LifeBuoy, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function MobileNavDrawer({ isOpen, onClose }) {
  const { user, logout, openAuthModal } = useAuth();
  const { cartItem, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavClick = (path) => {
    onClose();
    if (path.startsWith('#')) {
      window.location.hash = path;
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs bg-[#FFF8FA] shadow-2xl flex flex-col justify-between border-r border-[#F4D8DF]">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#F4D8DF] flex items-center justify-between">
            <Link to="/" onClick={onClose} className="group">
              <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-[#2B2024] group-hover:text-[#D96C8A] transition-colors">
                LUMÉA
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-[#6e5f65] hover:text-[#2B2024] rounded-full hover:bg-[#FFF8FA]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6 text-sm">
            
            {/* User Profile Badge if Logged In */}
            {user && (
              <div className="glass-card p-3 rounded-2xl flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#D96C8A] text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs text-[#2B2024] truncate">{user.name}</div>
                  <div className="text-[10px] text-[#D96C8A] font-semibold uppercase">{user.role} Account</div>
                </div>
              </div>
            )}

            {/* Store Navigation Links */}
            <div className="space-y-3">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#6e5f65]">Explore</div>
              <ul className="space-y-2 font-medium text-[#2B2024]">
                <li>
                  <button onClick={() => handleNavClick('#shop')} className="w-full text-left py-1.5 hover:text-[#D96C8A]">
                    Luméa Glow Tint
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('#specs')} className="w-full text-left py-1.5 hover:text-[#D96C8A]">
                    Product Specs & Formula
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('#shades')} className="w-full text-left py-1.5 hover:text-[#D96C8A]">
                    Color Shades
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('#reviews')} className="w-full text-left py-1.5 hover:text-[#D96C8A]">
                    Reviews (4.9★)
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Self-Service Links */}
            <div className="space-y-3 pt-3 border-t border-[#F4D8DF]">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#6e5f65]">Customer Support</div>
              <ul className="space-y-2 font-medium text-[#2B2024]">
                <li>
                  <button onClick={() => handleNavClick('/track-order')} className="w-full text-left py-1.5 hover:text-[#D96C8A] flex items-center space-x-2">
                    <PackageCheck className="w-4 h-4 text-[#D96C8A]" />
                    <span>Track Order Progress</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('/support')} className="w-full text-left py-1.5 hover:text-[#D96C8A] flex items-center space-x-2">
                    <LifeBuoy className="w-4 h-4 text-[#D96C8A]" />
                    <span>Customer Support Desk</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Role Links */}
            {(user?.role === 'admin' || user?.role === 'subadmin') && (
              <div className="space-y-3 pt-3 border-t border-[#F4D8DF]">
                <div className="text-[10px] uppercase font-bold tracking-widest text-purple-800">Management Portal</div>
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="w-full py-2 px-3 bg-[#2B2024] text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D96C8A]" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-white border-t border-[#F4D8DF] space-y-3">
            <button
              onClick={() => { onClose(); setIsCartOpen(true); }}
              className="w-full bg-[#F4D8DF]/60 text-[#2B2024] hover:bg-[#D96C8A] hover:text-white font-semibold py-3 px-4 rounded-2xl transition-all flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Shopping Bag</span>
              </div>
              {cartItem && (
                <span className="bg-[#D96C8A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartItem.quantity}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold py-2.5 px-4 rounded-2xl transition-all flex items-center justify-center space-x-2 text-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.name})</span>
              </button>
            ) : (
              <button
                onClick={() => { onClose(); openAuthModal('login'); }}
                className="w-full bg-[#D96C8A] text-white font-semibold py-3 px-4 rounded-2xl shadow-md flex items-center justify-center space-x-2 text-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
