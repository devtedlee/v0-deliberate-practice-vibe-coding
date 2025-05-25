"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PollQuestion from "@/components/poll/PollQuestion"
import PollResults from "@/components/poll/PollResults"
import PollOptions from "@/components/poll/PollOptions"
import { samplePoll, additionalPolls, type Poll } from "@/data/pollData"

export default function PollPage() {
  const [currentPoll, setCurrentPoll] = useState<Poll>(samplePoll)
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("vote")

  // 컴포넌트 마운트 시 투표 상태 확인
  useEffect(() => {
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}")
    const hasUserVoted = votedPolls[currentPoll.id] || false
    setHasVoted(hasUserVoted)

    // 결과를 미리 보여주는 설정이거나 이미 투표한 경우 결과 표시
    if (currentPoll.showResultsBeforeVote || hasUserVoted) {
      setShowResults(true)
      setActiveTab("results")
    }
  }, [currentPoll.id, currentPoll.showResultsBeforeVote])

  // 투표 만료 여부 확인
  const isPollExpired = () => {
    if (!currentPoll.expiresAt) return false
    return new Date() > new Date(currentPoll.expiresAt)
  }

  // 투표 처리
  const handleVote = () => {
    if (!selectedOption || hasVoted || isPollExpired()) return

    // 투표 수 업데이트
    const updatedPoll = {
      ...currentPoll,
      options: currentPoll.options.map((option) =>
        option.id === selectedOption ? { ...option, votes: option.votes + 1 } : option,
      ),
      totalVotes: currentPoll.totalVotes + 1,
    }

    setCurrentPoll(updatedPoll)

    // 로컬 스토리지에 투표 기록 저장
    if (!currentPoll.allowMultipleVotes) {
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}")
      votedPolls[currentPoll.id] = true
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls))
      setHasVoted(true)
    }

    // 결과 표시
    setShowResults(true)
    setActiveTab("results")
  }

  // 설문 변경
  const handlePollChange = (poll: Poll) => {
    setCurrentPoll(poll)
    setSelectedOption(null)
    setShowResults(poll.showResultsBeforeVote)
    setActiveTab(poll.showResultsBeforeVote ? "results" : "vote")

    // 새 설문의 투표 상태 확인
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}")
    const hasUserVoted = votedPolls[poll.id] || false
    setHasVoted(hasUserVoted)
  }

  // 설정 업데이트
  const handleSettingsUpdate = (settings: Partial<Poll>) => {
    setCurrentPoll((prev) => ({ ...prev, ...settings }))
  }

  // 만료일 포맷팅
  const formatExpiryDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">온라인 설문조사/투표</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">다양한 주제에 대해 투표하고 실시간 결과를 확인해보세요.</p>
        </div>

        {/* 설문 선택 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>설문 선택</CardTitle>
            <CardDescription>참여하고 싶은 설문을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[samplePoll, ...additionalPolls].map((poll) => (
                <Button
                  key={poll.id}
                  variant={currentPoll.id === poll.id ? "default" : "outline"}
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => handlePollChange(poll)}
                >
                  <div>
                    <div className="font-medium text-sm mb-1">{poll.question}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {poll.totalVotes}명 참여
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 만료 경고 */}
        {isPollExpired() && (
          <Alert className="mb-6" variant="destructive">
            <Clock className="h-4 w-4" />
            <AlertTitle>투표 마감</AlertTitle>
            <AlertDescription>
              이 설문조사는 {currentPoll.expiresAt && formatExpiryDate(currentPoll.expiresAt)}에 마감되었습니다.
            </AlertDescription>
          </Alert>
        )}

        {/* 이미 투표한 경우 알림 */}
        {hasVoted && !currentPoll.allowMultipleVotes && (
          <Alert className="mb-6">
            <Users className="h-4 w-4" />
            <AlertTitle>투표 완료</AlertTitle>
            <AlertDescription>
              이미 이 설문에 투표하셨습니다.{" "}
              {currentPoll.allowMultipleVotes ? "다시 투표할 수 있습니다." : "중복 투표는 허용되지 않습니다."}
            </AlertDescription>
          </Alert>
        )}

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vote">투표하기</TabsTrigger>
                <TabsTrigger value="results">결과 보기</TabsTrigger>
              </TabsList>

              <TabsContent value="vote" className="mt-6">
                <PollQuestion
                  poll={currentPoll}
                  selectedOption={selectedOption}
                  onOptionSelect={setSelectedOption}
                  onVote={handleVote}
                  hasVoted={hasVoted}
                  isPollExpired={isPollExpired()}
                  showResults={showResults}
                />
              </TabsContent>

              <TabsContent value="results" className="mt-6">
                <PollResults poll={currentPoll} />
              </TabsContent>
            </Tabs>
          </div>

          {/* 사이드바 - 설정 및 정보 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  설문 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">총 참여자</span>
                  <span className="font-medium">{currentPoll.totalVotes}명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">중복 투표</span>
                  <span className="font-medium">{currentPoll.allowMultipleVotes ? "허용" : "불허"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">결과 공개</span>
                  <span className="font-medium">
                    {currentPoll.showResultsBeforeVote ? "투표 전 공개" : "투표 후 공개"}
                  </span>
                </div>
                {currentPoll.expiresAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">마감일</span>
                    <span className="font-medium text-sm">{formatExpiryDate(currentPoll.expiresAt)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <PollOptions poll={currentPoll} onSettingsUpdate={handleSettingsUpdate} />
          </div>
        </div>
      </div>
    </div>
  )
}
