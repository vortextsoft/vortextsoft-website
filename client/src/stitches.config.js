/**
 * stitches.config.js
 * Advanced Stitches CSS-in-JS Design Engine & Animation System for Vortextsoft
 * Enterprise Corporate Tech Theme: Kinetic Weightlessness
 */
import { createStitches } from '@stitches/react'

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
  prefix: 'vs',

  /* ── Design Tokens ─────────────────────────────────────────────── */
  theme: {
    colors: {
      // Deep Slates & Cosmic Blacks
      cosmicBlack:   '#010409',
      deepSlate:     '#06090f',
      voidSlate:     '#0a0e1a',
      stellarSlate:  '#0d1421',
      panelSlate:    '#111827',
      slateBorder:   '#1f293d',

      // Stark Whites & Text Hierarchy
      textStark:     '#ffffff',
      textPrimary:   '#f0f6fc',
      textSecondary: 'rgba(240,246,252,0.72)',
      textMuted:     'rgba(240,246,252,0.48)',
      textGhost:     'rgba(240,246,252,0.28)',

      // Luminescent Accents
      neonCyan:      '#00C8CC',
      neonCyanBright:'#00e5ea',
      electricBlue:  '#3b82f6',
      plasmaViolet:  '#7c3aed',
      violetBright:  '#a855f7',
      emeraldGlow:   '#10b981',

      // Multi-tier Glassmorphic Alphas
      glass02:       'rgba(255,255,255,0.02)',
      glass04:       'rgba(255,255,255,0.04)',
      glass08:       'rgba(255,255,255,0.08)',
      glass12:       'rgba(255,255,255,0.12)',
      glassNeon05:   'rgba(0,200,204,0.05)',
      glassNeon12:   'rgba(0,200,204,0.12)',
      glassViolet08: 'rgba(124,58,237,0.08)',

      // Borders
      borderSubtle:  'rgba(255,255,255,0.07)',
      borderMid:     'rgba(255,255,255,0.14)',
      borderStrong:  'rgba(255,255,255,0.22)',
      borderCyan:    'rgba(0,200,204,0.35)',
      borderViolet:  'rgba(124,58,237,0.30)',
    },

    fonts: {
      display: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body:    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono:    "'JetBrains Mono', 'Fira Code', monospace",
    },

    fontSizes: {
      '2xs': '0.625rem',
      xs:    '0.75rem',
      sm:    '0.875rem',
      base:  '1rem',
      lg:    '1.125rem',
      xl:    '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
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
    },

    sizes: {
      full:      '100%',
      screenW:   '100vw',
      screenH:   '100vh',
      container: '1240px',
    },

    radii: {
      none: '0',
      xs:   '4px',
      sm:   '8px',
      md:   '12px',
      lg:   '16px',
      xl:   '24px',
      full: '9999px',
    },

    shadows: {
      glowSm:  '0 0 16px rgba(0,200,204,0.20)',
      glowMd:  '0 0 32px rgba(0,200,204,0.30)',
      glowLg:  '0 0 50px rgba(0,200,204,0.40)',
      glass:   '0 12px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
      card:    '0 6px 30px rgba(0,0,0,0.35)',
    },

    transitions: {
      fast:   '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      base:   '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow:   '450ms cubic-bezier(0.4, 0, 0.2, 1)',
      spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    },

    zIndices: {
      below:   -1,
      base:     0,
      canvas:   1,
      overlay:  10,
      nav:      100,
      modal:    1000,
    },
  },

  media: {
    sm:     '(min-width: 640px)',
    md:     '(min-width: 768px)',
    lg:     '(min-width: 1024px)',
    xl:     '(min-width: 1280px)',
    motion: '(prefers-reduced-motion: no-preference)',
    hover:  '(hover: hover) and (pointer: fine)',
  },

  utils: {
    size: (v) => ({ width: v, height: v }),
    flexCenter: (_) => ({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
    gradientText: (g) => ({
      background: g,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }),
  },
})

/* ═══════════════════════════════════════════════════════════════════
   CUSTOM GLOBAL KEYFRAME ANIMATIONS
═══════════════════════════════════════════════════════════════════ */

export const floatY = keyframes({
  '0%, 100%': { transform: 'translateY(0px)' },
  '50%':       { transform: 'translateY(-12px)' },
})

export const bobFloat = keyframes({
  '0%, 100%': { transform: 'translateY(0px) rotate(-0.5deg)' },
  '50%':       { transform: 'translateY(-8px) rotate(0.5deg)' },
})

export const assembleShift = keyframes({
  '0%':   { opacity: 0, transform: 'scale(0.92) translateY(20px)' },
  '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
})

export const glowPulse = keyframes({
  '0%, 100%': {
    boxShadow:   '0 0 12px rgba(0,200,204,0.18)',
    borderColor: 'rgba(0,200,204,0.30)',
  },
  '50%': {
    boxShadow:   '0 0 28px rgba(0,200,204,0.42)',
    borderColor: 'rgba(0,200,204,0.65)',
  },
})

export const driftIn = keyframes({
  from: { opacity: 0, transform: 'translateY(24px)' },
  to:   { opacity: 1, transform: 'translateY(0)' },
})

export const shimmer = keyframes({
  '0%':   { backgroundPosition: '0% 50%' },
  '50%':  { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
})

export const ping = keyframes({
  '0%':       { transform: 'scale(1)',   opacity: 1 },
  '75%,100%': { transform: 'scale(2.4)', opacity: 0 },
})

export const scrollBounce = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%':       { transform: 'translateY(8px)' },
})

export const globalStyles = globalCss({
  '*, *::before, *::after': { boxSizing: 'border-box' },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#010409',
    color: '#f0f6fc',
    fontFamily: "$body",
    overflowX: 'hidden',
  },
})
