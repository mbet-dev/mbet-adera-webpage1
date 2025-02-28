"use client"

import { useContext } from "react"
import { LanguageContext } from "@/components/language-provider"

export function useTranslation() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }

  return context
}

