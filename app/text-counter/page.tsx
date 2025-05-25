"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, RefreshCw, Check, AlertTriangle, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { sampleTexts, defaultSampleText } from "@/utils/sampleText"

interface CountOptions {
  includeSpaces: boolean
  includeSpecialChars: boolean
  includeNumbers: boolean
  maxCharLimit: number
  enableMaxLimit: boolean
}

interface CountResult {
  totalChars: number
  totalCharsNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
}

export default function TextCounterPage() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<CountOptions>({
    includeSpaces: true,
    includeSpecialChars: true,
    includeNumbers: true,
    maxCharLimit: 1000,
    enableMaxLimit: false,
  })

  // 텍스트 분석 함수
  const analyzeText = (inputText: string): CountResult => {
    if (!inputText) {
      return {
        totalChars: 0,
        totalCharsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
      }
    }

    let processedText = inputText

    // 옵션에 따른 텍스트 처리
    if (!options.includeSpecialChars) {
      processedText = processedText.replace(/[^\w\s가-힣]/g, "")
    }
    if (!options.includeNumbers) {
      processedText = processedText.replace(/\d/g, "")
    }

    // 글자 수 계산
    const totalChars = options.includeSpaces ? processedText.length : processedText.replace(/\s/g, "").length
    const totalCharsNoSpaces = processedText.replace(/\s/g, "").length

    // 단어 수 계산 (공백으로 구분된 단어들)
    const words = processedText.trim() ? processedText.trim().split(/\s+/).length : 0

    // 문장 수 계산 (마침표, 느낌표, 물음표로 구분)
    const sentences = processedText.trim() ? processedText.split(/[.!?]+/).filter((s) => s.trim()).length : 0

    // 문단 수 계산 (빈 줄로 구분)
    const paragraphs = processedText.trim() ? processedText.split(/\n\s*\n/).filter((p) => p.trim()).length : 0

    return {
      totalChars,
      totalCharsNoSpaces,
      words,
      sentences,
      paragraphs,
    }
  }

  const result = analyzeText(text)

  // 최대 글자 수 초과 여부 확인
  const isOverLimit = options.enableMaxLimit && result.totalChars > options.maxCharLimit

  // 샘플 텍스트 불러오기
  const loadSampleText = (sampleType: string) => {
    const sampleText = sampleTexts[sampleType as keyof typeof sampleTexts] || defaultSampleText
    setText(sampleText)
  }

  // 텍스트 복사하기
  const copyText = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 텍스트 지우기
  const clearText = () => {
    setText("")
  }

  // 옵션 변경 핸들러
  const updateOption = (key: keyof CountOptions, value: boolean | number) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">글자 수/단어 수 카운터</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            텍스트를 입력하고 글자 수, 단어 수, 문장 수, 문단 수를 실시간으로 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 텍스트 입력 섹션 */}
          <div className="lg:col-span-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>텍스트 입력</CardTitle>
                <CardDescription>분석할 텍스트를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="여기에 텍스트를 입력하세요..."
                    className="min-h-[400px] text-sm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  {/* 최대 글자 수 경고 */}
                  {isOverLimit && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>글자 수 초과</AlertTitle>
                      <AlertDescription>
                        최대 {options.maxCharLimit}자를 초과했습니다. 현재 {result.totalChars}자입니다.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* 버튼 그룹 */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={copyText} disabled={!text} className="flex items-center">
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? "복사됨" : "텍스트 복사"}
                    </Button>
                    <Button variant="outline" onClick={clearText} disabled={!text} className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      텍스트 지우기
                    </Button>
                    <Select onValueChange={loadSampleText}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="샘플 불러오기" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="korean">한국어 샘플</SelectItem>
                        <SelectItem value="english">영어 샘플</SelectItem>
                        <SelectItem value="mixed">한영 혼합 샘플</SelectItem>
                        <SelectItem value="long">긴 텍스트 샘플</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 결과 및 설정 섹션 */}
          <div className="space-y-6">
            {/* 카운트 결과 */}
            <Card>
              <CardHeader>
                <CardTitle>분석 결과</CardTitle>
                <CardDescription>실시간 텍스트 분석 결과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{result.totalChars.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">총 글자 수</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{result.words.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">단어 수</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{result.sentences.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">문장 수</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{result.paragraphs.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">문단 수</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-600">{result.totalCharsNoSpaces.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">공백 제외 글자 수</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 설정 옵션 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  카운트 설정
                </CardTitle>
                <CardDescription>카운트 방식을 설정하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-spaces">공백 포함</Label>
                    <Switch
                      id="include-spaces"
                      checked={options.includeSpaces}
                      onCheckedChange={(checked) => updateOption("includeSpaces", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-special">특수문자 포함</Label>
                    <Switch
                      id="include-special"
                      checked={options.includeSpecialChars}
                      onCheckedChange={(checked) => updateOption("includeSpecialChars", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-numbers">숫자 포함</Label>
                    <Switch
                      id="include-numbers"
                      checked={options.includeNumbers}
                      onCheckedChange={(checked) => updateOption("includeNumbers", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-limit">최대 글자 수 제한</Label>
                    <Switch
                      id="enable-limit"
                      checked={options.enableMaxLimit}
                      onCheckedChange={(checked) => updateOption("enableMaxLimit", checked)}
                    />
                  </div>
                  {options.enableMaxLimit && (
                    <div className="space-y-2">
                      <Label htmlFor="max-limit">최대 글자 수</Label>
                      <Input
                        id="max-limit"
                        type="number"
                        min="1"
                        value={options.maxCharLimit}
                        onChange={(e) => updateOption("maxCharLimit", Number.parseInt(e.target.value) || 1000)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
