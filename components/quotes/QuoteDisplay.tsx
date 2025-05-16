import type { QuoteItem } from "@/data/quotes"

interface QuoteDisplayProps {
  quote: QuoteItem
}

export default function QuoteDisplay({ quote }: QuoteDisplayProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg bg-white shadow-sm border border-gray-100">
      <div
        className={`text-center ${
          quote.type === "quote" ? "font-serif italic" : "font-sans"
        } mb-6 text-xl md:text-2xl leading-relaxed`}
      >
        {quote.type === "quote" ? (
          <p className="relative">
            <span className="absolute -left-4">"</span>
            {quote.content}
            <span className="absolute -right-4">"</span>
          </p>
        ) : (
          <p>{quote.content}</p>
        )}
      </div>

      {quote.author && (
        <div className="text-right text-gray-600">
          <p className="text-sm md:text-base">— {quote.author}</p>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <span
          className={`inline-block px-3 py-1 text-xs rounded-full ${
            quote.type === "quote" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {quote.type === "quote" ? "명언" : "팁"}
        </span>
        {quote.category && (
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 ml-2">
            {quote.category}
          </span>
        )}
      </div>
    </div>
  )
}
