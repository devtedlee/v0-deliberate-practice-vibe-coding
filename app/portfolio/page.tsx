import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Hero
          name="홍길동"
          description="문제를 해결하고 성장을 즐기는 개발자입니다."
          githubUrl="https://github.com/username"
          linkedinUrl="https://linkedin.com/in/username"
        />
        <Projects />
        <Footer name="홍길동" email="contact@example.com" />
      </main>
    </div>
  )
}
