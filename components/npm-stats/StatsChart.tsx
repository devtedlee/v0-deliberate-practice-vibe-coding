"use client"

import { useState } from "react"
import type { PackageData } from "@/data/npm-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface StatsChartProps {
  packages: PackageData[]
}

export default function StatsChart({ packages }: StatsChartProps) {
  const [selectedPackages, setSelectedPackages] = useState<string[]>(packages.slice(0, 5).map((pkg) => pkg.name))

  // 차트 데이터 준비
  const prepareChartData = () => {
    const dates = packages[0].monthlyDownloads.map((item) => item.date)

    return dates.map((date, index) => {
      const dataPoint: Record<string, any> = { date }

      packages.forEach((pkg) => {
        if (selectedPackages.includes(pkg.name)) {
          dataPoint[pkg.name] = pkg.monthlyDownloads[index].downloads
        }
      })

      return dataPoint
    })
  }

  const chartData = prepareChartData()

  // 패키지 선택 토글
  const togglePackage = (packageName: string) => {
    if (selectedPackages.includes(packageName)) {
      setSelectedPackages(selectedPackages.filter((name) => name !== packageName))
    } else {
      setSelectedPackages([...selectedPackages, packageName])
    }
  }

  // Y축 값 포맷팅
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`
    }
    return value
  }

  // 툴팁 값 포맷팅
  const formatTooltipValue = (value: number) => {
    return `${(value / 1000000).toFixed(2)}M`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>npm 패키지 다운로드 추이</CardTitle>
        <CardDescription>최근 1년간 월별 다운로드 수</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">차트</TabsTrigger>
            <TabsTrigger value="packages">패키지 선택</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip
                    formatter={(value: number) => formatTooltipValue(value)}
                    labelFormatter={(label) => {
                      const [year, month] = label.split("-")
                      return `${year}년 ${month}월`
                    }}
                  />
                  <Legend />
                  {packages.map(
                    (pkg) =>
                      selectedPackages.includes(pkg.name) && (
                        <Line
                          key={pkg.name}
                          type="monotone"
                          dataKey={pkg.name}
                          stroke={pkg.color}
                          activeDot={{ r: 8 }}
                          name={pkg.name}
                        />
                      ),
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`p-2 border rounded-md cursor-pointer transition-colors ${
                    selectedPackages.includes(pkg.name) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => togglePackage(pkg.name)}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: pkg.color }}></div>
                    <span className="text-sm font-medium">{pkg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
