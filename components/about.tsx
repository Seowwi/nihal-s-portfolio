"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, MessageSquare, Target, X, Eye, Upload, Link2, Loader2, Image as ImageIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { motion } from "framer-motion"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"
import React, { useState, useRef } from "react"

export default function About() {
  const { t } = useLanguage()
  const aboutData = t('about')
  const { isEditMode, isItemHidden, hideItem, showItem, getContent, setContent } = useEditable()
  
  const currentImageUrl = getContent('about.image', '/images/about-illustration.png');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const displayUrl = previewUrl || currentImageUrl;

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
                    src={displayUrl} 
                    alt="Japanese Culture Abstract" 
                    fill 
                    className={`object-cover transition-all duration-700 ${isUploadingImage ? 'scale-105 blur-sm brightness-75' : 'hover:scale-105'}`}
                  />
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-10">
                      <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                      <span className="text-white text-sm font-medium drop-shadow-md">Đang tải ảnh lên...</span>
                    </div>
                  )}
                </div>
              </div>

              {isEditMode && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20 shadow-xl">
                  <ImageEditField 
                    currentImageUrl={currentImageUrl} 
                    setContent={setContent}
                    onPreview={setPreviewUrl}
                    onUploading={setIsUploadingImage}
                  />
                </div>
              )}
              
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

// Sub-component for Image editing with upload + link options
function ImageEditField({ 
  currentImageUrl, 
  setContent,
  onPreview,
  onUploading
}: { 
  currentImageUrl: string; 
  setContent: (path: string, value: string) => void;
  onPreview?: (url: string | null) => void;
  onUploading?: (isUploading: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadStatus({ type: 'error', message: 'Chỉ chấp nhận file ảnh' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({ type: 'error', message: 'Ảnh quá lớn (tối đa 10MB)' });
      return;
    }

    // Set local preview instantly
    const objectUrl = URL.createObjectURL(file);
    if (onPreview) onPreview(objectUrl);

    setIsUploading(true);
    if (onUploading) onUploading(true);
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
        setContent(`about.image`, result.url);
        setUploadStatus({ type: 'success', message: `✓ Đã cập nhật ảnh` });
      } else {
        setUploadStatus({ type: 'error', message: result.error || 'Upload thất bại' });
        // Revert preview on error
        if (onPreview) onPreview(null);
      }
    } catch (err) {
      setUploadStatus({ type: 'error', message: 'Lỗi kết nối' });
      // Revert preview on error
      if (onPreview) onPreview(null);
    } finally {
      setIsUploading(false);
      if (onUploading) onUploading(false);
      
      // Delay revoking URL to give Next Image time to render new URL
      setTimeout(() => {
        if (onPreview) onPreview(null);
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    }
  };

  return (
    <div className="rounded-md border border-[#8c2a2a]/30 overflow-hidden bg-white/95 backdrop-blur shadow-lg">
      <div className="flex border-b border-[#3b2a1a]/10">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 text-[11px] font-medium py-2 px-3 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-[#8c2a2a]/10 text-[#8c2a2a] border-b-2 border-[#8c2a2a]'
              : 'text-[#3b2a1a]/60 hover:text-[#3b2a1a]/80 bg-slate-50'
          }`}
        >
          <Upload size={12} />
          Upload Ảnh
        </button>
        <button
          onClick={() => setActiveTab('link')}
          className={`flex-1 text-[11px] font-medium py-2 px-3 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'link'
              ? 'bg-[#8c2a2a]/10 text-[#8c2a2a] border-b-2 border-[#8c2a2a]'
              : 'text-[#3b2a1a]/60 hover:text-[#3b2a1a]/80 bg-slate-50'
          }`}
        >
          <Link2 size={12} />
          Nhập Link
        </button>
      </div>

      <div className="p-3">
        {activeTab === 'upload' ? (
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm border transition-all text-xs font-medium ${
                isUploading
                  ? 'border-[#8c2a2a]/20 text-[#3b2a1a]/40 cursor-wait bg-slate-50'
                  : 'border-[#8c2a2a]/30 text-[#8c2a2a] hover:bg-[#8c2a2a]/5 hover:border-[#8c2a2a]/50 cursor-pointer bg-white'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Đang tải lên...
                </>
              ) : (
                <>
                  <ImageIcon size={14} />
                  Chọn ảnh từ máy
                </>
              )}
            </button>
            {uploadStatus && (
              <p className={`text-[11px] text-center font-medium ${
                uploadStatus.type === 'success' ? 'text-green-600' : 'text-red-500'
              }`}>
                {uploadStatus.message}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 border rounded-sm px-2 py-1.5 bg-white">
              <Link2 size={13} className="text-[#8c2a2a] shrink-0" />
              <input
                type="text"
                defaultValue={currentImageUrl}
                placeholder="https://example.com/image.png"
                className="w-full bg-transparent text-xs text-[#3b2a1a] outline-none placeholder:text-[#3b2a1a]/40"
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (val) {
                    setContent(`about.image`, val);
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
          </div>
        )}
      </div>
    </div>
  );
}
