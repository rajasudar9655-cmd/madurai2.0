
import React, { useState } from 'react';
import { X, ChevronDown, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '../services/firebaseService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, city = "Madurai" }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      {/* Modal Container */}
      <div className="w-full max-w-[448px] flex flex-col items-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Main Content Box */}
        <div 
          className="bg-white dark:bg-[#1a1c1e] w-full rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] border border-[#dadce0] dark:border-[#3c4043] relative flex flex-col items-center p-8 md:p-12 text-center"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Google Logo */}
          <div className="mb-3 mt-1">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>

          <h2 className="text-[24px] font-normal text-[#202124] dark:text-[#e8eaed] mb-2 tracking-tight">Sign in</h2>
          <p className="text-[16px] text-[#202124] dark:text-[#e8eaed] mb-1">Use your Google Account</p>
          <div className="flex items-center gap-1.5 mb-8">
            <span className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6]">to continue to</span>
            <span className="text-[14px] font-semibold text-[#202124] dark:text-[#e8eaed]">{city} Info AI</span>
          </div>

          {error && (
            <div className="mb-4 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-4 items-center">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="w-full h-[48px] border border-[#dadce0] dark:border-[#5f6368] rounded-[4px] flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[14px] font-semibold text-[#3c4043] dark:text-gray-200 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin text-[#1a73e8]" size={20} />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
            <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] text-left leading-relaxed">
              Sign in to automatically sync your city exploration history across all your devices.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="w-full flex items-center justify-end mt-12">
            <button 
              onClick={onClose}
              className="text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#f8f9fa] dark:hover:bg-white/5 px-6 py-2 rounded-[4px] font-semibold text-[14px] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Outer Footer */}
        <div className="w-full flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-1 p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className="text-[12px] text-[#202124] dark:text-[#e8eaed] font-medium">English (United States)</span>
            <ChevronDown size={14} className="text-[#5f6368] dark:text-[#9aa0a6]" />
          </div>
          
          <div className="flex items-center gap-6 text-[12px] text-[#202124] dark:text-[#e8eaed]">
            <a href="#" className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded">Help</a>
            <a href="#" className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded">Privacy</a>
            <a href="#" className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
