"use client"
import { MarkdownLayout } from "@/components/markdown-editor/MarkdownLayout"

export default function MarkdownEditorClientPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600 p-4">
        <h1 className="text-2xl font-bold text-center">마크다운 편집기</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <MarkdownLayout />
      </main>
    </div>
  )
}
