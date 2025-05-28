"use client"

import { useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"

interface EditorPanelProps {
  markdown: string
  onChange: (value: string) => void
  className?: string
}

export function EditorPanel({ markdown, onChange, className = "" }: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 텍스트 영역 자동 높이 조절
  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    adjustHeight()
    window.addEventListener("resize", adjustHeight)
    return () => window.removeEventListener("resize", adjustHeight)
  }, [markdown])

  return (
    <div className={`relative h-full ${className}`}>
      <Textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full min-h-[500px] p-4 font-mono text-sm resize-none focus-visible:ring-1 focus-visible:ring-offset-0 border-0 rounded-none bg-white dark:bg-gray-50"
        placeholder="마크다운을 입력하세요..."
        spellCheck={false}
        data-testid="markdown-editor"
      />
    </div>
  )
}
