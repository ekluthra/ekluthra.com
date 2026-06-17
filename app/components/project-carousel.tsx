'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Project } from 'app/components/projects-scene'

/** Field of view in degrees. Lower = zoomed in, higher = wider angle. Typical range: 25–75 */
export const PROJECT_CAROUSEL_FOV = 34

const projects: Project[] = [
  {
    name: 'Interactive Animatronics Research Project',
    description: 'accessible educational microcontroller kits for youth',
    year: '2023',
    image: '/shakespeare.png',
    url: 'https://www.linkedin.com/posts/nathandegoey_stemeducation-stemeducationforkids-chatgpt-ugcPost-7072722953443954688-QGTj',
  },
  {
    name: 'HouseMate',
    description: 'cost splitting for roommates',
    year: '2022',
    image: '/HouseMate.png',
    url: 'http://flamingo.im/',
  },
  {
    name: 'DHT_LED',
    description: 'too hot? the LED shines red. too cold? it shines blue.',
    year: '2025',
    image: '/dht.jpg',
    url: 'https://github.com/sonoramac/Sonora',
  },
]

const ProjectsScene = dynamic(
  () =>
    import('app/components/projects-scene').then((mod) => mod.ProjectsScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] md:h-[480px] lg:h-[560px] animate-pulse bg-neutral-100 dark:bg-neutral-900" />
    ),
  }
)

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [snapToIndex, setSnapToIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
    setSnapToIndex(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === 0 ? projects.length - 1 : prev - 1
      setSnapToIndex(next)
      return next
    })
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === projects.length - 1 ? 0 : prev + 1
      setSnapToIndex(next)
      return next
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  useEffect(() => {
    if (isHovered || snapToIndex !== null) return

    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext, isHovered, snapToIndex])

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[380px] md:h-[480px] lg:h-[560px]">
        <ProjectsScene
          projects={projects}
          fov={PROJECT_CAROUSEL_FOV}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
          onSnapRequest={goToSlide}
          snapToIndex={snapToIndex}
          onSnapComplete={() => setSnapToIndex(null)}
        />
      </div>
    </div>
  )
}
