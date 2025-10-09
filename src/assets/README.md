# Assets Folder

This folder contains all static resources used throughout the application.

## Structure

```
src/assets/
├── icons/          # SVG icons and icon fonts
│   ├── Archive.svg
│   ├── Document.svg
│   ├── File.svg
│   ├── PDF.svg
│   ├── S-Document.svg
│   ├── Spreadsheet.svg
│   └── index.ts    # Barrel exports
├── images/         # Images (PNG, JPG, SVG illustrations)
│   └── index.ts    # Barrel exports
├── fonts/          # Custom fonts (WOFF, WOFF2, TTF)
├── react.svg       # React logo
├── assets.d.ts     # TypeScript declarations for assets
├── index.ts        # Main barrel export
└── README.md       # This file
```

## Available Icons

The following document/file type icons are currently available:

- `ArchiveIcon` - Archive/zip file icon
- `DocumentIcon` - Generic document icon  
- `FileIcon` - Generic file icon
- `PDFIcon` - PDF document icon
- `SDocumentIcon` - Special document icon
- `SpreadsheetIcon` - Spreadsheet/Excel icon

## Usage

### Usage Examples

```typescript
// Import icons from the icons directory
import { ArchiveIcon, DocumentIcon, PDFIcon } from '@/assets/icons';

// Import the React logo from main assets
import { ReactLogo } from '@/assets';

// Use in JSX (Vite will handle SVG imports as URL strings)
<img src={ArchiveIcon} alt="Archive" width={24} height={24} />
<img src={ReactLogo} alt="React" />

// Or import individual icons directly
import ArchiveIcon from '@/assets/icons/Archive.svg';
```

### Adding New Icons

1. Add your SVG file to `src/assets/icons/`
2. Export it in `src/assets/icons/index.ts`:
   ```typescript
   export { default as NewIcon } from './NewIcon.svg';
   ```
3. Import and use:
   ```typescript
   import { NewIcon } from '@/assets/icons';
   ```

### Images
Store images in the `images/` folder and export from `images/index.ts`:

```typescript
// images/index.ts  
export { default as Logo } from './logo.png';
export { default as HeroImage } from './hero.jpg';

// In components
import { Logo, HeroImage } from '@/assets/images';
```

### Fonts
Store custom fonts in the `fonts/` folder. Reference them in CSS:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/fonts/custom-font.woff2') format('woff2');
}
```

## Best Practices

1. **Use descriptive names**: `user-avatar.svg` instead of `icon1.svg`
2. **Optimize SVGs**: Remove unnecessary metadata and minify
3. **Consistent naming**: Use kebab-case for file names
4. **Group related assets**: Organize by feature or component when needed
5. **Export centrally**: Always export from index files for clean imports

## File Types

- **Icons**: SVG (preferred), PNG for complex icons
- **Images**: PNG, JPG, WebP, SVG for illustrations  
- **Fonts**: WOFF2 (preferred), WOFF, TTF as fallback