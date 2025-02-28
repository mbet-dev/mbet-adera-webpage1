"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "@/app/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, ArrowLeft } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const { t } = useTranslation()

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
          <h1 className="text-2xl font-bold">{t("login.title")}</h1>
          <p className="text-muted-foreground">{t("login.subtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("login.welcomeBack")}</CardTitle>
            <CardDescription>{t("login.enterCredentials")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">{t("login.email")}</TabsTrigger>
                <TabsTrigger value="google">{t("login.google")}</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("login.emailAddress")}</Label>
                    <Input id="email" type="email" placeholder={t("login.emailPlaceholder")} />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("login.password")}</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        {t("login.forgotPassword")}
                      </Link>
                    </div>
                    <Input id="password" type="password" placeholder={t("login.passwordPlaceholder")} />
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
                    {t("login.continueWithGoogle")}
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground text-center">{t("login.googleDescription")}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" onClick={() => router.push("/dashboard")}>
              {t("login.signIn")}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t("login.dontHaveAccount")} </span>
              <Link href="/register" className="text-primary hover:underline">
                {t("login.register")}
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("login.backToHome")}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

