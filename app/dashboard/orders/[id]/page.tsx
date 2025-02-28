"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslation } from "@/app/hooks/use-translation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapContainer } from "@/components/map-container"
import { QRCode } from "@/components/qr-code"
import { ChatInterface } from "@/components/chat-interface"
import { ArrowLeft, Truck, MapPin, Clock, Phone, Mail } from "lucide-react"

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("details")

  // Mock order data
  const order = {
    id: params.id || "ORD-1234",
    sender: {
      name: "Abebe Kebede",
      phone: "+251 91 234 5678",
      email: "abebe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    receiver: {
      name: "Tigist Haile",
      phone: "+251 91 876 5432",
      email: "tigist@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    pickupPoint: {
      name: "Bole Pickup Station",
      address: "Bole Road, Addis Ababa",
      phone: "+251 91 111 2222",
    },
    messenger: {
      name: "Dawit Tadesse",
      phone: "+251 91 333 4444",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    parcel: {
      type: "Document",
      weight: "0.5 kg",
      dimensions: "30 x 20 x 5 cm",
      description: "Important business documents",
    },
    status: "in-transit",
    createdAt: "2023-06-15T10:30:00",
    estimatedDelivery: "2023-06-15T14:30:00",
    timeline: [
      {
        status: "order-created",
        time: "10:30 AM",
        date: "June 15, 2023",
        description: "Order created by sender",
      },
      {
        status: "pickup-assigned",
        time: "10:45 AM",
        date: "June 15, 2023",
        description: "Pickup point assigned",
      },
      {
        status: "messenger-assigned",
        time: "11:15 AM",
        date: "June 15, 2023",
        description: "Messenger assigned to order",
      },
      {
        status: "picked-up",
        time: "11:30 AM",
        date: "June 15, 2023",
        description: "Parcel picked up by messenger",
      },
      {
        status: "in-transit",
        time: "11:45 AM",
        date: "June 15, 2023",
        description: "Parcel in transit to destination",
      },
    ],
    destination: "Megenagna, Addis Ababa",
    price: "150 ETB",
    paymentStatus: "paid",
    paymentMethod: "Chapa",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "in-transit":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t("orderDetails.title", { id: order.id })}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${getStatusColor(order.status)}`}>
                {t(`orderDetails.status.${order.status}`)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {t("orderDetails.created", { date: new Date(order.createdAt).toLocaleString() })}
              </span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">{t("orderDetails.tabs.details")}</TabsTrigger>
            <TabsTrigger value="tracking">{t("orderDetails.tabs.tracking")}</TabsTrigger>
            <TabsTrigger value="chat">{t("orderDetails.tabs.chat")}</TabsTrigger>
            <TabsTrigger value="qrcode">{t("orderDetails.tabs.qrcode")}</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderDetails.parcelInfo")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t("orderDetails.parcelType")}</p>
                        <p className="font-medium">{order.parcel.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("orderDetails.weight")}</p>
                        <p className="font-medium">{order.parcel.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("orderDetails.dimensions")}</p>
                        <p className="font-medium">{order.parcel.dimensions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("orderDetails.price")}</p>
                        <p className="font-medium">{order.price}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("orderDetails.description")}</p>
                      <p className="font-medium">{order.parcel.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("orderDetails.paymentInfo")}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            order.paymentStatus === "paid"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }
                        >
                          {t(`orderDetails.paymentStatus.${order.paymentStatus}`)}
                        </Badge>
                        <span className="text-sm">
                          {t("orderDetails.via")} {order.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderDetails.deliveryInfo")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t("orderDetails.pickupPoint")}</p>
                      </div>
                      <p className="font-medium">{order.pickupPoint.name}</p>
                      <p className="text-sm">{order.pickupPoint.address}</p>
                      <p className="text-sm">{order.pickupPoint.phone}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t("orderDetails.destination")}</p>
                      </div>
                      <p className="font-medium">{order.destination}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t("orderDetails.estimatedDelivery")}</p>
                      </div>
                      <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t("orderDetails.messenger")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.messenger.avatar} alt={order.messenger.name} />
                          <AvatarFallback>{order.messenger.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.messenger.name}</p>
                          <p className="text-sm">{order.messenger.phone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderDetails.sender")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={order.sender.avatar} alt={order.sender.name} />
                        <AvatarFallback>{order.sender.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{order.sender.name}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{order.sender.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{order.sender.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderDetails.receiver")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={order.receiver.avatar} alt={order.receiver.name} />
                        <AvatarFallback>{order.receiver.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{order.receiver.name}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{order.receiver.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{order.receiver.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t("orderDetails.timeline")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px]" />
                        <div className="flex flex-col">
                          <p className="font-medium">{t(`orderDetails.status.${event.status}`)}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.time} - {event.date}
                          </p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>{t("orderDetails.liveTracking")}</CardTitle>
                <CardDescription>{t("orderDetails.liveTrackingDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <MapContainer orderId={order.id} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>{t("orderDetails.chat")}</CardTitle>
                <CardDescription>{t("orderDetails.chatDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface orderId={order.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qrcode">
            <Card>
              <CardHeader>
                <CardTitle>{t("orderDetails.qrCode")}</CardTitle>
                <CardDescription>{t("orderDetails.qrCodeDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <QRCode value={`https://mbet-adera.com/verify/${order.id}`} size={250} />
                <p className="mt-4 text-center text-muted-foreground">{t("orderDetails.qrCodeInstructions")}</p>
                <Button className="mt-4">{t("orderDetails.downloadQR")}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

