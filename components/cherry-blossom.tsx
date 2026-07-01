"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Petal = () => (
  <svg viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C15 0 22.5 5 25 15C27.5 25 15 30 15 30C15 30 2.5 25 5 15C7.5 5 15 0 15 0Z" />
  </svg>
)

export default function CherryBlossoms() {
  const [petals, setPetals] = useState<any[]>([])
  const [trailPetals, setTrailPetals] = useState<any[]>([])

  useEffect(() => {
    // Generate static falling petals
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // start X position (vw)
      y: -10 - Math.random() * 20, // start Y position (vh)
      size: 10 + Math.random() * 15,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 15,
      rotation: Math.random() * 360,
      drift: (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 15)
    }))
    setPetals(newPetals)
  }, [])

  // Mouse trail effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle generating petals
      if (Math.random() > 0.8) {
        const newTrailPetal = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: 8 + Math.random() * 10,
          rotation: Math.random() * 360,
        }
        setTrailPetals(prev => [...prev.slice(-15), newTrailPetal]) // Keep max 15 trail petals
      }
      
      // Auto cleanup
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setTrailPetals([]), 2000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  if (petals.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[40] js-only" aria-hidden="true">
      {/* Falling background petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-primary/40 dark:text-primary/20"
          initial={{
            x: `${petal.x}vw`,
            y: `${petal.y}vh`,
            rotate: petal.rotation,
            opacity: 0
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [`${petal.x}vw`, `${petal.x + petal.drift}vw`],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: petal.size, height: petal.size }}
        >
          <Petal />
        </motion.div>
      ))}

      {/* Mouse trail petals */}
      <AnimatePresence>
        {trailPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-primary/70 dark:text-primary/50 drop-shadow-sm"
            initial={{
              x: petal.x,
              y: petal.y,
              rotate: petal.rotation,
              opacity: 1,
              scale: 0.5
            }}
            animate={{
              y: petal.y + 30 + Math.random() * 50,
              x: petal.x + (Math.random() > 0.5 ? 20 : -20),
              rotate: petal.rotation + 180,
              opacity: 0,
              scale: 1.2
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
            style={{ width: petal.size, height: petal.size, marginLeft: -petal.size/2, marginTop: -petal.size/2 }}
          >
            <Petal />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
