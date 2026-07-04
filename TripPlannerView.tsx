
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Download, 
  MapPin, 
  Briefcase, 
  Utensils, 
  Clock, 
  Navigation,
  Loader2,
  Calendar,
  Compass,
  GripVertical
} from 'lucide-react';
import { Message } from '../types';
import InputBar from './InputBar';
import ChatWindow from './ChatWindow';

interface TripPlannerViewProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onSpeak: (text: string, id: string) => void;
  speakingMessageId: string | null;
  isTTSLoading?: string | null;
  onBack: () => void;
  city: string;
  isLoading: boolean;
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
}

interface PlanActivity {
  timeRange: string;
  title: string;
  description: string;
  type: 'temple' | 'food' | 'shopping' | 'general';
  tips?: string;
}

interface PlanDay {
  dayNumber: number;
  dayTitle: string;
  activities: PlanActivity[];
}

const getActivityImage = (title: string, type: 'temple' | 'food' | 'shopping' | 'general', city: string) => {
  const normTitle = title.toLowerCase();
  const normCity = city.toLowerCase();

  // 1. Food and Beverages images (AI-style, mouth-watering dishes, strictly NO humans/girls)
  if (type === 'food' || normTitle.includes('jigarthanda') || normTitle.includes('dessert') || normTitle.includes('sweet') || normTitle.includes('shake') || normTitle.includes('idli') || normTitle.includes('murugan idli') || normTitle.includes('kari dosai') || normTitle.includes('sree sabareesh') || normTitle.includes('mess') || normTitle.includes('food') || normTitle.includes('restaurant') || normTitle.includes('dosa') || normTitle.includes('meals') || normTitle.includes('breakfast') || normTitle.includes('lunch') || normTitle.includes('dinner')) {
    if (normTitle.includes('jigarthanda') || normTitle.includes('shake') || normTitle.includes('sweet')) {
      return "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80"; // Delicacy Jigarthanda milkshake / cold treat
    }
    // High-contrast, vibrant South Indian platter/dosa shots
    const foodList = [
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80", // Crispy Dosa with bowls of Sambhar & Chutney
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80", // Premium authentic South Indian Idli & Sambar breakfast spread
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=1200&q=80"  // Delightful traditional spread
    ];
    return foodList[Math.abs(title.length) % foodList.length];
  }

  // 2. Temples, Shrines & Sacred Places
  if (type === 'temple' || normTitle.includes('temple') || normTitle.includes('sundareswarar') || normTitle.includes('meenakshi') || normTitle.includes('amman') || normTitle.includes('koil') || normTitle.includes('kovil') || normTitle.includes('shrine') || normTitle.includes('teppakulam') || normTitle.includes('ramanathaswamy') || normTitle.includes('marudhamalai') || normTitle.includes('kapaleeshwarar') || normTitle.includes('brihadeeswarar') || normTitle.includes('big temple') || normTitle.includes('shore temple')) {
    if (normCity.includes('madurai') && (normTitle.includes('meenakshi') || normTitle.includes('sundareswarar') || normTitle.includes('amman'))) {
      return "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"; // Gorgeous Madurai Meenakshi Gopuram details
    }
    const templeList = [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", // Majestic color-carved Tamil Gopuram tower
      "https://images.unsplash.com/photo-1600100397561-4e3ed902d2b3?auto=format&fit=crop&w=1200&q=80"  // Infinite stone pillared hallways of South Indian architecture
    ];
    return templeList[Math.abs(title.length) % templeList.length];
  }

  // 3. Historical spots, palaces and museums (Thirumalai Nayak Palace, Gandhi Memorial Museum, museums, libraries, fort, architecture)
  if (normTitle.includes('museum') || normTitle.includes('palace') || normTitle.includes('mahal') || normTitle.includes('gandhi') || normTitle.includes('nayak') || normTitle.includes('history') || normTitle.includes('heritage') || normTitle.includes('memorial') || normTitle.includes('fort') || normTitle.includes('monument')) {
    // Beautiful, majestic, stately Indo-Saracenic columns/archways or architecture (STRICTLY no human faces)
    const architectureList = [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80", // Splendid palace columns from Thirumalai Nayak Mahal
      "https://images.unsplash.com/photo-1566121318574-df10b3ef1d55?auto=format&fit=crop&w=1200&q=80"  // Majestic heritage style white/classic building exterior
    ];
    return architectureList[Math.abs(title.length) % architectureList.length];
  }

  // 4. Shopping, vibrant handlooms, saree shops, markets, bazaars
  if (type === 'shopping' || normTitle.includes('shopping') || normTitle.includes('shop') || normTitle.includes('saree') || normTitle.includes('silk') || normTitle.includes('handloom') || normTitle.includes('bazaar') || normTitle.includes('market') || normTitle.includes('mall') || normTitle.includes('street')) {
    return "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"; // Rich, colorful traditional Indian handloom silk sarees, no people faces
  }

  // 5. Nature spots, lakes, view points, waterfalls, botanical gardens
  if (normTitle.includes('lake') || normTitle.includes('park') || normTitle.includes('garden') || normTitle.includes('falls') || normTitle.includes('waterfall') || normTitle.includes('hill') || normTitle.includes('botanical') || normTitle.includes('nature') || normTitle.includes('forest') || normTitle.includes('tea')) {
    if (normTitle.includes('tea')) {
      return "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80"; // Green Nilgiri Tea plantation
    }
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"; // Majestic valley and mountain drop
  }

  // 6. Famous landmarks like Adiyogi
  if (normTitle.includes('adiyogi') || normTitle.includes('isha') || normTitle.includes('shiva')) {
    return "https://images.unsplash.com/photo-1630138767909-775c742c3fe1?auto=format&fit=crop&w=1200&q=80"; // Colossal statue of Adiyogi Lord Shiva
  }

  // Default fallback (beautiful South Indian scenery/columns)
  return "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=1200&q=80";
};

