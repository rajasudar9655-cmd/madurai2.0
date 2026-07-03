
export interface MessageAttachment {
  data: string; // Base64 string
  mimeType: string;
  name?: string;
  size?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: MessageAttachment[];
  sources?: { title: string; url: string }[];
  followUps?: string[];
  thinkingStep?: string;
  isDeepSearch?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  lastUpdated: Date;
  messages: Message[];
}

export enum Language {
  ENGLISH = 'en',
  TAMIL = 'ta',
  BILINGUAL = 'mixed'
}

export interface Suggestion {
  id: string;
  icon: string;
  title: string;
  prompt: string;
}
