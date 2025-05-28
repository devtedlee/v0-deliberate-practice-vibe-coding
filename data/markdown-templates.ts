export const defaultMarkdown = `# 마크다운 편집기

## 환영합니다!
이 편집기에서 **마크다운**을 *실시간*으로 편집하고 미리볼 수 있습니다.

### 기능
- 실시간 미리보기
- 문법 하이라이팅
- 파일 내보내기

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

> 인용문 예시

[링크 예시](https://example.com)
`

export const toolbarActions = [
  { icon: "Heading", syntax: "# ", label: "제목" },
  { icon: "Bold", syntax: "**텍스트**", label: "굵게" },
  { icon: "Italic", syntax: "*텍스트*", label: "기울임" },
  { icon: "Link", syntax: "[텍스트](URL)", label: "링크" },
  { icon: "Image", syntax: "![alt](URL)", label: "이미지" },
  { icon: "Code", syntax: "`코드`", label: "인라인 코드" },
  { icon: "List", syntax: "- 항목\n- 항목\n- 항목", label: "목록" },
  { icon: "Quote", syntax: "> 인용문", label: "인용" },
  { icon: "CodeBlock", syntax: "```\n코드 블록\n```", label: "코드 블록" },
]

export const markdownEditorSeo = {
  title: "마크다운 편집기 | 실시간 마크다운 편집 및 미리보기",
  description: "마크다운 문법으로 텍스트를 작성하고 실시간으로 결과를 확인할 수 있는 온라인 마크다운 편집기입니다.",
  keywords: "마크다운, 편집기, 실시간, 미리보기, 문법, 하이라이팅, 파일 내보내기",
  ogTitle: "실시간 마크다운 편집기",
  ogDescription: "마크다운 문법으로 텍스트를 작성하고 실시간으로 결과를 확인할 수 있는 온라인 마크다운 편집기입니다.",
  ogImage: "/og-markdown-editor.png",
  canonicalUrl: "/markdown-editor",
}
