/**
 * Scroll3DScene.jsx
 * Persistent 3D side-canvas scene for About & Services pages.
 * Abstract geometric structures assemble, rotate, and disassemble based on scroll depth.
 *
 * Performance:
 *  • Single Canvas element positioned fixed at top-right
 *  • Dynamic scroll tracking via passive scroll listener
 *  • Zero React state re-renders per scroll frame
 *  • Respects prefers-reduced-motion
 */

import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ScrollStructures({ scrollProgress }) {
  const groupRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const coreRef  = useRef()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Create 40 floating nodes in a geometric ring formation
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 2
      const radius = 2.8 + (i % 3) * 0.4
      return {
        baseX: Math.cos(angle) * radius,
        baseY: Math.sin(angle) * radius,
        baseZ: (i % 5) * 0.3 - 0.75,
        angle,
        speed: 0.2 + Math.random() * 0.5,
        scale: 0.08 + Math.random() * 0.06,
      }
    })
  }, [])

  const instancedMeshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const s = scrollProgress.current // 0.0 to 1.0 based on page scroll

    if (groupRef.current) {
      // Rotation and position adapt dynamically to scroll depth
      groupRef.current.rotation.y = t * 0.15 + s * Math.PI * 1.5
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + s * 0.4
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.2 - s * 1.2
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = -t * 0.2 + s * Math.PI
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.25 - s * Math.PI * 0.8
    }

    if (coreRef.current) {
      // Core structure expands and glows as user scrolls deeper
      const scale = 1 + Math.sin(t * 1.2) * 0.08 + s * 0.35
      coreRef.current.scale.setScalar(scale)
      coreRef.current.rotation.y = t * 0.4
    }

    // Update instanced nodes assembly / disassembly based on scroll
    if (instancedMeshRef.current) {
      for (let i = 0; i < 40; i++) {
        const n = nodes[i]
        // Assembly factor: nodes expand outward when scrolling down
        const scatter = 1 + s * 1.2
        const x = n.baseX * scatter
        const y = n.baseY * scatter + Math.sin(t * n.speed + n.angle) * 0.15
        const z = n.baseZ * scatter

        dummy.position.set(x, y, z)
        dummy.rotation.x = t * n.speed
        dummy.rotation.y = t * n.speed * 0.8
        dummy.scale.setScalar(n.scale * (1 + s * 0.4))
        dummy.updateMatrix()
        instancedMeshRef.current.setMatrixAt(i, dummy.matrix)
      }
      instancedMeshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      {/* Central glowing wireframe core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#00C8CC"
          wireframe
          transparent
          opacity={0.65}
          emissive="#00C8CC"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner toroid ring structure */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>

      {/* Outer toroid ring structure */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
      </mesh>

      {/* Instanced floating assembly nodes */}
      <instancedMesh ref={instancedMeshRef} args={[null, null, 40]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00C8CC"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </instancedMesh>
    </group>
  )
}

export default function Scroll3DScene() {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / totalHeight))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '45vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85,
      }}
      aria-hidden="true"
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <ambientLight color="#0a0e1a" intensity={0.6} />
        <pointLight position={[5, 5, 5]} color="#00C8CC" intensity={12} distance={15} />
        <pointLight position={[-5, -5, 2]} color="#7c3aed" intensity={8} distance={15} />
        <Suspense fallback={null}>
          <ScrollStructures scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
