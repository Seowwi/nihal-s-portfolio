import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import OpenSource from "./open-source"

export default function Projects() {
  const assignments = [
    {
      title: "作文：日本のコミュニケーション文化",
      titleJp: "敬語の使い方について",
      description:
        "ビジネスシーンや日常生活における敬語の使い方を分析した、800字の日本語作文です。",
      tags: ["敬語", "作文", "N3"],
      score: "評価：A",
    },
    {
      title: "翻訳：短いニュース記事",
      titleJp: "ベトナム語から日本語へ",
      description:
        "時事ニュースをベトナム語から日本語に翻訳し、文法の正確さと自然な表現を重視しました。",
      tags: ["翻訳", "文法", "語彙"],
      score: "評価：A-",
    },
    {
      title: "プレゼン：日本の四季の祭り",
      titleJp: "季節ごとの代表的な祭り",
      description:
        "季節ごとの代表的な祭りを紹介する日本語のグループプレゼンテーション。スライドと質疑応答付きです。",
      tags: ["プレゼン", "会話", "文化"],
      score: "評価：A",
    },
    {
      title: "N2漢字・語彙ノート",
      titleJp: "JLPT N2対策",
      description:
        "JLPT N2試験に向けて、500字以上の漢字とテーマ別の語彙をまとめて体系化しました。",
      tags: ["漢字", "自習", "N2"],
      score: "進行中",
    },
    {
      title: "レストランでの会話",
      titleJp: "場面別ロールプレイ",
      description:
        "レストランでのロールプレイ課題。注文・値段の確認・会計の際の丁寧な表現を練習しました。",
      tags: ["会話", "聞く・話す", "N3"],
      score: "評価：B+",
    },
    {
      title: "日本語学習日記",
      titleJp: "毎週の作文",
      description:
        "書く習慣を身につけ、学習の進み具合を記録するために、毎週日本語で短い日記を書いています。",
      tags: ["作文", "習慣", "自習"],
      score: "毎週",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">課題</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              日本語学習の過程で取り組んだ代表的な課題や成果物の一部です。
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

          {/* 課外活動は課題のすぐ下に表示 */}
          <div className="mt-20">
            <OpenSource />
          </div>
        </div>
      </div>
    </section>
  )
}
