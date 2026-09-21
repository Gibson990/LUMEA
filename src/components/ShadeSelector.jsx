import React from 'react';
import { Check } from 'lucide-react';

export default function ShadeSelector({ variants, selectedVariant, onSelectVariant }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div id="shades" className="space-y-3">
      
      {/* Label and Subtle Stock Indicator */}
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6e5f65]">
          Select Shade: <span className="text-[#2B2024] font-bold text-sm ml-1">{selectedVariant?.name}</span>
        </label>
        
        <span className="text-xs text-[#6e5f65]">
          {selectedVariant?.stock > 0 ? `${selectedVariant.stock} available` : 'Out of stock'}
        </span>
      </div>

      {/* Touch-Friendly Color Circles Grid for Mobile & Desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          return (
            <button
              key={variant.id}
              onClick={() => onSelectVariant(variant)}
              className={`group flex flex-col items-center justify-center p-2.5 sm:p-2 rounded-2xl transition-all duration-200 min-h-[58px] sm:min-h-0 ${
                isSelected 
                  ? 'bg-white shadow-md ring-2 ring-[#D96C8A] scale-102' 
                  : 'bg-white/60 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center transition-transform group-hover:scale-110 border-2 border-white flex-shrink-0"
                style={{ backgroundColor: variant.color_hex }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />}
              </div>
              
              <span className="mt-1 text-[11px] font-medium text-[#2B2024] text-center leading-tight">
                {variant.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
