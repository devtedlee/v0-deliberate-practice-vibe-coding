"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Download, Code, RefreshCw, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { sampleJson } from "@/utils/sampleJson"
import JsonTreeView from "@/components/json-formatter/JsonTreeView"

export default function JsonFormatterPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [formattedJson, setFormattedJson] = useState("")
  const [jsonObject, setJsonObject] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("formatted")
  const [copied, setCopied] = useState(false)

  // JSON 포매팅 함수
  const formatJson = () => {
    if (!jsonInput.trim()) {
      setError("JSON을 입력해주세요.")
      setFormattedJson("")
      setJsonObject(null)
      return
    }

    try {
      // JSON 파싱 시도
      const parsedJson = JSON.parse(jsonInput)
      // 성공하면 포매팅된 JSON 설정
      const formatted = JSON.stringify(parsedJson, null, 2)
      setFormattedJson(formatted)
      setJsonObject(parsedJson)
      setError(null)
    } catch (err) {
      // 파싱 실패 시 에러 메시지 설정
      setError(`유효하지 않은 JSON 형식입니다: ${(err as Error).message}`)
      setFormattedJson("")
      setJsonObject(null)
    }
  }

  // 샘플 JSON 불러오기
  const loadSampleJson = () => {
    const sampleJsonString = JSON.stringify(sampleJson, null, 2)
    setJsonInput(sampleJsonString)
    setFormattedJson(sampleJsonString)
    setJsonObject(sampleJson)
    setError(null)
  }

  // JSON 복사하기
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // JSON 다운로드
  const downloadJson = () => {
    if (!formattedJson) return

    const blob = new Blob([formattedJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">JSON 포매터/뷰어</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            JSON 데이터를 입력하고 포매팅하여 보기 좋게 정렬하거나 트리 구조로 시각화할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 섹션 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>JSON 입력</CardTitle>
              <CardDescription>포매팅할 JSON 데이터를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='{"example": "JSON 데이터를 여기에 입력하세요"}'
                className="min-h-[300px] font-mono text-sm"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button onClick={formatJson} className="flex items-center">
                <Code className="mr-2 h-4 w-4" />
                JSON 포매팅
              </Button>
              <Button variant="outline" onClick={loadSampleJson} className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                샘플 불러오기
              </Button>
            </CardFooter>
          </Card>

          {/* 결과 섹션 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>결과</CardTitle>
              <CardDescription>포매팅된 JSON 결과를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="formatted">포매팅된 JSON</TabsTrigger>
                    <TabsTrigger value="tree">트리 뷰</TabsTrigger>
                  </TabsList>
                  <TabsContent value="formatted" className="min-h-[300px]">
                    {formattedJson ? (
                      <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px] text-sm font-mono">
                        {formattedJson}
                      </pre>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        JSON을 입력하고 포매팅 버튼을 클릭하세요
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="tree" className="min-h-[300px]">
                    {jsonObject ? (
                      <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                        <JsonTreeView data={jsonObject} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        JSON을 입력하고 포매팅 버튼을 클릭하세요
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!formattedJson}
                className="flex items-center"
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "복사됨" : "복사하기"}
              </Button>
              <Button variant="outline" onClick={downloadJson} disabled={!formattedJson} className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                다운로드
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
