# Munjal Nayak - Portfolio Website

🌐 **Live Site:** [https://munjal.dev](https://munjal.dev)

## Overview

A modern, futuristic portfolio website for Munjal Nayak - Hardware & Embedded Systems Engineer. Built with a focus on performance, accessibility, and stunning visual design.

## ✨ Features

- **Futuristic Design**: Dark cyberpunk theme with neon accents (cyan, purple, pink)
- **3D Interactive Background**: Parallax layers, floating orbs, and perspective-based mouse tracking
- **Animated Dogs**: Bruno (Indian Pariah Dog) & Rocky (Rottweiler) running across the screen
  - Dogs face each other when meeting
  - One dog jumps over the other to cross
  - Random tongue animations
  - React to page scroll
- **Smooth Animations**: AOS (Animate on Scroll), CSS transitions, and custom animations
- **Particle Effects**: Interactive particle.js background
- **Responsive Design**: Fully optimized for all device sizes
- **Accessibility**: WCAG compliant with focus states, reduced motion support, ARIA labels
- **SEO Optimized**: Structured data, meta tags, Open Graph, Twitter cards

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Libraries:**
  - [AOS](https://github.com/michalsnik/aos) - Animate on Scroll
  - [particles.js](https://github.com/VincentGarreau/particles.js) - Particle effects
  - [Font Awesome 6.5](https://fontawesome.com/) - Icons
  - [Google Fonts](https://fonts.google.com/) - Space Grotesk, JetBrains Mono

## 📁 Project Structure

```
munjal_dev/
├── index.html           # Main portfolio page
├── 404.html             # Custom 404 page
├── README.md            # Project documentation
└── assets/
    ├── css/
    │   └── styles.css   # All styles (~2500 lines)
    ├── js/
    │   └── main.js      # All JavaScript (~1200 lines)
    ├── img/             # Images and icons
    ├── pdf/             # Resume/CV
    └── site.webmanifest # PWA manifest
```

## 🚀 Performance Optimizations

- Deferred script loading
- Preconnect for external resources
- DNS prefetch hints
- Throttled scroll event handlers
- Passive event listeners
- IntersectionObserver for lazy loading
- requestAnimationFrame for smooth animations
- Reduced motion media query support

## 🐕 Dog Animation Features

The dogs (Bruno & Rocky) have intelligent behavior:

1. **Idle State**: Dogs pause randomly for 3-8 seconds
2. **Running State**: Dogs run to random positions
3. **Meeting Behavior**: 
   - Dogs face each other when close
   - 70% chance one dog jumps over the other
   - 30% chance they just greet (both show tongues)
4. **Crossing Animation**: Smooth jump arc with proper timing
5. **Scroll Reaction**: Dogs may start running when user scrolls

## 📱 Browser Support

- Chrome 90+
- Firefox 85+
- Safari 14+
- Edge 90+

## 📧 Contact

- **Email:** munjal@outlook.in
- **LinkedIn:** [linkedin.com/in/munjalnyk](https://www.linkedin.com/in/munjalnyk)
- **GitHub:** [github.com/yorocoboy1](https://github.com/yorocoboy1)

## 📄 License

© 2025 Munjal Nayak. All rights reserved.