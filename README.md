# WebApp - React + TypeScript + Vite + MUI

A modern monorepo WebApp built with React, TypeScript, Vite, and Material-UI (MUI) featuring multiple sub-applications with shared component composition.

## 🚀 Features

### Sub-Applications
- **Search** - Universal search across all applications
- **Task Management** - Kanban-style task organization with priorities
- **Documents** - File management and organization system
- **AI Chat** - Interactive AI assistant with conversation history

### Technical Stack
- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Modern React with hooks
- 📘 **TypeScript** - Type-safe development
- 🎨 **Material-UI (MUI)** - Component library with custom theming
- 🧭 **React Router** - Client-side routing
- 🏗️ **Monorepo Structure** - Organized codebase with shared components

## 📁 Project Structure

```
src/
├── apps/                    # Sub-applications
│   ├── search/             # Search functionality
│   ├── task-management/    # Task management app
│   ├── documents/          # Document management
│   └── ai-chat/           # AI chat interface
├── components/             # Shared components
│   ├── shared/            # Layout and common components
│   └── ui/                # Reusable UI components
├── theme/                 # MUI theme configuration
├── types/                 # TypeScript type definitions
├── mocks/                 # Mock data for development
└── utils/                 # Utility functions
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Available Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application.

## 🎨 Component Architecture

### Shared Components
- **Layout** - Main navigation and app structure
- **AppCard** - Consistent card layout for content
- **Loading** - Loading states with customizable messages
- **EmptyState** - Empty state placeholder with actions

### Component Composition
Components are designed for maximum reusability:
```tsx
// Example usage
<AppCard 
  title="My Card" 
  description="Card description"
  actions={<Button>Action</Button>}
>
  <Content />
</AppCard>
```

## 🎯 Sub-Applications

### Search App
- Universal search across tasks, documents, and chat
- Real-time filtering with relevance scoring
- Type-based result categorization

### Task Management
- Kanban board with drag-and-drop (ready for implementation)
- Priority levels (Low, Medium, High)
- Due date tracking
- Status management (Todo, In Progress, Completed)

### Documents
- File type categorization
- File size tracking
- Upload and organization capabilities
- Action buttons (View, Download, Delete)

### AI Chat
- Conversation management
- Message history
- Real-time typing indicators
- Message formatting support

## 🎨 Theming & Styling

Custom MUI theme with:
- Consistent color palette
- Custom component variants
- Responsive design system
- Typography scale
- Spacing system

Theme customization in `src/theme/theme.ts`:
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    // ... more customizations
  }
});
```

## 📝 TypeScript

Strong typing throughout the application:
- Interface definitions in `src/types/`
- Proper component prop typing
- Type-safe state management
- Mock data with full typing

## 🔧 Customization

### Adding New Sub-Applications
1. Create new folder in `src/apps/`
2. Implement main component
3. Add route in `src/App.tsx`
4. Update navigation in `src/components/shared/Layout.tsx`

### Extending Components
All components support:
- Custom styling via `sx` prop
- Theme-aware variants
- Consistent API patterns
- TypeScript prop validation

## 🚀 Deployment

### Production Build
```bash
npm run build
```
Builds the app for production in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

## 🔍 Performance

- Code splitting ready (implement route-based splitting)
- Optimized bundle size with Vite
- Tree shaking enabled
- Fast development with HMR

## 🧪 Testing

Testing setup ready for:
- Unit tests with Jest/Vitest
- Component testing with React Testing Library
- E2E testing with Playwright/Cypress

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🆘 Support

For support and questions:
- Check existing issues
- Create new issue with detailed description
- Use appropriate issue templates

---

**Happy coding!** 🎉