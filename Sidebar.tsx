
import React from 'react';
import { 
  Plus, 
  BarChart2, 
  MessageSquare, 
  Newspaper, 
  Store, 
  Info,
  History,
  Trash2,
  Download,
  LogIn,
  LogOut,
  Train,
  Plane
} from 'lucide-react';
import { ChatHistory } from '../types';
import { User } from 'firebase/auth';
import { logout } from '../services/firebaseService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatHistory[];
  user: User | null;
  onNewChat: () => void;
  onSelectHistory: (id: string) => void;
  onDeleteHistory: (id: string) => void;
  onDownloadHistory: (id: string) => void;
  onUtilityAction: (action: 'news' | 'analytics' | 'promote' | 'about') => void;
  onLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  user,
  onNewChat, 
  onSelectHistory,
  onDeleteHistory,
  onDownloadHistory,
  onUtilityAction,
  onLogin
}) => {
  const handleTrainBooking = () => {
    window.open('https://www.irctc.co.in/nget/train-search', '_blank', 'noopener,noreferrer');
  };

  const handleFlightBooking = () => {
    window.open('https://www.makemytrip.com/flight/search?tripType=O&itinerary=RPR-TRV-25/04/2026&paxType=A-1_C-0_I-0&cabinClass=E&sTime=1777107772551&forwardFlowRequired=true&action=FLTSRCH&intl=false&cmp=SEM%7CD%7CDF%7CB%7CRoute%7CGrouped%7CRoute-ToptoMid_DT%7CDF_Route_Exact_4%7CRaipur_Kerala_Exact&ef_id=:G:s&msclkid=6ec25d60ca501418d064348382f9d383&isSemFlow=true', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[300px] bg-[#fffcf9] dark:bg-[#0c0c0e] border-r border-orange-100/50 dark:border-orange-900/30 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shadow-2xl`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-5">
        {/* New Chat Button */}
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 text-[#f97316] py-3.5 sm:py-4 rounded-2xl shadow-sm border border-orange-100 dark:border-orange-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-black text-lg group min-h-[44px]"
        >
          <div className="p-1 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover:scale-110 transition-transform">
            <Plus size={20} className="stroke-[3]" />
          </div>
          New Chat
        </button>

        {/* 2x2 Utility Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {[
            { id: 'news', label: 'News', icon: Newspaper, emoji: '🗞️' },
            { id: 'analytics', label: 'Stats', icon: BarChart2, emoji: '📊' },
            { id: 'promote', label: 'Promote', icon: Store, emoji: '🏢' },
            { id: 'about', label: 'About', icon: Info, emoji: 'ℹ️' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onUtilityAction(item.id as any)}
              className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 py-3.5 sm:py-4 px-2 rounded-2xl shadow-sm border border-orange-100/50 dark:border-orange-900/30 hover:border-orange-400 dark:hover:border-orange-700 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group min-h-[44px]"
            >
              <item.icon size={18} className="text-orange-500 sm:size-[20px] group-hover:scale-125 transition-transform" />
              <span className="font-bold text-[12px] sm:text-[13px] tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Train Booking Button */}
        <button 
          onClick={handleTrainBooking}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-blue-200/40 dark:shadow-none hover:-translate-y-1 transition-all duration-300 font-black text-sm group min-h-[44px]"
        >
          <div className="p-1 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
            <Train size={20} className="stroke-[3]" />
          </div>
          Book Train Tickets
        </button>

        {/* Flight Booking Button */}
        <button 
          onClick={handleFlightBooking}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-red-200/40 dark:shadow-none hover:-translate-y-1 transition-all duration-300 font-black text-sm group min-h-[44px]"
        >
          <div className="p-1 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
            <Plane size={20} className="stroke-[3]" />
          </div>
          Book Flights
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 px-5 custom-scrollbar">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="text-[11px] font-black text-orange-500/60 uppercase tracking-[0.2em]">History</span>
          <div className="h-[1px] flex-1 bg-orange-100 dark:bg-orange-900/30"></div>
        </div>
        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs italic font-medium px-4">
              Your recent city conversations will appear here. ✨
            </div>
          ) : (
            history.map((chat) => (
              <div 
                key={chat.id}
                className="group relative flex items-center gap-1 w-full rounded-xl hover:bg-orange-500 dark:hover:bg-orange-600 transition-all duration-300 border border-transparent hover:border-orange-400 dark:hover:border-orange-700"
              >
                <button
                  onClick={() => onSelectHistory(chat.id)}
                  className="flex-1 text-left p-4 pr-1 text-[14px] text-slate-600 dark:text-slate-300 group-hover:text-white font-bold flex items-center gap-3 transition-colors truncate"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100/50 dark:bg-orange-900/20 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <MessageSquare size={14} className="text-orange-500 group-hover:text-white" />
                  </div>
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
                
                <div className="flex items-center gap-0.5 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDownloadHistory(chat.id); }}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
                    title="Download chat"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteHistory(chat.id); }}
                    className="p-2 text-white/80 hover:text-white hover:bg-red-400/30 rounded-lg transition-all"
                    title="Delete chat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="p-6 border-t border-orange-100 dark:border-orange-900/30 mt-auto">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-gray-100 truncate">{user.displayName || 'User'}</p>
                <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all font-bold text-xs"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="w-full bg-[#f97316] text-white py-4 rounded-2xl hover:bg-[#ea580c] transition-all duration-300 font-black text-[16px] shadow-lg shadow-orange-200/40 dark:shadow-none hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <LogIn size={20} className="stroke-[2.5]" />
            <span>Sign In to Sync</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
