
import React, { useRef, useEffect, useState } from 'react';
import { Message } from '../types';
import { getSuggestions } from '../constants';
import { 
  MapPin, 
  Volume2, 
  Pause, 
  Loader2, 
  Star, 
  ExternalLink,
  Copy,
  RotateCcw,
  Edit2,
  Check,
  Sparkles,
  Search,
  Phone,
  Globe,
  Navigation,
  BookOpen,
  Info,
  Clock,
  Compass
} from 'lucide-react';

interface FoodShop {
  name: string;
  location: string;
  rating: number;
}

interface Restaurant {
  name: string;
  location: string;
  rating: number;
  phone: string;
  website: string;
  priceLevel: string;
  distance: string;
  openStatus: string;
  menuUrl: string;
}

interface Hotel {
  name: string;
  location: string;
  rating: number;
  phone: string;
  website: string;
  priceLevel: string;
  distance: string;
  openStatus: string;
  bookingUrl: string;
}

interface TouristPlace {
  name: string;
  location: string;
  rating: number;
  historySummary: string;
  bestTime: string;
  distance: string;
  openStatus: string;
}

// Robust helper to parse different custom tags from content safely
const parseCustomTag = (content: string, type: 'FOOD_SHOP' | 'RESTAURANT' | 'HOTEL' | 'TOURIST_PLACE') => {
  const regex = new RegExp(`\\[${type}:\\s*([^\\]]*?)\\s*\\]`, 'g');
  const results: any[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const parts = match[1].split('|').map(s => s.trim());
    if (type === 'FOOD_SHOP') {
      results.push({
        name: parts[0] || '',
        location: parts[1] || '',
        rating: parseFloat(parts[2]) || 4.5
      });
    } else if (type === 'RESTAURANT') {
      results.push({
        name: parts[0] || '',
        location: parts[1] || '',
        rating: parseFloat(parts[2]) || 4.5,
        phone: parts[3] === 'N/A' || !parts[3] ? '' : parts[3],
        website: parts[4] === 'N/A' || !parts[4] ? '' : parts[4],
        priceLevel: parts[5] === 'N/A' || !parts[5] ? '' : parts[5],
        distance: parts[6] === 'N/A' || !parts[6] ? '' : parts[6],
        openStatus: parts[7] === 'N/A' || !parts[7] ? '' : parts[7],
        menuUrl: parts[8] === 'N/A' || !parts[8] ? '' : parts[8]
      });
    } else if (type === 'HOTEL') {
      results.push({
        name: parts[0] || '',
        location: parts[1] || '',
        rating: parseFloat(parts[2]) || 4.5,
        phone: parts[3] === 'N/A' || !parts[3] ? '' : parts[3],
        website: parts[4] === 'N/A' || !parts[4] ? '' : parts[4],
        priceLevel: parts[5] === 'N/A' || !parts[5] ? '' : parts[5],
        distance: parts[6] === 'N/A' || !parts[6] ? '' : parts[6],
        openStatus: parts[7] === 'N/A' || !parts[7] ? '' : parts[7],
        bookingUrl: parts[8] === 'N/A' || !parts[8] ? '' : parts[8]
      });
    } else if (type === 'TOURIST_PLACE') {
      results.push({
        name: parts[0] || '',
        location: parts[1] || '',
        rating: parseFloat(parts[2]) || 4.5,
        historySummary: parts[3] === 'N/A' || !parts[3] ? '' : parts[3],
        bestTime: parts[4] === 'N/A' || !parts[4] ? '' : parts[4],
        distance: parts[5] === 'N/A' || !parts[5] ? '' : parts[5],
        openStatus: parts[6] === 'N/A' || !parts[6] ? '' : parts[6]
      });
    }
  }
  return results;
};

const FoodShopCard: React.FC<{ shop: FoodShop }> = ({ shop }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name} ${shop.location}`)}`;
  
  return (
    <a 
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-800 transition-all group flex flex-col justify-between min-h-[140px] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base md:text-lg line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
            {shop.name}
          </h4>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/50 px-2 py-1 rounded-xl shadow-sm">
              <span className="text-[14px] md:text-[16px] font-black text-orange-600 dark:text-orange-400 tabular-nums leading-none">{shop.rating}</span>
              <Star size={14} className="fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400" />
            </div>
            <div className="flex items-center gap-1 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="w-3 h-3 flex items-center justify-center bg-blue-600 rounded-sm">
                <span className="text-[7px] font-black text-white">G</span>
              </div>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">Maps Rating</span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-1 pb-1">
          <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
            {shop.location}
          </p>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-1.5 text-[11px] font-black text-orange-500 uppercase tracking-widest translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Explore on maps
          <ExternalLink size={10} />
        </div>
        <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
          <MapPin size={12} />
        </div>
      </div>
    </a>
  );
};

