import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, Languages, PenTool } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "日本語",
      description: "JLPT N3取得済み、N2に向けて勉強中。ひらがな・カタカナ・漢字1000字以上を習得しています。",
    },
    {
      icon: <PenTool className="h-10 w-10 text-primary" />,
      title: "翻訳・通訳",
      description: "文章・会話・動画字幕のベトナム語⇔日本語の翻訳を練習しています。",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "日本文化",
      description: "日本の文化・歴史やビジネスシーンでのマナーについて学んでいます。",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "その他の言語",
      description: "英語でのコミュニケーションも得意（IELTS 6.5）で、言語学習や研究に役立てています。",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">自己紹介</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                日本語学科の3年生です。日本語と日本文化が大好きで、プロの翻訳者・通訳者になることを目指しています。
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                大学1年生のときに日本語の勉強を始め、現在はJLPT N3に合格し、N2合格を目指して努力しています。授業だけでなく、日本語クラブに積極的に参加し、ネイティブスピーカーと交流したり、翻訳の練習をしたりしています。日本語を自在に使いこなし、ベトナムと日本の文化の架け橋となり、翻訳・通訳の仕事に就くことが私の目標です。
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
