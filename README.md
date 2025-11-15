# Repeating Image Transition - React + Tailwind CSS

A React and Tailwind CSS conversion of the Repeating Image Transition effect. This project demonstrates a beautiful image transition animation using GSAP, where images move in frames (image copies/repetitions) on a path.

## Features

- ✨ React 18 with Vite for fast development
- 🎨 Tailwind CSS for styling
- 🎬 GSAP animations for smooth transitions
- 📱 Responsive design
- ♿ Accessible components

## Installation

1. Navigate to the react folder:
```bash
cd react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
react/
├── src/
│   ├── components/      # React components
│   │   ├── GridItem.jsx
│   │   ├── GridSection.jsx
│   │   ├── Panel.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useImageTransition.js
│   │   └── useSmoothScroll.js
│   ├── data/            # Data files
│   │   └── gridItems.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles with Tailwind
│   └── utils.js         # Utility functions
├── assets/              # Image assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Lenis** - Smooth scrolling
- **ImagesLoaded** - Image preloading

## Original Project

This is a React conversion of the original [Repeating Image Transition](https://tympanus.net/codrops/?p=92571) by Codrops.

## License

MIT