const TripPlannerView: React.FC<TripPlannerViewProps> = ({ 
  messages, 
  onSendMessage, 
  onSpeak,
  speakingMessageId,
  isTTSLoading,
  onBack, 
  city, 
  isLoading,
  language,
  setLanguage
}) => {
  // Enhanced parsing logic for trip itineraries
  const parsedPlan = useMemo(() => {
    const assistantMsg = [...messages].reverse().find(m => m.role === 'assistant');
    if (!assistantMsg) return null;

    const content = assistantMsg.content;
    const hasItineraryIndicators = content.toLowerCase().includes('day') || 
                                   content.includes('நாள்') || 
                                   content.includes('[location') || 
                                   content.toLowerCase().includes('itinerary');

    if (!hasItineraryIndicators) return null;

    const plan: { title: string, summary: string, days: PlanDay[] } = {
      title: `${city} Discovery Plan`,
      summary: '',
      days: []
    };

    const lines = content.split('\n');
    let currentDay: PlanDay | null = null;
    let titleFound = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();

      // Detect Day Header
      const isDayHeader = (lower.includes('day') || lower.includes('நாள்') || lower.includes('day-') || lower.includes('நாள்-')) && /\b\d+\b/.test(trimmed);

      // Detect Activity List Items (Location tags or starts with a bullet and contains descriptive text)
      const hasLocationTag = trimmed.includes('[Location:');
      const hasBullet = trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('✦') || trimmed.startsWith('•') || /^\d+[\.)]/.test(trimmed);
      const hasTimePattern = /\b\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\b/.test(trimmed);
      const isActivity = hasLocationTag || (hasBullet && hasTimePattern) || (hasBullet && (lower.includes('morning') || lower.includes('afternoon') || lower.includes('evening') || lower.includes('night')));

      if (isDayHeader) {
        const numberMatch = trimmed.match(/\b\d+\b/);
        const dayNum = numberMatch ? parseInt(numberMatch[0]) : (plan.days.length + 1);
        
        let dayTitle = trimmed
          .replace(/###/g, '')
          .replace(/\*\*/g, '')
          .replace(/#/g, '')
          .replace(new RegExp(`Day\\s*[-:]*\\s*${dayNum}`, 'i'), '')
          .replace(new RegExp(`நாள்\\s*[-:]*\\s*${dayNum}`, 'i'), '')
          .replace(/^[:\s\-✦*|]+|[:\s\-✦*|]+$/g, '')
          .trim();
        
        if (!dayTitle) dayTitle = `Discover ${city}`;

        currentDay = {
          dayNumber: dayNum,
          dayTitle,
          activities: []
        };
        plan.days.push(currentDay);
        return;
      }

      if (isActivity) {
        // Safe Recovery: Instantiate Day 1 if no day declared yet
        if (!currentDay) {
          currentDay = {
            dayNumber: 1,
            dayTitle: `Explore ${city}`,
            activities: []
          };
          plan.days.push(currentDay);
        }

        const cleanedLine = trimmed.replace(/^[-*✦•\d\.)\s]+|[-*✦•\d\.)\s]+$/g, '').replace(/\*\*/g, '').trim();

        let title = '';
        let timeRange = 'Scheduled';
        let description = '';
        let tips = '';

        // Extract Pro tip from within activity description (bracket or colon format)
        const tipsMatch = cleanedLine.match(/\[(?:Tips|Tip|Note|Pro-Tip):\s*([^\]]+)\]/i) || cleanedLine.match(/(?:Tips|Tip|Note|Pro-Tip):\s*([^.]+)/i);
        if (tipsMatch) {
          tips = tipsMatch[1].trim();
        }

        const locationMatch = cleanedLine.match(/\[Location:\s*([^\]]+)\]/i);
        if (locationMatch) {
          title = locationMatch[1].trim();

          const parts = cleanedLine.split(locationMatch[0]);
          const beforeLocation = parts[0].trim();
          const afterLocation = parts.slice(1).join(locationMatch[0]).trim();

          const timeRegex = /(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?(?:\s*-\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)?)/i;
          let timeMatch = beforeLocation.match(timeRegex);
          if (!timeMatch) {
            timeMatch = afterLocation.match(timeRegex);
          }
          if (timeMatch) {
            timeRange = timeMatch[1].trim();
          } else if (beforeLocation) {
            const cleanBefore = beforeLocation.replace(/^[:\s\-✦*|]+|[:\s\-✦*|]+$/g, '').trim();
            if (cleanBefore && cleanBefore.length < 25) {
              timeRange = cleanBefore;
            }
          }

          let cleanedAfter = afterLocation;
          if (timeMatch && afterLocation.includes(timeMatch[1])) {
            cleanedAfter = afterLocation.replace(timeMatch[1], '').trim();
          }
          if (tipsMatch && cleanedAfter.includes(tipsMatch[0])) {
            cleanedAfter = cleanedAfter.replace(tipsMatch[0], '').trim();
          }
          description = cleanedAfter.replace(/^[:\s\-✦*()\/\][\|]+|[:\s\-✦*()\/\][\|]+$/g, '').trim();
        } else {
          // Splitting by first non-clock colon
          const colonIndices = [];
          for (let i = 0; i < cleanedLine.length; i++) {
            if (cleanedLine[i] === ':') {
              const charBefore = cleanedLine[i-1];
              const charAfter = cleanedLine[i+1];
              const isDigitBefore = charBefore >= '0' && charBefore <= '9';
              const isDigitAfter = charAfter >= '0' && charAfter <= '9';
              if (!(isDigitBefore && isDigitAfter)) {
                colonIndices.push(i);
              }
            }
          }

          if (colonIndices.length > 0) {
            const firstValidColonIndex = colonIndices[0];
            const leftPart = cleanedLine.substring(0, firstValidColonIndex).trim();
            let rightPart = cleanedLine.substring(firstValidColonIndex + 1).trim();
            
            if (tipsMatch && rightPart.includes(tipsMatch[0])) {
              rightPart = rightPart.replace(tipsMatch[0], '').trim();
            }
            description = rightPart.replace(/^[:\s\-✦*]+/g, '').trim();

            const timeRegex = /(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?(?:\s*-\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)?)/i;
            const timeMatch = leftPart.match(timeRegex);
            if (timeMatch) {
              timeRange = timeMatch[1].trim();
              title = leftPart.replace(timeMatch[1], '').replace(/^[:\s\-✦*|]+|[:\s\-✦*|]+$/g, '').trim();
            } else {
              title = leftPart;
            }
          } else {
            // Split by time regex patterns directly if no colons present
            const timeRegex = /(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?(?:\s*-\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)?)/i;
            const timeMatch = cleanedLine.match(timeRegex);
            if (timeMatch) {
              timeRange = timeMatch[1].trim();
              let rest = cleanedLine.replace(timeMatch[1], '').trim();
              if (tipsMatch && rest.includes(tipsMatch[0])) {
                rest = rest.replace(tipsMatch[0], '').trim();
              }
              title = rest.replace(/^[:\s\-✦*|]+|[:\s\-✦*|]+$/g, '').trim();
            } else {
              let rest = cleanedLine;
              if (tipsMatch && rest.includes(tipsMatch[0])) {
                rest = rest.replace(tipsMatch[0], '').trim();
              }
              title = rest;
            }
          }
        }

        // Final sanitation checks of title and desc
        title = title.replace(/^[:\s\-✦*|\[\]]+|[:\s\-✦*|\[\]]+$/g, '').trim();
        
        if (title) {
          let type: PlanActivity['type'] = 'general';
          const lowerDescription = description.toLowerCase();
          const lowerTitle = title.toLowerCase();
          
          if (lowerTitle.includes('temple') || lowerDescription.includes('temple') || lowerTitle.includes('temples') || lowerTitle.includes('kovil') || lowerDescription.includes('kovil')) {
            type = 'temple';
          } else if (
            lowerTitle.includes('food') || lowerTitle.includes('idli') || 
            lowerTitle.includes('lunch') || lowerTitle.includes('dinner') || 
            lowerDescription.includes('food') || lowerTitle.includes('restaurant') || 
            lowerDescription.includes('restaurant') || lowerTitle.includes('mess') || 
            lowerDescription.includes('mess') || lowerTitle.includes('eating') ||
            lowerTitle.includes('jigarthanda')
          ) {
            type = 'food';
          } else if (
            lowerTitle.includes('shop') || lowerDescription.includes('shop') || 
            lowerTitle.includes('market') || lowerDescription.includes('market') || 
            lowerTitle.includes('bazaar') || lowerDescription.includes('bazaar') ||
            lowerTitle.includes('silk') || lowerTitle.includes('saree')
          ) {
            type = 'shopping';
          }

          currentDay.activities.push({
            timeRange,
            title,
            description: description || 'Scenic exploration and cultural sightseeing...',
            type,
            tips: tips || undefined
          });
        }
        return;
      }

      // Filter commentary/paragraphs to assign title or summary
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('#')) return;

      if (!titleFound) {
        plan.title = trimmed.replace(/\*\*/g, '').replace(/#/g, '').trim();
        titleFound = true;
      } else if (!plan.summary) {
        plan.summary = trimmed.replace(/\*\*/g, '').replace(/#/g, '').trim();
      }
    });

    if (!plan.title || plan.title.length < 5 || plan.title.toLowerCase().includes('day 1') || plan.title.includes('நாள் 1') || plan.title.length > 100) {
      plan.title = `${city} Discovery Itinerary`;
    }

    return plan;
  }, [messages, city]);

  const handleDownload = () => {
    const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${city}_Itinerary_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getActivityIcon = (type: PlanActivity['type']) => {
    switch(type) {
      case 'temple': return '🛕';
      case 'food': return '🍜';
      case 'shopping': return '🛍️';
      default: return '📍';
    }
  };

  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizing) return;
      const newWidth = e.touches[0].clientX;
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    };

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopResizing);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', stopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [isResizing]);

  return (
    <div className={`flex-1 flex flex-col md:flex-row bg-[#FAFAFA] dark:bg-[#0c0c0e] animate-in fade-in duration-500 overflow-hidden relative ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      {/* Left Chat Column */}
      <div 
        style={{ width: window.innerWidth >= 768 ? `${sidebarWidth}px` : '100%' }}
        className="flex flex-col border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 relative z-10 bg-white dark:bg-[#0c0c0e] shadow-lg shrink-0 h-[45vh] md:h-auto"
      >
        <header className="px-4 py-3 md:px-5 md:py-4 flex items-center justify-between bg-white dark:bg-[#0c0c0e] border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={onBack} className="p-1.5 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-lg transition-all group">
              <ArrowLeft className="w-[18px] h-[18px] md:w-5 md:h-5 text-gray-500 group-hover:text-orange-600" />
            </button>
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-orange-500 rounded-full shadow-sm">
                <Compass className="w-4 h-4 md:w-[18px] md:h-[18px] text-white" />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-[13px] md:text-[15px] font-extrabold text-[#c2410c] dark:text-orange-400 leading-tight truncate">Trip Planner</h1>
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate">Your {city} itinerary</p>
              </div>
            </div>
          </div>
          <button onClick={handleDownload} className="p-1.5 md:p-2 text-gray-400 hover:text-orange-600 transition-all">
            <Download className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col bg-[#F9F9F9] dark:bg-[#0a0a0c]">
          <ChatWindow 
            messages={messages} 
            onSuggestionClick={onSendMessage} 
            onSpeak={onSpeak}
            speakingMessageId={speakingMessageId}
            isTTSLoading={isTTSLoading}
            isLoading={isLoading} 
            city={city}
          />
          <div className="p-2 md:p-3 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-md">
            <InputBar 
              onSendMessage={onSendMessage} 
              onStartLive={() => {}} 
              onOpenImageGen={() => {}} 
              isLoading={isLoading} 
              language={language}
              setLanguage={setLanguage}
              city={city}
            />
          </div>
        </div>

        {/* Resize Handle */}
        <div 
          className="hidden md:flex absolute top-1/2 -right-4 z-40 w-8 h-12 items-center justify-center -translate-y-1/2 cursor-col-resize group"
          onMouseDown={startResizing}
          onTouchStart={startResizing}
        >
          <div className={`w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-xl border-2 border-orange-500/20 flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95 ${isResizing ? 'ring-4 ring-orange-500/20 text-orange-500 border-orange-500' : 'text-slate-400 group-hover:text-orange-500'}`}>
            <GripVertical size={18} />
          </div>
        </div>
      </div>

      {/* Right Itinerary Column */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#08080a] overflow-y-auto custom-scrollbar relative h-[55vh] md:h-auto">
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl mx-auto w-full z-10">
          {parsedPlan ? (
            <div className="animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="mb-6 md:mb-10">
                <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-[#853517] dark:text-orange-200 mb-3 md:mb-4 leading-[1.1] tracking-tight">
                  {parsedPlan.title}
                </h2>
                <p className="text-[#5f6368] dark:text-gray-400 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed font-medium">
                  {parsedPlan.summary || `Experience the best of ${city} with this structured plan.`}
                </p>
              </div>

              <div className="space-y-8 md:space-y-12">
                {parsedPlan.days.map((day, dIdx) => (
                  <div key={`day-${day.dayNumber}-${dIdx}`}>
                    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 border-b border-orange-100 dark:border-orange-900/30 pb-3 md:pb-4">
                      <h3 className="text-[18px] sm:text-[22px] md:text-[26px] font-black text-[#c2410c] dark:text-orange-500 tracking-tight">
                        Day {day.dayNumber}: {day.dayTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:gap-10">
                      {day.activities.map((activity, aIdx) => {
                        return (
                          <div 
                            key={`day-${day.dayNumber}-${dIdx}-activity-${aIdx}`} 
                            className="bg-white dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800/80 shadow-md transition-all hover:shadow-xl hover:scale-[1.01] duration-300 overflow-hidden flex flex-col group relative"
                          >
                            {/* Luxurious Body Padding */}
                            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                              <div className="mb-6">
                                {/* Metadata Badges Row */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                  <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/20 text-[#c2410c] dark:text-orange-400 border border-orange-100/30 dark:border-orange-900/20 px-3 py-1 rounded-full text-xs font-bold">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{activity.timeRange}</span>
                                  </div>
                                  <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100/40 dark:border-gray-700/50 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                                    <span>{getActivityIcon(activity.type)}</span>
                                    <span>{activity.type}</span>
                                  </span>
                                </div>

                                <h4 className="text-[20px] sm:text-[24px] md:text-[28px] font-black text-slate-900 dark:text-slate-100 mb-2.5 md:mb-3 leading-tight tracking-tight uppercase">
                                  {activity.title}
                                </h4>
                                <p className="text-[#5f6368] dark:text-slate-400 text-[14.5px] sm:text-[16px] leading-relaxed font-semibold">
                                  {activity.description}
                                </p>

                                {/* Local Pro Tips Box If Rendered */}
                                {activity.tips && (
                                  <div className="mt-5 p-4 bg-orange-50/40 dark:bg-orange-950/10 border border-orange-100/30 dark:border-orange-900/20 rounded-2xl flex items-start gap-3">
                                    <span className="text-lg shrink-0 select-none">💡</span>
                                    <div>
                                      <p className="text-[10.5px] font-black text-[#c2410c] dark:text-orange-400 uppercase tracking-wider mb-0.5">Local Pro Tip</p>
                                      <p className="text-[13.5px] font-semibold text-slate-700 dark:text-slate-300 leading-normal">{activity.tips}</p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Action Footer Drawer */}
                              <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5 mt-auto flex justify-between items-center bg-[#FCFAF7] dark:bg-black/10 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-4 sm:py-5">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{city}, TN</span>
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.title + ' ' + city)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-[#f97316] text-white px-5 py-2.5 rounded-full font-extrabold text-[13px] hover:bg-orange-600 active:scale-95 transition-all shadow-md hover:shadow-lg"
                                >
                                  <MapPin className="w-4 h-4 text-white shrink-0" />
                                  View Location & Directions
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {isLoading && (
                <div className="mt-12 p-6 bg-orange-50/20 dark:bg-orange-950/10 rounded-3xl border border-dashed border-orange-200 dark:border-orange-900/40 flex items-center justify-center gap-4 text-[#c2410c] dark:text-orange-400 font-extrabold text-sm tracking-wider uppercase animate-pulse">
                  <div className="w-5 h-5 border-2 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
                  <span>AI is crafting your itinerary...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center text-center p-6 sm:p-8 animate-in fade-in duration-1000">
              <div className="w-40 h-40 md:w-52 md:h-52 bg-[#fff7ed] dark:bg-orange-950/20 rounded-[32px] md:rounded-[48px] flex items-center justify-center mb-8 md:mb-12 relative shadow-inner">
                <Briefcase className="text-[#fcd34d] opacity-60 w-16 h-16 md:w-24 md:h-24" strokeWidth={1.2} />
              </div>
              
              <h3 className="text-[28px] sm:text-[38px] md:text-[48px] font-black text-[#bdc1c6] dark:text-gray-800 mb-4 md:mb-6 tracking-tight leading-tight uppercase">
                Plan Your Experience
              </h3>
              
              <p className="text-[#9aa0a6] dark:text-gray-600 text-[16px] md:text-[20px] max-w-sm font-medium leading-relaxed mb-10 md:mb-16">
                Your structured itinerary will appear here as you chat.
              </p>
              
              <div className="px-6 py-3 md:px-10 md:py-4 bg-white dark:bg-[#111] rounded-full border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3 md:gap-4">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
                <span className="text-[11px] md:text-[13px] font-black text-[#bdc1c6] uppercase tracking-[0.2em] md:tracking-[0.25em]">Waiting...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlannerView;
