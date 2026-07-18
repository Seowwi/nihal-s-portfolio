"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, X, Eye, GripVertical, Minus, Plus } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useLanguage } from "@/contexts/LanguageContext"
import EditableText from "@/components/editable-text"
import { useEditable } from "@/contexts/EditableContext"

export default function OpenSource() {
  const { t } = useLanguage()
  const data = t('projects', 'extracurricular')
  const { isEditMode, isItemHidden, hideItem, showItem, getLayout, updateOrder, updateSpan, getAddedCount, addNewItem } = useEditable()
  
  const addedCount = getAddedCount('extracurricular');
  const defaultNewItem = { title: "Hoạt động mới", description: "Mô tả hoạt động...", tags: ["Thẻ 1"] };
  const allItems = [...data.items, ...Array(addedCount).fill(defaultNewItem)];

  const layout = getLayout('extracurricular', allItems.length)
  const orderedItems = layout.order.map(i => ({ originalIndex: i, item: allItems[i] }))

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(layout.order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateOrder('extracurricular', items);
  };

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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="extracurricular" direction="horizontal">
            {(provided) => (
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-start"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {orderedItems.map(({ originalIndex, item: activity }, index) => {
                  const hidden = isItemHidden('extracurricular', originalIndex);
                  if (hidden && !isEditMode) return null;

                  const currentSpan = layout.spans[originalIndex] || 1;
                  let spanClass = currentSpan === 3 ? 'md:col-span-3' : currentSpan === 2 ? 'md:col-span-2' : 'col-span-1';

                  return (
                    <Draggable key={originalIndex.toString()} draggableId={`extracurricular-${originalIndex}`} index={index} isDragDisabled={!isEditMode}>
                      {(provided) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`relative group ${spanClass} ${hidden ? 'opacity-40' : ''}`}
                        >
                          <Card className={`h-full flex flex-col ${hidden ? 'ring-2 ring-dashed ring-red-400/50' : ''}`}>
                            {isEditMode && (
                              <div {...provided.dragHandleProps} className="absolute top-2 left-2 z-30 p-1 bg-white/80 rounded shadow-sm cursor-grab text-slate-500 hover:text-slate-800">
                                <GripVertical size={16} />
                              </div>
                            )}

                            {isEditMode && (
                              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center bg-white border rounded shadow-sm overflow-hidden text-slate-700">
                                <button 
                                  onClick={() => updateSpan('extracurricular', originalIndex, Math.max(1, currentSpan - 1))}
                                  className="p-1 hover:bg-slate-100 disabled:opacity-30"
                                  disabled={currentSpan <= 1}
                                  title="Giảm độ rộng"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="px-2 text-[10px] font-bold border-x">{currentSpan} CỘT</span>
                                <button 
                                  onClick={() => updateSpan('extracurricular', originalIndex, Math.min(3, currentSpan + 1))}
                                  className="p-1 hover:bg-slate-100 disabled:opacity-30"
                                  disabled={currentSpan >= 3}
                                  title="Tăng độ rộng"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            )}

                            {/* Hide/Show button */}
                            {isEditMode && (
                              <button
                                onClick={() => hidden ? showItem('extracurricular', originalIndex) : hideItem('extracurricular', originalIndex)}
                                className={`absolute top-2 right-2 z-30 p-1.5 rounded-full transition-all duration-200 shadow-md ${
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
                              <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
                                Đã ẩn
                              </span>
                            )}

                            <CardContent className={`p-6 flex-1 flex flex-col ${isEditMode ? 'pt-12' : ''}`}>
                              <div className="mb-4">
                                <Users className="h-8 w-8 text-primary" />
                              </div>
                              <EditableText
                                path={`projects.extracurricular.items.${originalIndex}.title`}
                                defaultValue={activity.title}
                                as="h3"
                                className="text-lg font-bold mb-2"
                              />
                              <EditableText
                                path={`projects.extracurricular.items.${originalIndex}.description`}
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
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        {isEditMode && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => addNewItem('extracurricular')}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full font-medium transition-colors border border-primary/20 border-dashed hover:scale-105 active:scale-95"
            >
              <Plus size={18} />
              Thêm hoạt động mới
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
