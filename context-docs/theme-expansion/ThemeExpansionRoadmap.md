# Theme System Expansion Roadmap

## Overview

This document outlines the plan to expand our theme system from just background gradients to a comprehensive theming solution that includes accent colors, component-specific styling, and potentially fonts.

## Current State

- The app currently has 4 themes: Night Sky, Beach, Sunset, and Black Hole
- Themes primarily define background gradients through the `themeGradients` object in ThemeSelector.tsx
- Theme colors are defined in themeColors.ts and organized by section (hero, about, portfolio)
- Theme selection is handled by the ThemeSelector component
- Theme state is managed at the app level in page.tsx with cookies for persistence
- ThemeType is a string union type defined in gradient.types.ts and theme.types.ts

## Phase 1: Theme System Architecture Redesign

**Status:** ✅ Completed

### Tasks:

- [x] Consolidate ThemeType definitions (currently in both gradient.types.ts and theme.types.ts)
- [x] Expand ThemeType interface to include accent colors for UI elements
- [x] Create a comprehensive theme interface that includes:
  - Background gradients
  - Primary, secondary, and tertiary accent colors
  - Text colors
  - Border colors
  - Shadow styles
- [x] Update existing theme definitions with accent colors that complement the gradients
- [x] Create a ThemeContext and Provider to make themes easily accessible throughout the app
- [x] Refactor ThemeSelector to work with the expanded theme object
- [x] Update theme persistence mechanism to handle the expanded theme object

### Completion Notes:

We've successfully implemented a comprehensive theme architecture with:

- A centralized ThemeType definition
- A robust Theme interface with typography, colors, and component styling
- A ThemeContext and Provider with utility functions for accessing theme properties
- Complete theme definitions for all four themes
- ThemeSelector, MobileView, and GradientBackground refactored to use the new system
- Cookie-based theme persistence integrated into the Context

## Phase 2: AboutMe Section Theming

**Status:** Not Started

### Tasks:

- [ ] Identify all styleable elements in the AboutMe section:
  - Section container
  - Content containers
  - BioColumn and SkillsColumn
  - SkillsHeading, SkillsList, and SkillItems
  - Buttons and links
  - Tooltips
- [ ] Create a styled-components theme provider wrapper
- [ ] Refactor AboutMe styles to use theme variables instead of hardcoded colors
- [ ] Update AboutMe.styles.ts to consume theme properties
- [ ] Apply accent colors to appropriate elements (borders, highlights, icons, etc.)
- [ ] Test theme changes across all components in AboutMe section
- [ ] Ensure proper transitions when theme is changed

### Completion Notes:

_To be filled in after completion_

## Phase 3: Font Theming

**Status:** Not Started

### Tasks:

- [ ] Research and select font pairings that complement each theme
- [ ] Expand theme interface to include:
  - Primary font (for headings)
  - Secondary font (for body text)
  - Font sizes and weights
- [ ] Update theme definitions with appropriate font selections
- [ ] Create a typography.ts file with standardized text styles
- [ ] Update global styles to use themed fonts
- [ ] Apply themed fonts to appropriate text elements
- [ ] Test readability and visual harmony across all themes
- [ ] Ensure proper font loading and fallbacks

### Completion Notes:

_To be filled in after completion_

## Phase 4: Other Components Theming

**Status:** Not Started

### Tasks:

- [ ] Identify all remaining components that would benefit from theming:
  - HeroSection
  - Portfolio section
  - Contact section
  - UI components (buttons, inputs, cards)
  - Navigation elements
- [ ] Refactor component styles to use theme variables
- [ ] Apply themed styles consistently across the application
- [ ] Ensure consistent use of accent colors across the application
- [ ] Check for accessibility compliance with color contrast
- [ ] Add animation transitions for smooth theme switching

### Completion Notes:

_To be filled in after completion_

## Phase 5: Theme Persistence and User Preferences

**Status:** Not Started

### Tasks:

- [ ] Enhance the current cookie-based theme persistence
- [ ] Consider adding more user customization options:
  - Reduced motion preference
  - Font size preference
  - Contrast options
- [ ] Add animations for smooth theme transitions
- [ ] Create a more comprehensive theme preview in the ThemeSelector
- [ ] Test theme changes across different devices and screen sizes
- [ ] Add system theme detection improvements

### Completion Notes:

_To be filled in after completion_

## Implementation Progress Tracking

As we work through each phase, we'll update this document with progress notes, challenges encountered, and any design decisions made along the way.

## References

- [Current ThemeSelector Component](/src/app/components/ThemeSelector.tsx)
- [Theme Colors Data](/src/app/data/themeColors.ts)
- [Theme Type Definitions](/src/app/types/gradient.types.ts)
- [AboutMe Styles](/src/app/styles/AboutMe.styles.ts)
- [Main Page Component](/src/app/page.tsx)
