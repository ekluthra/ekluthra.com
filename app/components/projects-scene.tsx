'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export interface Project {
  name: string
  description: string
  year: string
  image: string
  url: string
}

const RADIUS = 2.5
const CARD_WIDTH = 2
const CARD_HEIGHT = 7.75
const CAMERA_HEIGHT = 1.0
const CAMERA_DISTANCE = RADIUS + 2.2

interface CarouselProps {
  projects: Project[]
  activeIndex: number
  onActiveChange: (index: number) => void
  onSnapRequest: (index: number) => void
  snapToIndex: number | null
  onSnapComplete: () => void
}

interface ProjectsSceneProps extends CarouselProps {
  fov: number
}

function CameraFov({ fov }: { fov: number }) {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
  }, [camera, fov])

  return null
}

function ProjectCard({
  project,
  index,
  total,
  isActive,
  faceRotationRef,
  onMeshMount,
}: {
  project: Project
  index: number
  total: number
  isActive: boolean
  faceRotationRef: React.MutableRefObject<number>
  onMeshMount: (mesh: THREE.Mesh | null) => void
}) {
  const { resolvedTheme } = useTheme()
  const groupRef = useRef<THREE.Group>(null)
  const angle = (index / total) * Math.PI * 2

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = faceRotationRef.current
    }
  })

  return (
    <group
      ref={groupRef}
      position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
      scale={isActive ? 1.06 : 1}
    >
      <mesh ref={onMeshMount} visible={false}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Html
        transform
        center
        distanceFactor={3}
        wrapperClass="project-card-html-wrapper"
        style={{ pointerEvents: 'auto', background: 'transparent' }}
        zIndexRange={isActive ? [100, 0] : [0, 0]}
      >
        <div
          role="link"
          tabIndex={0}
          data-theme={resolvedTheme ?? 'light'}
          onClick={() =>
            window.open(project.url, '_blank', 'noopener,noreferrer')
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              window.open(project.url, '_blank', 'noopener,noreferrer')
            }
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto'
          }}
          className={`project-card cursor-pointer ${
            isActive ? 'project-card--active' : ''
          }`}
        >
          <h3 className="project-card__title">{project.name}</h3>

          <div className="project-card__image-wrap">
            <img
              src={project.image}
              alt={project.name}
              className="project-card__image"
            />
          </div>

          <p className="project-card__description">{project.description}</p>

          <p className="project-card__year">{project.year}</p>
        </div>
      </Html>
    </group>
  )
}

function Carousel({
  projects,
  activeIndex,
  onActiveChange,
  onSnapRequest,
  snapToIndex,
  onSnapComplete,
}: CarouselProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const faceRotationRef = useRef(0)
  const { camera } = useThree()
  const isSnapping = useRef(false)
  const userDragging = useRef(false)

  useEffect(() => {
    faceRotationRef.current = (activeIndex / projects.length) * Math.PI * 2
  }, [activeIndex, projects.length])

  useEffect(() => {
    if (snapToIndex === null) return
    isSnapping.current = true
  }, [snapToIndex])

  useFrame(() => {
    const controls = controlsRef.current
    if (!controls) return

    faceRotationRef.current = controls.getAzimuthalAngle()

    const azimuth = controls.getAzimuthalAngle()
    controls.target.set(
      Math.sin(azimuth) * RADIUS,
      0,
      Math.cos(azimuth) * RADIUS
    )
    controls.update()

    if (isSnapping.current && snapToIndex !== null) {
      const target = (snapToIndex / projects.length) * Math.PI * 2
      const current = controls.getAzimuthalAngle()
      let diff = target - current

      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2

      if (Math.abs(diff) < 0.02) {
        controls.setAzimuthalAngle(target)
        isSnapping.current = false
        onSnapComplete()
      } else {
        controls.setAzimuthalAngle(current + diff * 0.12)
      }
      return
    }

    if (userDragging.current) return

    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)

    let bestIndex = 0
    let bestDot = -Infinity

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      const worldPos = new THREE.Vector3()
      mesh.getWorldPosition(worldPos)
      const toCard = worldPos.sub(camera.position).normalize()
      const dot = forward.dot(toCard)
      if (dot > bestDot) {
        bestDot = dot
        bestIndex = index
      }
    })

    if (bestIndex !== activeIndex) {
      onActiveChange(bestIndex)
    }
  })

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 8, 2]} intensity={0.45} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -CARD_HEIGHT / 2 - 0.2, 0]}
      >
        <ringGeometry args={[RADIUS - 0.1, RADIUS + 0.1, 64]} />
        <meshBasicMaterial color="#d4d4d4" transparent opacity={0.35} />
      </mesh>

      {projects.map((project, index) => (
        <ProjectCard
          key={project.name}
          project={project}
          index={index}
          total={projects.length}
          isActive={index === activeIndex}
          faceRotationRef={faceRotationRef}
          onMeshMount={(mesh) => {
            meshRefs.current[index] = mesh
          }}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        target={[0, 0, RADIUS]}
        enablePan={false}
        enableZoom={false}
        minDistance={RADIUS + 1.2}
        maxDistance={RADIUS + 4}
        minPolarAngle={Math.PI / 2.35}
        maxPolarAngle={Math.PI / 2.05}
        rotateSpeed={0.6}
        onStart={() => {
          userDragging.current = true
          isSnapping.current = false
        }}
        onEnd={() => {
          userDragging.current = false
          const controls = controlsRef.current
          if (!controls) return

          const azimuth = controls.getAzimuthalAngle()
          let normalized = azimuth % (Math.PI * 2)
          if (normalized < 0) normalized += Math.PI * 2

          const index =
            Math.round((normalized / (Math.PI * 2)) * projects.length) %
            projects.length
          onSnapRequest(index)
        }}
      />
    </>
  )
}

export function ProjectsScene({ fov, ...props }: ProjectsSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DISTANCE], fov }}
      gl={{ antialias: true }}
      className="touch-none"
    >
      <CameraFov fov={fov} />
      <Suspense fallback={null}>
        <Carousel {...props} />
      </Suspense>
    </Canvas>
  )
}
