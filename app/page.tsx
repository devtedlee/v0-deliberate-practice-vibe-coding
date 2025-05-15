import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const pages = [
    {
      id: 1,
      title: "포트폴리오",
      description: "미니멀리즘 개발자 포트폴리오 페이지입니다.",
      path: "/portfolio",
      icon: "💼",
    },
    {
      id: 2,
      title: "나의 하루",
      description: "하루 일과를 시각적으로 보여주는 타임라인입니다.",
      path: "/timeline",
      icon: "⏱️",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">웹사이트 목록</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">다양한 페이지를 탐색해보세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={page.path}
              className="group block p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{page.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700">{page.title}</h2>
                  <p className="text-gray-600 mb-4">{page.description}</p>
                  <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    <span>페이지 방문하기</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
