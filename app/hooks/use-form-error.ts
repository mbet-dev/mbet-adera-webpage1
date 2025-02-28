"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface FormError {
  field?: string
  message: string
}

export function useFormError() {
  const [errors, setErrors] = useState<FormError[]>([])
  const { toast } = useToast()

  const clearErrors = () => setErrors([])

  const setError = (error: FormError | FormError[]) => {
    const newErrors = Array.isArray(error) ? error : [error]
    setErrors(newErrors)

    // Show the first error in a toast
    if (newErrors.length > 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: newErrors[0].message,
      })
    }
  }

  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message
  }

  return {
    errors,
    setError,
    clearErrors,
    getFieldError,
  }
}