const FoodShopGrid: React.FC<{ shops: FoodShop[] }> = ({ shops }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {shops.map((shop, i) => (
      <FoodShopCard key={i} shop={shop} />
    ))}
  </div>
);

/* PREMIUM RESTAURANT CARD WITH DYNAMIC QUICK ACTIONS */
const RestaurantCard: React.FC<{ restaurant: Restaurant; onSuggestionClick: (prompt: string) => void; city: string }> = ({ restaurant, onSuggestionClick, city }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.location}`)}`;
  const searchMenuUrl = restaurant.menuUrl || `https://www.google.com/search?q=${encodeURIComponent(`${restaurant.name} ${restaurant.location} menu`)}`;
  const reviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.location} reviews`)}`;
  const photosUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.location} photos`)}`;

  const isOpen = restaurant.openStatus.toLowerCase().includes('open');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-950 transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.03] rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {restaurant.name}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <MapPin size={11} className="text-slate-400" />
                {restaurant.location}
              </span>
              {restaurant.distance && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">{restaurant.distance}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/40 px-2 py-1 rounded-xl shadow-sm shrink-0">
            <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-400 tabular-nums">{restaurant.rating}</span>
            <Star size={12} className="fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.openStatus && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isOpen 
                ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/20' 
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              {restaurant.openStatus}
            </span>
          )}
          {restaurant.priceLevel && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
              Price: {restaurant.priceLevel}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 border-t border-slate-50 dark:border-slate-800/60 pt-3 mt-2">
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">
          <span>Quick Actions</span>
          <Sparkles size={10} className="text-orange-500" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-center cursor-pointer"
          >
            <Navigation size={12} />
            <span>Directions</span>
          </a>
          
          {restaurant.phone ? (
            <a 
              href={`tel:${restaurant.phone}`}
              className="flex items-center justify-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95 text-center"
            >
              <Phone size={12} />
              <span>Call</span>
            </a>
          ) : (
            <a 
              href={photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95 text-center"
            >
              <ExternalLink size={12} />
              <span>Photos</span>
            </a>
          )}

          <a 
            href={searchMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center"
          >
            <BookOpen size={12} />
            <span>Menu</span>
          </a>

          <a 
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center"
          >
            <Star size={12} />
            <span>Reviews</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const RestaurantGrid: React.FC<{ restaurants: Restaurant[]; onSuggestionClick: (prompt: string) => void; city: string }> = ({ restaurants, onSuggestionClick, city }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {restaurants.map((restaurant, i) => (
      <RestaurantCard key={i} restaurant={restaurant} onSuggestionClick={onSuggestionClick} city={city} />
    ))}
  </div>
);

/* PREMIUM HOTEL CARD WITH DYNAMIC QUICK ACTIONS */
const HotelCard: React.FC<{ hotel: Hotel; onSuggestionClick: (prompt: string) => void; city: string }> = ({ hotel, onSuggestionClick, city }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${hotel.location}`)}`;
  const bookingUrl = hotel.bookingUrl || `https://www.google.com/search?q=${encodeURIComponent(`${hotel.name} ${hotel.location} booking rooms`)}`;
  const photosUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${hotel.location} photos`)}`;

  const isOpen = hotel.openStatus.toLowerCase().includes('open') || hotel.openStatus.toLowerCase().includes('available');

  const handleAttractionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSuggestionClick(`What are the main tourist attractions and sights near ${hotel.name} in ${city}?`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-950 transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.03] rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {hotel.name}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <MapPin size={11} className="text-slate-400" />
                {hotel.location}
              </span>
              {hotel.distance && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">{hotel.distance}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/40 px-2 py-1 rounded-xl shadow-sm shrink-0">
            <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-400 tabular-nums">{hotel.rating}</span>
            <Star size={12} className="fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.openStatus && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isOpen 
                ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/20' 
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              {hotel.openStatus}
            </span>
          )}
          {hotel.priceLevel && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
              {hotel.priceLevel}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 border-t border-slate-50 dark:border-slate-800/60 pt-3 mt-2">
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">
          <span>Quick Actions</span>
          <Sparkles size={10} className="text-orange-500" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-center cursor-pointer"
          >
            <Compass size={12} />
            <span>Book Stay</span>
          </a>
          
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <Navigation size={12} />
            <span>Directions</span>
          </a>

          {hotel.phone ? (
            <a 
              href={`tel:${hotel.phone}`}
              className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center"
            >
              <Phone size={12} />
              <span>Call</span>
            </a>
          ) : (
            <a 
              href={photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Photos</span>
            </a>
          )}

          <button 
            onClick={handleAttractionsClick}
            className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <Sparkles size={12} className="text-orange-500" />
            <span>Sights Near</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const HotelGrid: React.FC<{ hotels: Hotel[]; onSuggestionClick: (prompt: string) => void; city: string }> = ({ hotels, onSuggestionClick, city }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {hotels.map((hotel, i) => (
      <HotelCard key={i} hotel={hotel} onSuggestionClick={onSuggestionClick} city={city} />
    ))}
  </div>
);

/* PREMIUM TOURIST PLACE CARD WITH DYNAMIC QUICK ACTIONS & CHAT RIGGING */
const TouristPlaceCard: React.FC<{ place: TouristPlace; onSuggestionClick: (prompt: string) => void; city: string }> = ({ place, onSuggestionClick, city }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.location}`)}`;
  
  const handleHistoryClick = () => {
    onSuggestionClick(`Tell me a rich detailed historical and architectural background of [Location: ${place.name}] in ${city}.`);
  };

  const handleBestTimeClick = () => {
    onSuggestionClick(`What are the exact visiting hours, ticket prices, special entries, and the best time of year to visit [Location: ${place.name}] in ${city}?`);
  };

  const handleFoodClick = () => {
    onSuggestionClick(`Recommend highly-rated local restaurants, street food stalls, and traditional dining spots close to [Location: ${place.name}] in ${city}.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-950 transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.03] rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {place.name}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <MapPin size={11} className="text-slate-400" />
                {place.location}
              </span>
              {place.distance && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">{place.distance}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/40 px-2 py-1 rounded-xl shadow-sm shrink-0">
            <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-400 tabular-nums">{place.rating}</span>
            <Star size={12} className="fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400" />
          </div>
        </div>

        {place.historySummary && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2 mb-3 italic">
            "{place.historySummary}"
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {place.bestTime && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-900/20">
              <Clock size={10} />
              Best: {place.bestTime}
            </span>
          )}
          {place.openStatus && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
              Status: {place.openStatus}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 border-t border-slate-50 dark:border-slate-800/60 pt-3 mt-2">
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">
          <span>Explore Sights</span>
          <Sparkles size={10} className="text-orange-500" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-center cursor-pointer"
          >
            <Navigation size={12} />
            <span>Directions</span>
          </a>
          
          <button 
            onClick={handleHistoryClick}
            className="flex items-center justify-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <BookOpen size={12} className="text-orange-600" />
            <span>History</span>
          </button>

          <button 
            onClick={handleBestTimeClick}
            className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <Clock size={12} className="text-orange-600" />
            <span>Best Time</span>
          </button>

          <button 
            onClick={handleFoodClick}
            className="flex items-center justify-center gap-1 px-2.5 py-2 border border-slate-200 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 hover:bg-orange-50/10 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <Star size={12} className="text-orange-500 animate-pulse" />
            <span>Nearby Food</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TouristPlaceGrid: React.FC<{ places: TouristPlace[]; onSuggestionClick: (prompt: string) => void; city: string }> = ({ places, onSuggestionClick, city }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {places.map((place, i) => (
      <TouristPlaceCard key={i} place={place} onSuggestionClick={onSuggestionClick} city={city} />
    ))}
  </div>
);

interface ChatWindowProps {
  messages: Message[];
  onSuggestionClick: (prompt: string) => void;
  onSpeak: (text: string, id: string) => void;
  speakingMessageId: string | null;
  isTTSLoading?: string | null;
  isLoading: boolean;
  city: string;
  onEditMessage?: (msgId: string, newText: string) => void;
  onRegenerate?: (msgId: string) => void;
}

const AssistantLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
);

const TypingIndicator: React.FC<{ lastUserMessage: string }> = ({ lastUserMessage }) => {
  const query = lastUserMessage.toLowerCase();
  let steps = [
    "🔍 Activating intelligence cores...",
    "🌐 Searching trusted local sources...",
    "🧠 Analyzing historical context & details...",
    "✍️ Framing your personalized response..."
  ];

  if (query.includes('weather') || query.includes('rain') || query.includes('temperature') || query.includes('climate')) {
    steps = [
      "☀️ Connecting to meteorological sensors...",
      "🛰️ Retrieving satellite radar feeds...",
      "🌡️ Extracting local humidity & temperature indices...",
      "✍️ Compiling real-time weather outlook..."
    ];
  } else if (query.includes('food') || query.includes('eat') || query.includes('restaurant') || query.includes('idli') || query.includes('kari') || query.includes('jigarthanda') || query.includes('mess')) {
    steps = [
      "🔍 Scanning highly-rated local eateries...",
      "⭐ Extracting food critic ratings & community reviews...",
      "🍲 Verifying operating hours & signature menus...",
      "✍️ Crafting gourmet recommendations..."
    ];
  } else if (query.includes('hotel') || query.includes('stay') || query.includes('room') || query.includes('book') || query.includes('resort')) {
    steps = [
      "🏨 Searching premium hotels & guest houses...",
      "⭐ Filtering by customer feedback & hygiene scores...",
      "🗺️ Calculating distances to key heritage hubs...",
      "✍️ Detailing elegant stay options..."
    ];
  } else if (query.includes('temple') || query.includes('palace') || query.includes('sight') || query.includes('places') || query.includes('monument') || query.includes('heritage')) {
    steps = [
      "🛕 Retrieving ancient scrolls & historical archives...",
      "🕰️ Verifying visiting hours & entry guidelines...",
      "🗺️ Structuring the best heritage exploration trail...",
      "✍️ Detailing your historical guide..."
    ];
  } else if (query.includes('plan') || query.includes('trip') || query.includes('itinerary') || query.includes('route') || query.includes('day')) {
    steps = [
      "🗺️ Plotting optimized routes across the district...",
      "⏱️ Customizing hourly timelines for maximum comfort...",
      "☕ Balancing travel times with local dining stops...",
      "✍️ Finalizing your custom step-by-step itinerary..."
    ];
  } else if (query.includes('direction') || query.includes('map') || query.includes('distance') || query.includes('reach') || query.includes('how to')) {
    steps = [
      "🛰️ Pinging local satellite positioning streams...",
      "🚗 Calculating traffic conditions & road patterns...",
      "🛣️ Mapping out the fastest and safest routes...",
      "✍️ Providing precise turn-by-turn guidance..."
    ];
  }

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0); // Reset step whenever query changes
  }, [lastUserMessage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(timer);
  }, [steps]);

  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-[85%] md:max-w-[75%] flex gap-3 flex-row items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900 mt-1">
          <AssistantLogo size={18} />
        </div>
        <div className="px-5 py-4 rounded-2xl shadow-sm bg-white dark:bg-slate-950 text-elegant-light dark:text-elegant-dark rounded-tl-none border border-slate-100 dark:border-slate-800/80 min-w-[200px]">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
            <span className="text-[10px] font-black tracking-widest text-[#D35400] dark:text-orange-400 uppercase ml-1 animate-pulse">Intelligence Active</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 italic font-mono transition-all duration-300">
            {steps[currentStep]}
          </p>
        </div>
      </div>
    </div>
  );
};

const renderInlineText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\[Location: .*?\])/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    
    if (part.startsWith('[Location: ') && part.endsWith(']')) {
      const locationName = part.slice(11, -1);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`;
      
      return (
        <a 
          key={i} 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline decoration-2 underline-offset-4"
        >
          <MapPin size={14} className="shrink-0" />
          {locationName}
        </a>
      );
    }
    
    return part;
  });
};

const FormattedAssistantContent: React.FC<{ content: string; onSuggestionClick: (prompt: string) => void; city: string }> = ({ content, onSuggestionClick, city }) => {
  const lines = content.split('\n');
  const foodShops = parseCustomTag(content, 'FOOD_SHOP');
  const restaurants = parseCustomTag(content, 'RESTAURANT');
  const hotels = parseCustomTag(content, 'HOTEL');
  const touristPlaces = parseCustomTag(content, 'TOURIST_PLACE');

  // Remove all custom tagging codes from the text so they don't leak into the textual rendering
  const cleanLines = lines
    .map(line => line
      .replace(/\[FOOD_SHOP:\s*[^\]]*?\]/g, '')
      .replace(/\[RESTAURANT:\s*[^\]]*?\]/g, '')
      .replace(/\[HOTEL:\s*[^\]]*?\]/g, '')
      .replace(/\[TOURIST_PLACE:\s*[^\]]*?\]/g, '')
      .trim()
    )
    .filter(line => {
      const remaining = line.replace(/^[-*•]\s*|^\d+\.\s*/, '').trim();
      return remaining.length > 0;
    });

  let isInCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeLanguage = '';

  const renderedElements: React.ReactNode[] = [];

  cleanLines.forEach((line, i) => {
    const trimmed = line.trim();

    // Code block handling
    if (trimmed.startsWith('```')) {
      if (isInCodeBlock) {
        // End of code block
        renderedElements.push(
          <div key={`code-${i}`} className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-900 px-4 py-1.5 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{codeLanguage || 'code'}</span>
            </div>
            <pre className="p-4 bg-slate-50 dark:bg-slate-950 overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-800 dark:text-slate-300">
              {codeBlockContent.join('\n')}
            </pre>
          </div>
        );
        codeBlockContent = [];
        isInCodeBlock = false;
      } else {
        // Start of code block
        isInCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      return;
    }

    if (isInCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    if (!trimmed) {
      renderedElements.push(<div key={`spacer-${i}`} className="h-1" />);
      return;
    }

    const headerMatch = trimmed.match(/^(\d+\.\s*|(?:\*\*))(.+?)(?:\*\*|)$/);
    
    if (headerMatch || (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(':'))) {
      const titleText = trimmed.replace(/\*\*/g, '').toUpperCase();
      renderedElements.push(
        <div key={`header-${i}`} className="mt-8 mb-4 flex items-center bg-[#FFF8F0] dark:bg-orange-950/20 rounded-r-2xl border-l-[6px] border-orange-600 shadow-sm overflow-hidden">
          <span className="px-5 py-3.5 text-xl md:text-[22px] font-black text-[#D35400] dark:text-orange-400 tracking-tight leading-tight uppercase">
            {titleText}
          </span>
        </div>
      );
      return;
    }

    if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\.\s+/.test(trimmed)) {
      const textWithoutMarker = trimmed.replace(/^[-*]\s*|^\d+\.\s+/, '');
      renderedElements.push(
        <div key={`list-${i}`} className="flex gap-3 pl-1 items-start group">
          <span className="text-orange-500 font-bold mt-1.5 scale-125 select-none shrink-0 group-hover:rotate-12 transition-transform">✦</span>
          <span className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            {renderInlineText(textWithoutMarker)}
          </span>
        </div>
      );
      return;
    }

    renderedElements.push(
      <p key={`para-${i}`} className="text-slate-700 dark:text-slate-200 leading-[1.8] font-normal tracking-tight text-[15.5px] md:text-[16.5px]">
        {renderInlineText(line)}
      </p>
    );
  });

  return (
    <div className="space-y-4">
      {renderedElements}
      {foodShops.length > 0 && <FoodShopGrid shops={foodShops} />}
      {restaurants.length > 0 && <RestaurantGrid restaurants={restaurants} onSuggestionClick={onSuggestionClick} city={city} />}
      {hotels.length > 0 && <HotelGrid hotels={hotels} onSuggestionClick={onSuggestionClick} city={city} />}
      {touristPlaces.length > 0 && <TouristPlaceGrid places={touristPlaces} onSuggestionClick={onSuggestionClick} city={city} />}
    </div>
  );
};

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  onSuggestionClick, 
  onSpeak, 
  speakingMessageId, 
  isTTSLoading, 
  isLoading, 
  city,
  onEditMessage,
  onRegenerate
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const userMessages = messages.filter(m => m.role === 'user');
  const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim() && onEditMessage) {
      onEditMessage(id, editText);
    }
    setEditingId(null);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Scroll instantly on initial mount (e.g. entering the chat/refreshing)
  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  // Scroll smoothly when messages change or loading state updates
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom('smooth');
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <div className="mb-8 md:mb-12 flex flex-col items-center max-w-4xl w-full">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-6 md:mb-8 transition-transform hover:scale-110 duration-500 shrink-0">
            <AssistantLogo size={40} />
          </div>
          
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-[#f97316] mb-3 md:mb-4 text-center tracking-tight leading-none uppercase">
            Welcome to {city} Info AI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[14px] sm:text-[16px] md:text-[18px] mb-8 md:mb-12 text-center max-w-2xl px-4 leading-relaxed font-medium">
            Ask me anything about {city}'s temples, street food, culture, hotels, transport, and tourist spots!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl w-full px-2 sm:px-4 mb-16">
          {getSuggestions(city).map((s) => {
            return (
              <button
                key={s.id}
                onClick={() => onSuggestionClick(s.prompt)}
                className="bg-white dark:bg-slate-900 px-4 py-4 sm:px-6 sm:py-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900 hover:shadow-md transition-all duration-300 text-left flex items-center gap-3 sm:gap-4 group active:scale-[0.98] min-h-[44px]"
              >
                <div className="text-xl sm:text-2xl h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/40 dark:to-orange-900/30 rounded-2xl group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md group-hover:shadow-orange-200/50 dark:group-hover:shadow-orange-950/30 border border-orange-200/50 dark:border-orange-800/20 transition-all duration-300 shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 filter drop-shadow-[0_2px_4px_rgba(249,115,22,0.15)] group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </span>
                </div>
                <span className="text-[14px] sm:text-[16px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-2">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-6 md:px-[6%] lg:px-[10%] xl:px-[15%] py-6 md:py-10 space-y-6 md:space-y-12 custom-scrollbar bg-transparent">
      {messages
        .filter(msg => msg.content.trim() !== '')
        .map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out`}>
          <div className={`max-w-[98%] sm:max-w-[90%] md:max-w-[85%] flex gap-2 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start group`}>
            <div className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
              msg.role === 'user' ? 'bg-[#f97316] text-white' : 'bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900'
            } mt-1`}>
              {msg.role === 'user' ? (
                <span className="text-xs md:text-sm">👤</span>
              ) : (
                <AssistantLogo size={20} />
              )}
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className={`relative px-4 py-4 md:px-6 md:py-6 rounded-[1.4rem] md:rounded-[1.8rem] shadow-sm transition-all group-hover:shadow-md ${
                msg.role === 'user' 
                ? 'bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white rounded-tr-none font-semibold' 
                : 'bg-white dark:bg-[#0f172a] text-elegant-light dark:text-elegant-dark rounded-tl-none border border-slate-100 dark:border-slate-800'
              }`}>
                {msg.role === 'user' && !editingId && (
                  <button
                    onClick={() => { setEditingId(msg.id); setEditText(msg.content); }}
                    className="absolute top-1/2 -translate-y-1/2 -left-11 p-2 rounded-xl bg-orange-100 text-orange-600 dark:bg-slate-800 dark:text-orange-400 hover:bg-orange-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm active:scale-95"
                    title="Edit Message"
                  >
                    <Edit2 size={13} strokeWidth={2.5} />
                  </button>
                )}

                {msg.role === 'assistant' && (
                  <>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center text-xs shadow-sm border border-white dark:border-slate-800 transform rotate-12 transition-transform group-hover:rotate-0">
                      ✨
                    </div>
                    
                    {/* Copy Button */}
                    <button 
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="absolute bottom-3 right-11 p-2 rounded-full transition-all shadow-sm active:scale-90 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white"
                      title={copiedId === msg.id ? "Copied" : "Copy to Clipboard"}
                    >
                      {copiedId === msg.id ? (
                        <Check size={16} strokeWidth={2.5} className="text-green-500 dark:text-green-400" />
                      ) : (
                        <Copy size={16} strokeWidth={2.5} />
                      )}
                    </button>

                    {/* Regenerate Button */}
                    {onRegenerate && messages[messages.length - 1].id === msg.id && (
                      <button 
                        onClick={() => onRegenerate(msg.id)}
                        className="absolute bottom-3 right-[4.75rem] p-2 rounded-full transition-all shadow-sm active:scale-90 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white"
                        title="Regenerate Response"
                      >
                        <RotateCcw size={16} strokeWidth={2.5} />
                      </button>
                    )}

                    <button 
                      onClick={() => onSpeak(msg.content, msg.id)}
                      className={`absolute bottom-3 right-3 p-2 rounded-full transition-all shadow-sm active:scale-90 ${
                        speakingMessageId === msg.id || isTTSLoading === msg.id
                          ? 'bg-orange-500 text-white' 
                          : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white'
                      }`}
                      title={speakingMessageId === msg.id ? "Stop Reading" : "Read Aloud"}
                    >
                      {isTTSLoading === msg.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : speakingMessageId === msg.id ? (
                        <Pause size={16} fill="currentColor" strokeWidth={2.5} />
                      ) : (
                        <Volume2 size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </>
                )}

                <div className={`text-[15px] md:text-[16.5px] whitespace-pre-wrap break-words tracking-tight ${msg.role === 'assistant' ? 'pb-4' : ''}`}>
                  {msg.role === 'user' && msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 mb-3">
                      {msg.attachments.map((att, attIdx) => {
                        const isImage = att.mimeType.startsWith('image/');
                        const dataUrl = `data:${att.mimeType};base64,${att.data}`;
                        
                        if (isImage) {
                          return (
                            <div key={attIdx} className="relative group/att rounded-xl overflow-hidden border border-white/20 shadow-md">
                              <img 
                                src={dataUrl} 
                                alt="Uploaded attachment" 
                                className="max-h-[160px] max-w-full sm:max-w-[240px] object-cover transition-transform group-hover/att:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <a 
                                href={dataUrl}
                                download={`image_${attIdx}.png`}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/att:opacity-100 transition-opacity flex items-center justify-center text-white"
                                title="Download Image"
                              >
                                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs font-bold font-sans">View Fullsize</span>
                              </a>
                            </div>
                          );
                        } else {
                          return (
                            <div key={attIdx} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl max-w-[280px] select-none text-white">
                              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-lg">📁</span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-black leading-tight truncate font-sans text-white">
                                  {att.name || `file_${attIdx}.${att.mimeType.split('/')[1] || 'bin'}`}
                                </p>
                                <p className="text-[10px] font-bold text-white/75 font-mono uppercase tracking-widest mt-0.5">
                                  {att.mimeType.split('/')[1] || 'DOCUMENT'}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                  
                  {msg.role === 'user' && editingId === msg.id ? (
                    <div className="flex flex-col gap-2.5 min-w-[240px] sm:min-w-[400px]">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-orange-700/30 text-white border border-orange-500/40 rounded-xl p-3 outline-none font-semibold text-[15px] resize-y focus:border-white transition-all"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs rounded-xl hover:bg-orange-850/50 border border-white/20 font-black text-white active:scale-95 transition-transform"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(msg.id)}
                          className="px-3 py-1.5 text-xs rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-black active:scale-95 transition-transform shadow-md"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ) : msg.role === 'assistant' ? (
                    <FormattedAssistantContent content={msg.content} onSuggestionClick={onSuggestionClick} city={city} />
                  ) : (
                    msg.content
                  )}
                </div>

                {/* Citation Search Sources Display */}
                {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2.5 select-none">
                      <Search size={12} className="animate-pulse" />
                      <span>Web search results:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl text-xs hover:border-blue-400 dark:hover:border-blue-800/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-all max-w-[200px] truncate"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                          <span className="truncate">{src.title}</span>
                          <ExternalLink size={10} className="shrink-0 opacity-40 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Context-Aware Follow Up Suggestions */}
              {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && (
                <div className="mt-5 sm:ml-12 flex flex-col gap-2 max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">
                    <Sparkles size={11} className="text-orange-500" />
                    <span>Suggested Follow-ups</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                    {msg.followUps.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => onSuggestionClick(q)}
                        className="bg-white hover:bg-orange-50/40 dark:bg-[#0f172a]/60 dark:hover:bg-orange-950/10 border border-slate-200/80 hover:border-orange-300 dark:border-slate-800 dark:hover:border-orange-900/50 px-4 py-2 text-xs md:text-[13px] font-bold rounded-2xl text-slate-700 dark:text-slate-200 transition-all duration-300 hover:shadow-sm text-left leading-snug cursor-pointer flex items-center gap-2 max-w-full"
                      >
                        <span className="text-orange-500 font-extrabold select-none">✦</span>
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={`flex items-center gap-2 px-4 text-[10px] font-black tracking-widest uppercase opacity-40 ${
                msg.role === 'user' ? 'flex-row-reverse text-orange-900 dark:text-orange-200' : 'text-slate-500'
              }`}>
                <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="w-1 h-1 rounded-full bg-current"></span>
                <div className="flex items-center gap-1.5">
                  <span>{msg.role === 'user' ? 'Sent' : 'Guide ✨'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && <TypingIndicator lastUserMessage={lastUserMessage} />}
      <div ref={messagesEndRef} className="h-8" />
    </div>
  );
};

export default ChatWindow;
