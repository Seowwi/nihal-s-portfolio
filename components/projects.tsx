"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, ScrollText, Link2, X, Eye, Upload, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import OpenSource from "./open-source"
import { useLanguage } from "@/contexts/LanguageContext"
import React, { useState, useRef } from "react"
import PdfScrollViewer from "./pdf-scroll-viewer"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"

import { motion, AnimatePresence } from "framer-motion"

export default function Projects() {
  const { t, language } = useLanguage()
  const projectsData = t('projects')
  const { isEditMode, getContent, setContent, isItemHidden, hideItem, showItem, getHiddenItems, getAddedCount, addNewItem } = useEditable()
  
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)
  const [selectedPdfTitle, setSelectedPdfTitle] = useState<string | null>(null)

  const hiddenProjectIndices = getHiddenItems('projects')
  
  const addedCount = getAddedCount('projects');
  const defaultNewItem = { title: "Dự án mới", description: "Mô tả dự án...", titleJp: "新プロジェクト", tags: [] };
  const allItems = [...projectsData.items, ...Array(addedCount).fill(defaultNewItem)];

  return (
    <section id="projects" className="py-20 bg-muted/20 relative">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <EditableText
                path="projects.title"
                defaultValue={projectsData.title}
                as="h2"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl inline-block relative"
              />
              <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-3"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-[700px] mt-6"
            >
              <EditableText
                path="projects.description"
                defaultValue={projectsData.description}
                as="p"
                className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 mt-16 max-w-7xl mx-auto md:pb-12 lg:pb-24 px-4 sm:px-0">
            {allItems.map((assignment: any, index: number) => {
              const cardKanjis = ["文", "訳", "祭", "学", "話", "記"];
              const isEven = index % 2 === 0;
              const hidden = isItemHidden('projects', index);

              // Skip hidden items when not in edit mode
              if (hidden && !isEditMode) return null;

              // Get the possibly-edited PDF URL (check custom content even if original has no pdfUrl)
              const editedPdfUrl = getContent(`projects.items.${index}.pdfUrl`, assignment.pdfUrl || '');
              const currentPdfUrl = editedPdfUrl || null;
              return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`h-full ${!isEven ? 'md:translate-y-12 lg:translate-y-24' : ''} ${hidden ? 'opacity-40' : ''}`}
              >
                <Card className={`overflow-hidden h-full flex flex-col border-x border-x-[#8c2a2a]/20 border-y-[6px] border-y-[#3b2a1a] bg-[#faf8f5] dark:bg-[#1a1f2e] transition-all duration-700 hover:shadow-2xl hover:shadow-[#8c2a2a]/15 hover:-translate-y-2 relative group rounded-sm ${hidden ? 'ring-2 ring-dashed ring-red-400/50' : ''}`}>
                  {/* Hide/Show button - only in edit mode */}
                  {isEditMode && (
                    <button
                      onClick={() => hidden ? showItem('projects', index) : hideItem('projects', index)}
                      className={`absolute top-3 right-3 z-20 p-1.5 rounded-full transition-all duration-200 shadow-md ${
                        hidden 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-red-500/80 hover:bg-red-600 text-white'
                      }`}
                      title={hidden ? 'Hiện lại card này' : 'Ẩn card này'}
                    >
                      {hidden ? <Eye size={14} /> : <X size={14} />}
                    </button>
                  )}

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

                  {/* Hidden overlay label */}
                  {hidden && isEditMode && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <span className="bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Đã ẩn
                      </span>
                    </div>
                  )}

                  <CardContent className="flex-1 flex flex-col p-6 pr-14 relative z-10">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-3 rounded-sm bg-[#8c2a2a]/10 w-fit text-[#8c2a2a] group-hover:bg-[#8c2a2a] group-hover:text-[#faf8f5] shadow-sm transition-all duration-300">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <EditableText
                      path={`projects.items.${index}.title`}
                      defaultValue={assignment.title}
                      as="h3"
                      className="text-2xl font-serif font-bold mb-3 group-hover:text-[#8c2a2a] transition-colors leading-snug text-[#1a1f2e] dark:text-white"
                    />
                    <EditableText
                      path={`projects.items.${index}.description`}
                      defaultValue={assignment.description}
                      as="p"
                      className="text-sm text-[#3b2a1a]/80 dark:text-white/70 mb-6 flex-1 leading-relaxed"
                      multiline
                    />
                    


                    {(currentPdfUrl || isEditMode) && (
                      <div className="mt-auto pt-4 border-t border-[#3b2a1a]/15 space-y-2">
                        {currentPdfUrl && (
                          <button 
                            className="w-full relative group/btn overflow-hidden rounded-sm border border-[#8c2a2a]/20 bg-[#faf8f5] hover:bg-[#f5f0e6] shadow-sm hover:shadow-md transition-all duration-500 py-2.5 px-4 flex items-center justify-center"
                            onClick={() => {
                              setSelectedPdfUrl(currentPdfUrl)
                              setSelectedPdfTitle(getContent(`projects.items.${index}.title`, assignment.title))
                            }}
                          >
                            {/* Left traditional binding */}
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
                        )}

                        {/* Editable PDF section - only visible in edit mode */}
                        {isEditMode && (
                          <PdfEditField
                            index={index}
                            currentPdfUrl={currentPdfUrl}
                            setContent={setContent}
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>

          {/* Show hidden items count in edit mode */}
          {isEditMode && hiddenProjectIndices.length > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-8">
              <span className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full text-xs font-medium">
                {hiddenProjectIndices.length} card đã bị ẩn (hiển thị mờ ở trên)
              </span>
            </div>
          )}

          {/* Add new project button */}
          {isEditMode && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => addNewItem('projects')}
                className="flex items-center gap-2 bg-[#8c2a2a]/10 hover:bg-[#8c2a2a]/20 text-[#8c2a2a] px-6 py-3 rounded-full font-medium transition-colors border border-[#8c2a2a]/20 border-dashed hover:scale-105 active:scale-95"
              >
                <Plus size={18} />
                Thêm dự án / bài luận mới
              </button>
            </div>
          )}

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

// Sub-component for PDF editing with upload + link options
function PdfEditField({ 
  index, 
  currentPdfUrl, 
  setContent 
}: { 
  index: number; 
  currentPdfUrl: string | null; 
  setContent: (path: string, value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadStatus({ type: 'error', message: 'Chỉ chấp nhận file PDF' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({ type: 'error', message: 'File quá lớn (tối đa 10MB)' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setContent(`projects.items.${index}.pdfUrl`, result.url);
        setUploadStatus({ type: 'success', message: `✓ ${file.name}` });
      } else {
        setUploadStatus({ type: 'error', message: result.error || 'Upload thất bại' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', message: 'Lỗi kết nối' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-md border border-dashed border-[#8c2a2a]/30 overflow-hidden bg-[#3b2a1a]/5">
      {/* Tab switcher */}
      <div className="flex border-b border-[#3b2a1a]/10">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 text-[11px] font-medium py-1.5 px-3 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-[#8c2a2a]/10 text-[#8c2a2a] border-b-2 border-[#8c2a2a]'
              : 'text-[#3b2a1a]/60 hover:text-[#3b2a1a]/80'
          }`}
        >
          <Upload size={12} />
          Upload PDF
        </button>
        <button
          onClick={() => setActiveTab('link')}
          className={`flex-1 text-[11px] font-medium py-1.5 px-3 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'link'
              ? 'bg-[#8c2a2a]/10 text-[#8c2a2a] border-b-2 border-[#8c2a2a]'
              : 'text-[#3b2a1a]/60 hover:text-[#3b2a1a]/80'
          }`}
        >
          <Link2 size={12} />
          Nhập Link
        </button>
      </div>

      {/* Content */}
      <div className="p-2.5">
        {activeTab === 'upload' ? (
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm border border-dashed transition-all text-xs font-medium ${
                isUploading
                  ? 'border-[#8c2a2a]/20 text-[#3b2a1a]/40 cursor-wait'
                  : 'border-[#8c2a2a]/30 text-[#8c2a2a] hover:bg-[#8c2a2a]/5 hover:border-[#8c2a2a]/50 cursor-pointer'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Đang tải lên...
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Chọn file PDF (tối đa 10MB)
                </>
              )}
            </button>

            {uploadStatus && (
              <p className={`text-[11px] px-1 ${
                uploadStatus.type === 'success' ? 'text-green-600' : 'text-red-500'
              }`}>
                {uploadStatus.message}
              </p>
            )}

            {currentPdfUrl && (
              <p className="text-[10px] text-[#3b2a1a]/50 px-1 truncate" title={currentPdfUrl}>
                Hiện tại: {currentPdfUrl}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link2 size={13} className="text-[#8c2a2a] shrink-0" />
              <input
                type="text"
                defaultValue={currentPdfUrl || ''}
                placeholder="Nhập link PDF (vd: /files/BT1.pdf)"
                className="w-full bg-transparent text-xs text-[#3b2a1a] dark:text-white/80 outline-none placeholder:text-[#3b2a1a]/40 py-1"
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (val) {
                    setContent(`projects.items.${index}.pdfUrl`, val);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    (e.target as HTMLInputElement).blur();
                  }
                }}
              />
            </div>
            {currentPdfUrl && (
              <p className="text-[10px] text-[#3b2a1a]/50 px-1 truncate" title={currentPdfUrl}>
                Hiện tại: {currentPdfUrl}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
