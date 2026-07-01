"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Education() {
  const { t } = useLanguage()
  const educationData = t('education')

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-primary/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl inline-block relative"
            >
              {educationData.title}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0">
              {educationData.items.map((item: any, index: number) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="mb-10 ml-6 relative group"
                >
                  <span className="absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background group-hover:scale-150 group-hover:bg-pink-400 transition-all duration-300"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <h4 className="text-lg font-medium text-primary/80 mb-2">{item.institution}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
