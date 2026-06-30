import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import OpenSource from "./open-source"

export default function Projects() {
  const assignments = [
    {
      title: "Bài luận: Văn hóa giao tiếp Nhật Bản",
      titleJp: "日本のコミュニケーション文化",
      description:
        "Bài luận 800 chữ bằng tiếng Nhật phân tích cách dùng kính ngữ (敬語) trong môi trường công sở và đời sống hằng ngày.",
      tags: ["敬語", "Viết luận", "N3"],
      score: "Điểm: A",
    },
    {
      title: "Dịch Việt - Nhật: Bản tin ngắn",
      titleJp: "ベトナム語から日本語への翻訳",
      description:
        "Dịch một bản tin thời sự từ tiếng Việt sang tiếng Nhật, chú trọng độ chính xác về ngữ pháp và cách diễn đạt tự nhiên.",
      tags: ["翻訳", "Ngữ pháp", "Từ vựng"],
      score: "Điểm: A-",
    },
    {
      title: "Thuyết trình: Lễ hội bốn mùa Nhật Bản",
      titleJp: "日本の四季の祭り",
      description:
        "Bài thuyết trình nhóm bằng tiếng Nhật giới thiệu các lễ hội tiêu biểu theo từng mùa, kèm slide và phần hỏi đáp.",
      tags: ["Thuyết trình", "Nghe - Nói", "Văn hóa"],
      score: "Điểm: A",
    },
    {
      title: "Sổ tay Kanji & từ vựng N2",
      titleJp: "N2漢字・語彙ノート",
      description:
        "Tổng hợp và hệ thống hóa hơn 500 chữ Kanji cùng từ vựng theo chủ đề phục vụ cho kỳ thi JLPT N2.",
      tags: ["漢字", "Tự học", "N2"],
      score: "Đang thực hiện",
    },
    {
      title: "Hội thoại tình huống nhà hàng",
      titleJp: "レストランでの会話",
      description:
        "Bài tập đóng vai hội thoại tại nhà hàng, luyện mẫu câu lịch sự khi gọi món, hỏi giá và thanh toán.",
      tags: ["会話", "Nghe - Nói", "N3"],
      score: "Điểm: B+",
    },
    {
      title: "Nhật ký học tập tiếng Nhật",
      titleJp: "日本語学習日記",
      description:
        "Viết nhật ký ngắn bằng tiếng Nhật mỗi tuần để rèn luyện thói quen viết và ghi lại tiến độ học tập.",
      tags: ["作文", "Thói quen", "Tự học"],
      score: "Hằng tuần",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bài tập · 課題</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Một số bài tập và sản phẩm học tập tiêu biểu trong quá trình học tiếng Nhật
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {assignments.map((assignment, index) => (
              <div key={index} className="project-card">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="flex-1 flex flex-col p-5">
                    <div className="mb-3">
                      <FileText className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">{assignment.title}</h3>
                    <p className="text-sm text-primary/80 mt-1">{assignment.titleJp}</p>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{assignment.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {assignment.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Badge variant="secondary">{assignment.score}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Hoạt động ngoại khóa hiển thị ngay dưới mục Bài tập */}
          <div className="mt-20">
            <OpenSource />
          </div>
        </div>
      </div>
    </section>
  )
}
