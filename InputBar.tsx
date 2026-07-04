
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Paperclip, 
  Mic, 
  Send,
  Image as ImageIcon,
  Loader2,
  Globe,
  Sparkles
} from 'lucide-react';
import { improvePrompt } from '../services/geminiService';

interface InputBarProps {
  onSendMessage: (message: string, files?: { data: string, mimeType: string }[]) => void;
  onStartLive: () => void;
  onOpenImageGen: () => void;
  isLoading: boolean;
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
  isDeepSearch: boolean;
  setIsDeepSearch: (val: boolean) => void;
  city?: string;
}

interface QueuedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // Base64 string
}

const InputBar: React.FC<InputBarProps> = ({ 
  onSendMessage, 
  onStartLive, 
  onOpenImageGen, 
  isLoading, 
  language, 
  setLanguage,
  isDeepSearch,
  setIsDeepSearch,
  city = "Madurai"
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<number | null>(null);
  const isPressing = useRef(false);

  const handleImprove = async () => {
    if (!input.trim() || isImproving) return;
    setIsImproving(true);
    try {
      const enriched = await improvePrompt(input, city);
      setInput(enriched);
    } catch (e) {
      console.error(e);
    } finally {
      setIsImproving(false);
    }
  };

  const canSubmit = (input.trim() || queuedFiles.length > 0) && !isLoading && !isImproving;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (canSubmit) {
      const activeText = input.trim() || (queuedFiles.length > 0 ? "Attached file description:" : "");
      const attachments = queuedFiles.map(q => ({
        data: q.data,
        mimeType: q.type,
        name: q.name,
        size: q.size
      }));
      onSendMessage(activeText, attachments);
      setInput('');
      setQueuedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const startVoiceTyping = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.start();
  }, [language]);

  const handleMicMouseDown = (e?: React.MouseEvent | React.TouchEvent) => {
    if (isPressing.current) return;
    isPressing.current = true;
    
    longPressTimer.current = window.setTimeout(() => {
      onStartLive();
      longPressTimer.current = null;
    }, 600);
  };

  const handleMicMouseUp = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!isPressing.current) return;
    isPressing.current = false;
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      startVoiceTyping();
    }
  };

  const processFiles = async (filesList: FileList) => {
    const newFiles: QueuedFile[] = [];
    
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      if (file.size > 8 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 8MB.`);
        continue;
      }
      
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const promise = new Promise<QueuedFile>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve({
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            data: base64
          });
        };
        reader.readAsDataURL(file);
      });
      
      try {
        const processed = await promise;
        newFiles.push(processed);
      } catch (e) {
        console.error("Failed to read file", file.name, e);
      }
    }
    
    if (newFiles.length > 0) {
      setQueuedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-2 sm:px-4 pb-4 sm:pb-10 flex flex-col items-center">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple 
        onChange={handleFileChange} 
      />
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border ${
          isDragging 
          ? 'border-orange-500 bg-orange-50/10 dark:bg-orange-950/10 ring-2 ring-orange-500/20' 
          : 'border-slate-100 dark:border-slate-800'
        } flex flex-col items-stretch w-full max-w-4xl transition-all hover:shadow-[0_6px_30px_rgba(0,0,0,0.09)]`}
      >
        {/* ChatGPT Style Previews Section */}
        {queuedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2.5 px-3 sm:px-4 pb-3 pt-3 border-b border-slate-50 dark:border-slate-800/40 w-full animate-in fade-in slide-in-from-top-1 duration-200">
            {queuedFiles.map(q => {
              const isImage = q.type.startsWith('image/');
              const dataUrl = `data:${q.type};base64,${q.data}`;
              
              return (
                <div 
                  key={q.id} 
                  className="relative flex items-center gap-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 pl-2.5 pr-8 py-2 rounded-xl group/q select-none max-w-[190px] h-[48px] animate-in zoom-in-95 duration-150 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-100 dark:border-slate-800">
                    {isImage ? (
                      <img src={dataUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-base">📄</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 truncate font-sans">
                      {q.name}
                    </p>
                    <p className="text-[9px] font-medium text-slate-400 font-mono mt-0.5 uppercase">
                      {(q.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setQueuedFiles(prev => prev.filter(f => f.id !== q.id))}
                    className="absolute top-1/2 -translate-y-1/2 right-1.5 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-500 dark:bg-slate-700 dark:hover:bg-red-500 text-slate-500 hover:text-white dark:text-slate-300 flex items-center justify-center transition-all opacity-100 sm:opacity-0 group-hover/q:opacity-100 focus:opacity-100 shadow-sm"
                    title="Remove attachment"
                  >
                    <span className="text-[10px] leading-none mb-0.5 font-sans font-bold">×</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="p-2 sm:p-2.5 flex items-center gap-1 sm:gap-2 w-full">
          <div className="flex items-center pl-1 sm:pl-3 gap-0 sm:gap-1">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:p-2.5 text-slate-400 hover:text-orange-500 transition-colors min-w-[36px] min-h-[44px] flex items-center justify-center"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
            </button>
            <button 
              onClick={onOpenImageGen}
              className="p-2 sm:p-2.5 text-slate-400 hover:text-orange-500 transition-colors group min-w-[36px] min-h-[44px] flex items-center justify-center"
              title="AI Image Generator"
            >
              <ImageIcon className="w-5 h-5 sm:w-[22px] sm:h-[22px] group-hover:scale-110 transition-transform" strokeWidth={2} />
            </button>
            <button 
              onMouseDown={handleMicMouseDown}
              onMouseUp={handleMicMouseUp}
              onMouseLeave={() => {
                if (longPressTimer.current) {
                  clearTimeout(longPressTimer.current);
                  longPressTimer.current = null;
                }
                isPressing.current = false;
              }}
              onTouchStart={(e) => {
                if (e.cancelable) e.preventDefault();
                handleMicMouseDown();
              }}
              onTouchEnd={(e) => {
                if (e.cancelable) e.preventDefault();
                handleMicMouseUp();
              }}
              className={`p-2 sm:p-2.5 transition-all relative min-w-[36px] min-h-[44px] flex items-center justify-center ${isListening ? 'text-orange-500' : 'text-slate-400 hover:text-orange-500'}`}
              title={`Voice Typing (${language === 'ta' ? 'Tamil' : 'English'}) - Hold for Live AI`}
            >
              <Mic className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-950/30 animate-ping opacity-50" />
              )}
            </button>
            <button
              onClick={() => setIsDeepSearch(!isDeepSearch)}
              className={`p-2 sm:p-2.5 transition-all relative min-w-[36px] min-h-[44px] flex items-center justify-center rounded-xl ${
                isDeepSearch 
                ? 'text-blue-500 bg-blue-50/50 dark:bg-blue-950/20' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title={isDeepSearch ? "Web Search Active (Google Grounded)" : "Local Intelligence Only"}
            >
              <Globe className={`w-5 h-5 sm:w-[22px] sm:h-[22px] ${isDeepSearch ? 'animate-pulse' : ''}`} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2 sm:gap-4 ml-1 md:ml-2 min-w-0">
            {/* Language Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-xl shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[12px] font-black transition-all ${
                  language === 'en' 
                  ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[13px] font-black transition-all ${
                  language === 'ta' 
                  ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                தமிழ்
              </button>
            </div>

            <div className="flex-1 flex items-center gap-1.5 min-w-0 relative">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'ta' ? "தமிழில் கேளுங்கள்..." : "Ask me..."}
                className="w-full bg-transparent py-2 resize-none outline-none text-[15px] sm:text-[16px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-medium min-h-[44px]"
              />
              {input.trim() && (
                <button
                  onClick={handleImprove}
                  disabled={isImproving || isLoading}
                  className={`p-2 transition-all shrink-0 rounded-xl flex items-center justify-center ${
                    isImproving 
                    ? 'text-orange-500 bg-orange-100 dark:bg-orange-950/40' 
                    : 'text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/25 active:scale-95'
                  }`}
                  title="AI Prompt Enhancer (Magic Wand)"
                >
                  <Sparkles size={18} className={isImproving ? 'animate-spin text-orange-500' : 'text-orange-500'} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => handleSubmit()}
            disabled={!canSubmit}
            className={`mr-1 w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all flex items-center justify-center shadow-sm shrink-0 ${
              canSubmit 
              ? 'bg-orange-100 text-orange-600 hover:bg-orange-200 hover:scale-105 active:scale-95' 
              : 'bg-slate-50 text-slate-300 dark:bg-slate-800 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} className="fill-current stroke-[2]" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
