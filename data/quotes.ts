export interface QuoteItem {
  id: number
  content: string
  author?: string
  type: "quote" | "tip"
  category?: string
}

export const quotesData: QuoteItem[] = [
  {
    id: 1,
    content: "삶이 있는 한 희망은 있다.",
    author: "키케로",
    type: "quote",
    category: "motivation",
  },
  {
    id: 2,
    content: "산다는것 그것은 치열한 전투이다.",
    author: "로망로랑",
    type: "quote",
    category: "life",
  },
  {
    id: 3,
    content: "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.",
    author: "사무엘존슨",
    type: "quote",
    category: "perseverance",
  },
  {
    id: 4,
    content: "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    author: "파울로 코엘료",
    type: "quote",
    category: "happiness",
  },
  {
    id: 5,
    content: "진정으로 웃으려면 고통을 참아야하며, 나아가 고통을 즐길 줄 알아야 한다.",
    author: "찰리 채플린",
    type: "quote",
    category: "life",
  },
  {
    id: 6,
    content: "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다.",
    author: "엘버트 허버드",
    type: "quote",
    category: "work",
  },
  {
    id: 7,
    content: "신뢰의 이유는 안전하거나 확실해서가 아니라, 위험을 감수할 용의가 있어서이다.",
    author: "미상",
    type: "quote",
    category: "trust",
  },
  {
    id: 8,
    content: "좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하여야 한다.",
    author: "단테",
    type: "quote",
    category: "success",
  },
  {
    id: 9,
    content: "행복은 습관이다. 그것을 몸에 지니라.",
    author: "허버드",
    type: "quote",
    category: "happiness",
  },
  {
    id: 10,
    content: "고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다.",
    author: "괴테",
    type: "quote",
    category: "perseverance",
  },
  {
    id: 11,
    content: "작은 변화가 일상에 큰 차이를 만듭니다. 매일 5분씩 명상을 시작해보세요.",
    type: "tip",
    category: "wellness",
  },
  {
    id: 12,
    content: "하루에 물 2리터 마시는 습관을 들이면 피부 건강과 전반적인 웰빙에 도움이 됩니다.",
    type: "tip",
    category: "health",
  },
  {
    id: 13,
    content: "업무 생산성을 높이려면 '2분 규칙'을 활용하세요. 2분 이내로 할 수 있는 일은 즉시 처리하세요.",
    type: "tip",
    category: "productivity",
  },
  {
    id: 14,
    content:
      "코딩 중 막히면 '러버덕 디버깅'을 시도해보세요. 문제를 고무 오리에게 설명하듯 말하면 해결책이 떠오를 수 있습니다.",
    type: "tip",
    category: "programming",
  },
  {
    id: 15,
    content:
      "새로운 기술을 배울 때는 '20시간 규칙'을 기억하세요. 집중적으로 20시간만 투자하면 기본기를 습득할 수 있습니다.",
    type: "tip",
    category: "learning",
  },
  {
    id: 16,
    content: "디자인 작업 시 색상 선택이 어렵다면, 자연에서 영감을 얻어보세요. 자연의 색상 조합은 항상 조화롭습니다.",
    type: "tip",
    category: "design",
  },
  {
    id: 17,
    content: "회의 효율성을 높이려면 항상 명확한 안건과 타임라인을 설정하고, 회의 후 액션 아이템을 정리해 공유하세요.",
    type: "tip",
    category: "work",
  },
  {
    id: 18,
    content: "코드 가독성을 높이려면 복잡한 로직보다 명확한 네이밍에 더 시간을 투자하세요.",
    type: "tip",
    category: "programming",
  },
  {
    id: 19,
    content:
      "창의력을 높이려면 다양한 분야의 지식을 연결하세요. 서로 관련 없어 보이는 아이디어를 결합할 때 혁신이 탄생합니다.",
    type: "tip",
    category: "creativity",
  },
  {
    id: 20,
    content:
      "효과적인 학습을 위해 '간격 반복' 기법을 활용하세요. 같은 내용을 점점 긴 간격을 두고 복습하면 장기 기억에 도움이 됩니다.",
    type: "tip",
    category: "learning",
  },
]
