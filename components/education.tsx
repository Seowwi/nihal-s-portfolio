"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, X, Eye, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"

export default function Education() {
  const { t } = useLanguage()
  const educationData = t('education')
  const { isEditMode, isItemHidden, hideItem, showItem, getAddedCount, addNewItem } = useEditable()
  
  const addedCount = getAddedCount('education');
  const defaultNewItem = { 
    title: "Tiêu đề mới", 
    institution: "Tổ chức / Nơi học", 
    description: "Mô tả ngắn gọn về quá trình học tập hoặc kinh nghiệm tại đây..." 
  };
  const allItems = [...educationData.items, ...Array(addedCount).fill(defaultNewItem)];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-primary/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <EditableText
                path="education.title"
                defaultValue={educationData.title}
                as="h2"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl inline-block relative"
              />
              <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-3"></div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0">
              {allItems.map((item: any, index: number) => {
                const hidden = isItemHidden('education', index);
                if (hidden && !isEditMode) return null;

                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`mb-10 ml-6 relative group ${hidden ? 'opacity-40' : ''}`}
                  >
                    <span className="absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background group-hover:scale-150 group-hover:bg-pink-400 transition-all duration-300"></span>
                    
                    {/* Hide/Show button */}
                    {isEditMode && (
                      <button
                        onClick={() => hidden ? showItem('education', index) : hideItem('education', index)}
                        className={`absolute -right-2 top-0 z-20 p-1.5 rounded-full transition-all duration-200 shadow-md ${
                          hidden 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-red-500/80 hover:bg-red-600 text-white'
                        }`}
                        title={hidden ? 'Hiện lại' : 'Ẩn mục này'}
                      >
                        {hidden ? <Eye size={14} /> : <X size={14} />}
                      </button>
                    )}

                    {hidden && isEditMode && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
                        Đã ẩn
                      </span>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <EditableText
                        path={`education.items.${index}.title`}
                        defaultValue={item.title}
                        as="h3"
                        className="text-xl font-bold group-hover:text-primary transition-colors"
                      />
                    </div>
                    <EditableText
                      path={`education.items.${index}.institution`}
                      defaultValue={item.institution}
                      as="h4"
                      className="text-lg font-medium text-primary/80 mb-2"
                    />
                    <EditableText
                      path={`education.items.${index}.description`}
                      defaultValue={item.description}
                      as="p"
                      className="text-muted-foreground leading-relaxed"
                      multiline
                    />
                  </motion.div>
                );
              })}
            </div>
            
            {isEditMode && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => addNewItem('education')}
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full font-medium transition-colors border border-primary/20 border-dashed hover:scale-105 active:scale-95"
                >
                  <Plus size={18} />
                  Thêm học vấn mới
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
