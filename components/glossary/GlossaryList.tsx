import { memo } from "react"
import type { GlossaryTerm } from "@/data/glossary"
import TermItem from "./TermItem"

interface GlossaryListProps {
  terms: GlossaryTerm[]
}

function GlossaryList({ terms }: GlossaryListProps) {
  if (terms.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {terms.map((term) => (
        <TermItem key={term.id} term={term} />
      ))}
    </div>
  )
}

export default memo(GlossaryList)
