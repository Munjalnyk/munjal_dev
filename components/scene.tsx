"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function DataPlexus() {
  const groupRef = useRef<THREE.Group>(null!)
  const particleRef = useRef<THREE.Points>(null!)

  const { nodes, lines } = useMemo(() => {
    const numNodes = 200
    const nodePositions = new Float32Array(numNodes * 3)
    const nodeColors = new Float32Array(numNodes * 3)
    const lineSegments = []

    const points = []
    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * 8
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 8
      nodePositions.set([x, y, z], i * 3)
      points.push(new THREE.Vector3(x, y, z))
      const color = new THREE.Color("#8b5cf6")
      nodeColors.set([color.r, color.g, color.b], i * 3)
    }

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dist = points[i].distanceTo(points[j])
        if (dist < 1.5) {
          lineSegments.push(points[i], points[j])
        }
      }
    }

    return { nodes: nodePositions, lines: lineSegments }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
    }
    if (particleRef.current) {
      particleRef.current.rotation.y = t * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodes.length / 3} array={nodes} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#a78bfa" transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry setFromPoints={lines} />
        <lineBasicMaterial color="#4c1d95" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}

export function Scene() {
  return (
    <>
      <color attach="background" args={["#05020e"]} />
      <fog attach="fog" args={["#05020e", 5, 15]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#8b5cf6" />

      <DataPlexus />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}
