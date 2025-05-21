import { memo } from "react"
import type { GlossaryTerm } from "@/data/glossary"

interface TermItemProps {
  term: GlossaryTerm
}

function TermItem({ term }: TermItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{term.term}</h3>
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          {term.category}
        </span>
      </div>
      <p className="mt-2 text-gray-600">{term.definition}</p>
    </div>
  )
}

export default memo(TermItem)
