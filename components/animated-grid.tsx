"use client"

import { useMemo } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Plane } from "@react-three/drei"
import * as THREE from "three"

const GridShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    pointer: { value: new THREE.Vector2() },
    gridColor: { value: new THREE.Color("#8b5cf6") },
    bgColor: { value: new THREE.Color("#0a0a14") },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform vec3 gridColor;
    uniform vec3 bgColor;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv;
      vec3 color = bgColor;
      
      // Grid
      vec2 grid = fract(st * 20.0);
      float line = step(0.03, grid.x) * step(0.03, grid.y);
      color = mix(gridColor, color, line);
      
      // Pulse
      float pulse = sin(time * 0.5) * 0.5 + 0.5;
      color = mix(color, gridColor, pulse * 0.05);

      // Pointer light
      float dist = distance(st, pointer);
      float light = smoothstep(0.2, 0.0, dist);
      color += gridColor * light * 0.5;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
})

const Grid = () => {
  const material = useMemo(() => GridShaderMaterial, [])

  useFrame(({ clock, size, pointer }) => {
    material.uniforms.time.value = clock.getElapsedTime()
    material.uniforms.resolution.value.set(size.width, size.height)
    material.uniforms.pointer.value.set(pointer.x * 0.5 + 0.5, -pointer.y * 0.5 + 0.5)
  })

  return <Plane args={[10, 10]} material={material} />
}

export const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <Grid />
      </Canvas>
    </div>
  )
}
