import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchOrders, updateOrderStatus } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Search, PackageCheck, Clock, CheckCircle2, Truck, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrackOrderPage() {
  const [searchCode, setSearchCode] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useNotification();

  const handleTrackSearch = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    try {
      const orders = await fetchOrders();
      const found = orders.find(o => 
        (o.order_code || '').toLowerCase() === searchCode.trim().toLowerCase() ||
        o.id === parseInt(searchCode)
      );

      if (found) {
        setOrder(found);
        addToast(`Found Order ${found.order_code}`, 'success');
      } else {
        setOrder(null);
        addToast(`Order '${searchCode}' not found. Please check your order code.`, 'error');
      }
    } catch (err) {
      addToast('Error searching order: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    if (!window.confirm(`Are you sure you want to cancel Order ${order.order_code}?`)) return;

    try {
      await updateOrderStatus(order.id, 'Cancelled');
      setOrder({ ...order, status: 'Cancelled' });
      addToast(`Order ${order.order_code} has been cancelled successfully.`, 'info');
    } catch (err) {
      addToast('Failed to cancel order: ' + err.message, 'error');
    }
  };

  const steps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = steps.indexOf(order?.status);
  const isCancelled = order?.status === 'Cancelled';

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D96C8A] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>

        <div className="text-center max-w-lg mx-auto mb-10 space-y-3">
          <div className="w-12 h-12 bg-[#F4D8DF] rounded-2xl flex items-center justify-center mx-auto text-[#D96C8A]">
            <PackageCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2024]">Track Your Order</h1>
          <p className="text-xs text-[#6e5f65]">
            Enter your Luméa Order Code (e.g., <code className="bg-white px-2 py-0.5 rounded border border-[#F4D8DF] font-bold text-[#D96C8A]">#LM1024</code>) to view live fulfillment progress.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleTrackSearch} className="max-w-md mx-auto mb-12 flex space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6e5f65] absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. #LM1024"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A] shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#D96C8A] hover:bg-[#c45775] text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-md transition-all flex-shrink-0"
          >
            {loading ? 'Searching...' : 'Track Progress'}
          </button>
        </form>

        {/* Order Details & Progress Stepper */}
        {order && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-8 animate-fade-in">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4D8DF] pb-4 gap-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#6e5f65]">Order Reference</span>
                <h3 className="font-serif text-2xl font-bold text-[#D96C8A]">{order.order_code}</h3>
                <span className="text-xs text-[#6e5f65]">Customer: {order.customer_name}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  isCancelled 
                    ? 'bg-rose-100 text-rose-800 border-rose-300' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  Status: {order.status}
                </span>

                {/* Cancel Order Action button for Pending/Confirmed orders */}
                {(order.status === 'Pending' || order.status === 'Confirmed') && (
                  <button
                    onClick={handleCancelOrder}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Order</span>
                  </button>
                )}
              </div>
            </div>

            {/* Visual 5-Step Progress Stepper */}
            {!isCancelled ? (
              <div className="py-4">
                <div className="text-xs font-bold text-[#2B2024] mb-6 text-center sm:text-left">
                  Fulfillment Lifecycle Progress:
                </div>
                
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
                  {steps.map((step, idx) => {
                    const isPassed = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;

                    return (
                      <div key={step} className="flex sm:flex-col items-center space-x-3 sm:space-x-0 text-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                          isPassed 
                            ? 'bg-[#D96C8A] text-white border-[#D96C8A] shadow-md' 
                            : 'bg-white text-[#6e5f65] border-[#F4D8DF]'
                        } ${isCurrent ? 'ring-4 ring-[#F4D8DF]' : ''}`}>
                          {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <span className={`mt-2 text-xs font-semibold ${isPassed ? 'text-[#2B2024]' : 'text-[#6e5f65]'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-center space-y-1">
                <XCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h4 className="font-bold text-sm text-rose-800">Order Cancelled</h4>
                <p className="text-xs text-rose-600">This order has been cancelled and stock has been returned to inventory.</p>
              </div>
            )}

            {/* Line Item Summary */}
            <div className="pt-4 border-t border-[#F4D8DF] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6e5f65]">
              <div>
                <span className="font-bold text-[#2B2024] block">Purchased Shade</span>
                <span>{order.shade_name} × {order.quantity}</span>
              </div>
              <div>
                <span className="font-bold text-[#2B2024] block">Payment Method</span>
                <span>{order.payment_method}</span>
              </div>
              <div>
                <span className="font-bold text-[#2B2024] block">Total Amount</span>
                <span className="font-bold text-[#D96C8A] text-sm">₹{order.total_amount}</span>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
