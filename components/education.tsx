import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Học vấn · 学歴</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Quá trình học tập và các chứng chỉ ngôn ngữ của tôi
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-6 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Cử nhân ngành Ngôn ngữ Nhật</h3>
                    <p className="text-muted-foreground">Trường Đại học Ngoại ngữ (2023 - hiện tại)</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Theo học chương trình cử nhân Ngôn ngữ Nhật với các môn nền tảng về ngữ pháp, từ vựng, Kanji,
                    nghe - nói, biên - phiên dịch và văn hóa Nhật Bản. Tích lũy nền tảng vững chắc về tiếng Nhật và
                    kỹ năng giao tiếp đa văn hóa.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-6 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Chứng chỉ năng lực tiếng Nhật JLPT N3</h3>
                    <p className="text-muted-foreground">Quỹ Giao lưu Quốc tế Nhật Bản (2024)</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Đạt chứng chỉ JLPT N3, có khả năng hiểu tiếng Nhật ở mức độ vừa phải trong các tình huống đời sống
                    hằng ngày. Hiện đang luyện thi cấp độ N2 dự kiến trong năm tới.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
