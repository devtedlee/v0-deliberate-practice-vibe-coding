import TimelineEvent from "./TimelineEvent"

interface Event {
  id: number
  time: string
  activity: string
  icon: string
  category: string
}

interface TimelineProps {
  events: Event[]
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative py-8">
      {/* 중앙 타임라인 선 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 z-0"></div>

      <div className="relative z-10">
        {events.map((event, index) => (
          <TimelineEvent key={event.id} event={event} position={index % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </div>
  )
}
