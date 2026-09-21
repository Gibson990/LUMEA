import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { placeOrder } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: ''
  });

  // Default usable payment method: Cash on Delivery
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [submitting, setSubmitting] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState('');

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#2B2024]">Your bag is empty</h2>
          <p className="text-xs text-[#6e5f65]">Please select a shade from the store before proceeding to checkout.</p>
          <Link to="/" className="inline-block bg-[#D96C8A] text-white px-6 py-3 rounded-2xl text-xs font-bold">
            Return to Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpiClick = () => {
    setPaymentNotice('UPI payments are currently under maintenance. Please use Cash on Delivery for this order.');
    setTimeout(() => setPaymentNotice(''), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      customer: formData,
      items: [
        {
          product_id: cartItem.productId || 1,
          variant_id: cartItem.variantId,
          quantity: cartItem.quantity,
          price: cartItem.price
        }
      ],
      payment_method: paymentMethod
    };

    try {
      const response = await placeOrder(payload);
      if (response.success) {
        removeFromCart();
        navigate(`/order-success/${response.order.order_code || '#LM1024'}`, {
          state: { order: response.order, customer: formData, cartItem }
        });
      }
    } catch (err) {
      alert('Error placing order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const total = cartItem.price * cartItem.quantity;

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D96C8A] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Luméa Store</span>
        </Link>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B2024] mb-6">
          Complete Your Order
        </h1>

        {/* Payment Notice Banner if user tries UPI */}
        {paymentNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2 animate-fade-in shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{paymentNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Customer Details Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* 1. Shipping Details */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2024] border-b border-[#F4D8DF] pb-3">
                1. Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#6e5f65] mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. James"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#6e5f65] mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="james@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#6e5f65] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#6e5f65] mb-1">Shipping Address *</label>
                  <textarea
                    name="address"
                    rows="2"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat No., Street, Landmark"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#6e5f65] mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#6e5f65] mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postal_code"
                    required
                    value={formData.postal_code}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2024] border-b border-[#F4D8DF] pb-3">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Active Usable Option: Cash on Delivery */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery' 
                    ? 'border-[#D96C8A] bg-white shadow-md ring-2 ring-[#D96C8A]' 
                    : 'border-[#F4D8DF] bg-white/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-[#D96C8A] w-4 h-4"
                    />
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-[#D96C8A]" />
                      <span className="text-xs font-bold text-[#2B2024]">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">Available</span>
                </label>

                {/* Disabled Option: UPI / Instant Demo Payment */}
                <div
                  onClick={handleUpiClick}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-gray-50/80 cursor-not-allowed opacity-65"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      disabled
                      checked={false}
                      className="w-4 h-4 accent-gray-400"
                    />
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 line-through">UPI / Instant Online Payment</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">Currently Unavailable</span>
                </div>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#D96C8A] hover:bg-[#c45775] text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-[#D96C8A]/25 transition-all text-sm flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order (COD) · ₹{total.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="glass-card p-5 sm:p-6 rounded-3xl sticky top-28 space-y-5">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2024] border-b border-[#F4D8DF] pb-3">
                Order Summary
              </h2>

              <div className="flex items-center space-x-4">
                <div
                  className="w-14 h-14 rounded-2xl border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ backgroundColor: cartItem.colorHex }}
                >
                  8g
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#2B2024] truncate">{cartItem.productName}</h3>
                  <p className="text-xs text-[#6e5f65]">Shade: <span className="font-semibold text-[#2B2024]">{cartItem.shadeName}</span></p>
                  <p className="text-xs text-[#6e5f65]">Quantity: <span className="font-semibold text-[#2B2024]">{cartItem.quantity}</span></p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-serif text-base font-bold text-[#D96C8A]">
                    ₹{(cartItem.price * cartItem.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#6e5f65] pt-4 border-t border-[#F4D8DF]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2B2024]">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2B2024] pt-3 border-t border-[#F4D8DF]">
                  <span>Total Payable</span>
                  <span className="text-[#D96C8A]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-[#FFF8FA] p-3 rounded-xl border border-[#F4D8DF] text-[11px] text-[#6e5f65] text-center">
                🚚 Pay cash upon delivery to your doorstep.
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
