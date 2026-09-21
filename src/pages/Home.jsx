import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductSpecsGallery from '../components/ProductSpecsGallery';
import BenefitsSection from '../components/BenefitsSection';
import HowToUse from '../components/HowToUse';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { fetchProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toastMessage } = useCart();

  useEffect(() => {
    fetchProduct().then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, []);

  // After product loads, scroll to the anchor if one is present in the URL
  useEffect(() => {
    if (!loading && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        // Small delay to let the DOM settle after render
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8FA] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#D96C8A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif font-bold text-lg text-[#2B2024]">Loading Luméa Beauty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8FA] text-[#2B2024]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B2024] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#D96C8A]/40 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#D96C8A]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <Navbar />
      <main>
        <Hero product={product} />
        <ProductSpecsGallery />
        <BenefitsSection />
        <HowToUse />
        <Reviews />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
