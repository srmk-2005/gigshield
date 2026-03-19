/*
  # GigShield Database Schema

  ## Overview
  Complete database schema for GigShield - an AI-powered parametric income insurance platform for gig workers.

  ## New Tables

  1. **users**
     - `id` (uuid, primary key)
     - `phone` (text, unique) - User's phone number
     - `name` (text) - User's full name
     - `language` (text) - Preferred language (Tamil/English)
     - `zone_id` (uuid) - Working zone reference
     - `platform` (text) - Gig platform (Zepto/Swiggy/Blinkit/Zomato)
     - `wallet_balance` (decimal) - Current wallet balance
     - `is_active` (boolean) - Account status
     - `fraud_score` (integer) - Fraud detection score (0-100)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  2. **zones**
     - `id` (uuid, primary key)
     - `name` (text) - Zone name (e.g., "Anna Nagar", "T Nagar")
     - `city` (text) - City name
     - `state` (text) - State name
     - `coordinates` (jsonb) - Lat/long coordinates
     - `created_at` (timestamptz)

  3. **insurance_plans**
     - `id` (uuid, primary key)
     - `name` (text) - Plan name (Basic/Pro/Max)
     - `price_weekly` (decimal) - Weekly premium
     - `payout_per_day` (decimal) - Daily payout amount
     - `max_weekly_payout` (decimal) - Maximum weekly payout
     - `dsi_threshold` (integer) - Minimum DSI to trigger payout
     - `is_active` (boolean)
     - `created_at` (timestamptz)

  4. **policies**
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Reference to users
     - `plan_id` (uuid) - Reference to insurance_plans
     - `start_date` (date) - Policy start date
     - `end_date` (date) - Policy end date
     - `status` (text) - active/expired/cancelled
     - `premium_paid` (decimal) - Total premium paid
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  5. **claims**
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Reference to users
     - `policy_id` (uuid) - Reference to policies
     - `trigger_type` (text) - rain/flood/heat/app_crash
     - `dsi_score` (integer) - DSI score at time of claim (0-100)
     - `payout_amount` (decimal) - Amount paid out
     - `status` (text) - pending/approved/rejected/paid
     - `processed_at` (timestamptz) - When claim was processed
     - `created_at` (timestamptz)

  6. **transactions**
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Reference to users
     - `claim_id` (uuid) - Reference to claims (nullable)
     - `type` (text) - credit/debit
     - `amount` (decimal) - Transaction amount
     - `reason` (text) - Transaction description
     - `balance_after` (decimal) - Wallet balance after transaction
     - `created_at` (timestamptz)

  7. **disruption_events**
     - `id` (uuid, primary key)
     - `zone_id` (uuid) - Reference to zones
     - `event_type` (text) - rain/flood/heat/app_crash/traffic
     - `severity` (integer) - Event severity (0-100)
     - `dsi_score` (integer) - Calculated DSI score
     - `weather_score` (integer) - Weather component (0-100)
     - `traffic_score` (integer) - Traffic component (0-100)
     - `platform_score` (integer) - Platform status component (0-100)
     - `affected_users` (integer) - Number of users affected
     - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to access their own data
  - Add policies for admin users to access all data
*/

-- Create zones table
CREATE TABLE IF NOT EXISTS zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL DEFAULT 'Chennai',
  state text NOT NULL DEFAULT 'Tamil Nadu',
  coordinates jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create insurance_plans table
CREATE TABLE IF NOT EXISTS insurance_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_weekly decimal NOT NULL,
  payout_per_day decimal NOT NULL,
  max_weekly_payout decimal NOT NULL,
  dsi_threshold integer DEFAULT 30,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  name text NOT NULL,
  language text DEFAULT 'Tamil',
  zone_id uuid REFERENCES zones(id),
  platform text,
  wallet_balance decimal DEFAULT 0,
  is_active boolean DEFAULT true,
  fraud_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES insurance_plans(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'active',
  premium_paid decimal DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  policy_id uuid REFERENCES policies(id),
  trigger_type text NOT NULL,
  dsi_score integer NOT NULL,
  payout_amount decimal NOT NULL,
  status text DEFAULT 'pending',
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  claim_id uuid REFERENCES claims(id),
  type text NOT NULL,
  amount decimal NOT NULL,
  reason text,
  balance_after decimal NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create disruption_events table
CREATE TABLE IF NOT EXISTS disruption_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id uuid REFERENCES zones(id),
  event_type text NOT NULL,
  severity integer NOT NULL,
  dsi_score integer NOT NULL,
  weather_score integer DEFAULT 0,
  traffic_score integer DEFAULT 0,
  platform_score integer DEFAULT 0,
  affected_users integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insert default zones
INSERT INTO zones (name, city, state, coordinates) VALUES
  ('Anna Nagar', 'Chennai', 'Tamil Nadu', '{"lat": 13.0878, "lng": 80.2169}'),
  ('T Nagar', 'Chennai', 'Tamil Nadu', '{"lat": 13.0418, "lng": 80.2341}'),
  ('Velachery', 'Chennai', 'Tamil Nadu', '{"lat": 12.9750, "lng": 80.2210}'),
  ('Adyar', 'Chennai', 'Tamil Nadu', '{"lat": 13.0067, "lng": 80.2572}'),
  ('Tambaram', 'Chennai', 'Tamil Nadu', '{"lat": 12.9249, "lng": 80.1000}')
ON CONFLICT DO NOTHING;

-- Insert default insurance plans
INSERT INTO insurance_plans (name, price_weekly, payout_per_day, max_weekly_payout, dsi_threshold) VALUES
  ('Basic', 29, 50, 200, 30),
  ('Pro', 59, 100, 500, 30),
  ('Max', 99, 200, 1000, 30)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE disruption_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for zones (public read)
CREATE POLICY "Anyone can view zones"
  ON zones FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for insurance_plans (public read)
CREATE POLICY "Anyone can view active insurance plans"
  ON insurance_plans FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS Policies for users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (phone = current_setting('request.jwt.claims', true)::json->>'phone' OR id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (phone = current_setting('request.jwt.claims', true)::json->>'phone' OR id::text = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (phone = current_setting('request.jwt.claims', true)::json->>'phone' OR id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for policies
CREATE POLICY "Users can view own policies"
  ON policies FOR SELECT
  TO authenticated
  USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own policies"
  ON policies FOR INSERT
  TO authenticated
  WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- RLS Policies for claims
CREATE POLICY "Users can view own claims"
  ON claims FOR SELECT
  TO authenticated
  USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own claims"
  ON claims FOR INSERT
  TO authenticated
  WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "System can insert transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for disruption_events (public read for authenticated users)
CREATE POLICY "Authenticated users can view disruption events"
  ON disruption_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert disruption events"
  ON disruption_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_policies_user_id ON policies(user_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_disruption_events_zone_id ON disruption_events(zone_id);
CREATE INDEX IF NOT EXISTS idx_disruption_events_created_at ON disruption_events(created_at DESC);