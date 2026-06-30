import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, Languages, PenTool } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "Tiếng Nhật · 日本語",
      description: "Trình độ JLPT N3, đang luyện thi N2; thành thạo Hiragana, Katakana và hơn 1000 chữ Kanji",
    },
    {
      icon: <PenTool className="h-10 w-10 text-primary" />,
      title: "Biên - Phiên dịch · 翻訳・通訳",
      description: "Thực hành dịch Việt - Nhật cho văn bản, hội thoại và phụ đề video",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Văn hóa Nhật Bản · 日本文化",
      description: "Tìm hiểu văn hóa, lịch sử và phong tục giao tiếp trong môi trường công sở Nhật",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Ngoại ngữ khác · その他の言語",
      description: "Tiếng Anh giao tiếp tốt (IELTS 6.5), hỗ trợ cho việc học và nghiên cứu ngôn ngữ",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Giới thiệu · 自己紹介</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tôi là sinh viên năm ba ngành Ngôn ngữ Nhật, yêu thích tiếng Nhật và văn hóa Nhật Bản, mong muốn trở
                thành biên - phiên dịch viên chuyên nghiệp.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Tôi bắt đầu học tiếng Nhật từ năm nhất đại học và hiện đạt trình độ JLPT N3, đang nỗ lực luyện thi N2.
                Bên cạnh việc học trên lớp, tôi tích cực tham gia câu lạc bộ tiếng Nhật, trao đổi với người bản xứ và
                thực hành dịch thuật. Mục tiêu của tôi là sử dụng thành thạo tiếng Nhật để kết nối văn hóa Việt - Nhật
                và theo đuổi sự nghiệp biên - phiên dịch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
