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
    {
      id: 3,
      title: "오늘의 명언 & 팁",
      description: "매일 새로운 영감과 유용한 정보를 제공합니다.",
      path: "/quotes",
      icon: "💡",
    },
    {
      id: 4,
      title: "프론트엔드 용어 사전",
      description: "프론트엔드 개발 관련 용어를 쉽게 찾아볼 수 있습니다.",
      path: "/glossary",
      icon: "📚",
    },
    {
      id: 5,
      title: "기본 단위 변환기",
      description: "길이, 무게, 온도 단위를 쉽고 빠르게 변환할 수 있습니다.",
      path: "/converter",
      icon: "🔄",
    },
    {
      id: 6,
      title: "npm 패키지 통계",
      description: "인기 있는 npm 패키지들의 사용 통계를 시각화합니다.",
      path: "/npm-stats",
      icon: "📊",
    },
    {
      id: 7,
      title: "로컬 맛집 지도",
      description: "내가 추천하는 동네 맛집들을 지도에서 확인해보세요.",
      path: "/restaurant-map",
      icon: "🍽️",
    },
    {
      id: 8,
      title: "랜덤 색상 팔레트 생성기",
      description: "랜덤 색상 또는 Tailwind 색상으로 팔레트를 생성하고 복사할 수 있습니다.",
      path: "/color-palette",
      icon: "🎨",
    },
    {
      id: 9,
      title: "나만의 북마크 컬렉션",
      description: "주제별로 유용한 링크를 모아보고 관리할 수 있는 북마크 컬렉션입니다.",
      path: "/bookmarks",
      icon: "🔖",
    },
    {
      id: 10,
      title: "JSON 포매터/뷰어",
      description: "JSON 데이터를 포매팅하고 트리 구조로 시각화하여 쉽게 탐색할 수 있습니다.",
      path: "/json-formatter",
      icon: "🧩",
    },
    {
      id: 11,
      title: "글자 수/단어 수 카운터",
      description: "텍스트의 글자 수, 단어 수, 문장 수, 문단 수를 실시간으로 분석하고 카운트합니다.",
      path: "/text-counter",
      icon: "🔢",
    },
    {
      id: 12,
      title: "온라인 설문조사/투표",
      description: "다양한 주제에 대해 투표하고 실시간 결과를 확인할 수 있는 설문조사 플랫폼입니다.",
      path: "/poll",
      icon: "🗳️",
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
