import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(toast => {
          let bgClass = 'bg-[#2B2024] text-white border-[#D96C8A]/40';
          let icon = <CheckCircle2 className="w-5 h-5 text-[#D96C8A] flex-shrink-0" />;

          if (toast.type === 'error') {
            bgClass = 'bg-rose-900 text-white border-rose-500/50';
            icon = <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
          } else if (toast.type === 'info') {
            bgClass = 'bg-slate-900 text-white border-blue-500/50';
            icon = <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />;
          } else if (toast.type === 'warning') {
            bgClass = 'bg-amber-950 text-amber-100 border-amber-500/50';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-center justify-between space-x-3 transition-all transform duration-300 animate-fade-in ${bgClass}`}
            >
              <div className="flex items-center space-x-3 text-xs font-semibold">
                {icon}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:opacity-75 transition-opacity"
              >
                <X className="w-4 h-4 opacity-70" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
