"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"
import { useState } from "react"
import type { Poll } from "@/data/pollData"

interface PollOptionsProps {
  poll: Poll
  onSettingsUpdate: (settings: Partial<Poll>) => void
}

export default function PollOptions({ poll, onSettingsUpdate }: PollOptionsProps) {
  const [localSettings, setLocalSettings] = useState({
    allowMultipleVotes: poll.allowMultipleVotes,
    showResultsBeforeVote: poll.showResultsBeforeVote,
    expiresAt: poll.expiresAt || "",
  })

  const handleSave = () => {
    onSettingsUpdate({
      allowMultipleVotes: localSettings.allowMultipleVotes,
      showResultsBeforeVote: localSettings.showResultsBeforeVote,
      expiresAt: localSettings.expiresAt || null,
    })
  }

  const handleExpiryChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      expiresAt: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          설문 설정
        </CardTitle>
        <CardDescription>설문조사 옵션을 조정할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="multiple-votes">중복 투표 허용</Label>
              <div className="text-sm text-gray-500">사용자가 여러 번 투표할 수 있습니다</div>
            </div>
            <Switch
              id="multiple-votes"
              checked={localSettings.allowMultipleVotes}
              onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, allowMultipleVotes: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-results">투표 전 결과 공개</Label>
              <div className="text-sm text-gray-500">투표하기 전에도 결과를 볼 수 있습니다</div>
            </div>
            <Switch
              id="show-results"
              checked={localSettings.showResultsBeforeVote}
              onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, showResultsBeforeVote: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry-date">투표 마감일</Label>
            <Input
              id="expiry-date"
              type="datetime-local"
              value={localSettings.expiresAt ? new Date(localSettings.expiresAt).toISOString().slice(0, 16) : ""}
              onChange={(e) => handleExpiryChange(e.target.value ? new Date(e.target.value).toISOString() : "")}
            />
            <div className="text-sm text-gray-500">비워두면 마감일이 없습니다</div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          설정 저장
        </Button>
      </CardContent>
    </Card>
  )
}
