"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp } from "lucide-react"
import type { Poll } from "@/data/pollData"

interface PollResultsProps {
  poll: Poll
}

export default function PollResults({ poll }: PollResultsProps) {
  // 선택지를 득표수 순으로 정렬
  const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes)
  const maxVotes = Math.max(...poll.options.map((option) => option.votes))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          투표 결과
        </CardTitle>
        <CardDescription>총 {poll.totalVotes}명이 참여했습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedOptions.map((option, index) => {
            const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
            const isWinner = option.votes === maxVotes && maxVotes > 0

            return (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {index === 0 && isWinner && <TrendingUp className="mr-2 h-4 w-4 text-green-600" />}
                    <span className={`font-medium ${isWinner ? "text-green-600" : ""}`}>{option.text}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{option.votes}표</div>
                    <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className="h-3"
                  style={{
                    background: isWinner ? "rgb(34 197 94 / 0.2)" : undefined,
                  }}
                />
              </div>
            )
          })}

          {poll.totalVotes === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>아직 투표 결과가 없습니다.</p>
              <p className="text-sm">첫 번째 투표를 해보세요!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
