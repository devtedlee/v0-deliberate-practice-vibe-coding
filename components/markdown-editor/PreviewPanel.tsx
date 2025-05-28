"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface PreviewPanelProps {
  markdown: string
  className?: string
}

export function PreviewPanel({ markdown, className = "" }: PreviewPanelProps) {
  return (
    <div className={`overflow-auto p-6 bg-white ${className}`} data-testid="markdown-preview">
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <SyntaxHighlighter style={vs} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
