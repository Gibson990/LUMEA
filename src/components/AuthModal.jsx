import React, { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();
  const { addToast } = useNotification();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (authMode === 'login') {
        const res = await login(formData.email, formData.password);
        addToast(`Welcome back, ${res.user.name}!`, 'success');
      } else {
        const res = await register(formData.name, formData.email, formData.password);
        addToast(`Account created successfully! Welcome to Luméa.`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Authentication error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-[#FFF8FA] rounded-3xl shadow-2xl border border-[#F4D8DF] overflow-hidden z-10 animate-fade-in">
        
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#F4D8DF] flex items-center justify-between">
          <span className="font-serif text-xl font-bold tracking-widest text-[#2B2024]">
            {authMode === 'login' ? 'LUMÉA · Sign In' : 'LUMÉA · Create Account'}
          </span>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 text-[#6e5f65] hover:text-[#2B2024] rounded-full hover:bg-[#FFF8FA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-[#6e5f65] mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. James"
                  className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-[#6e5f65] mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#6e5f65] mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#D96C8A] hover:bg-[#c45775] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-xs flex items-center justify-center space-x-2"
            >
              {authMode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{submitting ? 'Registering...' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center text-xs text-[#6e5f65] pt-2 border-t border-[#F4D8DF]">
            {authMode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-[#D96C8A] hover:underline"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-[#D96C8A] hover:underline"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
