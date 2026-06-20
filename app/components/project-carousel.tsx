'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

interface Project {
  name: string
  description: string
  year: string
  image: string
  url: string
  badge?: string
}

const projects: Project[] = [
  {
    name: 'Interactive Animatronics Research Project',
    description: 'accessible educational microcontroller kits for youth',
    year: '2023',
    image: '/shakespeare.png',
    url: 'https://www.linkedin.com/posts/nathandegoey_stemeducation-stemeducationforkids-chatgpt-ugcPost-7072722953443954688-QGTj',
    badge: 'Research'
  },
  {
    name: 'HouseMate',
    description: 'cost splitting for roommates',
    year: '2022',
    image: '/HouseMate.png',
    url: 'https://github.com/ekluthra/HouseMate',
    badge: 'App'
  },
  {
    name: 'DHT_LED',
    description: 'too hot? the LED shines red. too cold? it shines blue.',
    year: '2025',
    image: '/dht.jpg',
    url: 'https://github.com/ekluthra/DHTDisplay',
    badge: 'Hardware'
  }
]

type CardPosition = 'left' | 'center' | 'right' | 'hidden'

function getCardPosition(index: number, current: number, total: number): CardPosition {
  if (index === current) return 'center'
  if (index === (current - 1 + total) % total) return 'left'
  if (index === (current + 1) % total) return 'right'
  return 'hidden'
}

const cardVariants: Variants = {
  center: {
    x: '0%',
    scale: 1,
    rotateY: 0,
    z: 0,
    opacity: 1,
    filter: 'brightness(1)',
    zIndex: 10,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  left: {
    x: '-62%',
    scale: 0.78,
    rotateY: 18,
    z: -120,
    opacity: 0.7,
    filter: 'brightness(0.6)',
    zIndex: 5,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  right: {
    x: '62%',
    scale: 0.78,
    rotateY: -18,
    z: -120,
    opacity: 0.7,
    filter: 'brightness(0.6)',
    zIndex: 5,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  hidden: {
    x: '0%',
    scale: 0.5,
    rotateY: 0,
    z: -300,
    opacity: 0,
    filter: 'brightness(0)',
    zIndex: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
}

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      else if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(goToNext, 5000)
      return () => clearInterval(interval)
    }
  }, [goToNext, isHovered])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) goToNext()
    else if (distance < -minSwipeDistance) goToPrevious()
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 3D Stage */}
      <div
        className="relative w-full overflow-visible mb-10 h-[380px] sm:h-[420px]"
        style={{ perspective: '1200px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {projects.map((project, index) => {
            const position = getCardPosition(index, currentIndex, projects.length)
            const isCenter = position === 'center'

            return (
              <motion.div
                key={index}
                className="absolute w-[78%] sm:w-[85%] md:w-[60%] lg:w-[52%]"
                style={{ transformStyle: 'preserve-3d' }}
                animate={position}
                variants={cardVariants}
                initial={false}
              >
                {/* Card — themed surface that contains the image and text panel */}
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-shadow duration-300 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 ${
                    isCenter ? 'shadow-black/30 dark:shadow-black/50' : 'shadow-black/10 dark:shadow-black/30'
                  }`}
                  onClick={() => {
                    if (!isCenter) {
                      if (position === 'left') goToPrevious()
                      if (position === 'right') goToNext()
                    }
                  }}
                >

                  {/* Image region */}
                  <div className="relative w-full h-[160px] sm:h-[200px]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 60vw"
                      priority={isCenter}
                    />

                    {/* Badge */}
                    {project.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/60">
                        {project.badge}
                      </div>
                    )}
                  </div>

                  {/* Frosted glass text panel — sits below the image, on the themed card body */}
                  <div className="relative">
                    <div className="absolute inset-0 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70" />
                    <div className="relative p-6">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 tracking-widest uppercase">
                        {project.year}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
                        {project.description}
                      </p>

                      {/* CTA — only shown on active card */}
                      <AnimatePresence>
                        {isCenter && (
                          <motion.a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-colors text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 bg-neutral-100/60 dark:bg-neutral-800/60 hover:bg-[#d5ede0] dark:hover:bg-[#201b29]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </motion.a>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Arrow Buttons */}
      <motion.button
        onClick={goToPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-[210px] -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-sm shadow-lg border bg-neutral-100/80 dark:bg-neutral-900/80 border-neutral-200/60 dark:border-neutral-700/60 text-neutral-900 dark:text-neutral-100"
        aria-label="Previous project"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </motion.button>

      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-[210px] -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-sm shadow-lg border bg-neutral-100/80 dark:bg-neutral-900/80 border-neutral-200/60 dark:border-neutral-700/60 text-neutral-900 dark:text-neutral-100"
        aria-label="Next project"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-3 mt-2">
        {projects.map((_project, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to ${projects[index].name}`}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{
                width: index === currentIndex ? 28 : 8,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-neutral-900 dark:bg-neutral-100'
                  : 'bg-neutral-400 dark:bg-neutral-600'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}