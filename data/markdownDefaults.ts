export const defaultMarkdownContent = `
# 마크다운 편집기에 오신 것을 환영합니다!

이것은 **실시간** 마크다운 편집기입니다.

## 주요 기능
- *실시간 미리보기*
- \`코드 블록\` 지원
- [링크 만들기](https://example.com)

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Markdown User');
\`\`\`

## 다음 단계
1. 좌측 패널에 마크다운을 입력하세요.
2. 우측 패널에서 결과를 확인하세요.
3. 다양한 마크다운 문법을 사용해보세요!

> 인용구 예시: 마크다운은 텍스트 기반의 마크업 언어로, 쉽게 읽고 쓸 수 있으며 HTML로 변환이 가능합니다.

---

## 마크다운 문법 가이드

### 텍스트 스타일
- **굵게**: \`**텍스트**\` 또는 \`__텍스트__\`
- *기울임*: \`*텍스트*\` 또는 \`_텍스트_\`
- ~~취소선~~: \`~~텍스트~~\`

### 목록
1. 순서 있는 목록
2. 두 번째 항목
   - 중첩된 항목
   - 또 다른 중첩 항목

### 표
| 항목 | 설명 | 가격 |
|------|------|------|
| 항목1 | 설명1 | 1000원 |
| 항목2 | 설명2 | 2000원 |
`

export const toolbarItems = [
  { type: "h1", label: "제목 1", icon: "Heading1", syntax: "# " },
  { type: "h2", label: "제목 2", icon: "Heading2", syntax: "## " },
  { type: "h3", label: "제목 3", icon: "Heading3", syntax: "### " },
  { type: "bold", label: "굵게", icon: "Bold", syntax: "**텍스트**" },
  { type: "italic", label: "기울임", icon: "Italic", syntax: "*텍스트*" },
  { type: "strikethrough", label: "취소선", icon: "Strikethrough", syntax: "~~텍스트~~" },
  { type: "link", label: "링크", icon: "Link", syntax: "[텍스트](URL)" },
  { type: "image", label: "이미지", icon: "Image", syntax: "![대체텍스트](이미지URL)" },
  { type: "code", label: "인라인 코드", icon: "Code", syntax: "`코드`" },
  { type: "codeblock", label: "코드 블록", icon: "FileCode", syntax: "```\n코드 블록\n```" },
  { type: "quote", label: "인용구", icon: "Quote", syntax: "> 인용구" },
  { type: "ul", label: "순서 없는 목록", icon: "List", syntax: "- 항목\n- 항목\n- 항목" },
  { type: "ol", label: "순서 있는 목록", icon: "ListOrdered", syntax: "1. 항목\n2. 항목\n3. 항목" },
  { type: "hr", label: "수평선", icon: "Minus", syntax: "\n---\n" },
  { type: "table", label: "표", icon: "Table", syntax: "| 제목1 | 제목2 |\n|------|------|\n| 내용1 | 내용2 |" },
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
