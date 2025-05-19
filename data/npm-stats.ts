export interface PackageData {
  name: string
  color: string
  description: string
  category: string
  monthlyDownloads: {
    date: string
    downloads: number
  }[]
  totalDownloads: number
  averageMonthlyDownloads: number
  growthRate: number // 전년 대비 성장률 (%)
}

export const npmPackagesData: PackageData[] = [
  {
    name: "react",
    color: "#61DAFB",
    description: "사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리",
    category: "UI 라이브러리",
    monthlyDownloads: [
      { date: "2023-06", downloads: 45800000 },
      { date: "2023-07", downloads: 47200000 },
      { date: "2023-08", downloads: 48500000 },
      { date: "2023-09", downloads: 49800000 },
      { date: "2023-10", downloads: 51200000 },
      { date: "2023-11", downloads: 52500000 },
      { date: "2023-12", downloads: 53100000 },
      { date: "2024-01", downloads: 54700000 },
      { date: "2024-02", downloads: 56300000 },
      { date: "2024-03", downloads: 58100000 },
      { date: "2024-04", downloads: 59800000 },
      { date: "2024-05", downloads: 61500000 },
    ],
    totalDownloads: 638500000,
    averageMonthlyDownloads: 53208333,
    growthRate: 34.3,
  },
  {
    name: "vue",
    color: "#42B883",
    description: "프로그레시브 JavaScript 프레임워크",
    category: "UI 라이브러리",
    monthlyDownloads: [
      { date: "2023-06", downloads: 18200000 },
      { date: "2023-07", downloads: 18700000 },
      { date: "2023-08", downloads: 19100000 },
      { date: "2023-09", downloads: 19600000 },
      { date: "2023-10", downloads: 20100000 },
      { date: "2023-11", downloads: 20500000 },
      { date: "2023-12", downloads: 20800000 },
      { date: "2024-01", downloads: 21300000 },
      { date: "2024-02", downloads: 21800000 },
      { date: "2024-03", downloads: 22400000 },
      { date: "2024-04", downloads: 23000000 },
      { date: "2024-05", downloads: 23600000 },
    ],
    totalDownloads: 249100000,
    averageMonthlyDownloads: 20758333,
    growthRate: 29.7,
  },
  {
    name: "next",
    color: "#000000",
    description: "React를 위한 서버 사이드 렌더링 프레임워크",
    category: "프레임워크",
    monthlyDownloads: [
      { date: "2023-06", downloads: 12500000 },
      { date: "2023-07", downloads: 13200000 },
      { date: "2023-08", downloads: 14100000 },
      { date: "2023-09", downloads: 15000000 },
      { date: "2023-10", downloads: 16200000 },
      { date: "2023-11", downloads: 17500000 },
      { date: "2023-12", downloads: 18300000 },
      { date: "2024-01", downloads: 19700000 },
      { date: "2024-02", downloads: 21200000 },
      { date: "2024-03", downloads: 22800000 },
      { date: "2024-04", downloads: 24500000 },
      { date: "2024-05", downloads: 26300000 },
    ],
    totalDownloads: 221300000,
    averageMonthlyDownloads: 18441667,
    growthRate: 110.4,
  },
  {
    name: "tailwindcss",
    color: "#38B2AC",
    description: "유틸리티 우선 CSS 프레임워크",
    category: "스타일링",
    monthlyDownloads: [
      { date: "2023-06", downloads: 9800000 },
      { date: "2023-07", downloads: 10500000 },
      { date: "2023-08", downloads: 11300000 },
      { date: "2023-09", downloads: 12200000 },
      { date: "2023-10", downloads: 13100000 },
      { date: "2023-11", downloads: 14000000 },
      { date: "2023-12", downloads: 14700000 },
      { date: "2024-01", downloads: 15600000 },
      { date: "2024-02", downloads: 16500000 },
      { date: "2024-03", downloads: 17500000 },
      { date: "2024-04", downloads: 18600000 },
      { date: "2024-05", downloads: 19700000 },
    ],
    totalDownloads: 173500000,
    averageMonthlyDownloads: 14458333,
    growthRate: 101.0,
  },
  {
    name: "styled-components",
    color: "#DB7093",
    description: "컴포넌트 시대의 CSS",
    category: "스타일링",
    monthlyDownloads: [
      { date: "2023-06", downloads: 8200000 },
      { date: "2023-07", downloads: 8400000 },
      { date: "2023-08", downloads: 8600000 },
      { date: "2023-09", downloads: 8800000 },
      { date: "2023-10", downloads: 9000000 },
      { date: "2023-11", downloads: 9100000 },
      { date: "2023-12", downloads: 9200000 },
      { date: "2024-01", downloads: 9300000 },
      { date: "2024-02", downloads: 9400000 },
      { date: "2024-03", downloads: 9500000 },
      { date: "2024-04", downloads: 9600000 },
      { date: "2024-05", downloads: 9700000 },
    ],
    totalDownloads: 108800000,
    averageMonthlyDownloads: 9066667,
    growthRate: 18.3,
  },
  {
    name: "axios",
    color: "#5A29E4",
    description: "Promise 기반 HTTP 클라이언트",
    category: "유틸리티",
    monthlyDownloads: [
      { date: "2023-06", downloads: 32500000 },
      { date: "2023-07", downloads: 33100000 },
      { date: "2023-08", downloads: 33800000 },
      { date: "2023-09", downloads: 34500000 },
      { date: "2023-10", downloads: 35200000 },
      { date: "2023-11", downloads: 35800000 },
      { date: "2023-12", downloads: 36300000 },
      { date: "2024-01", downloads: 36900000 },
      { date: "2024-02", downloads: 37500000 },
      { date: "2024-03", downloads: 38200000 },
      { date: "2024-04", downloads: 38900000 },
      { date: "2024-05", downloads: 39600000 },
    ],
    totalDownloads: 432300000,
    averageMonthlyDownloads: 36025000,
    growthRate: 21.8,
  },
  {
    name: "lodash",
    color: "#3492FF",
    description: "모던 JavaScript 유틸리티 라이브러리",
    category: "유틸리티",
    monthlyDownloads: [
      { date: "2023-06", downloads: 28700000 },
      { date: "2023-07", downloads: 29100000 },
      { date: "2023-08", downloads: 29500000 },
      { date: "2023-09", downloads: 29900000 },
      { date: "2023-10", downloads: 30300000 },
      { date: "2023-11", downloads: 30600000 },
      { date: "2023-12", downloads: 30900000 },
      { date: "2024-01", downloads: 31200000 },
      { date: "2024-02", downloads: 31500000 },
      { date: "2024-03", downloads: 31800000 },
      { date: "2024-04", downloads: 32100000 },
      { date: "2024-05", downloads: 32400000 },
    ],
    totalDownloads: 368000000,
    averageMonthlyDownloads: 30666667,
    growthRate: 12.9,
  },
  {
    name: "redux",
    color: "#764ABC",
    description: "JavaScript 앱을 위한 예측 가능한 상태 컨테이너",
    category: "상태 관리",
    monthlyDownloads: [
      { date: "2023-06", downloads: 15300000 },
      { date: "2023-07", downloads: 15600000 },
      { date: "2023-08", downloads: 15900000 },
      { date: "2023-09", downloads: 16200000 },
      { date: "2023-10", downloads: 16500000 },
      { date: "2023-11", downloads: 16700000 },
      { date: "2023-12", downloads: 16900000 },
      { date: "2024-01", downloads: 17100000 },
      { date: "2024-02", downloads: 17300000 },
      { date: "2024-03", downloads: 17500000 },
      { date: "2024-04", downloads: 17700000 },
      { date: "2024-05", downloads: 17900000 },
    ],
    totalDownloads: 200600000,
    averageMonthlyDownloads: 16716667,
    growthRate: 17.0,
  },
  {
    name: "react-router-dom",
    color: "#CA4245",
    description: "React를 위한 선언적 라우팅",
    category: "라우팅",
    monthlyDownloads: [
      { date: "2023-06", downloads: 14200000 },
      { date: "2023-07", downloads: 14500000 },
      { date: "2023-08", downloads: 14800000 },
      { date: "2023-09", downloads: 15100000 },
      { date: "2023-10", downloads: 15400000 },
      { date: "2023-11", downloads: 15700000 },
      { date: "2023-12", downloads: 15900000 },
      { date: "2024-01", downloads: 16200000 },
      { date: "2024-02", downloads: 16500000 },
      { date: "2024-03", downloads: 16800000 },
      { date: "2024-04", downloads: 17100000 },
      { date: "2024-05", downloads: 17400000 },
    ],
    totalDownloads: 189600000,
    averageMonthlyDownloads: 15800000,
    growthRate: 22.5,
  },
  {
    name: "moment",
    color: "#222222",
    description: "JavaScript 날짜 조작 라이브러리",
    category: "유틸리티",
    monthlyDownloads: [
      { date: "2023-06", downloads: 18900000 },
      { date: "2023-07", downloads: 19000000 },
      { date: "2023-08", downloads: 19100000 },
      { date: "2023-09", downloads: 19200000 },
      { date: "2023-10", downloads: 19300000 },
      { date: "2023-11", downloads: 19400000 },
      { date: "2023-12", downloads: 19500000 },
      { date: "2024-01", downloads: 19600000 },
      { date: "2024-02", downloads: 19700000 },
      { date: "2024-03", downloads: 19800000 },
      { date: "2024-04", downloads: 19900000 },
      { date: "2024-05", downloads: 20000000 },
    ],
    totalDownloads: 233400000,
    averageMonthlyDownloads: 19450000,
    growthRate: 5.8,
  },
]

// 카테고리별 패키지 그룹화
export const getPackagesByCategory = () => {
  const categories: Record<string, PackageData[]> = {}

  npmPackagesData.forEach((pkg) => {
    if (!categories[pkg.category]) {
      categories[pkg.category] = []
    }
    categories[pkg.category].push(pkg)
  })

  return categories
}

// 총 다운로드 수 기준 상위 패키지 가져오기
export const getTopPackagesByDownloads = (limit = 5) => {
  return [...npmPackagesData].sort((a, b) => b.totalDownloads - a.totalDownloads).slice(0, limit)
}

// 성장률 기준 상위 패키지 가져오기
export const getTopPackagesByGrowth = (limit = 5) => {
  return [...npmPackagesData].sort((a, b) => b.growthRate - a.growthRate).slice(0, limit)
}
