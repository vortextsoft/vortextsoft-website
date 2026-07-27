/**
 * stitches.config.js
 * Premium design token system for Vortextsoft — Cosmic Float Theme
 * CSS-in-JS via @stitches/react
 */
import { createStitches } from '@stitches/react'

/* ── Core createStitches export ─────────────────────────────────────── */
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  /**
   * 'vs' prefix namespaces all generated class names, e.g. vs-hash,
   * preventing any collisions with the existing global CSS files.
   */
  prefix: 'vs',

  /* ── Design Tokens ─────────────────────────────────────────────── */
  theme: {
    colors: {
      // ── Cosmic Backgrounds ───────────────────────────────────────
      cosmicBlack:   '#010409',
      deepSpace:     '#06090f',
      nebulaDark:    '#0a0e1a',
      voidBlue:      '#0d1421',
      stellarMid:    '#111827',

      // ── Brand / Accent ───────────────────────────────────────────
      // Primary teal — matches existing Vortextsoft #00C8CC brand colour
      neonCyan:      '#00C8CC',
      neonCyanBright:'#00e5ea',
      electricBlue:  '#3b82f6',
      plasmaViolet:  '#7c3aed',
      violetBright:  '#a855f7',
      coralFlare:    '#f97316',

      // ── Alpha Glass Surfaces ─────────────────────────────────────
      glass01:    'rgba(255,255,255,0.01)',
      glass03:    'rgba(255,255,255,0.03)',
      glass05:    'rgba(255,255,255,0.05)',
      glass08:    'rgba(255,255,255,0.08)',
      glass12:    'rgba(255,255,255,0.12)',
      glass18:    'rgba(255,255,255,0.18)',
      glassNeon05:'rgba(0,200,204,0.05)',
      glassNeon10:'rgba(0,200,204,0.10)',
      glassNeon20:'rgba(0,200,204,0.20)',
      glassViolet:'rgba(124,58,237,0.08)',

      // ── Text ─────────────────────────────────────────────────────
      textPrimary:   '#f0f6fc',
      textSecondary: 'rgba(240,246,252,0.72)',
      textMuted:     'rgba(240,246,252,0.45)',
      textGhost:     'rgba(240,246,252,0.28)',

      // ── Borders ──────────────────────────────────────────────────
      borderSubtle: 'rgba(255,255,255,0.06)',
      borderMid:    'rgba(255,255,255,0.12)',
      borderStrong: 'rgba(255,255,255,0.20)',
      borderGlow:   'rgba(0,200,204,0.28)',
      borderNeon:   'rgba(0,200,204,0.55)',
      borderViolet: 'rgba(124,58,237,0.30)',
    },

    fonts: {
      display: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body:    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono:    "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    },

    fontSizes: {
      '2xs': '0.625rem',   // 10px
      xs:    '0.75rem',    // 12px
      sm:    '0.875rem',   // 14px
      base:  '1rem',       // 16px
      lg:    '1.125rem',   // 18px
      xl:    '1.25rem',    // 20px
      '2xl': '1.5rem',     // 24px
      '3xl': '1.875rem',   // 30px
      '4xl': '2.25rem',    // 36px
      '5xl': '3rem',       // 48px
      '6xl': '3.75rem',    // 60px
      '7xl': '4.5rem',     // 72px
      '8xl': '6rem',       // 96px
    },

    fontWeights: {
      normal:    400,
      medium:    500,
      semibold:  600,
      bold:      700,
      extrabold: 800,
      black:     900,
    },

    lineHeights: {
      none:    1,
      tight:   1.1,
      snug:    1.25,
      normal:  1.5,
      relaxed: 1.75,
    },

    letterSpacings: {
      tighter: '-0.05em',
      tight:   '-0.025em',
      normal:  '0em',
      wide:    '0.05em',
      wider:   '0.08em',
      widest:  '0.15em',
    },

    space: {
      1:  '0.25rem',
      2:  '0.5rem',
      3:  '0.75rem',
      4:  '1rem',
      5:  '1.25rem',
      6:  '1.5rem',
      8:  '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },

    sizes: {
      full:    '100%',
      screen:  '100vw',
      screenH: '100vh',
      xs:      '320px',
      sm:      '640px',
      md:      '768px',
      lg:      '1024px',
      xl:      '1280px',
      '2xl':   '1536px',
      container: '1200px',
    },

    radii: {
      none: '0',
      xs:   '4px',
      sm:   '6px',
      md:   '12px',
      lg:   '16px',
      xl:   '24px',
      '2xl':'32px',
      '3xl':'48px',
      full: '9999px',
    },

    shadows: {
      // Neon cyan glow
      glowSm:  '0 0 12px rgba(0,200,204,0.20)',
      glowMd:  '0 0 24px rgba(0,200,204,0.30), 0 0 48px rgba(0,200,204,0.12)',
      glowLg:  '0 0 40px rgba(0,200,204,0.35), 0 0 80px rgba(0,200,204,0.15)',
      glowXl:  '0 0 60px rgba(0,200,204,0.40), 0 0 120px rgba(0,200,204,0.18)',

      // Glassmorphic panel shadows
      glass:   '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
      glassMd: '0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09)',
      glassLg: '0 24px 64px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.11)',

      // Utility
      card: '0 4px 24px rgba(0,0,0,0.30)',
      lift: '0 20px 60px rgba(0,0,0,0.50)',
    },

    transitions: {
      instant: '80ms cubic-bezier(0.4,0,0.2,1)',
      fast:    '150ms cubic-bezier(0.4,0,0.2,1)',
      base:    '250ms cubic-bezier(0.4,0,0.2,1)',
      slow:    '400ms cubic-bezier(0.4,0,0.2,1)',
      spring:  '520ms cubic-bezier(0.34,1.56,0.64,1)',
      bounce:  '600ms cubic-bezier(0.68,-0.55,0.265,1.55)',
    },

    zIndices: {
      below:   -1,
      base:     0,
      canvas:   1,   // 3D WebGL canvas
      overlay:  10,  // UI layer above canvas
      nav:      100, // Site navigation
      modal:    1000,
      toast:    9999,
    },
  },

  /* ── Responsive Breakpoints ────────────────────────────────────── */
  media: {
    sm:     '(min-width: 640px)',
    md:     '(min-width: 768px)',
    lg:     '(min-width: 1024px)',
    xl:     '(min-width: 1280px)',
    '2xl':  '(min-width: 1536px)',
    // Accessibility media queries
    motion: '(prefers-reduced-motion: no-preference)',
    hover:  '(hover: hover) and (pointer: fine)',
    dark:   '(prefers-color-scheme: dark)',
  },

  /* ── Custom Utility Props ──────────────────────────────────────── */
  utils: {
    /** Square element: size="40px" */
    size: (v) => ({ width: v, height: v }),

    /** Quick flex centering */
    flexCenter: (_) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    /** Absolute fill parent */
    absoluteFill: (_) => ({
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
    }),

    /** Gradient text clip */
    gradientText: (gradient) => ({
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }),

    /** Single-line truncate */
    truncate: (_) => ({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
  },
})

/* ═══════════════════════════════════════════════════════════════════
   KEYFRAME ANIMATIONS
   All animations respect prefers-reduced-motion via '@motion' media
   key in Stitches styled components.
═══════════════════════════════════════════════════════════════════ */

/** Gentle vertical float — hero badge, service chips */
export const floatY = keyframes({
  '0%,100%': { transform: 'translateY(0px)' },
  '50%':     { transform: 'translateY(-14px)' },
})

/** Multi-axis bob — glassmorphic cards, floating labels */
export const bobFloat = keyframes({
  '0%,100%': { transform: 'translateY(0px) rotate(-0.4deg)' },
  '40%':     { transform: 'translateY(-10px) rotate(0.5deg)' },
  '80%':     { transform: 'translateY(-5px) rotate(-0.2deg)' },
})

/** Slow drift — large background elements */
export const driftSlow = keyframes({
  '0%':    { transform: 'translateY(0px) translateX(0px)' },
  '33%':   { transform: 'translateY(-8px) translateX(4px)' },
  '66%':   { transform: 'translateY(-4px) translateX(-3px)' },
  '100%':  { transform: 'translateY(0px) translateX(0px)' },
})

/** Neon border glow pulse — badges, CTA borders */
export const glowPulse = keyframes({
  '0%,100%': {
    boxShadow:   '0 0 12px rgba(0,200,204,0.18), 0 0 24px rgba(0,200,204,0.08)',
    borderColor: 'rgba(0,200,204,0.30)',
  },
  '50%': {
    boxShadow:   '0 0 24px rgba(0,200,204,0.40), 0 0 48px rgba(0,200,204,0.18)',
    borderColor: 'rgba(0,200,204,0.62)',
  },
})

/** Fade + drift up entrance */
export const driftIn = keyframes({
  from: { opacity: 0, transform: 'translateY(28px)' },
  to:   { opacity: 1, transform: 'translateY(0)' },
})

/** Fade + drift in from left */
export const driftInLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-28px)' },
  to:   { opacity: 1, transform: 'translateX(0)' },
})

