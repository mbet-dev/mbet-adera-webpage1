"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "@/app/hooks/use-translation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapContainer } from "@/components/map-container"
import { OrderCard } from "@/components/order-card"
import { Package, Truck, Bell, BarChart3, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react"

export default function Dashboard() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const activeOrders = [
    {
      id: "ORD-1234",
      sender: "Abebe Kebede",
      receiver: "Tigist Haile",
      pickupPoint: "Bole, Addis Ababa",
      destination: "Megenagna, Addis Ababa",
      status: "in-transit",
      createdAt: "2023-06-15T10:30:00",
      estimatedDelivery: "2023-06-15T14:30:00",
    },
    {
      id: "ORD-1235",
      sender: "Dawit Tadesse",
      receiver: "Hanna Girma",
      pickupPoint: "Piassa, Addis Ababa",
      destination: "Kazanchis, Addis Ababa",
      status: "pending",
      createdAt: "2023-06-15T09:15:00",
      estimatedDelivery: "2023-06-15T13:00:00",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      message: "dashboard.activity.orderDelivered",
      time: "10 minutes ago",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      message: "dashboard.activity.newOrder",
      time: "30 minutes ago",
      icon: <Package className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      message: "dashboard.activity.orderDelayed",
      time: "1 hour ago",
      icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    },
    {
      id: 4,
      message: "dashboard.activity.messageReceived",
      time: "2 hours ago",
      icon: <Bell className="h-4 w-4 text-purple-500" />,
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard.welcome")}</h1>
            <p className="text-muted-foreground">{t("dashboard.welcomeMessage")}</p>
          </div>
          <Button className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t("dashboard.createOrder")}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t("dashboard.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="orders">{t("dashboard.tabs.orders")}</TabsTrigger>
            <TabsTrigger value="map">{t("dashboard.tabs.map")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("dashboard.stats.activeOrders")}</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">+10%</span> from last week
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("dashboard.stats.deliveredOrders")}</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">+25%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("dashboard.stats.rating")}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= 4 ? "currentColor" : "none"}
                          stroke={star > 4 ? "currentColor" : "none"}
                          className={`h-3 w-3 ${star <= 4 ? "text-yellow-500" : "text-muted-foreground"}`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="md:col-span-2"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t("dashboard.activeOrders")}</CardTitle>
                    <CardDescription>{t("dashboard.activeOrdersDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
                    <CardDescription>{t("dashboard.recentActivityDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="mt-0.5">{activity.icon}</div>
                          <div>
                            <p className="text-sm">{t(activity.message)}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.allOrders")}</CardTitle>
                <CardDescription>{t("dashboard.allOrdersDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    ...activeOrders,
                    {
                      id: "ORD-1230",
                      sender: "Meron Alemu",
                      receiver: "Yonas Bekele",
                      pickupPoint: "Lideta, Addis Ababa",
                      destination: "Jemo, Addis Ababa",
                      status: "delivered",
                      createdAt: "2023-06-14T14:30:00",
                      estimatedDelivery: "2023-06-14T17:30:00",
                    },
                    {
                      id: "ORD-1229",
                      sender: "Selam Tesfaye",
                      receiver: "Bereket Hailu",
                      pickupPoint: "Gerji, Addis Ababa",
                      destination: "CMC, Addis Ababa",
                      status: "delivered",
                      createdAt: "2023-06-14T10:15:00",
                      estimatedDelivery: "2023-06-14T13:30:00",
                    },
                  ].map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.liveTracking")}</CardTitle>
                <CardDescription>{t("dashboard.liveTrackingDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <MapContainer />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

