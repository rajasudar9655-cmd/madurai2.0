
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PromoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
}

const PromoteModal: React.FC<PromoteModalProps> = ({ isOpen, onClose, city }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Restaurant',
    contactName: '',
    phone: '',
    email: '',
    details: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Request submitted successfully! We'll get back to you soon.");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#1a1c1e] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-300 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-5 sm:p-8 md:p-10 flex flex-col items-center max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="mb-4 md:mb-6 flex justify-center shrink-0">
            <svg width="48" height="48" md:width="64" md:height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#f97316" />
              <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="6" />
              <path 
                d="M62 38 A 15 15 0 1 0 62 62" 
                stroke="white" 
                strokeWidth="7" 
                strokeLinecap="round" 
                fill="none" 
              />
            </svg>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">Promote Your Business</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 text-center mb-6 md:mb-8 font-medium">
            Reach thousands of tourists and locals exploring {city}.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Business Name*</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white text-sm md:text-base"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Business Type*</label>
              <select 
                className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white appearance-none text-sm md:text-base"
                value={formData.businessType}
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              >
                <option>Restaurant</option>
                <option>Hotel / Stay</option>
                <option>Retail Shop</option>
                <option>Service</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Contact Name*</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white text-sm md:text-base"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Phone Number*</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white text-sm md:text-base"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white text-sm md:text-base"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 md:mb-1.5">Details</label>
              <textarea 
                rows={2}
                placeholder="Tell us more about your business..."
                className="w-full px-4 py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-700 dark:text-white resize-none text-sm md:text-base"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 md:py-3.5 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-orange-200 dark:shadow-none transition-all active:scale-95 mt-2 min-h-[44px]"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromoteModal;
