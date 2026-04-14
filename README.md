# Munjal Nayak — Portfolio Website

**Live Site:** [https://munjal.dev](https://munjal.dev)

---

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** — utility-first styling with custom gold luxury theme
- **Framer Motion** — scroll animations, page transitions, spring physics
- **Lenis** — smooth scrolling
- **Lucide React** — icons (Skills section)

---

## Project Structure

```
munjal_dev/
├── index.html                  # Entry HTML (fonts, meta tags, favicon)
├── vite.config.ts              # Vite config (publicDir = 'assets')
├── tailwind.config.js          # Theme: colors, fonts, animations
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Main app layout + preloader + under-dev popup
│   ├── index.css               # Global CSS (grain, glass, gradients, scrollbar)
│   ├── data/
│   │   └── index.ts            # ⭐ ALL CONTENT LIVES HERE — edit this file
│   └── components/
│       ├── Hero.tsx             # Landing section (name, roles, profile photo, CTAs)
│       ├── About.tsx            # Bio, profile image, stats, social links
│       ├── ValueProp.tsx        # "What I Bring" — 4 value cards
│       ├── Experience.tsx       # Timeline (work + education)
│       ├── Skills.tsx           # 4 skill categories with animated bars
│       ├── Projects.tsx         # Featured project + grid with images
│       ├── Contact.tsx          # Contact links + form + "available" banner
│       ├── Navbar.tsx           # Glass nav with section highlighting
│       ├── Footer.tsx           # Social links, copyright, watermark
│       ├── Preloader.tsx        # Cinematic 0-100% loading screen
│       ├── MarqueeDivider.tsx   # Scrolling text divider
│       ├── CustomCursor.tsx     # Gold dot + ring cursor (desktop)
│       ├── ScrollProgress.tsx   # Top progress bar
│       ├── SmoothScroll.tsx     # Lenis smooth scroll wrapper
│       ├── SpotlightCard.tsx    # 3D tilt card with cursor spotlight
│       ├── MagneticButton.tsx   # Spring-physics hover effect
│       └── TextReveal.tsx       # Word-by-word scroll reveal
└── assets/                      # Static files (served by Vite)
    ├── img/                     # Profile photo, project images, favicon
    └── pdf/                     # CV and documents
```

---

## How to Edit Content

**Everything you need to change is in one file:**

```
src/data/index.ts
```

### Personal Info

```ts
export const personalInfo = {
  name: 'Munjal Nayak',
  title: 'Hardware & Embedded Systems Engineer',       // shown below name in Hero
  roles: [                                              // rotating text in Hero
    'Embedded Systems Engineer',
    'Hardware Designer',
    // add/remove roles here...
  ],
  bio: '...',               // long bio — shown in About section
  bioShort: '...',          // one-liner — shown below bio in About
  location: 'Sydney, NSW, Australia',
  status: 'Open to Opportunities',    // badge in Hero (top-left)
  email: 'munjal@outlook.in',
  phone: '+61 420 932 011',
  linkedin: 'https://linkedin.com/in/munjalnyk',
  github: 'https://github.com/yorocoboy1',
  cvUrl: '/pdf/CV_Munjal_Nayak.pdf',       // path inside assets/pdf/
  profileImg: '/img/perfil.png',            // path inside assets/img/
  stats: [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects' },
    { value: '2', label: 'Publications' },
  ],
}
```

**To change your CV:** Replace `assets/pdf/CV_Munjal_Nayak.pdf` with your new file, then update `cvUrl`.

**To change your profile photo:** Replace `assets/img/perfil.png`, then update `profileImg`.

### Experience (Work & Education)

```ts
export const experiences = [
  {
    type: 'work',           // 'work' or 'education' — changes badge style + timeline dot
    role: 'ETCS Application Engineer',
    company: 'Alstom',
    duration: '2023 — 2025',
    location: 'India',
    description: 'Short summary shown as subtitle',
    bullets: [              // detail points — leave [] for none (education entries)
      'First bullet point',
      'Second bullet point',
    ],
    tags: ['SIL4', 'ETCS', 'Railway'],    // small pills at bottom of card
  },
  // add more entries...
]
```

**Order matters** — entries appear top to bottom as listed in the array.

### Skills

```ts
export const skillCategories = [
  {
    category: 'Core Hardware',      // card title
    icon: 'Cpu',                    // icon name — must match import in Skills.tsx
    color: '#00e5ff',               // accent color for bars, glow, icon
    skills: [                       // each gets an animated bar
      'PCB & Schematic Design',
      'Component Selection & Derating',
      // add/remove skills...
    ],
  },
  // ... more categories
]
```

**Available icons:** `Cpu`, `Code2`, `Server`, `Shield` (from lucide-react). To add a new icon, import it in `src/components/Skills.tsx` and add it to the `iconMap`.

**To change a category color:** Use any hex color (e.g., `'#ff6b6b'`).

### Projects

```ts
export const projects = [
  {
    title: 'NCRTC MRTS Delhi — EVC3 Onboard',
    category: 'Professional · Railway',     // small label above title
    description: '...',
    tags: ['Onboard ETCS', 'Data Engineering', 'SIL4', 'EVC3'],
    accent: '#00e5ff',          // card accent color (tags, hover effects)
    image: '/img/portfolio1.png',   // project image — put in assets/img/
    featured: true,             // true = large featured card, false = grid card
  },
  // ...
]
```

**Only one project should have `featured: true`** — it gets a full-width hero-style card. The rest appear in a 3-column grid.

**To add a project link (GitHub, demo, etc.):** Add a `link` field to the data and update `src/components/Projects.tsx` to render it. Example:

```ts
// In src/data/index.ts — add to any project:
link: 'https://github.com/yorocoboy1/my-project',

// Then in src/components/Projects.tsx — add inside the card JSX:
{project.link && (
  <a href={project.link} target="_blank" rel="noopener noreferrer"
     className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline">
    View Project →
  </a>
)}
```

### Publications

```ts
export const publications = [
  {
    journal: 'ELSEVIER — Engineering Applications of Artificial Intelligence',
    title: 'Full paper title...',
    year: '2023',
  },
  // add more...
]
```

**To add a link to a publication:** Add a `url` field and update `src/components/Projects.tsx` (PublicationCard) to wrap the title in an `<a>` tag.

---

## How to Add Links to Elements

### Project Links

Add `link` and optionally `github` fields to your project data:

```ts
// src/data/index.ts
{
  title: 'My Project',
  // ... other fields
  link: 'https://my-demo.com',        // live demo URL
  github: 'https://github.com/...',   // source code URL
}
```

Then edit `src/components/Projects.tsx` to render them inside the card.

### Publication Links

```ts
// src/data/index.ts
{
  journal: '...',
  title: '...',
  year: '2023',
  url: 'https://doi.org/10.1016/...',   // add this
}
```

Then update `PublicationCard` in `src/components/Projects.tsx` to link the title.

### Social Links

Edit `personalInfo.linkedin`, `personalInfo.github`, `personalInfo.email` in `src/data/index.ts`. These are used automatically by:
- Hero section (CTA buttons)
- About section (connect links)
- Contact section (contact links)
- Footer (social links)
- Navbar (resume button uses `cvUrl`)

### Navigation Links

Edit the `navLinks` array in `src/components/Navbar.tsx`:

```ts
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]
```

Each `href` must match a section's `id` attribute.

---

## How to Change Styling

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  bg: { DEFAULT: '#050505', card: '#0e0e0e', ... },
  accent: { DEFAULT: '#c8a96e', light: '#dfc49b', ... },  // gold theme
  text: { primary: '#f0f0f0', secondary: '#8a8a8a', ... },
}
```

### Fonts

Fonts are loaded in `index.html` (Google Fonts link) and configured in `tailwind.config.js`:

```js
fontFamily: {
  display: ['Syne'],           // headings
  grotesk: ['"Space Grotesk"'], // UI text
  sans: ['Inter'],              // body text
  mono: ['"JetBrains Mono"'],   // code/labels
}
```

To change a font: update both the Google Fonts URL in `index.html` and the `fontFamily` in `tailwind.config.js`.

---

## How to Add/Remove Sections

Sections are rendered in `src/App.tsx`:

```tsx
<Hero />
<MarqueeDivider />
<About />
<ValueProp />
<Experience />
<Skills />
<Projects />
<MarqueeDivider />
<Contact />
```

Remove a line to hide a section. Add a new component to create one. Update `Navbar.tsx` navLinks if you add/remove sections.

---

## How to Remove the "Under Development" Popup

In `src/App.tsx`, delete or comment out the `showBanner` state and the entire `{/* Under Development Popup */}` block.

---

## Static Assets

All files in the `assets/` folder are served at the root URL:

| File location | URL in code |
|---|---|
| `assets/img/perfil.png` | `/img/perfil.png` |
| `assets/pdf/CV_Munjal_Nayak.pdf` | `/pdf/CV_Munjal_Nayak.pdf` |
| `assets/img/portfolio1.png` | `/img/portfolio1.png` |

To add new images or PDFs, put them in `assets/img/` or `assets/pdf/` and reference them with `/img/filename` or `/pdf/filename` (no `assets` prefix).

---

## Development

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # production build → dist/
npm run preview      # preview production build
```

---

## Contact

- **Email:** munjal@outlook.in
- **LinkedIn:** [linkedin.com/in/munjalnyk](https://linkedin.com/in/munjalnyk)
- **GitHub:** [github.com/yorocoboy1](https://github.com/yorocoboy1)
