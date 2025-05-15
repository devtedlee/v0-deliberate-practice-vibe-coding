import {
  Sun,
  Coffee,
  Mail,
  Users,
  Code,
  FileText,
  GitPullRequest,
  Video,
  Activity,
  Book,
  Moon,
  Utensils,
  type LucideIcon,
} from "lucide-react"

interface Event {
  id: number
  time: string
  activity: string
  icon: string
  category: string
}

interface TimelineEventProps {
  event: Event
  position: "left" | "right"
}

export default function TimelineEvent({ event, position }: TimelineEventProps) {
  // 카테고리별 색상 설정
  const categoryColors = {
    routine: "bg-blue-50 border-blue-200 text-blue-700",
    meal: "bg-green-50 border-green-200 text-green-700",
    work: "bg-purple-50 border-purple-200 text-purple-700",
    exercise: "bg-orange-50 border-orange-200 text-orange-700",
    personal: "bg-pink-50 border-pink-200 text-pink-700",
  }

  // 아이콘 매핑
  const iconMap: Record<string, LucideIcon> = {
    sun: Sun,
    coffee: Coffee,
    mail: Mail,
    users: Users,
    code: Code,
    "file-text": FileText,
    "git-pull-request": GitPullRequest,
    video: Video,
    activity: Activity,
    book: Book,
    moon: Moon,
    utensils: Utensils,
  }

  const IconComponent = iconMap[event.icon] || Sun
  const colorClass =
    categoryColors[event.category as keyof typeof categoryColors] || "bg-gray-50 border-gray-200 text-gray-700"

  return (
    <div
      className={`flex items-center justify-center mb-8 md:mb-12 ${
        position === "left" ? "md:justify-start" : "md:justify-end"
      }`}
    >
      <div className={`relative flex md:w-5/12 ${position === "right" && "md:ml-auto"}`}>
        {/* 이벤트 카드 */}
        <div className={`w-full p-4 rounded-lg border shadow-sm transition-all hover:shadow-md ${colorClass}`}>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-white mr-3">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold">{event.time}</div>
              <div className="mt-1">{event.activity}</div>
            </div>
          </div>
        </div>

        {/* 타임라인 연결 요소 - 모바일에서는 숨김 */}
        <div
          className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-300 z-10
          ${position === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}"
        ></div>
      </div>
    </div>
  )
}
