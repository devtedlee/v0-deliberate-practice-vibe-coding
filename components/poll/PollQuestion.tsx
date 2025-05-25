"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Vote, CheckCircle } from "lucide-react"
import type { Poll } from "@/data/pollData"

interface PollQuestionProps {
  poll: Poll
  selectedOption: number | null
  onOptionSelect: (optionId: number) => void
  onVote: () => void
  hasVoted: boolean
  isPollExpired: boolean
  showResults: boolean
}

export default function PollQuestion({
  poll,
  selectedOption,
  onOptionSelect,
  onVote,
  hasVoted,
  isPollExpired,
  showResults,
}: PollQuestionProps) {
  const canVote = !hasVoted && !isPollExpired && selectedOption !== null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{poll.question}</CardTitle>
        <CardDescription>
          {isPollExpired
            ? "이 설문조사는 마감되었습니다."
            : hasVoted && !poll.allowMultipleVotes
              ? "투표해주셔서 감사합니다!"
              : "하나의 선택지를 선택해주세요."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => onOptionSelect(Number(value))}
            disabled={(hasVoted && !poll.allowMultipleVotes) || isPollExpired}
          >
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.id.toString()}
                  id={`option-${option.id}`}
                  disabled={(hasVoted && !poll.allowMultipleVotes) || isPollExpired}
                />
                <Label
                  htmlFor={`option-${option.id}`}
                  className={`flex-1 cursor-pointer p-3 rounded-lg border transition-colors ${
                    selectedOption === option.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  } ${(hasVoted && !poll.allowMultipleVotes) || isPollExpired ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    {showResults && (
                      <span className="text-sm text-gray-500">
                        {option.votes}표 ({poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0}
                        %)
                      </span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-center">
            {hasVoted && !poll.allowMultipleVotes ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>투표 완료</span>
              </div>
            ) : (
              <Button onClick={onVote} disabled={!canVote} className="flex items-center" size="lg">
                <Vote className="mr-2 h-4 w-4" />
                {isPollExpired ? "투표 마감" : "투표하기"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
