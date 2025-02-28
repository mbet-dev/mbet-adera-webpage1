"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "@/app/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, ArrowLeft } from "lucide-react"

export default function Register() {
  const router = useRouter()
  const { t } = useTranslation()
  const [role, setRole] = useState("sender")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MBet-Adera</span>
          </div>
          <h1 className="text-2xl font-bold">{t("register.title")}</h1>
          <p className="text-muted-foreground">{t("register.subtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("register.createAccount")}</CardTitle>
            <CardDescription>{t("register.fillDetails")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">{t("register.email")}</TabsTrigger>
                <TabsTrigger value="google">{t("register.google")}</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t("register.fullName")}</Label>
                    <Input id="name" placeholder={t("register.fullNamePlaceholder")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("register.emailAddress")}</Label>
                    <Input id="email" type="email" placeholder={t("register.emailPlaceholder")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">{t("register.phoneNumber")}</Label>
                    <Input id="phone" placeholder={t("register.phonePlaceholder")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">{t("register.password")}</Label>
                    <Input id="password" type="password" placeholder={t("register.passwordPlaceholder")} />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("register.selectRole")}</Label>
                    <RadioGroup defaultValue="sender" onValueChange={setRole}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sender" id="sender" />
                          <Label htmlFor="sender">{t("register.roles.sender")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="receiver" id="receiver" />
                          <Label htmlFor="receiver">{t("register.roles.receiver")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup">{t("register.roles.pickup")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="messenger" id="messenger" />
                          <Label htmlFor="messenger">{t("register.roles.messenger")}</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="google">
                <div className="flex flex-col items-center justify-center py-8">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-google"
                    >
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    {t("register.continueWithGoogle")}
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground text-center">{t("register.googleDescription")}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" onClick={() => router.push("/dashboard")}>
              {t("register.createAccount")}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t("register.alreadyHaveAccount")} </span>
              <Link href="/login" className="text-primary hover:underline">
                {t("register.login")}
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("register.backToHome")}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

