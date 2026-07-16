import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import SectionDivider from "@/components/section-divider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "portfolio Huyền Xinh",
  description:
    "Portfolio của Phan Thanh Huyền - Sinh viên Khoa Tiếng Nhật, đam mê tiếng Nhật và văn hóa Nhật Bản.",
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Projects />
    </div>
  )
}
