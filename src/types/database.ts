export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone: string;
          name: string;
          language: string;
          zone_id: string | null;
          platform: string | null;
          wallet_balance: number;
          is_active: boolean;
          fraud_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          name: string;
          language?: string;
          zone_id?: string | null;
          platform?: string | null;
          wallet_balance?: number;
          is_active?: boolean;
          fraud_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          name?: string;
          language?: string;
          zone_id?: string | null;
          platform?: string | null;
          wallet_balance?: number;
          is_active?: boolean;
          fraud_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      zones: {
        Row: {
          id: string;
          name: string;
          city: string;
          state: string;
          coordinates: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city?: string;
          state?: string;
          coordinates?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string;
          state?: string;
          coordinates?: Json | null;
          created_at?: string;
        };
      };
      insurance_plans: {
        Row: {
          id: string;
          name: string;
          price_weekly: number;
          payout_per_day: number;
          max_weekly_payout: number;
          dsi_threshold: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price_weekly: number;
          payout_per_day: number;
          max_weekly_payout: number;
          dsi_threshold?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price_weekly?: number;
          payout_per_day?: number;
          max_weekly_payout?: number;
          dsi_threshold?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      policies: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          start_date: string;
          end_date: string;
          status: string;
          premium_paid: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: string;
          start_date: string;
          end_date: string;
          status?: string;
          premium_paid?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string;
          start_date?: string;
          end_date?: string;
          status?: string;
          premium_paid?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      claims: {
        Row: {
          id: string;
          user_id: string;
          policy_id: string | null;
          trigger_type: string;
          dsi_score: number;
          payout_amount: number;
          status: string;
          processed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          policy_id?: string | null;
          trigger_type: string;
          dsi_score: number;
          payout_amount: number;
          status?: string;
          processed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          policy_id?: string | null;
          trigger_type?: string;
          dsi_score?: number;
          payout_amount?: number;
          status?: string;
          processed_at?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          claim_id: string | null;
          type: string;
          amount: number;
          reason: string | null;
          balance_after: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          claim_id?: string | null;
          type: string;
          amount: number;
          reason?: string | null;
          balance_after: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          claim_id?: string | null;
          type?: string;
          amount?: number;
          reason?: string | null;
          balance_after?: number;
          created_at?: string;
        };
      };
      disruption_events: {
        Row: {
          id: string;
          zone_id: string | null;
          event_type: string;
          severity: number;
          dsi_score: number;
          weather_score: number;
          traffic_score: number;
          platform_score: number;
          affected_users: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          zone_id?: string | null;
          event_type: string;
          severity: number;
          dsi_score: number;
          weather_score?: number;
          traffic_score?: number;
          platform_score?: number;
          affected_users?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          zone_id?: string | null;
          event_type?: string;
          severity?: number;
          dsi_score?: number;
          weather_score?: number;
          traffic_score?: number;
          platform_score?: number;
          affected_users?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_: string]: never;
    };
    Functions: {
      [_: string]: never;
    };
    Enums: {
      [_: string]: never;
    };
  };
}
