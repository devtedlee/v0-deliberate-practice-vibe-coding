import type React from "react"
import { render } from "@testing-library/react"
import Head from "next/head"
import SeoHead from "@/components/layout/SeoHead"
import jest from "jest"

// next/head의 모킹
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>
    },
  }
})

describe("SeoHead Component DOM Test", () => {
  beforeEach(() => {
    // 테스트 전에 document.head 초기화
    document.head.innerHTML = ""
  })

  it("should render correct meta tags in document head", () => {
    const { container } = render(
      <Head>
        <SeoHead
          title="마크다운 편집기"
          description="실시간 마크다운 편집 및 미리보기"
          ogImage="/images/markdown-editor-og.png"
        />
      </Head>,
    )

    // DOM에서 실제 메타 태그 확인
    expect(document.title).toBe("마크다운 편집기")

    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription).not.toBeNull()
    expect(metaDescription?.getAttribute("content")).toBe("실시간 마크다운 편집 및 미리보기")

    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle).not.toBeNull()
    expect(ogTitle?.getAttribute("content")).toBe("마크다운 편집기")

    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage).not.toBeNull()
    expect(ogImage?.getAttribute("content")).toBe("/images/markdown-editor-og.png")
  })

  it("should use default values when props are not provided", () => {
    render(
      <Head>
        <SeoHead />
      </Head>,
    )

    // 기본값 확인
    const ogType = document.querySelector('meta[property="og:type"]')
    expect(ogType).not.toBeNull()
    expect(ogType?.getAttribute("content")).toBe("website")
  })

  it("should render structured data when provided", () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "마크다운 편집기",
      description: "실시간 마크다운 편집 및 미리보기",
    }

    render(
      <Head>
        <SeoHead title="마크다운 편집기" structuredData={structuredData} />
      </Head>,
    )

    const scriptTag = document.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).not.toBeNull()

    const parsedData = JSON.parse(scriptTag?.innerHTML || "{}")
    expect(parsedData["@type"]).toBe("WebPage")
    expect(parsedData.name).toBe("마크다운 편집기")
  })
})
