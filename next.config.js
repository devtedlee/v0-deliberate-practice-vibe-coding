/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "react.dev",
      "nextjs.org",
      "tailwindcss.com",
      "static.figma.com",
      "cdn.dribbble.com",
      "coolors.co",
      "www.notion.so",
      "trello.com",
      "todoist.com",
      "d3njjcbhbojbot.cloudfront.net",
      "www.blinkist.com",
      "pa.tedcdn.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
