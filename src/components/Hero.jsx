import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Heart, Star, ShieldCheck } from 'lucide-react';
import ShadeSelector from './ShadeSelector';
import { useCart } from '../context/CartContext';

// Explicit Shade Image Mapping
const SHADE_IMAGE_MAP = {
  'Rose Petal': '/images/lumea_rose_petal.png',
  'Peach Bloom': '/images/lumea_peach_bloom.png',
  'Berry Kiss': '/images/lumea_berry_kiss.png',
  'Soft Coral': '/images/lumea_soft_coral.png',
  'Nude Glow': '/images/lumea_hero_tint.png',
  'Pink Champagne': '/images/lumea_rose_petal.png'
};

export default function Hero({ product }) {
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {
      id: 1,
      name: 'Rose Petal',
      color_hex: '#D9828B',
      stock: 40,
      image_url: '/images/lumea_rose_petal.png'
    }
  );

  useEffect(() => {
    if (product?.variants?.[0]) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const formattedTotal = (product.price * quantity).toLocaleString('en-IN');
  const activeImage = selectedVariant.image_url || 
                     SHADE_IMAGE_MAP[selectedVariant.name] || 
                     '/images/lumea_hero_tint.png';

  return (
    <section id="shop" className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden">
      
      {/* Dynamic Background Accent Glow */}
      <div 
        className="absolute top-1/4 left-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-700 opacity-35" 
        style={{ backgroundColor: selectedVariant.color_hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Product Info & Configurator */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            
            {/* Title & Description */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2B2024] leading-tight">
                Luméa Glow Tint
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#6e5f65] leading-relaxed">
                {product.description}
              </p>
              
              {/* Rating Row */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#2B2024]">4.9 / 5.0</span>
                <span className="text-xs text-[#6e5f65]">·</span>
                <a
                  href="#reviews"
                  className="text-xs text-[#6e5f65] hover:text-[#D96C8A] hover:underline transition-colors font-medium cursor-pointer"
                >
                  142 customer reviews
                </a>
              </div>
            </div>

            {/* Price & Brand Highlights Line */}
            <div className="space-y-1.5">
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-3xl font-bold text-[#D96C8A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#6e5f65]">Free Shipping across India</span>
              </div>

              {/* Tiny "Vegan · Cruelty Free · 8g" Line */}
              <div className="text-xs text-[#6e5f65] font-medium flex items-center space-x-2 pt-0.5">
                <span>♡ Vegan</span>
                <span>·</span>
                <span>♡ Cruelty Free</span>
                <span>·</span>
                <span>8g</span>
              </div>
            </div>

            {/* Interactive Shade Selector */}
            <ShadeSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            {/* Quantity & CTA Controls */}
            <div className="pt-1 space-y-3.5">
              <div className="flex items-center space-x-4">
                
                {/* Quantity Modifier */}
                <div className="flex items-center border border-[#F4D8DF] rounded-2xl bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#2B2024] hover:text-[#D96C8A] rounded-xl transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#2B2024]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))}
                    className="p-1.5 text-[#2B2024] hover:text-[#D96C8A] rounded-xl transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-[#6e5f65]">
                  Subtotal: <span className="font-bold text-[#2B2024] text-sm ml-0.5">₹{formattedTotal}</span>
                </span>
              </div>

              {/* Add to Bag Button */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#D96C8A] hover:bg-[#c45775] active:scale-98 text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg shadow-[#D96C8A]/25 transition-all text-xs sm:text-sm flex items-center justify-center space-x-2.5 group"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span>Add to Bag · ₹{formattedTotal}</span>
                </button>
                
                <button
                  className="p-3.5 sm:p-4 bg-white border border-[#F4D8DF] hover:border-[#D96C8A] rounded-2xl text-[#2B2024] hover:text-[#D96C8A] transition-colors shadow-sm"
                  aria-label="Save to wishlist"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F4D8DF]/60 text-center text-xs text-[#6e5f65]">
              <div className="flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D96C8A]" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-[#D96C8A]">✦</span>
                <span>Cruelty Free</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <Heart className="w-3.5 h-3.5 text-[#D96C8A]" />
                <span>Botanical Wax</span>
              </div>
            </div>

          </div>

          {/* Right Column: Mobile-Optimized Product Image Card */}
          <div className="lg:col-span-6 flex justify-center order-first lg:order-last mb-2 lg:mb-0">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              
              {/* Soft Pink Background Glow Plate */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F4D8DF] via-white to-[#E8A5B5]/40 rounded-3xl transform rotate-2 shadow-xl transition-transform duration-500 hover:rotate-0" />

              {/* Sleek Compact Glass Card */}
              <div className="relative glass-card rounded-3xl p-3 sm:p-4 flex flex-col items-center text-center overflow-hidden group shadow-xl">
                
                {/* Product Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm bg-white">
                  
                  {/* Floating Active Shade Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md transition-all duration-300"
                      style={{ backgroundColor: selectedVariant.color_hex }}
                    >
                      {selectedVariant.name}
                    </span>
                  </div>

                  {/* Dynamic Product Photo */}
                  <img
                    key={selectedVariant.id}
                    src={activeImage}
                    draggable="false"
                    alt={`Luméa Glow Tint - ${selectedVariant.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 rounded-xl select-none"
                  />
                  
                  {/* Bottom Swatch Pill */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full shadow-md border border-[#F4D8DF] flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white shadow-inner transition-colors duration-300"
                      style={{ backgroundColor: selectedVariant.color_hex }}
                    />
                    <span className="text-xs font-bold text-[#2B2024]">Shade: {selectedVariant.name}</span>
                  </div>

                </div>

                {/* Card Bottom Wording */}
                <div className="text-[11px] sm:text-xs text-[#6e5f65] font-medium pt-2.5 pb-0.5 w-full text-center">
                  Effortless everyday blush & lip tint · 8g
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
