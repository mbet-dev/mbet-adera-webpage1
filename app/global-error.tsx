"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
            </p>
            <div className="space-x-4">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Return home
              </Button>
            </div>
            {error.digest && <p className="text-xs text-muted-foreground mt-4">Error ID: {error.digest}</p>}
          </div>
        </div>
      </body>
    </html>
  )
}

