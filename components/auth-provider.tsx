"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { handleAPIError } from "@/lib/api-error"

type UserDetails = Database["public"]["Tables"]["users"]["Row"]

type AuthContextType = {
  user: User | null
  userDetails: UserDetails | null
  session: Session | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, userData: Omit<UserDetails, "id" | "created_at">) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: null,
  session: null,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
  loading: true,
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) throw sessionError

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await fetchUserDetails(session.user.id)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Failed to initialize authentication. Please refresh the page.",
        })
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchUserDetails(session.user.id)
      } else {
        setUserDetails(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [toast])

  const fetchUserDetails = async (userId: string) => {
    const [data, error] = await handleAPIError(supabase.from("users").select("*").eq("id", userId).single())

    if (error) {
      console.error("Error fetching user details:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user details. Some features may be limited.",
      })
      return
    }

    if (data) {
      setUserDetails(data)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        await fetchUserDetails(data.user.id)
        router.push("/dashboard")
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      setError(error.message)
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Failed to sign in. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const signUpWithEmail = async (email: string, password: string, userData: Omit<UserDetails, "id" | "created_at">) => {
    try {
      setLoading(true)
      setError(null)

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Insert user details
        const { error: detailsError } = await supabase.from("users").insert({
          id: authData.user.id,
          ...userData,
        })

        if (detailsError) throw detailsError

        await fetchUserDetails(authData.user.id)
        router.push("/dashboard")
        toast({
          title: "Welcome to MBet-Adera!",
          description: "Your account has been created successfully.",
        })
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      setError(error.message)
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "Failed to create account. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signOut()

      if (error) throw error

      router.push("/")
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error: any) {
      console.error("Sign out error:", error)
      setError(error.message)
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "Failed to sign out. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        session,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

