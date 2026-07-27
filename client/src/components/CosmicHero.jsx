/**
 * CosmicHero.jsx
 * Fully immersive hero section for Vortextsoft.
 * Layered glassmorphic UI + WebGL particle scene.
 */

import { Fragment, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import {
  styled,
  globalStyles,
  glowPulse,
  driftIn,
  shimmer,
  ping,
  scrollBounce,
  bobFloat,
} from '../stitches.config'

const CosmicCanvas = lazy(() => import('./CosmicCanvas'))

/* ══════════════════════════════════════════════════════════════════
   STYLED COMPONENTS
══════════════════════════════════════════════════════════════════ */

const HeroSection = styled('section', {
  position: 'relative',
  minHeight: '100vh',
  display:   'flex',
  alignItems: 'center',
  overflow:  'hidden',

  background: 'linear-gradient(150deg, #010409 0%, #06090f 35%, #0a0e1a 65%, #010409 100%)',

  '&::before': {
    content:         '""',
    position:        'absolute',
    inset:           0,
    background:      'radial-gradient(ellipse 75% 55% at 50% 42%, rgba(0,200,204,0.045) 0%, transparent 70%)',
    pointerEvents:   'none',
    zIndex:          2,
  },

  '&::after': {
    content:       '""',
    position:      'absolute',
    bottom:        0,
    left:          0,
    right:         0,
    height:        '160px',
    background:    'linear-gradient(to bottom, transparent, #010409)',
    pointerEvents: 'none',
    zIndex:        3,
  },
})

const HeroGrid = styled('div', {
  position:  'relative',
  zIndex:    10,
  width:     '100%',
  maxWidth:  '1280px',
  margin:    '0 auto',
  padding:   '140px 24px 130px',
  display:   'grid',
  gridTemplateColumns: '1fr',
  gap:       '$12',
  alignItems: 'center',

  '@md': { gridTemplateColumns: '1fr 360px', gap: '$10' },
  '@lg': { padding: '160px 48px 150px', gridTemplateColumns: '1fr 420px' },
  '@xl': { maxWidth: '1340px' },
})

const HeroContent = styled('div', {
  display:       'flex',
  flexDirection: 'column',
  gap:           '$6',
})

const FloatingBadge = styled('div', {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            '$2',
  padding:        '7px 18px',
  borderRadius:   '$full',
  background:     'rgba(0,200,204,0.08)',
  border:         '1px solid rgba(0,200,204,0.28)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  color:          '#00C8CC',
  fontSize:       '$xs',
  fontWeight:     '$semibold',
  letterSpacing:  '$widest',
  textTransform:  'uppercase',
  width:          'fit-content',

  '@motion': {
    animation: `${glowPulse} 4.5s ease-in-out infinite, ${driftIn} 0.7s ease both`,
  },
})

const BadgeDot = styled('span', {
  display:      'block',
  size:         '7px',
  borderRadius: '$full',
  background:   '#00C8CC',
  boxShadow:    '0 0 10px rgba(0,200,204,0.9)',
  flexShrink:   0,
  position:     'relative',

  '&::after': {
    content:      '""',
    position:     'absolute',
    inset:        0,
    borderRadius: '$full',
    background:   'rgba(0,200,204,0.5)',
  },

  '@motion': {
    '&::after': {
      animation: `${ping} 1.8s ease-in-out infinite`,
    },
  },
})

const HeroTitle = styled('h1', {
  margin:      0,
  fontFamily:  '$display',
  fontWeight:  '$extrabold',
  lineHeight:  '$tight',
  color:       '$textPrimary',
  fontSize:    '$5xl',

  '@md': { fontSize: '$6xl' },
  '@lg': { fontSize: '$7xl' },

  '@motion': {
    animation: `${driftIn} 0.85s ease 0.1s both`,
  },
})

const GradientWord = styled('span', {
  display:              'inline-block',
  background:           'linear-gradient(135deg, #00C8CC 0%, #3b82f6 45%, #7c3aed 90%)',
  backgroundSize:       '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor:  'transparent',
  backgroundClip:       'text',

  '@motion': {
    animation: `${shimmer} 6s ease-in-out infinite`,
  },
})

const CyanPeriod = styled('span', {
  color:                '#00C8CC',
  textShadow:           '0 0 28px rgba(0,200,204,0.7)',
  WebkitTextFillColor:  '#00C8CC',
})

const HeroSubtitle = styled('p', {
  margin:     0,
  fontSize:   '$lg',
  lineHeight: '$relaxed',
  color:      'rgba(240,246,252,0.70)',
  maxWidth:   '560px',

  '@motion': {
    animation: `${driftIn} 0.85s ease 0.2s both`,
  },
})

const CTARow = styled('div', {
  display:   'flex',
  flexWrap:  'wrap',
  gap:       '$4',
  marginTop: '$2',

  '@motion': {
    animation: `${driftIn} 0.85s ease 0.3s both`,
  },
})

const PrimaryBtn = styled(Link, {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            '$2',
  padding:        '15px 30px',
  borderRadius:   '$lg',
  background:     'linear-gradient(135deg, #00C8CC 0%, #3b82f6 60%, #7c3aed 100%)',
  backgroundSize: '200% auto',
  color:          '#010409',
  fontSize:       '$base',
  fontWeight:     '$bold',
  textDecoration: 'none',
  border:         'none',
  cursor:         'pointer',
  transition:     '$spring',
  boxShadow:      '0 0 22px rgba(0,200,204,0.22), 0 4px 18px rgba(0,0,0,0.35)',
  whiteSpace:     'nowrap',

  '@hover': {
    '&:hover': {
      transform:  'translateY(-3px) scale(1.03)',
      boxShadow:  '0 0 36px rgba(0,200,204,0.42), 0 8px 28px rgba(0,0,0,0.45)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(0.98)',
      transition: '$fast',
    },
  },

  '@motion': {
    backgroundSize: '200% auto',
    '&:hover': {
      animation: `${shimmer} 1.5s ease`,
    },
  },
})

const BtnArrow = styled('span', {
  display:    'inline-block',
  transition: 'transform $spring',

  [`${PrimaryBtn}:hover &`]: {
    transform: 'translateX(4px)',
  },
})

const GhostBtn = styled(Link, {
  display:             'inline-flex',
  alignItems:          'center',
  gap:                 '$2',
  padding:             '14px 29px',
  borderRadius:        '$lg',
  background:          'rgba(255,255,255,0.05)',
  backdropFilter:      'blur(16px) saturate(150%)',
  WebkitBackdropFilter:'blur(16px) saturate(150%)',
  color:               'rgba(240,246,252,0.88)',
  fontSize:            '$base',
  fontWeight:          '$semibold',
  textDecoration:      'none',
  border:              '1px solid rgba(255,255,255,0.12)',
  cursor:              'pointer',
  transition:          '$base',
  whiteSpace:          'nowrap',

  '@hover': {
    '&:hover': {
      background:  'rgba(0,200,204,0.09)',
      borderColor: 'rgba(0,200,204,0.42)',
      color:       '#00C8CC',
      transform:   'translateY(-2px)',
      boxShadow:   '0 0 22px rgba(0,200,204,0.14)',
    },
    '&:active': {
      transform:  'translateY(0)',
      transition: '$fast',
    },
  },
})

const StatsRow = styled('div', {
  display:    'flex',
  gap:        '$6',
  marginTop:  '$4',
  flexWrap:   'wrap',
  alignItems: 'center',

  '@motion': {
    animation: `${driftIn} 0.85s ease 0.45s both`,
  },
})

const StatItem = styled('div', {
  display:       'flex',
  flexDirection: 'column',
  gap:           '2px',
})

const StatNumber = styled('strong', {
  display:              'block',
  fontSize:             '$3xl',
  fontWeight:           '$black',
  lineHeight:           '$none',
  background:           'linear-gradient(135deg, #f0f6fc 0%, rgba(240,246,252,0.55) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor:  'transparent',
  backgroundClip:       'text',
})

const StatLabel = styled('span', {
  display:       'block',
  fontSize:      '$xs',
  color:         '$textGhost',
  letterSpacing: '$widest',
  textTransform: 'uppercase',
  fontWeight:    '$medium',
})

const StatDivider = styled('div', {
  width:      '1px',
  height:     '38px',
  background: 'rgba(255,255,255,0.08)',
  alignSelf:  'center',
})

const ChipColumn = styled('aside', {
  display: 'none',

  '@md': {
    display:       'flex',
    flexDirection: 'column',
    gap:           '$4',
    alignItems:    'flex-start',
  },
})

const ServiceChip = styled('div', {
  padding:             '11px 20px',
  borderRadius:        '$lg',
  background:          'rgba(255,255,255,0.04)',
  backdropFilter:      'blur(20px) saturate(180%)',
  WebkitBackdropFilter:'blur(20px) saturate(180%)',
  border:              '1px solid rgba(255,255,255,0.08)',
  color:               'rgba(240,246,252,0.78)',
  fontSize:            '$sm',
  fontWeight:          '$medium',
  whiteSpace:          'nowrap',
  boxShadow:           '0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)',
  transition:          '$base',
  userSelect:          'none',

  '@hover': {
    '&:hover': {
      background:  'rgba(0,200,204,0.08)',
      borderColor: 'rgba(0,200,204,0.28)',
      color:       '#00C8CC',
      transform:   'translateX(-5px)',
      boxShadow:   '0 0 16px rgba(0,200,204,0.12), 0 4px 20px rgba(0,0,0,0.35)',
    },
  },

  '@motion': {
    animation: `${bobFloat} 5s ease-in-out infinite`,
  },

  variants: {
    accent: {
      cyan: {
        border:     '1px solid rgba(0,200,204,0.22)',
        background: 'rgba(0,200,204,0.06)',
        color:      '#00C8CC',
      },
      violet: {
        border:     '1px solid rgba(124,58,237,0.22)',
        background: 'rgba(124,58,237,0.06)',
      },
      blue: {
        border:     '1px solid rgba(59,130,246,0.22)',
        background: 'rgba(59,130,246,0.06)',
      },
    },
  },
})

const ScrollIndicator = styled('div', {
  position:       'absolute',
  bottom:         '28px',
  left:           '50%',
  transform:      'translateX(-50%)',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  gap:            '$2',
  zIndex:         15,

  '@motion': {
    animation: `${scrollBounce} 2.2s ease-in-out infinite`,
  },
})

const ScrollLine = styled('div', {
  width:      '1px',
  height:     '44px',
  background: 'linear-gradient(to bottom, rgba(0,200,204,0.55), transparent)',
})

const ScrollLabel = styled('span', {
  fontSize:      '$2xs',
  color:         'rgba(240,246,252,0.28)',
  letterSpacing: '$widest',
  textTransform: 'uppercase',
  fontWeight:    '$semibold',
})

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */

const STATS = [
  { n: '15+', label: 'Projects'    },
  { n: '98%', label: 'Satisfaction'},
  { n: '2+',  label: 'Years'       },
  { n: '10+', label: 'Experts'     },
]

const CHIPS = [
  { label: '✦ AI & Machine Learning',     accent: 'cyan',   dur: '5.0s', delay: '0.0s' },
  { label: '⬡ Web Development',            accent: undefined, dur: '5.6s', delay: '0.5s' },
  { label: '◈ Mobile Applications',        accent: 'violet', dur: '6.2s', delay: '1.0s' },
  { label: '⬢ ERP Systems',               accent: undefined, dur: '4.8s', delay: '1.5s' },
  { label: '◇ IoT & Embedded',             accent: 'violet', dur: '6.5s', delay: '0.8s' },
  { label: '△ DevOps & Cloud',             accent: 'blue',   dur: '5.3s', delay: '0.3s' },
]

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function CosmicHero() {
  globalStyles()

  return (
    <HeroSection aria-label="Vortextsoft — Hero">
      <Suspense fallback={null}>
        <CosmicCanvas />
      </Suspense>

      <HeroGrid>
        <HeroContent>
          <FloatingBadge role="text">
            <BadgeDot aria-hidden="true" />
            Software Innovation Agency
          </FloatingBadge>

          <HeroTitle>
            Empower Your<br />
            <GradientWord>Business</GradientWord> with<br />
            Vortextsoft<CyanPeriod aria-hidden="true">.</CyanPeriod>
          </HeroTitle>

          <HeroSubtitle>
            Delivering cutting-edge AI/ML, web, mobile, and enterprise solutions
            that are scalable, high-performance, and future-ready.
          </HeroSubtitle>

          <CTARow>
            <PrimaryBtn
              to="/contact"
              id="hero-cta-contact-3d"
              aria-label="Contact Vortextsoft to start a project"
            >
              Start a Project
              <BtnArrow aria-hidden="true">→</BtnArrow>
            </PrimaryBtn>

            <GhostBtn
              to="/services"
              id="hero-cta-services-3d"
              aria-label="Explore Vortextsoft services"
            >
              Explore Services
            </GhostBtn>
          </CTARow>

          <StatsRow aria-label="Vortextsoft company statistics">
            {STATS.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <StatDivider aria-hidden="true" />}
                <StatItem>
                  <StatNumber aria-label={`${s.n} ${s.label}`}>
                    {s.n}
                  </StatNumber>
                  <StatLabel>{s.label}</StatLabel>
                </StatItem>
              </Fragment>
            ))}
          </StatsRow>
        </HeroContent>

        <ChipColumn aria-hidden="true">
          {CHIPS.map((chip) => (
            <ServiceChip
              key={chip.label}
              accent={chip.accent}
              css={{
                animationDuration: chip.dur,
                animationDelay:    chip.delay,
              }}
            >
              {chip.label}
            </ServiceChip>
          ))}
        </ChipColumn>
      </HeroGrid>

      <ScrollIndicator aria-hidden="true">
        <ScrollLine />
        <ScrollLabel>scroll</ScrollLabel>
      </ScrollIndicator>
    </HeroSection>
  )
}
