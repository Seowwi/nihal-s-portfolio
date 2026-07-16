import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import ClientLayout from "./client"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "portfolio Huyền Xinh",
  description:
    "日本語学科の学生グエン・ミン・アインのポートフォリオ。日本語、日本文化、翻訳・通訳に情熱を注いでいます。",
  keywords: [
    "グエン・ミン・アイン",
    "日本語学科",
    "日本語",
    "JLPT",
    "翻訳",
    "通訳",
    "学生",
  ],
  authors: [{ name: "グエン・ミン・アイン" }],
  creator: "グエン・ミン・アイン",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://example.com",
    title: "portfolio Huyền Xinh",
    description:
      "日本語学科の学生グエン・ミン・アインのポートフォリオ。日本語と日本文化に情熱を注いでいます。",
    siteName: "グエン・ミン・アイン ポートフォリオ",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "グエン・ミン・アイン ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "portfolio Huyền Xinh",
    description:
      "日本語学科の学生グエン・ミン・アインのポートフォリオ。日本語と日本文化に情熱を注いでいます。",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense>
        <ClientLayout>{children}</ClientLayout>
      </Suspense>
      <Analytics />
    </>
  )
}


import './globals.css'
