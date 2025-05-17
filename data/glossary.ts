export interface GlossaryTerm {
  id: number
  term: string
  definition: string
  category: string
}

export const glossaryData: GlossaryTerm[] = [
  {
    id: 1,
    term: "HTML",
    definition: "HyperText Markup Language의 약자로, 웹 페이지의 구조를 정의하는 마크업 언어입니다.",
    category: "언어",
  },
  {
    id: 2,
    term: "CSS",
    definition: "Cascading Style Sheets의 약자로, HTML 요소의 스타일과 레이아웃을 정의하는 스타일 시트 언어입니다.",
    category: "언어",
  },
  {
    id: 3,
    term: "JavaScript",
    definition: "웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어로, 클라이언트 측과 서버 측 모두에서 사용됩니다.",
    category: "언어",
  },
  {
    id: 4,
    term: "React",
    definition: "Facebook에서 개발한 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.",
    category: "라이브러리/프레임워크",
  },
  {
    id: 5,
    term: "Vue.js",
    definition: "사용자 인터페이스를 구축하기 위한 프로그레시브 JavaScript 프레임워크입니다.",
    category: "라이브러리/프레임워크",
  },
  {
    id: 6,
    term: "Angular",
    definition: "Google에서 개발한 TypeScript 기반의 웹 애플리케이션 프레임워크입니다.",
    category: "라이브러리/프레임워크",
  },
  {
    id: 7,
    term: "DOM",
    definition: "Document Object Model의 약자로, HTML 및 XML 문서의 프로그래밍 인터페이스입니다.",
    category: "개념",
  },
  {
    id: 8,
    term: "API",
    definition: "Application Programming Interface의 약자로, 서로 다른 소프트웨어 간의 상호작용을 정의하는 규약입니다.",
    category: "개념",
  },
  {
    id: 9,
    term: "REST API",
    definition: "Representational State Transfer의 약자로, 웹 서비스를 설계하는 아키텍처 스타일입니다.",
    category: "개념",
  },
  {
    id: 10,
    term: "JSON",
    definition: "JavaScript Object Notation의 약자로, 데이터를 저장하고 전송하기 위한 경량 데이터 교환 형식입니다.",
    category: "데이터 형식",
  },
  {
    id: 11,
    term: "AJAX",
    definition:
      "Asynchronous JavaScript and XML의 약자로, 비동기적으로 데이터를 교환하고 웹 페이지를 업데이트하는 기술입니다.",
    category: "기술",
  },
  {
    id: 12,
    term: "Webpack",
    definition: "모듈 번들러로, 여러 자원을 하나의 파일로 묶어주는 도구입니다.",
    category: "도구",
  },
  {
    id: 13,
    term: "Babel",
    definition: "최신 JavaScript 코드를 이전 버전과 호환되는 코드로 변환해주는 트랜스파일러입니다.",
    category: "도구",
  },
  {
    id: 14,
    term: "npm",
    definition: "Node Package Manager의 약자로, JavaScript 패키지 관리자입니다.",
    category: "도구",
  },
  {
    id: 15,
    term: "yarn",
    definition: "Facebook에서 개발한 JavaScript 패키지 관리자로, npm의 대안입니다.",
    category: "도구",
  },
  {
    id: 16,
    term: "ESLint",
    definition: "JavaScript 코드에서 문제점을 찾고 고치는 정적 코드 분석 도구입니다.",
    category: "도구",
  },
  {
    id: 17,
    term: "TypeScript",
    definition: "Microsoft에서 개발한 JavaScript의 상위 집합 언어로, 정적 타입을 지원합니다.",
    category: "언어",
  },
  {
    id: 18,
    term: "SCSS/SASS",
    definition: "CSS의 전처리기로, 변수, 중첩 규칙, 믹스인 등의 기능을 제공합니다.",
    category: "언어",
  },
  {
    id: 19,
    term: "Redux",
    definition: "JavaScript 애플리케이션의 상태 관리 라이브러리입니다.",
    category: "라이브러리/프레임워크",
  },
  {
    id: 20,
    term: "JWT",
    definition: "JSON Web Token의 약자로, 당사자 간 정보를 안전하게 전송하기 위한 컴팩트하고 독립적인 방식입니다.",
    category: "보안",
  },
  {
    id: 21,
    term: "SPA",
    definition:
      "Single Page Application의 약자로, 하나의 HTML 페이지를 로드한 후 JavaScript를 사용하여 동적으로 콘텐츠를 업데이트하는 웹 애플리케이션입니다.",
    category: "개념",
  },
  {
    id: 22,
    term: "PWA",
    definition: "Progressive Web Application의 약자로, 웹과 네이티브 앱의 기능을 모두 제공하는 웹 애플리케이션입니다.",
    category: "개념",
  },
  {
    id: 23,
    term: "SEO",
    definition: "Search Engine Optimization의 약자로, 검색 엔진에서 웹사이트의 가시성을 높이는 과정입니다.",
    category: "마케팅",
  },
  {
    id: 24,
    term: "Responsive Design",
    definition: "다양한 디바이스와 화면 크기에 맞게 웹 페이지가 적절하게 표시되도록 하는 디자인 접근 방식입니다.",
    category: "디자인",
  },
  {
    id: 25,
    term: "Flexbox",
    definition: "CSS3의 레이아웃 모드로, 요소들을 행과 열 형태로 배치하는 방법을 제공합니다.",
    category: "CSS",
  },
  {
    id: 26,
    term: "Grid",
    definition: "CSS의 2차원 레이아웃 시스템으로, 행과 열을 기반으로 요소를 배치합니다.",
    category: "CSS",
  },
  {
    id: 27,
    term: "CDN",
    definition:
      "Content Delivery Network의 약자로, 지리적으로 분산된 서버 네트워크를 통해 콘텐츠를 빠르게 전달하는 시스템입니다.",
    category: "인프라",
  },
  {
    id: 28,
    term: "CORS",
    definition:
      "Cross-Origin Resource Sharing의 약자로, 다른 출처의 리소스에 대한 접근을 제어하는 HTTP 헤더 기반 메커니즘입니다.",
    category: "보안",
  },
  {
    id: 29,
    term: "Webpack",
    definition: "모듈 번들러로, 여러 자원을 하나의 파일로 묶어주는 도구입니다.",
    category: "도구",
  },
  {
    id: 30,
    term: "SSR",
    definition:
      "Server-Side Rendering의 약자로, 서버에서 페이지를 완전히 렌더링한 후 클라이언트에 전송하는 방식입니다.",
    category: "렌더링",
  },
]
