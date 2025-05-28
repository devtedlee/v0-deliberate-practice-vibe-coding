import { markdownEditorSeo } from "@/data/markdownDefaults"
import { MarkdownPageLayout } from "@/components/markdown-editor/MarkdownPageLayout"
import type { Metadata } from "next"

// 메타데이터 정의
export const metadata: Metadata = {
  title: markdownEditorSeo.title,
  description: markdownEditorSeo.description,
  keywords: markdownEditorSeo.keywords,
  openGraph: {
    title: markdownEditorSeo.ogTitle,
    description: markdownEditorSeo.ogDescription,
    images: [{ url: markdownEditorSeo.ogImage }],
    url: markdownEditorSeo.canonicalUrl,
  },
}

export default function MarkdownEditorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">실시간 마크다운 편집기</h1>
        <p className="text-gray-600">마크다운 문법으로 텍스트를 작성하고 실시간으로 결과를 확인할 수 있습니다.</p>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden h-[calc(100vh-250px)] min-h-[500px]">
        <MarkdownPageLayout />
      </div>
    </div>
  )
}
