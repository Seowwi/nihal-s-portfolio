"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PdfScrollViewerProps {
  isOpen: boolean;
  pdfUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export default function PdfScrollViewer({ isOpen, pdfUrl, title, onClose }: PdfScrollViewerProps) {
  const [showContent, setShowContent] = useState(false)

  // Block scroll and add class when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("pdf-open")
      // Reset content visibility when opening
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 400) // wait for unroll animation
      return () => {
        document.body.style.overflow = ""
        document.body.classList.remove("pdf-open")
        clearTimeout(timer)
      }
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("pdf-open")
      setShowContent(false)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && pdfUrl && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100vh", transition: { duration: 0.4, ease: "easeInOut" } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />



          {/* Scroll Container */}
          <div className="relative w-[95vw] max-w-4xl z-[105] flex flex-col items-center justify-center h-[85vh]">
            
            {/* Top Roller */}
            <motion.div
              initial={{ y: "42.5vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-8 bg-gradient-to-b from-[#3b2a1a] to-[#25190f] rounded-t-xl rounded-b-sm shadow-xl relative z-20"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-xl"></div>
              {/* Wooden ends */}
              <div className="absolute -left-2 top-1 bottom-1 w-2 bg-[#25190f] rounded-l-full shadow-inner border-l border-black/40"></div>
              <div className="absolute -right-2 top-1 bottom-1 w-2 bg-[#25190f] rounded-r-full shadow-inner border-r border-black/40"></div>
            </motion.div>

            {/* Scroll Paper */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-[96%] md:w-[98%] bg-[#faf8f5] border-x-8 border-[#3b2a1a]/80 shadow-2xl relative overflow-hidden flex flex-col"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
              }}
            >
              {/* Document Header inside paper */}
              <motion.div 
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="py-4 text-center border-b border-black/10 mx-8"
              >
                <h2 className="text-xl md:text-2xl font-serif text-[#1a1f2e] tracking-widest">{title}</h2>
              </motion.div>

              {/* PDF Iframe */}
              <motion.div 
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-1 w-full p-4 md:p-8 pt-4 bg-transparent"
              >
                {showContent && (
                  <iframe 
                    src={pdfUrl} 
                    className="w-full h-full rounded shadow-inner bg-white" 
                    title={title || "PDF Document"} 
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Bottom Roller */}
            <motion.div
              initial={{ y: "-42.5vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-8 bg-gradient-to-t from-[#3b2a1a] to-[#25190f] rounded-b-xl rounded-t-sm shadow-xl relative z-20"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 rounded-b-xl"></div>
              {/* Wooden ends */}
              <div className="absolute -left-2 top-1 bottom-1 w-2 bg-[#25190f] rounded-l-full shadow-inner border-l border-black/40"></div>
              <div className="absolute -right-2 top-1 bottom-1 w-2 bg-[#25190f] rounded-r-full shadow-inner border-r border-black/40"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
