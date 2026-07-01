"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import OpenSource from "./open-source"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"
import PdfScrollViewer from "./pdf-scroll-viewer"

import { motion } from "framer-motion"

export default function Projects() {
  const { t, language } = useLanguage()
  const projectsData = t('projects')
  
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)
  const [selectedPdfTitle, setSelectedPdfTitle] = useState<string | null>(null)

  return (
    <section id="projects" className="py-20 bg-muted/20 relative">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl inline-block relative"
            >
              {projectsData.title}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-6"
            >
              {projectsData.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 mt-16 max-w-7xl mx-auto md:pb-12 lg:pb-24 px-4 sm:px-0">
            {projectsData.items.map((assignment: any, index: number) => {
              const cardKanjis = ["文", "訳", "祭", "学", "話", "記"];
              const isEven = index % 2 === 0;
              return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`h-full ${!isEven ? 'md:translate-y-12 lg:translate-y-24' : ''}`}
              >
                <Card className="overflow-hidden h-full flex flex-col border-x border-x-[#8c2a2a]/20 border-y-[6px] border-y-[#3b2a1a] bg-[#faf8f5] dark:bg-[#1a1f2e] transition-all duration-700 hover:shadow-2xl hover:shadow-[#8c2a2a]/15 hover:-translate-y-2 relative group rounded-sm">
                  {/* Faint watermark Kanji (Red stamp style) */}
                  <div className="absolute -bottom-2 -right-4 text-[160px] font-black text-[#8c2a2a]/5 select-none z-0 group-hover:text-[#8c2a2a]/10 group-hover:scale-105 origin-bottom-right transition-all duration-700 pointer-events-none font-serif leading-none">
                    {cardKanjis[index % cardKanjis.length]}
                  </div>
                  
                  {/* Vertical Japanese Title */}
                  <div className="absolute top-6 right-4 bottom-20 z-0 pointer-events-none overflow-hidden">
                     <p className="text-xl md:text-2xl font-serif tracking-[0.3em] text-[#3b2a1a]/10 group-hover:text-[#3b2a1a]/30 dark:text-white/10 dark:group-hover:text-white/20 transition-colors duration-500 whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                       {assignment.titleJp}
                     </p>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8c2a2a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <CardContent className="flex-1 flex flex-col p-6 pr-14 relative z-10">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-3 rounded-sm bg-[#8c2a2a]/10 w-fit text-[#8c2a2a] group-hover:bg-[#8c2a2a] group-hover:text-[#faf8f5] shadow-sm transition-all duration-300">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-[#8c2a2a] transition-colors leading-snug text-[#1a1f2e] dark:text-white">{assignment.title}</h3>
                    <p className="text-sm text-[#3b2a1a]/80 dark:text-white/70 mb-6 flex-1 leading-relaxed">{assignment.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {assignment.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[11px] font-serif font-medium tracking-wide bg-[#3b2a1a]/5 text-[#3b2a1a] dark:bg-white/10 dark:text-white/80 px-2.5 py-1 rounded-sm border border-[#3b2a1a]/15 dark:border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {assignment.pdfUrl && (
                      <div className="mt-auto pt-4 border-t border-[#3b2a1a]/15">
                        <button 
                          className="w-full relative group/btn overflow-hidden rounded-sm border border-[#8c2a2a]/20 bg-[#faf8f5] hover:bg-[#f5f0e6] shadow-sm hover:shadow-md transition-all duration-500 py-2.5 px-4 flex items-center justify-center"
                          onClick={() => {
                            setSelectedPdfUrl(assignment.pdfUrl)
                            setSelectedPdfTitle(assignment.title)
                          }}
                        >
                          {/* Left traditional binding binding */}
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8c2a2a] group-hover/btn:w-2 transition-all duration-300"></div>
                          
                          {/* Right decorative line */}
                          <div className="absolute right-2 top-2 bottom-2 w-[1px] bg-[#8c2a2a]/20"></div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-sm bg-[#8c2a2a] text-[#faf8f5] font-serif text-sm group-hover/btn:rotate-12 transition-transform duration-300">
                              開
                            </div>
                            <span className="font-serif tracking-[0.15em] text-[#3b2a1a] text-xs md:text-sm uppercase font-semibold">
                              {language === 'ja' ? '巻物を開く' : 'Mở Cuộn Giấy'}
                            </span>
                          </div>
                          
                          {/* Subtle hover gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>

          {/* OpenSource component */}
          <div className="mt-20">
            <OpenSource />
          </div>
        </div>
      </div>

      <PdfScrollViewer 
        isOpen={!!selectedPdfUrl}
        pdfUrl={selectedPdfUrl}
        title={selectedPdfTitle}
        onClose={() => setSelectedPdfUrl(null)}
      />
    </section>
  )
}
