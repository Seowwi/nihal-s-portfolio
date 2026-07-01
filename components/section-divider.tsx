"use client"

import { motion } from "framer-motion"
import { Flower2 } from "lucide-react"

export default function SectionDivider() {
  return (
    <div className="w-full flex justify-center items-center py-8 relative z-20 -my-8 pointer-events-none">
      <div className="w-1/4 max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <motion.div 
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-6 text-primary/60 bg-background p-2 rounded-full shadow-sm border border-primary/10"
      >
        <Flower2 className="w-6 h-6 animate-pulse-slow" strokeWidth={1.5} />
      </motion.div>
      <div className="w-1/4 max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
    </div>
  )
}
