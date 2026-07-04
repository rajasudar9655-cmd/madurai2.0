
import React from 'react';
import { ArrowLeft, BarChart3 } from 'lucide-react';

interface StatsViewProps {
  onBack: () => void;
  messageCount: number;
}

const StatsView: React.FC<StatsViewProps> = ({ onBack, messageCount }) => {
  const stats = [
    { label: 'Total Visits', value: '2', icon: BarChart3 },
    { label: 'Messages Sent', value: messageCount.toString(), icon: BarChart3 },
    { label: 'Trips Planned', value: '0', icon: BarChart3 },
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0c0c0e] animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden">
      <header className="px-4 py-4 md:px-6 md:py-6 flex items-center gap-3 md:gap-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <button 
          onClick={onBack}
          className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#f97316" />
              <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="6" />
              <path d="M62 38 A 15 15 0 1 0 62 62" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-lg md:text-xl font-black text-[#f97316] leading-none truncate">Analytics Dashboard</h1>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider truncate">Usage statistics</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 md:gap-6 group hover:shadow-md transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 dark:bg-orange-950/30 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <stat.icon className="text-[#f97316] w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{stat.label}</p>
                  <p className="text-[32px] md:text-[44px] font-black text-slate-800 dark:text-white leading-none">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[1.8rem] md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white mb-4 md:mb-6 tracking-tight">Session Information</h3>
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-bold">
                Last Visit: <span className="text-slate-500 dark:text-slate-400 font-medium">{dateStr}, {timeStr}</span>
              </p>
              <p className="text-[10px] md:text-xs text-slate-400 font-bold leading-relaxed">
                Note: All analytics data is stored locally on your device and is not shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
