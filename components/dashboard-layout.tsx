"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/app/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Home, Package, Truck, MessageSquare, Bell, Settings, LogOut, HelpCircle, Bot } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const routes = [
    {
      href: "/dashboard",
      label: "dashboard.nav.dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/orders",
      label: "dashboard.nav.orders",
      icon: <Package className="h-5 w-5" />,
      active: pathname === "/dashboard/orders" || pathname.startsWith("/dashboard/orders/"),
    },
    {
      href: "/dashboard/tracking",
      label: "dashboard.nav.tracking",
      icon: <Truck className="h-5 w-5" />,
      active: pathname === "/dashboard/tracking",
    },
    {
      href: "/dashboard/messages",
      label: "dashboard.nav.messages",
      icon: <MessageSquare className="h-5 w-5" />,
      active: pathname === "/dashboard/messages",
    },
    {
      href: "/dashboard/chatbot",
      label: "dashboard.nav.chatbot",
      icon: <Bot className="h-5 w-5" />,
      active: pathname === "/dashboard/chatbot",
    },
    {
      href: "/dashboard/settings",
      label: "dashboard.nav.settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/dashboard/settings",
    },
    {
      href: "/dashboard/help",
      label: "dashboard.nav.help",
      icon: <HelpCircle className="h-5 w-5" />,
      active: pathname === "/dashboard/help",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex items-center gap-2 mb-8">
              <Truck className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MBet-Adera</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="grid gap-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    route.active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {route.icon}
                  {t(route.label)}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary hidden md:block" />
          <span className="font-bold text-xl hidden md:block">MBet-Adera</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {notifications}
              </span>
            )}
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <nav className="grid gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  route.active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {route.icon}
                {t(route.label)}
              </Link>
            ))}
            <div className="mt-auto"></div>
            <Link
              href="/logout"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all mt-8"
            >
              <LogOut className="h-5 w-5" />
              {t("dashboard.nav.logout")}
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

