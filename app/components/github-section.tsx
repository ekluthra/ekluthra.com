
import Image from "next/image";

const skills = [
  // Languages
  { name: "Go", logo: "https://cdn.simpleicons.org/go/cyan"},
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/_/yellow" },
  { name: "Java/Kotlin", logo: "https://cdn.simpleicons.org/kotlin" },
  // Frameworks & Libraries
  { name: "React", logo: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff" },
  // Tools & Platforms
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git" },
];

export function GitHubSection() {
  return (
    <div className="mb-14">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">Technical Skills</h2>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-4 gap-y-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-10 h-10 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* keep this as unoptimized, or <img> instead of next/image because we'd have to enable dangerouslyAllowSVG in next config */}
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center text-neutral-500 dark:text-neutral-400 leading-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}