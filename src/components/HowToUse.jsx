import React from 'react';

export default function HowToUse() {
  const steps = [
    { number: '01', title: 'Pick your shade', description: 'Select from our 6 signature shades designed to complement all skin tones.' },
    { number: '02', title: 'Tap & Dab', description: 'Dot a tiny drop onto the apples of your cheeks or center of your lips.' },
    { number: '03', title: 'Blend naturally', description: 'Gently blend outward using clean fingertips, a beauty sponge, or brush.' },
    { number: '04', title: 'Build your glow', description: 'Layer a second coat whenever you want extra intensity or evening drama.' }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D96C8A]">Simple Routine</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2024] mt-2">
          Your glow, your way in 4 steps
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <span className="font-serif text-5xl font-extrabold text-[#D96C8A]/15 absolute top-3 right-4 select-none group-hover:text-[#D96C8A]/25 transition-colors">
              {step.number}
            </span>
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold text-[#D96C8A] uppercase tracking-wider">Step {step.number}</span>
              <h3 className="font-serif text-lg font-bold text-[#2B2024]">{step.title}</h3>
              <p className="text-xs text-[#6e5f65] leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