/** Fade + drift in from right — floating service chips */
export const driftInRight = keyframes({
  from: { opacity: 0, transform: 'translateX(28px)' },
  to:   { opacity: 1, transform: 'translateX(0)' },
})

/** Gradient background shimmer — animated gradient text */
export const shimmer = keyframes({
  '0%':   { backgroundPosition: '0% 50%' },
  '50%':  { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
})

/** Sonar ping — live indicator dot */
export const ping = keyframes({
  '0%':       { transform: 'scale(1)',   opacity: 1 },
  '75%,100%': { transform: 'scale(2.4)', opacity: 0 },
})

/** Scroll indicator bounce */
export const scrollBounce = keyframes({
  '0%,100%': { transform: 'translateY(0)' },
  '50%':     { transform: 'translateY(9px)' },
})

/** Button press scale */
export const pressDown = keyframes({
  '0%,100%': { transform: 'scale(1)' },
  '50%':     { transform: 'scale(0.97)' },
})

/** Rotate continuously — decorative spinners, loading rings */
export const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to:   { transform: 'rotate(360deg)' },
})

/** Text cursor blink */
export const blink = keyframes({
  '0%,100%': { opacity: 1 },
  '50%':     { opacity: 0 },
})

/* ── Global base styles ─────────────────────────────────────────── */
export const globalStyles = globalCss({
  '*, *::before, *::after': { boxSizing: 'border-box' },

  ':root': {
    // Expose theme colours as CSS custom properties for non-Stitches consumers
    '--vs-cyan':   '#00C8CC',
    '--vs-violet': '#7c3aed',
    '--vs-blue':   '#3b82f6',
  },

  // Screen-reader utility class usable anywhere in the app
  '.vs-sr-only': {
    position:   'absolute',
    width:       '1px',
    height:      '1px',
    padding:     '0',
    margin:      '-1px',
    overflow:    'hidden',
    clip:        'rect(0,0,0,0)',
    whiteSpace:  'nowrap',
    borderWidth: '0',
  },
})
