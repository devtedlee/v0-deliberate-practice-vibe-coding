import ProjectCard from "./ProjectCard"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "포트폴리오 웹사이트",
      description: "React와 Tailwind CSS를 활용한 개인 포트폴리오 웹사이트입니다.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Tailwind CSS", "Next.js"],
      githubUrl: "https://github.com/username/portfolio",
      demoUrl: "https://portfolio.example.com",
    },
    {
      id: 2,
      title: "할 일 관리 앱",
      description: "React와 Firebase를 활용한 할 일 관리 애플리케이션입니다.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Firebase", "Tailwind CSS"],
      githubUrl: "https://github.com/username/todo-app",
      demoUrl: "https://todo.example.com",
    },
    {
      id: 3,
      title: "날씨 앱",
      description: "OpenWeather API를 활용한 날씨 정보 애플리케이션입니다.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "API", "Tailwind CSS"],
      githubUrl: "https://github.com/username/weather-app",
      demoUrl: "https://weather.example.com",
    },
    {
      id: 4,
      title: "블로그 플랫폼",
      description: "Next.js와 Markdown을 활용한 개인 블로그 플랫폼입니다.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Markdown", "Tailwind CSS"],
      githubUrl: "https://github.com/username/blog",
      demoUrl: "https://blog.example.com",
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">프로젝트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
