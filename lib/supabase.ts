import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone_number: string
          role: "sender" | "receiver" | "pickup" | "messenger"
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          phone_number: string
          role: "sender" | "receiver" | "pickup" | "messenger"
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone_number?: string
          role?: "sender" | "receiver" | "pickup" | "messenger"
          avatar_url?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          pickup_point_id: string
          messenger_id: string | null
          status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          pickup_location: string
          delivery_location: string
          parcel_type: string
          parcel_weight: number
          parcel_dimensions: string
          parcel_description: string
          payment_status: "pending" | "paid" | "failed"
          payment_method: string | null
          amount: number
          created_at: string
          updated_at: string
          estimated_delivery: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          pickup_point_id: string
          messenger_id?: string | null
          status?: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          pickup_location: string
          delivery_location: string
          parcel_type: string
          parcel_weight: number
          parcel_dimensions: string
          parcel_description: string
          payment_status?: "pending" | "paid" | "failed"
          payment_method?: string | null
          amount: number
          created_at?: string
          updated_at?: string
          estimated_delivery?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          pickup_point_id?: string
          messenger_id?: string | null
          status?: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          pickup_location?: string
          delivery_location?: string
          parcel_type?: string
          parcel_weight?: number
          parcel_dimensions?: string
          parcel_description?: string
          payment_status?: "pending" | "paid" | "failed"
          payment_method?: string | null
          amount?: number
          created_at?: string
          updated_at?: string
          estimated_delivery?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          order_id: string
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          order_id: string
          rated_by: string
          rated_user: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          rated_by: string
          rated_user: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          rated_by?: string
          rated_user?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
  }
}

