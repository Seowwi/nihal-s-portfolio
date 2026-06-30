import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nihal Maskey | Senior Software Engineer",
  description:
    "Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.",
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
    </div>
  )
}
