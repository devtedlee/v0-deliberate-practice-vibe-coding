import type { PackageData } from "@/data/npm-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Download, Clock } from "lucide-react"

interface PackageInfoProps {
  packageData: PackageData
}

export default function PackageInfo({ packageData }: PackageInfoProps) {
  const { name, color, description, category, totalDownloads, averageMonthlyDownloads, growthRate } = packageData

  return (
    <Card className="overflow-hidden">
      <div className="h-1" style={{ backgroundColor: color }}></div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <Badge variant="outline">{category}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Download className="h-3 w-3 mr-1" />
              <span>총 다운로드</span>
            </div>
            <span className="font-semibold">{(totalDownloads / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>월 평균</span>
            </div>
            <span className="font-semibold">{(averageMonthlyDownloads / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>성장률</span>
            </div>
            <span
              className={`font-semibold ${growthRate > 50 ? "text-green-600" : growthRate > 20 ? "text-blue-600" : ""}`}
            >
              {growthRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
