"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslation } from "@/app/hooks/use-translation"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.75 // Slow down the video slightly

      const handleCanPlay = () => {
        setIsVideoLoaded(true)
        video.play().catch(() => {
          // Handle autoplay restrictions gracefully
          console.log("Autoplay prevented")
        })
      }

      video.addEventListener("canplay", handleCanPlay)
      return () => video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-10" />
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-50" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source src="/delivery-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Delivery service"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-lg mb-8 text-muted-foreground">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => router.push("/register")}>
                {t("hero.getStarted")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/how-it-works")}>
                {t("hero.learnMore")}
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl bg-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Delivery tracking"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

