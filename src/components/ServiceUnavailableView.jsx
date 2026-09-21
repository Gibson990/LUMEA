import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ServiceUnavailableView({ onRetry }) {
  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center space-y-6 shadow-2xl">
        
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-200 text-amber-900 px-3 py-0.5 rounded-full">
            Error 503 · Service Unavailable
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2B2024] pt-2">
            System Under Maintenance
          </h2>
          <p className="text-xs text-[#6e5f65] leading-relaxed">
            The server is temporarily unable to process your request. Please try again in a few moments.
          </p>
        </div>

        <button
          onClick={onRetry || (() => window.location.reload())}
          className="w-full bg-[#D96C8A] hover:bg-[#c45775] text-white font-bold py-3 px-6 rounded-2xl shadow-md text-xs flex items-center justify-center space-x-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>

      </div>
    </div>
  );
}
