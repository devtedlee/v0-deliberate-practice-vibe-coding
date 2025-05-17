"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SearchBar from "@/components/glossary/SearchBar"
import GlossaryList from "@/components/glossary/GlossaryList"
import { glossaryData } from "@/data/glossary"

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // 검색어에 따라 용어 필터링
  const filteredTerms = useMemo(() => {
    if (!searchTerm.trim()) return glossaryData

    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return glossaryData.filter(
      (term) =>
        term.term.toLowerCase().includes(lowerCaseSearchTerm) ||
        term.definition.toLowerCase().includes(lowerCaseSearchTerm) ||
        term.category.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            프론트엔드 웹 개발 용어 사전
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            프론트엔드 개발에 관련된 주요 용어들을 쉽게 찾아보고 학습하세요.
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <GlossaryList terms={filteredTerms} />
      </main>
    </div>
  )
}
