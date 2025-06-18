"use client"

import { useEffect, useRef } from 'react'
import styles from './interactive-background.module.css'

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
  baseDepth: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.color = `hsla(${Math.random() * 60 + 240}, 70%, 50%`
    this.alpha = Math.random() * 0.5 + 0.5
    this.baseDepth = Math.random() * 100
  }

  update(mouseX: number, mouseY: number, width: number, height: number, time: number) {
    this.x += this.speedX
    this.y += this.speedY

    // Boundary check
    if (this.x > width || this.x < 0) this.speedX *= -1
    if (this.y > height || this.y < 0) this.speedY *= -1

    // Mouse interaction
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 100) {
      const angle = Math.atan2(dy, dx)
      this.x -= Math.cos(angle) * 1
      this.y -= Math.sin(angle) * 1
      this.alpha = Math.min(1, this.alpha + 0.05)
    } else {
      this.alpha = Math.max(0.5, this.alpha - 0.01)
    }

    return {
      depth: Math.sin(time * 0.5 + this.baseDepth * 0.02) * 50,
      distance
    }
  }

  draw(ctx: CanvasRenderingContext2D, depth: number) {
    const scale = (1000 - depth) / 1000
    
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(scale, scale)
    ctx.beginPath()
    ctx.arc(0, 0, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `${this.color}, ${this.alpha * scale})`
    ctx.fill()
    ctx.restore()
  }
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create particles
    const particles: Particle[] = []
    const width = canvas.width
    const height = canvas.height
    
    // Adjust particle count based on device performance and screen size
    const particleCount = Math.min(
      Math.floor((width * height) / 10000),
      window.innerWidth < 768 ? 100 : 200
    )
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height))
    }

    // Mouse/touch position tracking
    let mouseX = width / 2
    let mouseY = height / 2

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      
      if (e instanceof MouseEvent) {
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      } else {
        const touch = e.touches[0]
        if (!touch) return
        mouseX = touch.clientX - rect.left
        mouseY = touch.clientY - rect.top
      }
    }

    // Add both mouse and touch event listeners
    canvas.addEventListener('mousemove', handleInteraction)
    canvas.addEventListener('touchmove', handleInteraction)
    canvas.addEventListener('touchstart', handleInteraction)

    let time = 0
    // Animation loop
    const animate = () => {
      time += 0.016 // Approximate for 60fps

      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Update and store particle depths
      const particleData = particles.map((particle, i) => ({
        particle,
        ...particle.update(mouseX, mouseY, width, height, time)
      }))

      // Sort particles by depth for proper 3D rendering
      particleData.sort((a, b) => b.depth - a.depth)

      // Draw particles
      particleData.forEach(({ particle, depth }) => {
        particle.draw(ctx, depth)
      })

      // Connect nearby particles with depth-aware connections
      for (let i = 0; i < particleData.length; i++) {
        for (let j = i + 1; j < particleData.length; j++) {
          const distance = particleData[i].distance
          if (distance < 100) {
            const avgScale = ((1000 - particleData[i].depth) / 1000 + 
                            (1000 - particleData[j].depth) / 1000) / 2
            
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance / 100) * avgScale})`
            ctx.lineWidth = 1 * avgScale
            ctx.moveTo(particleData[i].particle.x, particleData[i].particle.y)
            ctx.lineTo(particleData[j].particle.x, particleData[j].particle.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      canvas.removeEventListener('mousemove', handleInteraction)
      canvas.removeEventListener('touchmove', handleInteraction)
      canvas.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  )
}