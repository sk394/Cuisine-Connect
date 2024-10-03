"use client"

import * as React from "react"
import ReactLenis from "@studio-freight/react-lenis"

export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, syncTouch: true }}>
      {children}
    </ReactLenis>
  )
}