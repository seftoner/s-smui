import type { Task, Document, SearchResult, ChatConversation } from '../types';

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Add OAuth integration and user session management',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-01'),
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'completed',
    priority: 'medium',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'todo',
    priority: 'high',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    dueDate: new Date('2024-02-15'),
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all API endpoints and usage examples',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Project Requirements.pdf',
    type: 'pdf',
    size: 2048000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    description: 'Detailed project requirements and specifications',
  },
  {
    id: '2',
    name: 'Design Mockups.png',
    type: 'image',
    size: 5120000,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    description: 'UI/UX mockups for the application',
  },
  {
    id: '3',
    name: 'Meeting Notes.txt',
    type: 'txt',
    size: 15360,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    description: 'Weekly team meeting notes and action items',
  },
  {
    id: '4',
    name: 'Technical Specification.doc',
    type: 'doc',
    size: 1024000,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-14'),
    description: 'Detailed technical implementation specification',
  },
];

// Mock Search Results
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Project Planning Document',
    description: 'Comprehensive planning document for the new feature implementation',
    type: 'document',
    relevance: 0.95,
  },
  {
    id: '2',
    title: 'Complete user authentication',
    description: 'Task to implement OAuth integration and user management system',
    type: 'task',
    relevance: 0.88,
  },
  {
    id: '3',
    title: 'AI Chat: How to implement search functionality',
    description: 'Discussion about implementing full-text search with Elasticsearch',
    type: 'chat',
    relevance: 0.82,
  },
  {
    id: '4',
    title: 'Design System Guidelines',
    description: 'Document outlining component design patterns and usage',
    type: 'document',
    relevance: 0.76,
  },
  {
    id: '5',
    title: 'Set up CI/CD pipeline',
    description: 'Task for configuring automated testing and deployment workflows',
    type: 'task',
    relevance: 0.71,
  },
];

// Mock Chat Conversations
export const mockConversations: ChatConversation[] = [
  {
    id: '1',
    title: 'React Development Help',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    messages: [
      {
        id: '1',
        content: 'How do I implement a search feature in React?',
        sender: 'user',
        timestamp: new Date('2024-01-20T10:00:00'),
        type: 'text',
      },
      {
        id: '2',
        content: 'To implement a search feature in React, you can use state to manage the search query and filter your data accordingly. Here\'s a basic example:\n\n```jsx\nconst [searchQuery, setSearchQuery] = useState(\'\');\nconst filteredData = data.filter(item => \n  item.name.toLowerCase().includes(searchQuery.toLowerCase())\n);\n```\n\nThis approach works well for client-side filtering of small to medium datasets.',
        sender: 'ai',
        timestamp: new Date('2024-01-20T10:00:30'),
        type: 'text',
      },
      {
        id: '3',
        content: 'That\'s helpful! What about debouncing the search input?',
        sender: 'user',
        timestamp: new Date('2024-01-20T10:05:00'),
        type: 'text',
      },
      {
        id: '4',
        content: 'Great question! Debouncing prevents excessive API calls or computations. You can use a custom hook or library like lodash:\n\n```jsx\nimport { useDebounce } from \'use-debounce\';\n\nconst [searchTerm, setSearchTerm] = useState(\'\');\nconst [debouncedSearchTerm] = useDebounce(searchTerm, 300);\n\nuseEffect(() => {\n  // Perform search with debouncedSearchTerm\n}, [debouncedSearchTerm]);\n```',
        sender: 'ai',
        timestamp: new Date('2024-01-20T10:05:30'),
        type: 'text',
      },
    ],
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
    messages: [
      {
        id: '5',
        content: 'What are some TypeScript best practices for React components?',
        sender: 'user',
        timestamp: new Date('2024-01-18T14:00:00'),
        type: 'text',
      },
      {
        id: '6',
        content: 'Here are some key TypeScript best practices for React:\n\n1. **Define Props Interfaces**: Always type your component props\n2. **Use Generic Types**: For reusable components\n3. **Strict Mode**: Enable strict TypeScript settings\n4. **Type Events**: Properly type event handlers\n5. **Use Type Guards**: For runtime type checking\n\nWould you like me to elaborate on any of these?',
        sender: 'ai',
        timestamp: new Date('2024-01-18T14:01:00'),
        type: 'text',
      },
    ],
  },
];

// Utility functions for mock data
export const getRandomMockTask = (): Task => {
  const tasks = [...mockTasks];
  return tasks[Math.floor(Math.random() * tasks.length)];
};

export const getRandomMockDocument = (): Document => {
  const documents = [...mockDocuments];
  return documents[Math.floor(Math.random() * documents.length)];
};

export const searchMockData = (query: string): SearchResult[] => {
  return mockSearchResults.filter(
    result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
  );
};