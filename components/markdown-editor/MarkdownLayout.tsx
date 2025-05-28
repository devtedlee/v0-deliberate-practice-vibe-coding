"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { EditorPanel } from "./EditorPanel"
import { PreviewPanel } from "./PreviewPanel"
import { Toolbar } from "./Toolbar"
import { defaultMarkdown } from "@/data/markdown-templates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useToast } from "@/components/ui/use-toast"

export function MarkdownLayout() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 단어 수와 글자 수 계산
  useEffect(() => {
    const text = markdown.trim()
    setCharCount(text.length)
    setWordCount(text ? text.split(/\s+/).length : 0)
  }, [markdown])

  // 디바운스 적용 마크다운 업데이트
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedMarkdown(markdown)
      setIsSaved(false)
    }, 300)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [markdown])

  // 로컬 스토리지에서 마크다운 불러오기
  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdown-content")
    if (savedMarkdown) {
      setMarkdown(savedMarkdown)
      setDebouncedMarkdown(savedMarkdown)
    }
  }, [])

  // 마크다운 문법 삽입
  const handleInsertSyntax = useCallback((syntax: string) => {
    setMarkdown((prev) => prev + syntax)
    setIsSaved(false)
  }, [])

  // 마크다운 파일 내보내기
  const handleExport = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "markdown-export.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "내보내기 완료",
      description: "마크다운 파일이 다운로드되었습니다.",
    })
  }, [markdown, toast])

  // 마크다운 파일 가져오기
  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  // 파일 선택 처리
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          setMarkdown(content)
          setDebouncedMarkdown(content)
          setIsSaved(false)
          toast({
            title: "가져오기 완료",
            description: `${file.name} 파일을 성공적으로 불러왔습니다.`,
          })
        }
        reader.readAsText(file)
      }
      // 같은 파일을 다시 선택할 수 있도록 value 초기화
      e.target.value = ""
    },
    [toast],
  )

  // 로컬 스토리지에 저장
  const handleSave = useCallback(() => {
    localStorage.setItem("markdown-content", markdown)
    setIsSaved(true)
    toast({
      title: "저장 완료",
      description: "마크다운 내용이 로컬 스토리지에 저장되었습니다.",
    })
  }, [markdown, toast])

  // 전체화면 토글
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast({
          title: "전체화면 오류",
          description: `전체화면 모드를 시작할 수 없습니다: ${err.message}`,
          variant: "destructive",
        })
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen, toast])

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : ""}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".md,.markdown,.txt"
        className="hidden"
      />

      <Toolbar
        onInsert={handleInsertSyntax}
        onExport={handleExport}
        onImport={handleImport}
        onFullscreen={toggleFullscreen}
        onSave={handleSave}
        wordCount={wordCount}
        charCount={charCount}
        isSaved={isSaved}
      />

      {isDesktop ? (
        <div className="flex flex-1 overflow-hidden">
          <EditorPanel
            markdown={markdown}
            onChange={setMarkdown}
            className="w-1/2 border-r border-gray-300 dark:border-gray-600"
          />
          <PreviewPanel markdown={debouncedMarkdown} className="w-1/2" />
        </div>
      ) : (
        <Tabs defaultValue="editor" className="flex-1 overflow-hidden">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-300 dark:border-gray-600 bg-transparent">
            <TabsTrigger
              value="editor"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100"
            >
              편집기
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100"
            >
              미리보기
            </TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="flex-1 m-0 p-0 overflow-hidden">
            <EditorPanel markdown={markdown} onChange={setMarkdown} className="h-full" />
          </TabsContent>
          <TabsContent value="preview" className="flex-1 m-0 p-0 overflow-hidden">
            <PreviewPanel markdown={debouncedMarkdown} className="h-full" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
