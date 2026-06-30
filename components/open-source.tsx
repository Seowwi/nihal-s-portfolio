import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function OpenSource() {
  const activities = [
    {
      title: "日本語クラブ",
      description:
        "日本語クラブの積極的なメンバーとして、交流会・会話練習・文化イベントの企画に参加しています。",
      tags: ["会話", "交流", "イベント"],
    },
    {
      title: "ネイティブとの言語交換",
      description:
        "言語交換プログラムに参加し、毎週日本人学生と会話を練習しながら、彼らのベトナム語学習もサポートしています。",
      tags: ["会話", "聞く・話す", "文化"],
    },
    {
      title: "日本文化イベントのボランティア",
      description:
        "大学や地域で開催される日本文化の祭り・フェアで、通訳や案内のサポートを行っています。",
      tags: ["通訳", "ボランティア", "文化"],
    },
  ]

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">課外活動</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            日本語を磨き、日本文化への理解を深めるのに役立っている活動です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {activities.map((activity, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{activity.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.map((tag, i) => (
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
