/**
 * Cosmic3DRouter.jsx
 * Conditional 3D Background Router & Resource Management System
 *
 * Routing Rules:
 *  • Home ('/'): Renders full-screen interactive 3D WebGL Canvas
 *  • About ('/about') & Services ('/services'): Renders scroll-responsive 3D assembly scene
 *  • Contact ('/contact') & Admin ('/admin/*'): UNMOUNTS WebGL completely.
 *    Destroys WebGL context, releases GPU memory, and ensures 100% 2D stability
 *    for maximum conversion and zero resource overhead.
 */

import React, { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

// Lazy-load WebGL canvas modules so they are only fetched when navigating to 3D routes
const CosmicCanvas = lazy(() => import('./CosmicCanvas'))
const Scroll3DScene = lazy(() => import('./Scroll3DScene'))

export default function Cosmic3DRouter() {
  const location = useLocation()
  const path = location.pathname

  // 🔴 CRITICAL EXCEPTION: Complete 3D unmount & context destruction for Contact & Admin pages
  if (path === '/contact' || path.startsWith('/admin')) {
    return null
  }

  // 🔵 Home Page: Full-screen interactive particle field
  if (path === '/') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <CosmicCanvas />
        </Suspense>
      </div>
    )
  }

  // 🟣 About & Services Pages: Scroll-assembled persistent 3D side-canvas
  if (path === '/about' || path === '/services') {
    return (
      <Suspense fallback={null}>
        <Scroll3DScene />
      </Suspense>
    )
  }

  // All other pages: pure 2D layout (returns null)
  return null
}
