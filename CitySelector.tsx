
import React, { useState } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import { TAMIL_NADU_DISTRICTS } from '../constants';

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  currentCity: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ isOpen, onClose, onSelect, currentCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredDistricts = TAMIL_NADU_DISTRICTS.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-16 md:pt-24 p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-[#1a1c1e] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Select District <span className="text-orange-500">📍</span>
            </h2>
            <p className="text-sm text-gray-500 font-medium">Choose a city in Tamil Nadu</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors bg-gray-50 dark:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search district... ✨"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-gray-900 dark:text-gray-100 font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[60vh] p-6 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredDistricts.map((district) => (
              <button
                key={district}
                onClick={() => {
                  onSelect(district);
                  onClose();
                }}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border hover:-translate-y-1.5 hover:shadow-lg ${
                  district === currentCity 
                    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-600 dark:text-orange-400 font-black ring-2 ring-orange-500/20' 
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-700'
                }`}
              >
                <div className={`p-1.5 rounded-full ${district === currentCity ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  <MapPin size={12} />
                </div>
                <span className="truncate text-[15px] font-bold tracking-tight">{district}</span>
              </button>
            ))}
          </div>
          {filteredDistricts.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <span className="text-4xl grayscale opacity-50">🔍</span>
              <p className="text-gray-500 font-bold italic">No districts found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-center">
          <p className="text-xs text-orange-600/70 dark:text-orange-400/70 font-black tracking-widest uppercase">Switching updates AI context</p>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
