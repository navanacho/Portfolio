---
name: Technical Precision Portfolio
colors:
  surface: '#0e131f'
  surface-dim: '#0e131f'
  surface-bright: '#343946'
  surface-container-lowest: '#090e19'
  surface-container-low: '#161b27'
  surface-container: '#1a1f2b'
  surface-container-high: '#252a36'
  surface-container-highest: '#303541'
  on-surface: '#dee2f3'
  on-surface-variant: '#bcc9c6'
  inverse-surface: '#dee2f3'
  inverse-on-surface: '#2b303d'
  outline: '#879390'
  outline-variant: '#3d4947'
  surface-tint: '#6fd8c8'
  primary: '#6fd8c8'
  on-primary: '#003731'
  primary-container: '#30a193'
  on-primary-container: '#00302a'
  inverse-primary: '#006a60'
  secondary: '#e7c268'
  on-secondary: '#3e2e00'
  secondary-container: '#715600'
  on-secondary-container: '#f2cd72'
  tertiary: '#ffb780'
  on-tertiary: '#4e2600'
  tertiary-container: '#ca7f41'
  on-tertiary-container: '#442000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#8cf5e4'
  primary-fixed-dim: '#6fd8c8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#ffdf96'
  secondary-fixed-dim: '#e7c268'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4400'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb780'
  on-tertiary-fixed: '#2f1400'
  on-tertiary-fixed-variant: '#6f3800'
  background: '#0e131f'
  on-background: '#dee2f3'
  surface-variant: '#303541'
typography:
  display:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  code:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an engineering portfolio identity engineered for technical credibility, high performance, and calculated elegance. Targeting senior engineering leaders, founders, and recruiters, the interface communicates algorithmic rigor and architectural craftsmanship.

The visual direction merges minimalist layout precision with refined dark-mode glassmorphism. Surfaces stay deep and balanced, avoiding hyper-saturated distraction while leveraging ambient teal and petrol luminescence to suggest live terminal activity and computational energy. Micro-interactions are deliberate and crisp, responding with immediate tactile feedback rather than decorative excess.

## Colors

The palette establishes an immersive, low-light terminal workspace.

- **Primary (`#2A9D8F` - Vibrant Emerald Teal):** Primary accent denoting technical execution, commit metrics, active states, and core interactive anchors.
- **Secondary (`#E9C46A` - Golden Saffron):** High-visibility classification accent for badges, architecture tags, benchmark highlights, and featured metadata.
- **Tertiary (`#F4A261` - Warm Coral Terracotta):** Action-forcing CTA color applied sparingly to trigger conversion actions, direct contact links, and urgent states.
- **Neutral (`#1A1F2B` - Deep Charcoal Base):** Grounding substrate that absorbs glare while providing extreme legibility for high-contrast foreground layers.
- **Canvas Base Layer:** `#121620` base foundation with `#1A1F2B` mid-layer surface panels.
- **Deep Petrol (`#264653`):** Intermediate slate cyan supporting surface borders, inactive tracking pills, and subtle mesh gradients.
- **Typography & Foreground (`#FAF3E0`):** Warm off-white delivering high contrast without the eye strain of pure digital white. Secondary copy sits at `#FAF3E0` with 68% opacity, and tertiary metadata at 44% opacity.

## Typography

Typography balances mathematical precision and reading ergonomics. 

- **Geist** powers all headings, structural indicators, and data readouts. Its tight geometric aperture and monospaced heritage provide an unmistakable engineering texture.
- **Inter** handles narrative descriptions, project retrospectives, and technical writing. It ensures fatigue-free readability during long evaluation sessions.
- Monospaced parameters should use tabular numeral alignments for system stats, git metrics, and performance charts.

## Layout & Spacing

The interface adheres to an 8-point rhythmic vertical baseline paired with a 12-column adaptive fluid grid constrained to a maximum content width of 1280px.

- **Desktop (1024px+):** 12 columns, 1.5rem (`24px`) gutters, and 3rem (`48px`) outer page margin. Sections leverage generous 4rem to 6rem vertical separation to establish focused project inspection zones.
- **Tablet (768px - 1023px):** 8 columns, 1.25rem (`20px`) gutters, and 2rem (`32px`) margins. Two-column project layouts collapse gracefully into single-column cards.
- **Mobile (< 768px):** 4 columns, 1rem (`16px`) gutters, and 1.25rem (`20px`) canvas margins. Navigation collapses to an edge-anchored glass dock.

