import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: 'Ananya Rao',
      shade: 'Berry Kiss',
      rating: 5,
      comment: 'The perfect everyday tint! It melts into my skin so smoothly without feeling sticky or oily. Absolute holy grail item.'
    },
    {
      name: 'Priya Shah',
      shade: 'Rose Petal',
      rating: 5,
      comment: 'I love how buildable it is. One dab gives a gentle daytime flush, and two layers look amazing for evening dinners.'
    },
    {
      name: 'Kavya Sharma',
      shade: 'Nude Glow',
      rating: 5,
      comment: 'Feels so lightweight on cheeks and lips. The packaging is gorgeous too!'
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-white/40 border-t border-[#F4D8DF]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96C8A]">Customer Love</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2024] mt-2">
            Loved by glow seekers everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#2B2024] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F4D8DF]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#2B2024]">{rev.name}</h4>
                  <span className="text-[11px] text-[#6e5f65]">Shade: {rev.shade}</span>
                </div>
                <span className="flex items-center space-x-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Purchase</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
