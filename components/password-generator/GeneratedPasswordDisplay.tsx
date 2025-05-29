"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GeneratedPasswordDisplayProps {
  password: string
  onCopy?: () => void
}

export default function GeneratedPasswordDisplay({ password, onCopy }: GeneratedPasswordDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast({
        title: "복사 완료!",
        description: "비밀번호가 클립보드에 복사되었습니다.",
      })
      onCopy?.()

      // 2초 후 복사 상태 리셋
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "비밀번호 복사에 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const displayPassword = showPassword ? password : "•".repeat(password.length)

  return (
    <Card>
      <CardHeader>
        <CardTitle>생성된 비밀번호</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={displayPassword}
            readOnly
            className="font-mono text-lg pr-20"
            placeholder="비밀번호가 여기에 표시됩니다"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Button variant="ghost" size="sm" onClick={togglePasswordVisibility} className="h-8 w-8 p-0">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!password} className="h-8 w-8 p-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {password && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>길이: {password.length}자</span>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!password} className="h-8">
              {copied ? (
                <>
                  <Check className="mr-1 h-3 w-3 text-green-500" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3 w-3" />
                  복사
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
