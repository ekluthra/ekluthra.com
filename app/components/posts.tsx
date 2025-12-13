import Image from 'next/image'
import { experiences } from './professional-experience'


export function ProfessionalExperience() {
  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="p-4 -mx-4 rounded-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-950 grid grid-cols-[60px_1fr] gap-4 items-center"
        >
          <div className="w-[60px] h-[60px] flex items-center justify-center rounded-xl shadow-md">
            <Image
              src={exp.image}
              alt={exp.company}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums mb-1">{exp.date}</p>
            <h3 className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium mb-1">{exp.company}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
