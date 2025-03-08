# Portfolio Application

## Application Structure

This Next.js application is built with a modular architecture featuring:

- **Components**: Reusable UI elements like backgrounds, navigation, and interactive elements
- **Sections**: Major page sections (Hero, About, Portfolio, Contact)
- **Hooks**: Custom React hooks for animations, intersections, and responsive behavior
- **Styles**: Styled-components definitions for component styling
- **Types**: TypeScript type definitions for themes and component props
- **Utils**: Utility functions for animations and calculations

## Technical Details

### Framework & Libraries

- **Next.js 15**: Server components, app router, and optimized build process
- **React 19**: Latest React features including concurrent rendering
- **TypeScript**: Type safety and improved developer experience
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Styled Components**: CSS-in-JS solution for component-scoped styling

### Performance Optimizations

- Dynamic importing of heavy components
- Optimized image loading with custom image loader
- Intersection observers for on-demand rendering
- Memoization of expensive components

### Responsive Design

- The application is fully responsive with custom behaviors for mobile and desktop
- Simplified animations on mobile devices for performance
- Different layout strategies based on screen size

### Background Implementation

- CSS gradient-based starry background as a fallback
- Interactive star field with mouse/touch tracking

## Theme System

The application implements a theme system with three options:

- **Night Sky**: Default theme with a deep space gradient
- **Beach**: Ocean-inspired colors and animations
- **Sunset**: Warm sunset-inspired color palette

Themes can be switched via the theme selector component in the top right corner.

## Known Issues

- **Scroll Indicator Behavior**: When using the scroll progress indicator to navigate to the About section, the scroll may position the quote ("Do or do not, there is no try") at different vertical positions depending on which section you're navigating from. This is an edge case related to duplicate element IDs and the way intersection observers handle scroll positioning.

- **Key Expertise Hover/Tooltip Behavior**: Tooltips do not display correctly

### Deployment

The application is configured for deployment on Vercel with optimized settings in `vercel.json` and `next.config.js`.
