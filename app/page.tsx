import { ProfessionalExperience } from 'app/components/posts'
import { BackToTop } from 'app/components/back-to-top'
import { GitHubSection } from 'app/components/github-section'
import { ProjectCarousel } from 'app/components/project-carousel'
import Image from 'next/image'

export default async function Page() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8 sm:block">
        <div className="shrink-0 sm:hidden">
          <Image
            src="/avatar.jpg"
            alt="Ekagra Luthra"
            width={60}
            height={60}
            className="size-[60px] min-w-[67px] min-h-[60px] max-w-none shrink-0 rounded-2xl shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <span className="font-bold">Ekagra Luthra</span>
          </h1>
          <h2 className="mt-2 text-lg text-neutral-800 dark:text-neutral-200 sm:text-xl md:text-2xl font-medium"> 
            Software Engineer
          </h2>
        </div>
      </div>
      <div className="flex items-start gap-4 mb-12">
        <div className="flex-1">
          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            I'm a software engineer with experience in full stack development, cloud infrastructure, and encryption. 
            I studied computer science at the University of Toronto, where I got to explore my interests in computer security, networking, and microcrontrollers.
            {/* text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-green-400*/}
           
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
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">Professional Experience</h2>
        <ProfessionalExperience />
      </section>
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">Projects</h2>
        <ProjectCarousel />
      </section>

      <GitHubSection />
      <BackToTop />
    </section>
  )
}
