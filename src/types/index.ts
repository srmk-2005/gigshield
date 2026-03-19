export interface User {
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
}

export interface Zone {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number } | null;
  created_at: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  price_weekly: number;
  payout_per_day: number;
  max_weekly_payout: number;
  dsi_threshold: number;
  is_active: boolean;
  created_at: string;
}

export interface Policy {
  id: string;
  user_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: string;
  premium_paid: number;
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  user_id: string;
  policy_id: string | null;
  trigger_type: string;
  dsi_score: number;
  payout_amount: number;
  status: string;
  processed_at: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  claim_id: string | null;
  type: string;
  amount: number;
  reason: string | null;
  balance_after: number;
  created_at: string;
}

export interface DisruptionEvent {
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
}

export type Platform = 'Zepto' | 'Swiggy' | 'Blinkit' | 'Zomato';
export type Language = 'English' | 'Tamil';
export type DisruptionType = 'rain' | 'flood' | 'heat' | 'app_crash' | 'traffic';
export type RiskLevel = 'Low' | 'Medium' | 'High';
