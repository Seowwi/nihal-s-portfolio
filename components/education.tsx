import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">学歴</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              これまでの学習歴と語学の資格です。
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
                    <h3 className="text-xl font-bold">日本語学科 学士課程</h3>
                    <p className="text-muted-foreground">外国語大学（2023年〜現在）</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    日本語学科の学士課程で、文法・語彙・漢字・聞く話す・翻訳通訳・日本文化といった基礎科目を学んでいます。日本語の確かな基礎と異文化コミュニケーション力を身につけています。
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
                    <h3 className="text-xl font-bold">日本語能力試験 JLPT N3</h3>
                    <p className="text-muted-foreground">国際交流基金（2024年）</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    JLPT N3に合格し、日常生活の場面である程度の日本語を理解できるようになりました。現在は来年のN2合格を目指して勉強しています。
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
