"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

interface JsonTreeViewProps {
  data: any
  level?: number
}

export default function JsonTreeView({ data, level = 0 }: JsonTreeViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const renderValue = (key: string, value: any, path: string) => {
    const isExpandable = value !== null && typeof value === "object"
    const isExpanded = expanded[path] !== false // 기본적으로 펼쳐진 상태

    if (!isExpandable) {
      // 기본 타입 (문자열, 숫자, 불리언, null)
      return (
        <div className="flex items-start">
          <span className="font-semibold text-blue-600 mr-2">{key}:</span>
          {renderPrimitiveValue(value)}
        </div>
      )
    }

    // 객체 또는 배열
    return (
      <div>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 rounded px-1"
          onClick={() => toggleExpand(path)}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <span className="font-semibold text-blue-600 mr-2">{key}:</span>
          <span className="text-gray-500">{Array.isArray(value) ? `Array(${value.length})` : "Object"}</span>
        </div>
        {isExpanded && (
          <div className="pl-6 border-l border-gray-300 ml-2">
            {Array.isArray(value)
              ? value.map((item, index) => (
                  <div key={`${path}-${index}`} className="my-1">
                    {typeof item === "object" && item !== null ? (
                      <JsonTreeView data={{ [index]: item }} level={level + 1} />
                    ) : (
                      <div className="flex items-start">
                        <span className="font-semibold text-blue-600 mr-2">{index}:</span>
                        {renderPrimitiveValue(item)}
                      </div>
                    )}
                  </div>
                ))
              : Object.entries(value).map(([childKey, childValue]) => (
                  <div key={`${path}-${childKey}`} className="my-1">
                    {typeof childValue === "object" && childValue !== null ? (
                      <JsonTreeView data={{ [childKey]: childValue }} level={level + 1} />
                    ) : (
                      <div className="flex items-start">
                        <span className="font-semibold text-blue-600 mr-2">{childKey}:</span>
                        {renderPrimitiveValue(childValue)}
                      </div>
                    )}
                  </div>
                ))}
          </div>
        )}
      </div>
    )
  }

  const renderPrimitiveValue = (value: any) => {
    if (value === null) return <span className="text-gray-500">null</span>
    if (typeof value === "string") return <span className="text-green-600">"{value}"</span>
    if (typeof value === "number") return <span className="text-purple-600">{value}</span>
    if (typeof value === "boolean") return <span className="text-orange-600">{String(value)}</span>
    return <span>{String(value)}</span>
  }

  return (
    <div className="font-mono text-sm">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="my-1">
          {renderValue(key, value, `${level}-${key}`)}
        </div>
      ))}
    </div>
  )
}
