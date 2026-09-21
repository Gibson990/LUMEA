import React from 'react';
import { Leaf, Award, Feather, Layers } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Leaf,
      title: '100% Vegan Formula',
      description: 'Formulated strictly with botanical plant-based waxes and nutrient-rich oils.'
    },
    {
      icon: Award,
      title: 'Leaping Bunny Cruelty-Free',
      description: 'Never tested on animals at any stage of development or production.'
    },
    {
      icon: Feather,
      title: 'Lightweight & Breathable',
      description: 'Second-skin cream texture that melts effortlessly without clogging pores.'
    },
    {
      icon: Layers,
      title: 'Buildable Flush',
      description: 'Seamlessly build from a soft sheer tint to a vibrant, luminous evening cheek.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white/60 border-y border-[#F4D8DF]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96C8A]">Made to Glow</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2024] mt-2">
            Endless looks with one silky tint.
          </h2>
          <p className="text-sm text-[#6e5f65] mt-3">
            Designed for busy mornings and effortless touch-ups. Apply to cheeks, lips, and eyelids for a monochromatic radiant glow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F4D8DF]/60 text-[#D96C8A] flex items-center justify-center mx-auto shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2B2024]">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#6e5f65] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
