export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'txt' | 'image' | 'other';
  size: number;
  createdAt: Date;
  updatedAt: Date;
  url?: string;
  description?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'document' | 'chat';
  url?: string;
  relevance?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code' | 'image';
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}