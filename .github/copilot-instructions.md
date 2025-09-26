# WebApp Project - React + TypeScript + Vite + MUI

This is a fully functional monorepo WebApp project with the following sub-applications:
- **Search** - Universal search across all applications with relevance scoring
- **Task Management** - Kanban-style task organization with priorities and due dates
- **Documents** - File management system with categorization and actions
- **AI Chat** - Interactive AI assistant with conversation history

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Material-UI (MUI) with custom theming
- **Routing**: React Router for single-page application navigation
- **State Management**: React hooks (simple state management)
- **Data**: Mock data for development and demonstration

## Development Guidelines
- **Component Composition**: All components follow reusable composition patterns
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Theme Consistency**: Custom MUI theme with branded colors and variants
- **Responsive Design**: Mobile-first responsive layouts
- **Code Organization**: Clear separation between apps, components, and utilities

## Key Features Implemented
- ✅ Responsive navigation with drawer sidebar
- ✅ Custom MUI theme with component variants
- ✅ Reusable UI components (AppCard, Loading, EmptyState)
- ✅ Search functionality with filtering and categorization
- ✅ Task management with status tracking and priorities
- ✅ Document management with file type categorization
- ✅ AI chat interface with conversation management
- ✅ Mock data system for realistic development experience
- ✅ Full TypeScript type definitions
- ✅ Production build optimization

## Quick Start
```bash
npm run dev  # Start development server on http://localhost:5173
npm run build  # Build for production
```

## Architecture Benefits
- **Scalable**: Easy to add new sub-applications
- **Maintainable**: Clear separation of concerns
- **Reusable**: Shared components library
- **Type-Safe**: Full TypeScript integration
- **Performant**: Vite for fast development and optimized builds