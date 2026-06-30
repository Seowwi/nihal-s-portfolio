import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function OpenSource() {
  const activities = [
    {
      title: "Câu lạc bộ tiếng Nhật (日本語クラブ)",
      description:
        "Thành viên tích cực của câu lạc bộ tiếng Nhật, tham gia tổ chức các buổi giao lưu, luyện hội thoại và sự kiện văn hóa.",
      tags: ["会話", "Giao lưu", "Sự kiện"],
    },
    {
      title: "Trao đổi ngôn ngữ với người bản xứ",
      description:
        "Tham gia chương trình language exchange, luyện nói hằng tuần với sinh viên Nhật Bản và hỗ trợ họ học tiếng Việt.",
      tags: ["会話", "Nghe - Nói", "Văn hóa"],
    },
    {
      title: "Tình nguyện viên sự kiện văn hóa Nhật",
      description:
        "Hỗ trợ phiên dịch và hướng dẫn tại các lễ hội, hội chợ văn hóa Nhật Bản tổ chức tại trường và địa phương.",
      tags: ["通訳", "Tình nguyện", "文化"],
    },
  ]

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Hoạt động ngoại khóa · 課外活動</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            Các hoạt động giúp tôi rèn luyện tiếng Nhật và hiểu thêm về văn hóa Nhật Bản
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
