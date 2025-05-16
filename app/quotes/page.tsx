"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import QuoteDisplay from "@/components/quotes/QuoteDisplay"
import RefreshButton from "@/components/quotes/RefreshButton"
import { quotesData, type QuoteItem } from "@/data/quotes"

export default function QuotesPage() {
  const [currentQuote, setCurrentQuote] = useState<QuoteItem | null>(null)

  // 랜덤 명언/팁 선택 함수
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length)
    return quotesData[randomIndex]
  }

  // 새로운 명언/팁 가져오기
  const refreshQuote = () => {
    let newQuote = getRandomQuote()
    // 현재와 다른 명언/팁이 선택될 때까지 반복
    while (currentQuote && newQuote.id === currentQuote.id && quotesData.length > 1) {
      newQuote = getRandomQuote()
    }
    setCurrentQuote(newQuote)
  }

  // 컴포넌트 마운트 시 명언/팁 가져오기
  useEffect(() => {
    refreshQuote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">오늘의 명언 & 팁</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">매일 새로운 영감과 유용한 정보를 발견하세요.</p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 py-8">
          {currentQuote && <QuoteDisplay quote={currentQuote} />}

          <RefreshButton onClick={refreshQuote} />
        </div>
      </main>
    </div>
  )
}
