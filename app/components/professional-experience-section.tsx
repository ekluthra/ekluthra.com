'use client'

import { useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { experiences } from './professional-experience'

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`mt-1 size-5 shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 ${
        expanded ? 'rotate-180' : ''
      }`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ProfessionalExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleCard(index)
    }
  }

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => {
        const expanded = expandedIndex === index

        return (
          <div
            key={exp.company}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            onClick={() => toggleCard(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="experience-card cursor-pointer p-4 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
          >
            <div className="grid grid-cols-[60px_1fr] gap-4">
              <div className="row-span-2 flex h-[60px] w-[60px] items-center justify-center self-start rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <Image
                  src={exp.image}
                  alt={exp.company}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-1 text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
                    {exp.date}
                  </p>
                  <h3 className="mb-1 font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{exp.description}</p>
                </div>
                <Chevron expanded={expanded} />
              </div>

              <div
                className={`col-start-2 grid transition-[grid-template-rows] duration-200 ease-out ${
                  expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                    {exp.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
