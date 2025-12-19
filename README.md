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
