import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

/**
 * ErrorBoundary — catches unhandled React render errors and shows a
 * polished full-page fallback with a gradient error code display.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production you'd send this to an error-tracking service (e.g. Sentry)
    console.error('[ErrorBoundary] Unhandled render error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF8FA] flex flex-col items-center justify-center p-6 text-center">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="absolute w-80 h-80 rounded-full bg-rose-400/10 blur-3xl pointer-events-none"
            style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />

          <div className="relative z-10 max-w-md w-full space-y-5">
            {/* Gradient error code */}
            <div
              className="select-none font-serif font-extrabold leading-none"
              style={{
                fontSize: 'clamp(4rem, 18vw, 9rem)',
                background: 'linear-gradient(135deg, #E11D48 0%, #FB7185 50%, #FECDD3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              500
            </div>

            {/* Icon badge */}
            <div className="w-14 h-14 bg-rose-50 border-2 border-rose-200 rounded-full flex items-center justify-center mx-auto shadow-md">
              <AlertCircle className="w-6 h-6 text-rose-500" />
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-rose-100 text-rose-800 px-3 py-0.5 rounded-full">
                Unexpected Error
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#2B2024]">
                Something Went Wrong
              </h1>
              <p className="text-sm text-[#6e5f65] leading-relaxed">
                An unexpected error occurred while rendering this page. Your
                data is safe — please try refreshing or return to the store.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <pre className="text-left text-[10px] bg-rose-50 text-rose-800 rounded-xl p-3 mt-3 overflow-x-auto border border-rose-200">
                  {this.state.error.message}
                </pre>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center space-x-2 bg-[#D96C8A] hover:bg-[#c45775] active:scale-95 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-[#D96C8A]/25 text-xs transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center space-x-2 bg-white border border-[#F4D8DF] hover:border-[#D96C8A] text-[#2B2024] font-semibold py-3 px-6 rounded-2xl text-xs transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Go to Store</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
