"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import EditableText from "@/components/editable-text"

import { motion } from "framer-motion"

export default function Hero() {
  const { t } = useLanguage()
  const heroData = t('hero')

  return (
    <section id="home" className="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh] relative overflow-hidden">
      {/* Decorative Japanese motif background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
            >
              <EditableText
                path="hero.greeting"
                defaultValue={heroData.greeting}
                as="span"
              />
              <br className="md:hidden" />
              <span className="inline-block">
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-400 to-primary drop-shadow-sm">
                  <EditableText
                    path="hero.name"
                    defaultValue={heroData.name}
                    as="span"
                    insideGradient
                  />
                </span>
                <EditableText
                  path="hero.suffix"
                  defaultValue={heroData.suffix}
                  as="span"
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl font-light tracking-wide"
            >
              <EditableText
                path="hero.role"
                defaultValue={heroData.role}
                as="p"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-[700px] text-muted-foreground"
          >
            <EditableText
              path="hero.description"
              defaultValue={heroData.description}
              as="p"
              className="text-lg leading-relaxed"
              multiline
            />
          </motion.div>

        </div>
        <div className="fixed bottom-8 right-8 z-50 hidden md:block js-only">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUpCircle className="h-10 w-10 text-primary animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}
