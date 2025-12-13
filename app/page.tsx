import { ProfessionalExperience } from 'app/components/posts'
import { BackToTop } from 'app/components/back-to-top'
import { GitHubSection } from 'app/components/github-section'
import { ProjectCarousel } from 'app/components/project-carousel'
import Image from 'next/image'

export default async function Page() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8 sm:block">
        <div className="flex-shrink-0 sm:hidden">
          <Image
            src="/avatar.jpg"
            alt="Ekagra Luthra"
            width={60}
            height={60}
            className="rounded-2xl shadow-md"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          I'm <span className="font-bold">Ekagra</span>
        </h1>
        <h2 className="mt-2 text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300">
          Welcome to my personal website and portfolio
        </h2>
      </div>
      <div className="flex items-start gap-4 mb-12">
        <div className="flex-1">
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I'm a Full Stack Developer at <a href="https://www.workiva.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Workiva</a> working on encryption and cloud infrastructure. Prior to interning and working full-time at Workiva, I was a Software Developer Intern at Amazon, and a Computer Science student at the University of Toronto. During my time at the University, my major areas of interest were microcontrollers, computer networking, and computer security systems.
          </p>
        </div>
        <div className="flex-shrink-0 hidden sm:block">
          <Image
            src="/avatar.jpg"
            alt="Ekagra Luthra"
            width={120}
            height={120}
            className="rounded-2xl shadow-md"
          />
        </div>
      </div>
      <section className="mb-14">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Professional Experience</h2>
        <ProfessionalExperience />
      </section>
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Projects</h2>
        <ProjectCarousel />
      </section>

      <GitHubSection />
      <BackToTop />
    </section>
  )
}
