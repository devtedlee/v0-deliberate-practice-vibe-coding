import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  demoUrl: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group border border-gray-100 rounded-lg overflow-hidden transition-all hover:border-gray-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        <p className="text-gray-600">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-3 pt-2">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900"
            aria-label={`GitHub repository for ${project.title}`}
          >
            <Github className="h-4 w-4" />
            <span>코드</span>
          </Link>
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900"
            aria-label={`Live demo for ${project.title}`}
          >
            <ExternalLink className="h-4 w-4" />
            <span>데모</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
