import Timeline from "@/components/timeline/Timeline"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TimelinePage() {
  const myDayEvents = [
    {
      id: 1,
      time: "06:30",
      activity: "기상 및 스트레칭",
      icon: "sun",
      category: "routine",
    },
    {
      id: 2,
      time: "07:00",
      activity: "아침 식사 및 뉴스 확인",
      icon: "coffee",
      category: "meal",
    },
    {
      id: 3,
      time: "08:00",
      activity: "이메일 확인 및 일일 계획 수립",
      icon: "mail",
      category: "work",
    },
    {
      id: 4,
      time: "09:00",
      activity: "팀 미팅",
      icon: "users",
      category: "work",
    },
    {
      id: 5,
      time: "10:30",
      activity: "프로젝트 개발 작업",
      icon: "code",
      category: "work",
    },
    {
      id: 6,
      time: "12:30",
      activity: "점심 식사",
      icon: "utensils",
      category: "meal",
    },
    {
      id: 7,
      time: "13:30",
      activity: "코드 리뷰",
      icon: "git-pull-request",
      category: "work",
    },
    {
      id: 8,
      time: "15:00",
      activity: "클라이언트 미팅",
      icon: "video",
      category: "work",
    },
    {
      id: 9,
      time: "16:30",
      activity: "문서 작업 및 이슈 정리",
      icon: "file-text",
      category: "work",
    },
    {
      id: 10,
      time: "18:00",
      activity: "퇴근 및 운동",
      icon: "activity",
      category: "exercise",
    },
    {
      id: 11,
      time: "19:30",
      activity: "저녁 식사",
      icon: "utensils",
      category: "meal",
    },
    {
      id: 12,
      time: "20:30",
      activity: "개인 프로젝트 또는 독서",
      icon: "book",
      category: "personal",
    },
    {
      id: 13,
      time: "22:00",
      activity: "내일 일정 확인 및 취침 준비",
      icon: "moon",
      category: "routine",
    },
    {
      id: 14,
      time: "23:00",
      activity: "취침",
      icon: "moon",
      category: "routine",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">나의 하루</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            하루 일과를 시간 순서대로 시각적으로 보여주는 타임라인입니다.
          </p>
        </div>

        <Timeline events={myDayEvents} />
      </main>
    </div>
  )
}
