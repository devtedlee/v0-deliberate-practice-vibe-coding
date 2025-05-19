import type { PackageData } from "@/data/npm-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Download, BarChart } from "lucide-react"

interface SummaryCardsProps {
  packages: PackageData[]
}

export default function SummaryCards({ packages }: SummaryCardsProps) {
  // 총 다운로드 수 계산
  const totalDownloads = packages.reduce((sum, pkg) => sum + pkg.totalDownloads, 0)

  // 평균 성장률 계산
  const averageGrowthRate = packages.reduce((sum, pkg) => sum + pkg.growthRate, 0) / packages.length

  // 가장 인기 있는 패키지 찾기
  const mostPopularPackage = packages.reduce((prev, current) =>
    prev.totalDownloads > current.totalDownloads ? prev : current,
  )

  // 가장 빠르게 성장하는 패키지 찾기
  const fastestGrowingPackage = packages.reduce((prev, current) =>
    prev.growthRate > current.growthRate ? prev : current,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">총 다운로드</CardTitle>
          <Download className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(totalDownloads / 1000000000).toFixed(2)}B</div>
          <p className="text-xs text-gray-500 mt-1">지난 1년간 총 다운로드 수</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">평균 성장률</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageGrowthRate.toFixed(1)}%</div>
          <p className="text-xs text-gray-500 mt-1">지난 1년간 평균 성장률</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">가장 인기 있는 패키지</CardTitle>
          <BarChart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostPopularPackage.name}</div>
          <p className="text-xs text-gray-500 mt-1">
            {(mostPopularPackage.totalDownloads / 1000000).toFixed(1)}M 다운로드
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">가장 빠르게 성장하는 패키지</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{fastestGrowingPackage.name}</div>
          <p className="text-xs text-gray-500 mt-1">{fastestGrowingPackage.growthRate.toFixed(1)}% 성장률</p>
        </CardContent>
      </Card>
    </div>
  )
}
