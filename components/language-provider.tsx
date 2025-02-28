"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

interface LanguageProviderProps {
  children: React.ReactNode
}

// Translations are stored in a separate file to keep the code clean
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",

    // Hero section
    "hero.title": "Fast and Reliable Delivery Tracking in Ethiopia",
    "hero.subtitle":
      "MBet-Adera provides real-time tracking for your parcels across Ethiopia. Connect senders, receivers, and messengers in one seamless platform.",
    "hero.getStarted": "Get Started",
    "hero.learnMore": "Learn More",

    // Features section
    "features.title": "Why Choose MBet-Adera",
    "features.subtitle": "Our platform offers a comprehensive solution for all your delivery needs",
    "features.realTime.title": "Real-time Tracking",
    "features.realTime.description": "Track your parcels in real-time with accurate GPS location updates",
    "features.tracking.title": "Route Optimization",
    "features.tracking.description": "Efficient delivery routes to ensure your parcels arrive on time",
    "features.chat.title": "In-app Chat",
    "features.chat.description": "Communicate directly with messengers, senders, and receivers",
    "features.rating.title": "Rating System",
    "features.rating.description": "Rate your experience to help us improve our service",
    "features.secure.title": "Secure Payments",
    "features.secure.description": "Integrated with Chapa for secure and reliable payments",
    "features.multilingual.title": "Multi-lingual Support",
    "features.multilingual.description": "Use our platform in English or Amharic for your convenience",

    // How it works section
    "howItWorks.title": "How It Works",
    "howItWorks.subtitle": "Simple steps to get your parcels delivered",
    "howItWorks.step1.title": "Register",
    "howItWorks.step1.description": "Create an account as a sender, receiver, pickup point, or messenger",
    "howItWorks.step2.title": "Create Order",
    "howItWorks.step2.description": "Specify pickup location, destination, and parcel details",
    "howItWorks.step3.title": "Track Delivery",
    "howItWorks.step3.description": "Monitor your parcel's journey in real-time on the map",
    "howItWorks.step4.title": "Receive Parcel",
    "howItWorks.step4.description": "Verify delivery with QR code and rate your experience",

    // CTA section
    "cta.title": "Ready to Get Started?",
    "cta.subtitle": "Join thousands of users who trust MBet-Adera for their delivery needs",
    "cta.button": "Register Now",

    // Footer
    "footer.description": "Ethiopia's premier delivery tracking service",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookies Policy",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved",

    // Login page
    "login.title": "Welcome Back",
    "login.subtitle": "Sign in to your MBet-Adera account",
    "login.welcomeBack": "Welcome back",
    "login.enterCredentials": "Enter your credentials to access your account",
    "login.emailAddress": "Email address",
    "login.emailPlaceholder": "name@example.com",
    "login.password": "Password",
    "login.passwordPlaceholder": "••••••••",
    "login.forgotPassword": "Forgot password?",
    "login.signIn": "Sign In",
    "login.dontHaveAccount": "Don't have an account?",
    "login.register": "Register",
    "login.backToHome": "Back to home",
    "login.google": "Google",
    "login.continueWithGoogle": "Continue with Google",
    "login.googleDescription": "We'll only use your email address to create your account",

    // Register page
    "register.title": "Create an Account",
    "register.subtitle": "Join MBet-Adera today",
    "register.createAccount": "Create account",
    "register.fillDetails": "Fill in your details to create your account",
    "register.fullName": "Full name",
    "register.fullNamePlaceholder": "John Doe",
    "register.emailAddress": "Email address",
    "register.emailPlaceholder": "name@example.com",
    "register.phoneNumber": "Phone number",
    "register.phonePlaceholder": "+251 91 234 5678",
    "register.password": "Password",
    "register.passwordPlaceholder": "••••••••",
    "register.selectRole": "Select your role",
    "register.roles.sender": "Sender",
    "register.roles.receiver": "Receiver",
    "register.roles.pickup": "Pickup Point",
    "register.roles.messenger": "Messenger",
    "register.alreadyHaveAccount": "Already have an account?",
    "register.login": "Login",
    "register.backToHome": "Back to home",
    "register.email": "Email",
    "register.google": "Google",
    "register.continueWithGoogle": "Continue with Google",
    "register.googleDescription": "We'll only use your email address to create your account",

    // Dashboard
    "dashboard.welcome": "Welcome, {name}",
    "dashboard.welcomeMessage": "Here's an overview of your delivery activities",
    "dashboard.createOrder": "Create Order",
    "dashboard.tabs.overview": "Overview",
    "dashboard.tabs.orders": "Orders",
    "dashboard.tabs.map": "Map",
    "dashboard.stats.activeOrders": "Active Orders",
    "dashboard.stats.deliveredOrders": "Delivered Orders",
    "dashboard.stats.rating": "Your Rating",
    "dashboard.activeOrders": "Active Orders",
    "dashboard.activeOrdersDescription": "Track your current deliveries",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.recentActivityDescription": "Latest updates on your orders",
    "dashboard.allOrders": "All Orders",
    "dashboard.allOrdersDescription": "View and manage all your orders",
    "dashboard.liveTracking": "Live Tracking",
    "dashboard.liveTrackingDescription": "Track all your active deliveries in real-time",
    "dashboard.activity.orderDelivered": "Your order #{id} has been delivered",
    "dashboard.activity.newOrder": "New order #{id} has been created",
    "dashboard.activity.orderDelayed": "Order #{id} is delayed by {minutes} minutes",
    "dashboard.activity.messageReceived": "You received a message from {name}",
    "dashboard.nav.dashboard": "Dashboard",
    "dashboard.nav.orders": "Orders",
    "dashboard.nav.tracking": "Tracking",
    "dashboard.nav.messages": "Messages",
    "dashboard.nav.chatbot": "AI Assistant",
    "dashboard.nav.settings": "Settings",
    "dashboard.nav.help": "Help & Support",
    "dashboard.nav.logout": "Logout",
  },
  am: {
    // Common
    login: "ግባ",
    register: "ተመዝገብ",
    logout: "ውጣ",
    email: "ኢሜይል",
    password: "የይለፍ ቃል",

    // Hero section
    "hero.title": "በኢትዮጵያ ውስጥ ፈጣን እና አስተማማኝ የዕቃ ማድረሻ ክትትል",
    "hero.subtitle":
      "ኤምቤት-አደራ በኢትዮጵያ ውስጥ ለእርስዎ ዕቃዎች በእውነተኛ ጊዜ ክትትል ያደርጋል። ላኪዎችን፣ ተቀባዮችን እና መልእክተኞችን በአንድ ቀልጣፋ መድረክ ያገናኛል።",
    "hero.getStarted": "ጀምር",
    "hero.learnMore": "ተጨማሪ ይወቁ",

    // Features section
    "features.title": "ኤምቤት-አደራን ለምን መምረጥ አለብዎት",
    "features.subtitle": "የእኛ መድረክ ለሁሉም የማድረሻ ፍላጎቶችዎ ሁሉን አቀፍ መፍትሄ ይሰጣል",
    "features.realTime.title": "በእውነተኛ ጊዜ ክትትል",
    "features.realTime.description": "ዕቃዎችዎን በእውነተኛ ጊዜ ከትክክለኛ የGPS ቦታ ዝመናዎች ጋር ይከታተሉ",
    "features.tracking.title": "የመንገድ ማሻሻያ",
    "features.tracking.description": "ዕቃዎችዎ በሰዓቱ እንዲደርሱ ውጤታማ የማድረሻ መንገዶች",
    "features.chat.title": "በመተግበሪያ ውስጥ ቻት",
    "features.chat.description": "ከመልእክተኞች፣ ላኪዎች እና ተቀባዮች ጋር በቀጥታ ይገናኙ",
    "features.rating.title": "የደረጃ አሰጣጥ ስርዓት",
    "features.rating.description": "አገልግሎታችንን እንድናሻሽል ለመርዳት ልምድዎን ይደርጁ",
    "features.secure.title": "ደህንነቱ የተጠበቀ ክፍያዎች",
    "features.secure.description": "ለደህንነቱ የተጠበቀ እና አስተማማኝ ክፍያዎች ከቻፓ ጋር ተዋህዷል",
    "features.multilingual.title": "ባለብዙ ቋንቋ ድጋፍ",
    "features.multilingual.description": "መድረካችንን በእንግሊዝኛ ወይም በአማርኛ ለእርስዎ ምቾት ይጠቀሙ",

    // How it works section
    "howItWorks.title": "እንዴት እንደሚሰራ",
    "howItWorks.subtitle": "ዕቃዎችዎን ለማድረስ ቀላል ደረጃዎች",
    "howItWorks.step1.title": "ይመዝገቡ",
    "howItWorks.step1.description": "እንደ ላኪ፣ ተቀባይ፣ የመውሰጃ ቦታ ወይም መልእክተኛ መለያ ይፍጠሩ",
    "howItWorks.step2.title": "ትዕዛዝ ይፍጠሩ",
    "howItWorks.step2.description": "የመውሰጃ ቦታ፣ መድረሻ እና የዕቃ ዝርዝሮችን ይግለጹ",
    "howItWorks.step3.title": "ማድረስን ይከታተሉ",
    "howItWorks.step3.description": "የዕቃዎን ጉዞ በካርታው ላይ በእውነተኛ ጊዜ ይከታተሉ",
    "howItWorks.step4.title": "ዕቃ ይቀበሉ",
    "howItWorks.step4.description": "ማድረስን በQR ኮድ ያረጋግጡ እና ልምድዎን ይደርጁ",

    // CTA section
    "cta.title": "ለመጀመር ዝግጁ ነዎት?",
    "cta.subtitle": "ለማድረሻ ፍላጎታቸው ኤምቤት-አደራን የሚያምኑ ሺዎች ተጠቃሚዎችን ይቀላቀሉ",
    "cta.button": "አሁን ይመዝገቡ",

    // Footer
    "footer.description": "የኢትዮጵያ ዋነኛ የዕቃ ማድረሻ ክትትል አገልግሎት",
    "footer.company": "ኩባንያ",
    "footer.about": "ስለ እኛ",
    "footer.careers": "ሥራዎች",
    "footer.contact": "ያግኙን",
    "footer.legal": "ሕጋዊ",
    "footer.terms": "የአገልግሎት ውሎች",
    "footer.privacy": "የግላዊነት ፖሊሲ",
    "footer.cookies": "የኩኪዎች ፖሊሲ",
    "footer.connect": "ይገናኙ",
    "footer.rights": "መብቱ በህግ የተጠበቀ ነው",

    // Login page
    "login.title": "እንኳን ደህና መጡ",
    "login.subtitle": "ወደ ኤምቤት-አደራ መለያዎ ይግቡ",
    "login.welcomeBack": "እንኳን ደህና መጡ",
    "login.enterCredentials": "መለያዎን ለመድረስ ማረጋገጫዎችዎን ያስገቡ",
    "login.emailAddress": "የኢሜይል አድራሻ",
    "login.emailPlaceholder": "name@example.com",
    "login.password": "የይለፍ ቃል",
    "login.passwordPlaceholder": "••••••••",
    "login.forgotPassword": "የይለፍ ቃል ረሳኽ?",
    "login.signIn": "ግባ",
    "login.dontHaveAccount": "መለያ የለዎትም?",
    "login.register": "ይመዝገቡ",
    "login.backToHome": "ወደ መነሻ ይመለሱ",
    "login.google": "ጉግል",
    "login.continueWithGoogle": "በጉግል ይቀጥሉ",
    "login.googleDescription": "መለያዎን ለመፍጠር የኢሜይል አድራሻዎን ብቻ እንጠቀማለን",

    // Register page
    "register.title": "መለያ ይፍጠሩ",
    "register.subtitle": "ኤምቤት-አደራን ዛሬ ይቀላቀሉ",
    "register.createAccount": "መለያ ይፍጠሩ",
    "register.fillDetails": "መለያዎን ለመፍጠር ዝርዝሮችዎን ይሙሉ",
    "register.fullName": "ሙሉ ስም",
    "register.fullNamePlaceholder": "ጆን ዶ",
    "register.emailAddress": "የኢሜይል አድራሻ",
    "register.emailPlaceholder": "name@example.com",
    "register.phoneNumber": "ስልክ ቁጥር",
    "register.phonePlaceholder": "+251 91 234 5678",
    "register.password": "የይለፍ ቃል",
    "register.passwordPlaceholder": "••••••••",
    "register.selectRole": "ሚናዎን ይምረጡ",
    "register.roles.sender": "ላኪ",
    "register.roles.receiver": "ተቀባይ",
    "register.roles.pickup": "የመውሰጃ ቦታ",
    "register.roles.messenger": "መልእክተኛ",
    "register.alreadyHaveAccount": "መለያ አለዎት?",
    "register.login": "ግባ",
    "register.backToHome": "ወደ መነሻ ይመለሱ",
    "register.email": "ኢሜይል",
    "register.google": "ጉግል",
    "register.continueWithGoogle": "በጉግል ይቀጥሉ",
    "register.googleDescription": "መለያዎን ለመፍጠር የኢሜይል አድራሻዎን ብቻ እንጠቀማለን",

    // Dashboard
    "dashboard.welcome": "እንኳን ደህና መጡ፣ {name}",
    "dashboard.welcomeMessage": "የእርስዎ የማድረሻ እንቅስቃሴዎች አጠቃላይ እይታ ይኸውልዎት",
    "dashboard.createOrder": "ትዕዛዝ ይፍጠሩ",
    "dashboard.tabs.overview": "አጠቃላይ እይታ",
    "dashboard.tabs.orders": "ትዕዛዞች",
    "dashboard.tabs.map": "ካርታ",
    "dashboard.stats.activeOrders": "ንቁ ትዕዛዞች",
    "dashboard.stats.deliveredOrders": "የተላኩ ትዕዛዞች",
    "dashboard.stats.rating": "የእርስዎ ደረጃ",
    "dashboard.activeOrders": "ንቁ ትዕዛዞች",
    "dashboard.activeOrdersDescription": "የአሁኑን ማድረሻዎችዎን ይከታተሉ",
    "dashboard.recentActivity": "የቅርብ ጊዜ እንቅስቃሴ",
    "dashboard.recentActivityDescription": "በትዕዛዞችዎ ላይ የቅርብ ጊዜ ዝመናዎች",
    "dashboard.allOrders": "ሁሉም ትዕዛዞች",
    "dashboard.allOrdersDescription": "ሁሉንም ትዕዛዞችዎን ይመልከቱ እና ያስተዳድሩ",
    "dashboard.liveTracking": "በቀጥታ ክትትል",
    "dashboard.liveTrackingDescription": "ሁሉንም ንቁ ማድረሻዎች በእውነተኛ ጊዜ ይከታተሉ",
    "dashboard.activity.orderDelivered": "ትዕዛዝዎ #{id} ደርሷል",
    "dashboard.activity.newOrder": "አዲስ ትዕዛዝ #{id} ተፈጥሯል",
    "dashboard.activity.orderDelayed": "ትዕዛዝ #{id} በ{minutes} ደቂቃዎች ዘግይቷል",
    "dashboard.activity.messageReceived": "ከ{name} መልእክት ተቀብለዋል",
    "dashboard.nav.dashboard": "ዳሽቦርድ",
    "dashboard.nav.orders": "ትዕዛዞች",
    "dashboard.nav.tracking": "ክትትል",
    "dashboard.nav.messages": "መልእክቶች",
    "dashboard.nav.chatbot": "AI ረዳት",
    "dashboard.nav.settings": "ቅንብሮች",
    "dashboard.nav.help": "እገዛ እና ድጋፍ",
    "dashboard.nav.logout": "ውጣ",
  },
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value))
      })
    }

    return text
  }

  const value = {
    language,
    setLanguage: (newLanguage: Language) => {
      setLanguage(newLanguage)
      localStorage.setItem("language", newLanguage)
    },
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