## Elevation & Depth

Spatial layering relies on translucent glass planes over muted chromatic mesh gradients rather than aggressive drop shadows.

- **Level 0 (Canvas):** Pure base tone (`#121620`) overlaid with fixed, radial gradient meshes in deep cyan (`#264653` at 15% opacity) and muted teal (`#2A9D8F` at 8% opacity) with a 120px blur radius.
- **Level 1 (Structural Cards & Containers):** Glassmorphic fill using `#1A1F2B` at 70% opacity, a 16px background blur (`backdrop-filter: blur(16px)`), and a 1px perimeter ghost border in `#FAF3E0` at 10% opacity.
- **Level 2 (Hover & Active Overlays):** `#1A1F2B` at 85% opacity, `backdrop-filter: blur(20px)`, a 1px border highlighted with `#2A9D8F` at 30% opacity, and an ambient teal drop shadow (`box-shadow: 0 12px 32px -8px rgba(42, 157, 143, 0.18)`).
- **Level 3 (Modals & Command Palettes):** `#1A1F2B` at 95% opacity with high blur (28px), surrounded by a dual-ring border (`rgba(42, 157, 143, 0.4)` inner, `rgba(0, 0, 0, 0.6)` outer) with a deep, diffused drop shadow (`0 24px 48px -12px rgba(0, 0, 0, 0.7)`).

## Shapes

The design system enforces a disciplined `roundedness: 1` standard (0.25rem base radius). This produces precise, micro-softened corners that evoke mechanical industrial equipment and modern developer IDEs.

- **Standard Containers, Code Blocks, Inputs:** `0.25rem` (`4px`).
- **Interactive Cards, Case Studies:** `rounded-lg` at `0.5rem` (`8px`).
- **Outer Shell Panels, Modals:** `rounded-xl` at `0.75rem` (`12px`).
- **Tags & Status Indicators:** Strict `0.25rem` geometry or full-pill exceptions only when functioning as live binary toggles.

## Components

### Buttons
- **Primary Action (CTA):** Warm Coral (`#F4A261`) solid background, dark slate text (`#121620`), font weight 600. On hover, shifts to slightly brighter coral with a subtle outer glow (`0 0 16px rgba(244, 162, 97, 0.35)`).
- **Secondary (Technical):** Glass panel (`#1A1F2B` at 80%), 1px border in `#2A9D8F`, text in `#2A9D8F`. Hover triggers a full background flood of `#2A9D8F` with `#121620` text.
- **Ghost / Tertiary:** Borderless, off-white text (`#FAF3E0`) at 70% opacity, transitioning to 100% opacity with a subtle `#264653` wash on hover.

### Chips & Badges
- **Architecture & Tech Stack Chips:** Flat `#1A1F2B` backdrops enclosed by a hairline 1px border of `#264653`. Text is styled in Geist label-sm using `#FAF3E0` with 80% opacity.
- **Benchmark / Metric Highlight:** Backed by `#E9C46A` at 10% opacity, 1px border in `#E9C46A` at 30%, text in `#E9C46A`.

### Lists
- Code repositories and project chronologies use flush bordered lists separated by a 1px divider in `#FAF3E0` at 6% opacity.
- List items feature hover state transitions that indent text 4px to the right and activate a vertical 2px left border strip in Emerald Teal (`#2A9D8F`).

### Checkboxes & Radio Buttons
- Form controls use 0.25rem radii, an unfilled `#121620` well, and a 1.5px border in `#264653`.
- Selected state fills with `#2A9D8F`, displaying a sharp, off-white check or dot marker.

### Input Fields
- Dark slate surface (`#121620` at 90%), 1px `#264653` border, inner text `#FAF3E0`.
- Focus state brings immediate transition: 1px border turns `#2A9D8F` paired with an internal electric drop glow (`0 0 0 1px #2A9D8F, 0 0 12px rgba(42, 157, 143, 0.25)`).

### Project & Case Study Cards
- Constructed with Level 1 glass elevation. 
- Headers feature a two-part split: technical taxonomy in saffron/teal chips on the left, and production deployment status or Git commit hash on the right.
- Visual media or live preview frames sit inset with an exact 1px border in `#264653`.

### Terminal & Code Viewer Component
- Specialized card simulating a terminal shell. 
- Header bar features three non-colored structural status dots (40% opacity), active file path in Geist Mono label font, and quick-copy action buttons that flash `#2A9D8F` upon successful buffer copy.