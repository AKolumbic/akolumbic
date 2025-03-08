# Background Components

This directory contains modular background components that can be used with the `GradientBackground` component.

## Architecture

The background system uses a registry pattern to make it easy to add new background types:

- `types.ts`: Contains the common interface for background components
- `BackgroundRegistry.tsx`: Maintains a registry of all available background components
- Individual background components (e.g., `NightSkyBackground.tsx`, `BeachBackground.tsx`, etc.)

## Components

- `BackgroundRegistry.tsx`: Maintains a registry of all available background components
- Individual background components (e.g., `NightSkyBackground.tsx`, `BeachBackground.tsx`, etc.)

## How to Add a New Background Type

To add a new background type, follow these steps:

1. Add a new color type to `src/app/types/gradient.types.ts`

```typescript
export interface NewThemeColors {
  // Define your colors here
  colorOne: string;
  colorTwo: string;
  // etc.
}
```

2. Update the `ThemeColors` interface to include your new theme

```typescript
export interface ThemeColors {
  // ... existing themes
  newTheme: {
    [key in "hero" | "about" | "portfolio" | "contact"]: NewThemeColors;
  };
}
```

3. Add your theme colors to `src/app/data/themeColors.ts`

```typescript
newTheme: {
  hero: {
    colorOne: "#hexcolor",
    colorTwo: "#hexcolor",
    // etc.
  },
  // Define other sections
}
```

4. Update the `ThemeType` type to include your new theme

```typescript
export type ThemeType = "nightsky" | "beach" | "sunset" | "blackhole";
```

5. Create a new background component in the `backgrounds` directory

```typescript
import React from "react";
import { NewThemeColors } from "../../types/gradient.types";
import { BackgroundProps } from "./types";

const NewThemeBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion,
}) => {
  const typedColors = colors as unknown as NewThemeColors;

  // Implement your background here
  return <>{/* Your background elements */}</>;
};

export default NewThemeBackground;
```

6. Register your new background in the `BackgroundRegistry`:

```typescript
import NewThemeBackground from "./NewThemeBackground";

// Inside the backgrounds object:
const backgrounds: Record<ThemeType, BackgroundRegistryEntry> = {
  // ... existing backgrounds
  newTheme: { component: NewThemeBackground },
};
```

That's it! Your new background type will now be available to use with the `GradientBackground` component.
