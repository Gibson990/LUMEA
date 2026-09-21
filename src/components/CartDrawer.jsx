import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cartItem, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8FA] shadow-2xl flex flex-col justify-between border-l border-[#F4D8DF]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F4D8DF] bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D96C8A]" />
              <h2 className="font-serif text-xl font-bold text-[#2B2024]">Your Shopping Bag</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#6e5f65] hover:text-[#2B2024] rounded-full hover:bg-[#FFF8FA]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {cartItem ? (
              <div className="glass-card p-4 rounded-2xl flex space-x-4 items-center">
                
                {/* Color Swatch Icon */}
                <div
                  className="w-16 h-16 rounded-xl shadow-md border-2 border-white flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-xs"
                  style={{ backgroundColor: cartItem.colorHex }}
                >
                  8g
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#2B2024] truncate">{cartItem.productName}</h3>
                  <p className="text-xs text-[#6e5f65]">Shade: <span className="font-semibold text-[#2B2024]">{cartItem.shadeName}</span></p>
                  <p className="text-xs font-bold text-[#D96C8A] mt-1">₹{cartItem.price.toLocaleString('en-IN')}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center border border-[#F4D8DF] rounded-lg bg-white px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(cartItem.quantity - 1)}
                        className="text-xs font-bold text-[#2B2024] px-1.5"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-2">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.quantity + 1)}
                        className="text-xs font-bold text-[#2B2024] px-1.5"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={removeFromCart}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#C78A98]/40 mx-auto" />
                <p className="text-sm font-medium text-[#6e5f65]">Your shopping bag is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-bold text-[#D96C8A] uppercase tracking-wider hover:underline"
                >
                  Explore Luméa Glow Tint
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItem && (
            <div className="p-6 border-t border-[#F4D8DF] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#6e5f65]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2B2024]">₹{(cartItem.price * cartItem.quantity).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping across India</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2B2024] pt-2 border-t border-[#F4D8DF]">
                  <span>Total</span>
                  <span className="text-[#D96C8A]">₹{(cartItem.price * cartItem.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#D96C8A] hover:bg-[#c45775] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
