/**
 * CosmicCanvas.jsx
 * React Three Fiber WebGL scene — floating geometric particle field
 * with dynamic mouse-cursor repulsion and upward drift.
 */

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Constants ───────────────────────────────────────────────────────── */
const ICOS_COUNT   = 85   // Primary cyan wireframe icosahedra
const OCTA_COUNT   = 28   // Secondary purple solid octahedra (back layer)
const REPULSE_R    = 4.5  // Mouse repulsion radius (world units)
const REPULSE_STR  = 0.22 // Repulsion force strength

/* ════════════════════════════════════════════════════════════════════
   HOOK — global mouse tracker
════════════════════════════════════════════════════════════════════ */
function useGlobalMouse() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return mouse
}

/* ════════════════════════════════════════════════════════════════════
   INNER R3F SCENE
════════════════════════════════════════════════════════════════════ */
function CosmicScene({ mouse }) {
  const icosRef      = useRef()
  const octaRef      = useRef()
  const glowLightRef = useRef()

  const { viewport } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const icoData = useMemo(() =>
    Array.from({ length: ICOS_COUNT }, () => ({
      px:    (Math.random() - 0.5) * 30,
      py:    (Math.random() - 0.5) * 18,
      pz:    (Math.random() - 0.5) * 6,
      vx:    (Math.random() - 0.5) * 0.013,
      vy:    Math.random() * 0.016 + 0.006,
      scale: Math.random() * 0.20 + 0.07,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.7 + 0.3,
      rx:    (Math.random() - 0.5) * 2,
      ry:    (Math.random() - 0.5) * 2,
    }))
  , [])

  const octaData = useMemo(() =>
    Array.from({ length: OCTA_COUNT }, () => ({
      px:    (Math.random() - 0.5) * 30,
      py:    (Math.random() - 0.5) * 18,
      pz:    -4 - Math.random() * 5,
      vx:    (Math.random() - 0.5) * 0.007,
      vy:    Math.random() * 0.009 + 0.003,
      scale: Math.random() * 0.40 + 0.14,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.4 + 0.2,
    }))
  , [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const W = viewport.width
    const H = viewport.height

    const mx = ((mouse.current.x / window.innerWidth)  * 2 - 1) * (W * 0.5)
    const my = (-(mouse.current.y / window.innerHeight) * 2 + 1) * (H * 0.5)

    if (glowLightRef.current) {
      const l = glowLightRef.current
      l.position.x += (mx - l.position.x) * 0.07
      l.position.y += (my - l.position.y) * 0.07
    }

    if (icosRef.current) {
      for (let i = 0; i < ICOS_COUNT; i++) {
        const p = icoData[i]

        p.px += p.vx + Math.sin(t * p.spd + p.phase) * 0.004
        p.py += p.vy

        if (p.py > 10)   { p.py = -10; p.px = (Math.random() - 0.5) * 30 }
        if (p.px >  16)    p.px = -16
        if (p.px < -16)    p.px =  16

        const dx = p.px - mx
        const dy = p.py - my
        const dist2 = dx * dx + dy * dy

        if (dist2 < REPULSE_R * REPULSE_R && dist2 > 0.01) {
          const dist  = Math.sqrt(dist2)
          const ratio = 1 - dist / REPULSE_R
          const force = ratio * ratio * REPULSE_STR
          p.px += (dx / dist) * force
          p.py += (dy / dist) * force
        }

        dummy.position.set(p.px, p.py, p.pz)
        dummy.rotation.x = t * 0.30 * p.rx
        dummy.rotation.y = t * 0.22 * p.ry
        dummy.scale.setScalar(p.scale)
        dummy.updateMatrix()
        icosRef.current.setMatrixAt(i, dummy.matrix)
      }
      icosRef.current.instanceMatrix.needsUpdate = true
    }

    if (octaRef.current) {
      for (let i = 0; i < OCTA_COUNT; i++) {
        const p = octaData[i]

        p.px += p.vx + Math.cos(t * p.spd * 0.4 + p.phase) * 0.003
        p.py += p.vy

        if (p.py > 10)  p.py = -10
        if (p.px > 16)  p.px = -16
        if (p.px < -16) p.px =  16

        dummy.position.set(p.px, p.py, p.pz)
        dummy.rotation.z = t * 0.18 * p.spd
        dummy.rotation.x = t * 0.12 * p.spd
        dummy.scale.setScalar(p.scale)
        dummy.updateMatrix()
        octaRef.current.setMatrixAt(i, dummy.matrix)
      }
      octaRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <>
      <ambientLight color="#060b14" intensity={0.4} />
      <pointLight position={[-9, 7, 4]}  color="#7c3aed" intensity={8}  distance={20} decay={2} />
      <pointLight position={[ 9, -5, 3]} color="#3b82f6" intensity={5}  distance={16} decay={2} />
      <pointLight
        ref={glowLightRef}
        position={[0, 0, 4]}
        color="#00C8CC"
        intensity={14}
        distance={10}
        decay={2}
      />

      <instancedMesh
        ref={icosRef}
        args={[null, null, ICOS_COUNT]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#00C8CC"
          wireframe
          transparent
          opacity={0.48}
        />
      </instancedMesh>

      <instancedMesh
        ref={octaRef}
        args={[null, null, OCTA_COUNT]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#5b21b6"
          emissive="#7c3aed"
          emissiveIntensity={0.9}
          transparent
          opacity={0.14}
        />
      </instancedMesh>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OUTER CANVAS WRAPPER
════════════════════════════════════════════════════════════════════ */
export default function CosmicCanvas() {
  const mouse = useGlobalMouse()

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) return null

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 11], fov: 58, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <CosmicScene mouse={mouse} />
      </Suspense>
    </Canvas>
  )
}
