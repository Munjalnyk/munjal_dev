"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "@/components/scene"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function UnderDevelopmentPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#05020e]">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      <main className="relative z-10 flex h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6 rounded-2xl bg-black/30 p-8 text-center shadow-2xl shadow-violet-500/20 backdrop-blur-md border border-violet-500/30">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Munjal Nayak</h1>
          <p className="text-lg text-violet-200/80">
            My portfolio is currently undergoing a significant upgrade.
            <br />
            New projects and interactive experiences are being forged.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/munjalnyk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/munjalnayak/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/munjal_nayak"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:munjal@outlook.in"
              className="p-3 rounded-full text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
