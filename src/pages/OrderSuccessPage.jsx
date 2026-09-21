import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, Sparkles, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  const { code } = useParams();
  const location = useLocation();
  const orderDetails = location.state?.order;
  const customerDetails = location.state?.customer;
  const itemDetails = location.state?.cartItem;

  const orderCode = code || orderDetails?.order_code || '#LM1024';

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8 flex-1 my-auto">
        
        {/* Success Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-[#F4D8DF] rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse-subtle">
            <Heart className="w-12 h-12 text-[#D96C8A] fill-[#D96C8A]" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96C8A]">Order Confirmed ♡</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2024] mt-2">
            Thank you for shopping with Luméa!
          </h1>
          <p className="text-sm text-[#6e5f65] mt-2">
            Your order has been saved in the database and is currently being prepared.
          </p>
        </div>

        {/* Order Reference Card */}
        <div className="glass-card p-6 rounded-3xl text-left space-y-4">
          <div className="flex justify-between items-center border-b border-[#F4D8DF] pb-3">
            <div>
              <span className="text-[11px] uppercase font-bold text-[#6e5f65]">Order Code</span>
              <h3 className="font-serif text-xl font-bold text-[#D96C8A]">{orderCode}</h3>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Status: Pending</span>
            </span>
          </div>

          {itemDetails && (
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-[10px]"
                style={{ backgroundColor: itemDetails.colorHex }}
              >
                8g
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-[#2B2024]">{itemDetails.productName}</h4>
                <p className="text-xs text-[#6e5f65]">Shade: {itemDetails.shadeName} × {itemDetails.quantity}</p>
              </div>
              <span className="font-bold text-sm text-[#2B2024]">₹{(itemDetails.price * itemDetails.quantity).toLocaleString('en-IN')}</span>
            </div>
          )}

          {customerDetails && (
            <div className="pt-3 border-t border-[#F4D8DF] text-xs text-[#6e5f65] space-y-1">
              <p><strong className="text-[#2B2024]">Customer:</strong> {customerDetails.name} ({customerDetails.email})</p>
              <p><strong className="text-[#2B2024]">Shipping To:</strong> {customerDetails.address}, {customerDetails.city} - {customerDetails.postal_code}</p>
            </div>
          )}
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-[#D96C8A] hover:bg-[#c45775] text-white font-semibold py-3.5 px-8 rounded-2xl shadow-lg transition-all text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
