import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import ClientLayout from "./client"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Nguyễn Minh Anh | Sinh viên ngành Ngôn ngữ Nhật",
  description:
    "Hồ sơ cá nhân của Nguyễn Minh Anh, sinh viên ngành Ngôn ngữ Nhật, đam mê tiếng Nhật, văn hóa Nhật Bản và biên - phiên dịch.",
  keywords: [
    "Nguyễn Minh Anh",
    "Ngôn ngữ Nhật",
    "Tiếng Nhật",
    "日本語",
    "JLPT",
    "Biên dịch",
    "Phiên dịch",
    "Sinh viên",
  ],
  authors: [{ name: "Nguyễn Minh Anh" }],
  creator: "Nguyễn Minh Anh",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://example.com",
    title: "Nguyễn Minh Anh | Sinh viên ngành Ngôn ngữ Nhật",
    description:
      "Hồ sơ cá nhân của Nguyễn Minh Anh, sinh viên ngành Ngôn ngữ Nhật, đam mê tiếng Nhật và văn hóa Nhật Bản.",
    siteName: "Hồ sơ Nguyễn Minh Anh",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Nguyễn Minh Anh Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Minh Anh | Sinh viên ngành Ngôn ngữ Nhật",
    description:
      "Hồ sơ cá nhân của Nguyễn Minh Anh, sinh viên ngành Ngôn ngữ Nhật, đam mê tiếng Nhật và văn hóa Nhật Bản.",
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
