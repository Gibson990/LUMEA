import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createSupportTicket } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { LifeBuoy, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupportPage() {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState({
    customer_email: '',
    order_code: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createSupportTicket(formData);
      if (res.success) {
        setSubmittedTicket(res.ticket);
        addToast(`Support ticket ${res.ticket.ticket_code} created successfully!`, 'success');
      }
    } catch (err) {
      addToast('Error submitting support ticket: ' + err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D96C8A] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>

        <div className="text-center max-w-lg mx-auto mb-10 space-y-3">
          <div className="w-12 h-12 bg-[#F4D8DF] rounded-2xl flex items-center justify-center mx-auto text-[#D96C8A]">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2024]">Customer Support Desk</h1>
          <p className="text-xs text-[#6e5f65]">
            Have a question about your Luméa Glow Tint order, shade matching, or delivery? Submit a ticket below.
          </p>
        </div>

        {submittedTicket ? (
          <div className="glass-card p-8 rounded-3xl text-center space-y-4 animate-fade-in max-w-lg mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#2B2024]">Ticket Received!</h2>
            <p className="text-xs text-[#6e5f65]">
              Ticket Reference: <strong className="text-[#D96C8A] text-sm">{submittedTicket.ticket_code}</strong>
            </p>
            <p className="text-xs text-[#6e5f65]">
              Our support team has received your ticket regarding <strong>"{submittedTicket.subject}"</strong> and will reply to <strong>{submittedTicket.customer_email}</strong> shortly.
            </p>
            <button
              onClick={() => { setSubmittedTicket(null); setFormData({ customer_email: '', order_code: '', subject: '', message: '' }); }}
              className="mt-4 bg-[#D96C8A] text-white px-6 py-2.5 rounded-2xl text-xs font-bold shadow-md"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#6e5f65] mb-1">Your Email Address *</label>
                <input
                  type="email"
                  name="customer_email"
                  required
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#6e5f65] mb-1">Order Code (Optional)</label>
                <input
                  type="text"
                  name="order_code"
                  value={formData.order_code}
                  onChange={handleChange}
                  placeholder="e.g. #LM1024"
                  className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#6e5f65] mb-1">Inquiry Subject *</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Shade exchange request / Delivery delay inquiry"
                className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#6e5f65] mb-1">Message Details *</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your question or issue in detail..."
                className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#D96C8A] hover:bg-[#c45775] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-xs flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Ticket...' : 'Submit Support Ticket'}</span>
            </button>
          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}
