import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  name: string
  description: string
  githubUrl: string
  linkedinUrl: string
}

export default function Hero({ name, description, githubUrl, linkedinUrl }: HeroProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{name}</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">{description}</p>
        <div className="flex space-x-4">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-gray-700" />
          </Link>
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-gray-700" />
          </Link>
        </div>
      </div>
    </section>
  )
}
