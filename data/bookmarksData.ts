export interface Bookmark {
  id: number
  category: string
  title: string
  url: string
  description: string
  thumbnail: string
  tags: string[]
  addedAt: string // ISO 날짜 문자열
}

export const bookmarks: Bookmark[] = [
  {
    id: 1,
    category: "개발",
    title: "React 공식 문서",
    url: "https://react.dev/",
    description:
      "최신 React 공식 문서와 가이드. 컴포넌트, 훅, 상태 관리 등 React 개발에 필요한 모든 정보를 제공합니다.",
    thumbnail: "https://react.dev/favicon.ico",
    tags: ["react", "javascript", "frontend"],
    addedAt: "2023-05-15T09:24:00Z",
  },
  {
    id: 2,
    category: "개발",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description:
      "Next.js 프레임워크의 공식 문서. 라우팅, 데이터 페칭, 렌더링 방식 등 Next.js의 모든 기능을 설명합니다.",
    thumbnail: "https://nextjs.org/favicon.ico",
    tags: ["nextjs", "react", "framework"],
    addedAt: "2023-06-20T14:30:00Z",
  },
  {
    id: 3,
    category: "개발",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    description: "유틸리티 우선 CSS 프레임워크. 클래스 이름을 조합하여 빠르게 UI를 구성할 수 있습니다.",
    thumbnail: "https://tailwindcss.com/favicon.ico",
    tags: ["css", "tailwind", "frontend"],
    addedAt: "2023-04-10T11:15:00Z",
  },
  {
    id: 4,
    category: "디자인",
    title: "Figma",
    url: "https://figma.com/",
    description: "협업 디자인 툴. 팀원들과 함께 디자인 작업을 할 수 있으며, 프로토타이핑 기능도 제공합니다.",
    thumbnail: "https://static.figma.com/app/icon/1/favicon.png",
    tags: ["design", "ui", "ux", "collaboration"],
    addedAt: "2023-03-05T16:45:00Z",
  },
  {
    id: 5,
    category: "디자인",
    title: "Dribbble",
    url: "https://dribbble.com/",
    description: "디자이너들의 작품을 공유하는 플랫폼. 다양한 디자인 영감을 얻을 수 있습니다.",
    thumbnail:
      "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",
    tags: ["design", "inspiration", "portfolio"],
    addedAt: "2023-02-18T10:30:00Z",
  },
  {
    id: 6,
    category: "디자인",
    title: "Coolors",
    url: "https://coolors.co/",
    description: "색상 팔레트 생성 도구. 프로젝트에 어울리는 색상 조합을 쉽게 찾을 수 있습니다.",
    thumbnail: "https://coolors.co/assets/img/favicon.png",
    tags: ["colors", "palette", "design-tools"],
    addedAt: "2023-07-12T08:20:00Z",
  },
  {
    id: 7,
    category: "생산성",
    title: "Notion",
    url: "https://notion.so/",
    description: "올인원 워크스페이스. 노트, 문서, 프로젝트 관리, 위키 등 다양한 용도로 활용할 수 있습니다.",
    thumbnail: "https://www.notion.so/front-static/favicon.ico",
    tags: ["productivity", "workspace", "notes"],
    addedAt: "2023-01-25T13:40:00Z",
  },
  {
    id: 8,
    category: "생산성",
    title: "Trello",
    url: "https://trello.com/",
    description: "칸반 방식의 프로젝트 관리 도구. 직관적인 UI로 태스크를 관리할 수 있습니다.",
    thumbnail: "https://trello.com/favicon.ico",
    tags: ["productivity", "project-management", "kanban"],
    addedAt: "2023-08-03T15:10:00Z",
  },
  {
    id: 9,
    category: "생산성",
    title: "Todoist",
    url: "https://todoist.com/",
    description: "할 일 관리 앱. 간단한 UI와 강력한 기능으로 개인 및 팀 태스크를 관리할 수 있습니다.",
    thumbnail: "https://todoist.com/favicon.ico",
    tags: ["todo", "productivity", "task-management"],
    addedAt: "2023-09-15T09:50:00Z",
  },
  {
    id: 10,
    category: "자기계발",
    title: "Coursera",
    url: "https://www.coursera.org/",
    description: "온라인 교육 플랫폼. 세계 유수의 대학과 기업이 제공하는 강좌를 수강할 수 있습니다.",
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/favicon-v2-96x96.png",
    tags: ["education", "online-courses", "learning"],
    addedAt: "2023-04-28T11:25:00Z",
  },
  {
    id: 11,
    category: "자기계발",
    title: "Blinkist",
    url: "https://www.blinkist.com/",
    description: "책 요약 서비스. 다양한 분야의 책을 15분 내외로 요약해서 제공합니다.",
    thumbnail: "https://www.blinkist.com/favicon.ico",
    tags: ["books", "summary", "reading"],
    addedAt: "2023-06-07T14:15:00Z",
  },
  {
    id: 12,
    category: "자기계발",
    title: "TED",
    url: "https://www.ted.com/",
    description: "다양한 주제의 강연 모음. 영감을 주는 아이디어와 지식을 얻을 수 있습니다.",
    thumbnail: "https://pa.tedcdn.com/favicon.ico",
    tags: ["talks", "inspiration", "knowledge"],
    addedAt: "2023-05-19T16:30:00Z",
  },
]

// 모든 카테고리 목록 추출
export const categories = Array.from(new Set(bookmarks.map((bookmark) => bookmark.category)))

// 모든 태그 목록 추출
export const allTags = Array.from(new Set(bookmarks.flatMap((bookmark) => bookmark.tags)))
