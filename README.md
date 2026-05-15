# 🖥️ IBRAHIM_OS — Terminal Portfolio v3.0

> A production-grade React + TypeScript portfolio website styled as a futuristic developer operating system.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

## 🎯 Concept

This portfolio is not a typical webpage — it's an **interactive Terminal OS experience**. Visitors "boot into" the developer's mind through a fake BIOS sequence, navigate through terminal-styled pages, and can even use a fully functional command-line interface.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Architecture

```
src/
├── components/
│   ├── common/          # Button, Card, Badge, ErrorBoundary, List, LoadingScreen
│   ├── layout/          # Navbar, Footer, PageLayout, SidePanel
│   └── terminal/        # TerminalWindow (the showstopper)
├── pages/
│   ├── Home.tsx          # Boot sequence + hero with typewriter
│   ├── About.tsx         # Terminal-style bio + tech stack
│   ├── Projects/
│   │   ├── index.tsx     # Filterable project grid with debounced search
│   │   └── ProjectDetail.tsx  # Dynamic route /projects/:slug
│   ├── Skills.tsx        # System diagnostics panel
│   ├── Terminal.tsx      # Full interactive terminal
│   ├── Contact.tsx       # Terminal-styled contact form
│   └── NotFound.tsx      # Glitchy 404 page
├── hooks/                # 7 custom hooks
├── context/              # ThemeContext + TerminalContext
├── router/               # Centralized routing with code splitting
├── types/                # All TypeScript interfaces
├── data/                 # Static portfolio data
├── utils/                # Helper functions
└── styles/               # Global CSS with CRT effects
```

## ⚡ Performance Optimizations

Every optimization is documented with inline comments. Here's a summary:

### React.memo()
| Component | Why Memoized |
|-----------|-------------|
| `Navbar` | Prevents re-render when PageLayout re-renders from route changes |
| `ProjectCard` | 20+ cards in grid — only changed cards re-render on filter |
| `OutputLine` | Terminal can have 50+ lines — new commands don't re-render old lines |
| `SkillBar` | Individual bars don't re-render when sibling animations trigger |
| `FormField` | Typing in one field doesn't re-render other fields |
| `Footer`, `SidePanel` | Static content — never needs to re-render |
| `Badge`, `Button` | Receive props from parent — memo prevents prop-reference re-renders |

### useMemo()
| Location | What's Memoized | Why |
|----------|----------------|-----|
| `Projects/index.tsx` | `filteredProjects` | Filter + search runs on every render without it. With debounced search, this is the #1 optimization |
| `Skills.tsx` | `groupedSkills` | Grouping static data — computed once, not every render |
| `About.tsx` | `groupedSkills` | Same grouping optimization |
| `Navbar.tsx` | `formattedTime`, `formattedDate` | Derived from state — no need to reformat if time hasn't changed |
| `ThemeContext` | Context `value` object | **Critical** — without this, ALL context consumers re-render on any Provider parent re-render |

### useCallback()
| Location | Function | Why |
|----------|---------|-----|
| `Navbar.tsx` | `handleScroll`, `handleMobileToggle` | Event listeners — stable refs prevent add/remove churn |
| `Projects/index.tsx` | `handleProjectClick`, `handleSearchChange`, `handleCategoryChange` | Passed to memo'd children — unstable refs defeat React.memo |
| `TerminalWindow.tsx` | `handleInputChange`, `handleKeyDown`, `handleContainerClick` | Terminal re-renders frequently — stable handlers are essential |
| `Contact.tsx` | `handleChange`, `handleSubmit`, `handleSendComplete` | Form with multiple fields — each field is memo'd |
| `Home.tsx` | `handleBootComplete`, `handleViewProjects`, `handleOpenTerminal` | Passed to memo'd BootSequence and Button components |

### Code Splitting (React.lazy)
Every page is lazy-loaded. Bundle analysis:
- **Initial load**: `vendor.js` (React) + `router.js` + `Home.tsx` chunk
- **On navigate**: Only the target page chunk downloads
- **Result**: ~60% smaller initial bundle vs importing everything

