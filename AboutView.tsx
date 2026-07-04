
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
  city: string;
  stats: {
    visits: number;
    questions: number;
    trips: number;
  };
}

const AboutView: React.FC<AboutViewProps> = ({ onBack, city, stats }) => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0c0c0e] animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden">
      <header className="px-4 py-4 md:px-6 md:py-6 flex items-center border-b border-gray-100 dark:border-gray-800 shrink-0">
        <button 
          onClick={onBack}
          className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Logo Section */}
          <div className="mb-4 md:mb-6 flex justify-center">
             <div className="w-20 h-10 md:w-24 md:h-12 overflow-hidden flex items-end justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#f97316] flex items-center justify-center translate-y-10 md:translate-y-12 relative">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="-translate-y-5 md:-translate-y-6 max-w-[50px] md:max-w-[60px]">
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
             </div>
          </div>

          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-black text-slate-900 dark:text-white mb-4 md:mb-6 text-center tracking-tight leading-tight px-2">
            About {city} Info AI
          </h1>
          
          <p className="text-[14px] sm:text-[17px] md:text-[19px] text-slate-500 dark:text-slate-400 mb-6 md:mb-8 text-center max-w-2xl px-4 leading-relaxed font-medium">
            Your smart guide to the heart of Tamil Nadu. We leverage cutting-edge AI to bring you the best of {city}, with live data and personalized recommendations.
          </p>

          <div className="flex flex-col items-center mb-10 md:mb-12">
            <span className="text-[10px] md:text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1 md:mb-2">Created By</span>
            <span className="text-lg md:text-xl font-black text-[#f97316] tracking-tight">K.Rajasudar</span>
          </div>

          {/* App Statistics Card */}
          <div className="w-full bg-[#F8F9FA] dark:bg-slate-900/50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 mb-8 md:mb-10 border border-gray-100 dark:border-gray-800/50">
            <h2 className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-200 mb-8 md:mb-10 text-center tracking-tight">App Statistics</h2>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-[28px] sm:text-[36px] md:text-[48px] font-black text-orange-500 leading-none mb-1 md:mb-2">{stats.visits}</span>
                <span className="text-[8px] md:text-sm font-black text-slate-400 uppercase tracking-[0.05em] md:tracking-widest text-center">Visits</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-[28px] sm:text-[36px] md:text-[48px] font-black text-orange-500 leading-none mb-1 md:mb-2">{stats.questions}</span>
                <span className="text-[8px] md:text-sm font-black text-slate-400 uppercase tracking-[0.05em] md:tracking-widest text-center">Questions</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-[28px] sm:text-[36px] md:text-[48px] font-black text-orange-500 leading-none mb-1 md:mb-2">{stats.trips}</span>
                <span className="text-[8px] md:text-sm font-black text-slate-400 uppercase tracking-[0.05em] md:tracking-widest text-center">Trips</span>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="w-full space-y-4 mb-16">
            <div className="bg-[#FFFAF5] dark:bg-orange-950/10 p-8 rounded-[1.5rem] border border-orange-50 dark:border-orange-900/20 italic text-slate-700 dark:text-slate-300 relative">
              <p className="text-lg leading-relaxed mb-6 font-medium">
                "This app was a lifesaver for my trip! The trip planner created a perfect itinerary for my family."
              </p>
              <p className="text-right font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">
                - A. Sharma, Tourist
              </p>
            </div>

            <div className="bg-[#FFFAF5] dark:bg-orange-950/10 p-8 rounded-[1.5rem] border border-orange-50 dark:border-orange-900/20 italic text-slate-700 dark:text-slate-300 relative">
              <p className="text-lg leading-relaxed mb-6 font-medium">
                "As a local, I'm impressed. It even knows about the small, hidden food gems in the city."
              </p>
              <p className="text-right font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">
                - K. Pandian, {city} Resident
              </p>
            </div>
          </div>

          {/* Local Business Section */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-[26px] font-black text-slate-900 dark:text-white tracking-tight">Are you a local business owner?</h2>
            <p className="text-[17px] text-slate-500 dark:text-slate-400 font-medium">
              Reach thousands of visitors and locals every day. Promote your business with us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
