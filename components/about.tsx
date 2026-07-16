"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, MessageSquare, Target, X, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { motion } from "framer-motion"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"

export default function About() {
  const { t } = useLanguage()
  const aboutData = t('about')
  const { isEditMode, isItemHidden, hideItem, showItem } = useEditable()

  // Icons array to match features
  const featureIcons = [
    <Target className="h-6 w-6" />,
    <MessageSquare className="h-6 w-6" />,
    <Globe className="h-6 w-6" />,
    <BookOpen className="h-6 w-6" />
  ]

  return (
    <div id="about">
      <section className="py-20 md:py-32 relative overflow-hidden bg-muted/30">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              <EditableText
                path="about.title"
                defaultValue={aboutData.title}
                as="h2"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl inline-block relative"
              />
              <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-3"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 mx-auto max-w-[700px]"
            >
              <EditableText
                path="about.description"
                defaultValue={aboutData.description}
                as="p"
                className="text-muted-foreground md:text-xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Image / Visual */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-border/50 bg-background/50 p-2 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-2xl"></div>
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="/images/about-illustration.png" 
                    alt="Japanese Culture Abstract" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            {/* Right side: Text and Features */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                {aboutData.paragraphs.map((paragraph: string, index: number) => (
                  <EditableText
                    key={index}
                    path={`about.paragraphs.${index}`}
                    defaultValue={paragraph}
                    as="p"
                    className="text-lg leading-relaxed text-muted-foreground/90"
                    multiline
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {aboutData.features.map((feature: any, index: number) => {
                  const hidden = isItemHidden('about.features', index);
                  if (hidden && !isEditMode) return null;

                  return (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -5 }}
                      className={`group ${hidden ? 'opacity-40' : ''}`}
                    >
                      <Card className={`h-full border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 overflow-hidden relative ${hidden ? 'ring-2 ring-dashed ring-red-400/50' : ''}`}>
                        {/* Hide/Show button */}
                        {isEditMode && (
                          <button
                            onClick={() => hidden ? showItem('about.features', index) : hideItem('about.features', index)}
                            className={`absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-200 shadow-md ${
                              hidden 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-red-500/80 hover:bg-red-600 text-white'
                            }`}
                            title={hidden ? 'Hiện lại' : 'Ẩn card này'}
                          >
                            {hidden ? <Eye size={12} /> : <X size={12} />}
                          </button>
                        )}

                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-[3] group-hover:bg-primary/5"></div>
                        <CardContent className="p-5 flex flex-col space-y-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 w-fit text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                            {featureIcons[index % featureIcons.length]}
                          </div>
                          <div>
                            <EditableText
                              path={`about.features.${index}.title`}
                              defaultValue={feature.title}
                              as="h3"
                              className="font-bold text-base mb-1"
                            />
                            <EditableText
                              path={`about.features.${index}.description`}
                              defaultValue={feature.description}
                              as="p"
                              className="text-sm text-muted-foreground leading-snug"
                              multiline
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
