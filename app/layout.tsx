import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import ClientLayout from "./client"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Nihal Maskey | Senior Software Engineer",
  description:
    "Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.",
  keywords: [
    "Nihal Maskey",
    "Software Engineer",
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
  ],
  authors: [{ name: "Nihal Maskey" }],
  creator: "Nihal Maskey",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nihalmaskey.com",
    title: "Nihal Maskey | Senior Software Engineer",
    description:
      "Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.",
    siteName: "Nihal Maskey Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Nihal Maskey Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nihal Maskey | Senior Software Engineer",
    description:
      "Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.",
    creator: "@maskeynihal",
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