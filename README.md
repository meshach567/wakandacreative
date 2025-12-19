### Get Started

## Local Development

1. Clone the repository-

`git clone wakandacreative`

2. Open the project

` cd wakandacreative`

3. Install dependecies

`pnpm install`

4. Run the web App

`pnpm run dev`

# Live Preview

### Project Overview
##A multi-page immersive cinematic experience recreating the Hall of Zero Limits interface with smooth transitions, interactive carousel, and performant animations.

## Key Features
Page Flow & Navigation
Loading Screen - Animated progress bar with background effects

- Home Page - Three action cards with "ENTER THE HALL" button

- Welcome Page - Wisdom guide icon and green arrow navigation

- Tutorial Page - Interactive tutorial with "BEGIN JOURNEY"

- Main Hall Page - Navigation menu + carousel with multiple navigation methods

Interactive Elements
✅ Smooth page transitions with fade effects

✅ Carousel navigation via arrows, dots, and menu items

✅ Hover effects on all interactive components

✅ Responsive design for mobile and desktop

✅ Cinematic typography and spacing

## Architecture & Technical Decisions
## Core Architecture
### React, TypeScript, and GSAP with FP patterns - For maximum control and minimal dependencies

- PageManager Class - Central state management for page transitions

- Component-based structure - Reusable UI components without framework overhead

## Performance Optimizations
RequestAnimationFrame for smooth 60fps animations

CSS custom properties for theming and consistency

Efficient DOM updates - Minimal reflows during transitions

Asset preloading simulation for realistic loading experience

## Design System
- CSS Variables for consistent theming

- Clamp() functions for responsive typography

- CSS Grid & Flexbox for modern layouts

- Backdrop filters for glass-morphism effects

# Hall of Zero Limits – React + TypeScript

This project is a full refactor of a vanilla JavaScript cinematic experience
into a modern React + TypeScript application.

## Architecture
- Components handle UI
- Managers handle imperative systems (canvas, GSAP)
- Hooks encapsulate reusable logic (audio, scroll)

## Key Decisions
- GSAP kept outside React render cycle
- Canvas isolated for performance
- Audio managed via hook instead of global state

## Performance
- No unnecessary re-renders
- requestAnimationFrame scoped to canvas
- Lazy interaction logic

## Accessibility
- Keyboard accessible
- ARIA roles applied
- Reduced motion support

## Tech Stack
- React
- TypeScript
- GSAP
- HTML Canvas
- Traditional CSS
