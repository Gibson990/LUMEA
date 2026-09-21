import React from 'react';
import { Sparkles, Check, Info } from 'lucide-react';

export default function ProductSpecsGallery() {
  const specs = [
    { label: 'Product Type', value: 'Multifunctional Cream Blush & Lip Tint' },
    { label: 'Net Weight', value: '8g / 0.28 oz' },
    { label: 'Finish', value: 'Dewy Natural Glow' },
    { label: 'Coverage', value: 'Sheer to Medium Buildable' },
    { label: 'Suitable For', value: 'All Skin Types (Sensitive, Dry, Combination, Oily)' },
    { label: 'Key Ingredients', value: 'Botanical Plant Waxes, Vitamin E, Hyaluronic Spheres' },
    { label: 'Formulation', value: '100% Vegan, Cruelty-Free, Paraben-Free, Fragrance-Free' },
    { label: 'Shelf Life', value: '24 Months' },
    { label: 'Origin', value: 'Formulated in India' }
  ];

  return (
    <section id="specs" className="py-20 bg-white/70 border-t border-[#F4D8DF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96C8A]">Formula & Texture</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2024] mt-2">
            Formulated for skin that looks like skin
          </h2>
          <p className="text-xs text-[#6e5f65] mt-3">
            Pure botanical waxes infused with hydrating spheres for weightless color that melts into cheeks and lips.
          </p>
        </div>

        {/* Image Promo Banner & Specs Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean Texture Promo Image Banner */}
          <div className="lg:col-span-6">
            <div className="relative glass-card p-4 rounded-3xl overflow-hidden group shadow-lg">
              <img
                src="/images/lumea_swatches.png"
                draggable="false"
                alt="Luméa Glow Tint Texture Swatches"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl group-hover:scale-103 transition-transform duration-500 select-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2024]/70 via-transparent to-transparent rounded-2xl flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#F4D8DF] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-[#D96C8A]" />
                  <span>Signature Texture</span>
                </div>
                <h3 className="font-serif text-xl font-bold">Six Luminous Shades</h3>
                <p className="text-xs text-[#F4D8DF]/90 mt-1">
                  From subtle nude daytime flush to radiant berry evening glow.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Specs Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2 border-b border-[#F4D8DF] pb-3">
              <Info className="w-4 h-4 text-[#D96C8A]" />
              <h3 className="font-serif text-lg font-bold text-[#2B2024]">
                Product Specifications
              </h3>
            </div>

            <div className="glass-panel rounded-2xl p-4 overflow-hidden shadow-sm">
              <div className="divide-y divide-[#F4D8DF]/50 text-xs">
                {specs.map((item, idx) => (
                  <div key={idx} className="py-3 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="font-bold text-[#2B2024] sm:w-1/3 flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D96C8A] flex-shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[#6e5f65] sm:w-2/3 sm:text-right font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
