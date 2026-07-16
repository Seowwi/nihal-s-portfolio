"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, X, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"

export default function OpenSource() {
  const { t } = useLanguage()
  const data = t('projects', 'extracurricular')
  const { isEditMode, isItemHidden, hideItem, showItem } = useEditable()

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <EditableText
            path="projects.extracurricular.title"
            defaultValue={data.title}
            as="h3"
            className="text-2xl font-bold tracking-tighter sm:text-3xl inline-block relative"
          />
          <div className="mx-auto max-w-[700px] mt-4">
            <EditableText
              path="projects.extracurricular.description"
              defaultValue={data.description}
              as="p"
              className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed"
              multiline
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {data.items.map((activity: any, index: number) => {
            const hidden = isItemHidden('extracurricular', index);
            if (hidden && !isEditMode) return null;

            return (
              <div key={index} className={`relative group ${hidden ? 'opacity-40' : ''}`}>
                <Card className={`h-full flex flex-col ${hidden ? 'ring-2 ring-dashed ring-red-400/50' : ''}`}>
                  {/* Hide/Show button */}
                  {isEditMode && (
                    <button
                      onClick={() => hidden ? showItem('extracurricular', index) : hideItem('extracurricular', index)}
                      className={`absolute -top-2 -right-2 z-20 p-1.5 rounded-full transition-all duration-200 shadow-md ${
                        hidden 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-red-500/80 hover:bg-red-600 text-white'
                      }`}
                      title={hidden ? 'Hiện lại' : 'Ẩn mục này'}
                    >
                      {hidden ? <Eye size={12} /> : <X size={12} />}
                    </button>
                  )}

                  {hidden && isEditMode && (
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
                      Đã ẩn
                    </span>
                  )}

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <EditableText
                      path={`projects.extracurricular.items.${index}.title`}
                      defaultValue={activity.title}
                      as="h3"
                      className="text-lg font-bold mb-2"
                    />
                    <EditableText
                      path={`projects.extracurricular.items.${index}.description`}
                      defaultValue={activity.description}
                      as="p"
                      className="text-sm text-muted-foreground mb-4 flex-1"
                      multiline
                    />
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {activity.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
