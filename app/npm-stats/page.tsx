import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SummaryCards from "@/components/npm-stats/SummaryCards"
import StatsChart from "@/components/npm-stats/StatsChart"
import PackageInfo from "@/components/npm-stats/PackageInfo"
import { npmPackagesData, getTopPackagesByDownloads, getTopPackagesByGrowth } from "@/data/npm-stats"

export default function NpmStatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">npm 패키지 사용 통계</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            웹 프론트엔드 개발에서 많이 사용되는 npm 패키지들의 다운로드 추이와 인기도를 확인해보세요.
          </p>
        </div>

        <SummaryCards packages={npmPackagesData} />

        <div className="mb-8">
          <StatsChart packages={npmPackagesData} />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">가장 많이 다운로드된 패키지</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTopPackagesByDownloads(6).map((pkg) => (
              <PackageInfo key={pkg.name} packageData={pkg} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">가장 빠르게 성장하는 패키지</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTopPackagesByGrowth(6).map((pkg) => (
              <PackageInfo key={pkg.name} packageData={pkg} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
