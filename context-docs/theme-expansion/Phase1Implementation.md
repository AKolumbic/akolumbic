# Phase 1 Implementation Plan: Theme System Architecture Redesign

## Overview

This document outlines the specific steps we'll take to implement Phase 1 of our theme system expansion. The goal of this phase is to establish a robust theme architecture that supports accent colors, comprehensive styling, and a more maintainable structure.

## Implementation Steps

### Step 1: Consolidate Theme Type Definitions

1. Identify all places where ThemeType is defined (currently in both gradient.types.ts and theme.types.ts)
2. Create a single definitive location for ThemeType
3. Update all imports to reference the consolidated definition
4. Remove duplicate definitions

### Step 2: Create Expanded Theme Interface

1. Create a new file `src/app/types/theme.types.ts` (or update existing)
2. Define comprehensive theme interfaces based on our mockup:
   - Define Typography interface
   - Define ThemeColors interface
   - Define Theme interface with all necessary properties
3. Ensure backward compatibility with existing theme usage

### Step 3: Create Theme Context and Provider

1. Create a new file `src/app/contexts/ThemeContext.tsx`
2. Implement ThemeContext with:
   - Current theme state
   - Theme change function
   - Utilities for accessing theme properties
3. Create ThemeProvider component to wrap the application
4. Add support for theme persistence via cookies
5. Migrate existing theme state management from page.tsx to the context

### Step 4: Define Expanded Theme Objects

1. Create a new file `src/app/data/themes.ts`
2. Implement complete theme objects for each theme:
   - Night Sky
   - Beach
   - Sunset
   - Black Hole
3. Ensure all properties from the Theme interface are implemented
4. Use existing colors from themeColors.ts as a starting point
5. Add complementary accent colors, typography, and component styles

### Step 5: Refactor ThemeSelector Component

1. Update ThemeSelector to work with the expanded theme objects
2. Use theme preview colors from the theme objects instead of hardcoded gradients
3. Enhance the UI to show more theme properties (optional)
4. Ensure proper handling of theme changes through the context

### Step 6: Implement Styled-Components Theme Provider

1. Create a wrapper around the application to provide theme to styled-components
2. Update global styles to use theme properties
3. Create utility functions for accessing theme properties in styled components
4. Test theme switching with styled-components integration

### Step 7: Testing and Documentation

1. Test theme changes across the application
2. Verify backwards compatibility with existing components
3. Document the new theme system
4. Update the roadmap with completion notes

## Technical Details

### Theme Context Implementation

```tsx
// Example implementation sketch
import React, { createContext, useState, useContext, useEffect } from "react";
import { Theme } from "../types/theme.types";
import { themes } from "../data/themes";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeType: string) => void;
  // Utility functions
  getColor: (path: string) => string;
  getFont: (type: "primary" | "secondary") => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.nightsky);

  // Implementation details...

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        getColor,
        getFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

### Migration Path

To ensure a smooth transition, we'll:

1. First, implement the new architecture alongside the existing one
2. Update components one by one to use the new system
3. Once all components are migrated, remove the old implementation

## Deliverables

- Consolidated theme type definitions
- Comprehensive theme interfaces
- Complete theme objects for all themes
- ThemeContext and ThemeProvider implementation
- Refactored ThemeSelector component
- Integration with styled-components
- Documentation of the new theme system

## Completion Notes

We have successfully implemented Phase 1 of our theme system expansion:

1. ✅ **Consolidated Theme Types**: We've updated our ThemeType definitions to be in one location (theme.types.ts) and updated all imports.

2. ✅ **Created Expanded Theme Interface**: We've created comprehensive interfaces for Typography, ThemeColors, and the main Theme interface with all needed properties.

3. ✅ **Implemented ThemeContext**: We've created a robust context system with:

   - Theme state management
   - Type-safe accessor functions
   - System preference detection
   - Cookie-based persistence

4. ✅ **Defined Theme Objects**: We've created detailed theme objects for all four themes with:

   - Color definitions and gradients
   - Typography settings
   - Component-specific styling
   - Animation presets

5. ✅ **Refactored Components**:

   - ThemeSelector now uses the context
   - MobileView uses the context instead of props
   - SafeGradientBackground integrates with the theme system
   - Main application layout uses ThemeProvider at the root

6. ✅ **Documentation**: We've documented the new theme system and provided detailed implementation notes.

### Next Steps

Moving to Phase 2, we'll:

1. Start applying themed styles to the AboutMe section
2. Refactor section-specific components to use theme variables
3. Create utilities to make theme consumption consistent