### Other Optimizations
- **Intersection Observer** (not scroll events) for scroll-triggered animations
- **useThrottle** on scroll position — 6x fewer state updates during scroll
- **useDebounce** on search input — filters only after user stops typing
- **Virtualized list** in `List<T>` component for 20+ items
- **CSS-only effects** for scanlines, CRT, grid background (no JS overhead)
- **sessionStorage** for boot sequence — plays once per session
- **Passive scroll listeners** — browser can optimize scroll performance

## 🔧 TypeScript Decisions

### Strict Mode
`tsconfig.json` has ALL strict checks enabled:
- `strict: true` (enables all strict family)
- `noUnusedLocals`, `noUnusedParameters`
- `noImplicitReturns`, `noFallthroughCasesInSwitch`
- `noUncheckedIndexedAccess` — array access returns `T | undefined`

### No `any` — Ever
Every value has a specific type. Where external data shape is uncertain, we use:
- Type guards (`isProject(data)`)
- Discriminated unions (`status: { kind: 'production' } | { kind: 'archived' }`)
- Generic components (`Card<T>`, `List<T>`)

### Generic Components
`Card<T>` and `List<T>` work with any data type:
```tsx
// TypeScript infers T from data prop
<Card<Project> data={project} renderContent={(p) => <h3>{p.title}</h3>} />
<Card<Skill> data={skill} renderContent={(s) => <span>{s.name}</span>} />
```
No code duplication, full type safety at every usage site.

### Discriminated Unions
Terminal actions use discriminated unions:
```typescript
type TerminalAction =
  | { type: 'SET_INPUT'; payload: string }     // MUST have string payload
  | { type: 'SUBMIT_COMMAND'; payload: string }
  | { type: 'CLEAR' }                          // NO payload allowed
  | { type: 'HISTORY_UP' }
  | { type: 'AUTOCOMPLETE' };
```
TypeScript enforces correct payload shape per action type.

## 🎨 Visual Effects (CSS-Only)

- **Scanline overlay**: `repeating-linear-gradient` on fixed `::after`
- **CRT vignette**: `radial-gradient` with dark edges
- **Glitch text**: `clip-path` + `transform` keyframes on `::before`/`::after`
- **Neon glow**: `box-shadow` with colored rgba values
- **Grid background**: Two overlapping `linear-gradient` patterns
- **Blinking cursor**: `step-end` timing function animation
- **Loading bar**: Width animation with `ease` timing

All effects are pure CSS — zero JavaScript rendering overhead.

## 🗺️ Routing

| Route | Component | Features |
|-------|-----------|----------|
| `/` | `Home` | Boot sequence, typewriter, ASCII art |
| `/about` | `About` | Bio, tech stack, experience timeline |
| `/projects` | `Projects` | Filter, search, debounce, URL params |
| `/projects/:slug` | `ProjectDetail` | Dynamic route, useParams |
| `/skills` | `Skills` | Animated diagnostics panel |
| `/terminal` | `Terminal` | Interactive CLI |
| `/contact` | `Contact` | Validated form with send animation |
| `/admin` | Protected | Requires `?access=granted` query param |
| `*` | `NotFound` | Glitchy 404 with error details |

## 📥 CV Download

The portfolio includes a **Download CV** button on:
- Hero section (Home page)
- Contact page

Place your CV file at `public/Ibrahim_Refaat_CV.pdf`. The button uses a standard anchor tag with `download` attribute — no JavaScript needed, works offline.

## 🔮 Where Redux/Zustand Would Be Used

Comments in the codebase explain where Context API reaches its limits:

- **ThemeContext**: Perfect for Context (2 values, infrequent updates)
- **TerminalContext**: Borderline — useReducer works now, but with 10+ command types, Redux DevTools time-travel debugging would help
- **If adding**: User auth, notifications, shopping cart, multi-step forms → Zustand for less boilerplate than Redux, or Redux Toolkit for team standardization

## 📄 License

MIT — Built by Ibrahim Refaat Ibrahim

---

*"This portfolio is not a page. It's an experience."*