"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function OpenSource() {
  const { t } = useLanguage()
  const data = t('projects', 'extracurricular')

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">{data.title}</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {data.items.map((activity: any, index: number) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{activity.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
