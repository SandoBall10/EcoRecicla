/*
  # EcoRecicla Database Schema

  ## Overview
  Complete database schema for EcoRecicla application - a smart recycling platform
  that connects users with recycling centers, tracks pickups, and rewards eco-friendly behavior.

  ## New Tables Created

  ### 1. profiles
  Extended user profile information linked to auth.users
  - `id` (uuid, FK to auth.users) - User identifier
  - `full_name` (text) - User's complete name
  - `dni` (text, unique) - National ID number
  - `phone` (text) - Contact phone number
  - `address` (text, optional) - Home address
  - `eco_level` (text) - Environmental engagement level (beginner, advanced, leader)
  - `total_points` (integer) - Accumulated reward points
  - `total_recycled_kg` (numeric) - Total kilograms recycled
  - `created_at` (timestamp) - Account creation date

  ### 2. recycling_points
  Physical locations for recycling materials
  - `id` (uuid) - Unique identifier
  - `name` (text) - Location name
  - `address` (text) - Physical address
  - `latitude` (numeric) - GPS coordinate
  - `longitude` (numeric) - GPS coordinate
  - `accepted_materials` (text array) - Types accepted (plastic, glass, paper, metal, electronics)
  - `phone` (text, optional) - Contact number
  - `hours` (text, optional) - Operating hours
  - `is_active` (boolean) - Currently operational
  - `created_at` (timestamp)

  ### 3. pickups
  Home pickup requests from users
  - `id` (uuid) - Unique identifier
  - `user_id` (uuid, FK) - Requesting user
  - `material_type` (text) - Type of material for pickup
  - `estimated_quantity` (text) - Approximate amount
  - `pickup_address` (text) - Collection address
  - `pickup_date` (date) - Scheduled date
  - `pickup_time` (time) - Scheduled time
  - `status` (text) - Current status (pending, in_transit, completed, cancelled)
  - `driver_location_lat` (numeric, optional) - Real-time driver position
  - `driver_location_lng` (numeric, optional) - Real-time driver position
  - `actual_weight_kg` (numeric, optional) - Actual weight collected
  - `points_earned` (integer) - Points awarded
  - `completed_at` (timestamp, optional)
  - `created_at` (timestamp)

  ### 4. partner_stores
  Businesses offering rewards for EcoRecicla points
  - `id` (uuid) - Unique identifier
  - `name` (text) - Store name
  - `description` (text) - Store details
  - `logo_url` (text, optional) - Store logo
  - `category` (text) - Business type (cafe, restaurant, retail, services)
  - `address` (text) - Physical location
  - `discount_description` (text) - Promotion details
  - `points_required` (integer) - Points needed for discount
  - `is_active` (boolean) - Currently available
  - `created_at` (timestamp)

  ### 5. achievements
  Unlockable milestones for user engagement
  - `id` (uuid) - Unique identifier
  - `name` (text) - Achievement name
  - `description` (text) - How to unlock
  - `icon` (text) - Icon identifier
  - `points_required` (integer) - Points threshold
  - `created_at` (timestamp)

  ### 6. user_achievements
  Junction table tracking earned achievements
  - `user_id` (uuid, FK) - User who earned it
  - `achievement_id` (uuid, FK) - Achievement earned
  - `earned_at` (timestamp) - When unlocked

  ### 7. notifications
  System alerts and reminders for users
  - `id` (uuid) - Unique identifier
  - `user_id` (uuid, FK) - Recipient user
  - `title` (text) - Notification headline
  - `message` (text) - Notification content
  - `type` (text) - Category (pickup, achievement, reminder, promotion)
  - `is_read` (boolean) - Read status
  - `created_at` (timestamp)

  ## Security Implementation
  - RLS enabled on all tables
  - Users can only access their own data (profiles, pickups, notifications, achievements)
  - Recycling points and partner stores are publicly readable
  - Only authenticated users can create pickups
  - Proper authentication checks using auth.uid()

  ## Important Notes
  - All tables use UUIDs for primary keys
  - Timestamps with timezone for accurate tracking
  - Default values set for booleans and numeric fields
  - Indexes on foreign keys for query performance
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  dni text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text,
  eco_level text DEFAULT 'beginner' CHECK (eco_level IN ('beginner', 'advanced', 'leader')),
  total_points integer DEFAULT 0,
  total_recycled_kg numeric(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create recycling_points table
CREATE TABLE IF NOT EXISTS recycling_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude numeric(10, 7) NOT NULL,
  longitude numeric(10, 7) NOT NULL,
  accepted_materials text[] NOT NULL DEFAULT '{}',
  phone text,
  hours text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recycling_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active recycling points"
  ON recycling_points FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create pickups table
CREATE TABLE IF NOT EXISTS pickups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_type text NOT NULL,
  estimated_quantity text NOT NULL,
  pickup_address text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'completed', 'cancelled')),
  driver_location_lat numeric(10, 7),
  driver_location_lng numeric(10, 7),
  actual_weight_kg numeric(10, 2),
  points_earned integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pickups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pickups"
  ON pickups FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pickups"
  ON pickups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pickups"
  ON pickups FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create partner_stores table
CREATE TABLE IF NOT EXISTS partner_stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  logo_url text,
  category text NOT NULL CHECK (category IN ('cafe', 'restaurant', 'retail', 'services')),
  address text NOT NULL,
  discount_description text NOT NULL,
  points_required integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partner_stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active partner stores"
  ON partner_stores FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  points_required integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('pickup', 'achievement', 'reminder', 'promotion')),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pickups_user_id ON pickups(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_recycling_points_location ON recycling_points(latitude, longitude);

-- Insert sample achievements
INSERT INTO achievements (name, description, icon, points_required) VALUES
  ('Primer Paso', 'Completa tu primer reciclaje', 'seedling', 0),
  ('Eco Guerrero', 'Recicla 10 kg de materiales', 'leaf', 100),
  ('Líder Verde', 'Alcanza 500 puntos', 'tree', 500),
  ('Campeón Ambiental', 'Completa 10 recojos', 'award', 300)
ON CONFLICT DO NOTHING;

-- Insert sample recycling points
INSERT INTO recycling_points (name, address, latitude, longitude, accepted_materials, phone, hours) VALUES
  ('EcoPunto Centro', 'Av. Principal 123, Lima', -12.046374, -77.042793, ARRAY['plastic', 'glass', 'paper', 'metal'], '+51 999 888 777', 'Lun-Sab 8am-6pm'),
  ('Reciclaje Miraflores', 'Calle Verde 456, Miraflores', -12.119294, -77.037532, ARRAY['plastic', 'paper', 'electronics'], '+51 888 777 666', 'Lun-Vie 9am-7pm'),
  ('Centro Verde San Isidro', 'Jr. Ecológico 789, San Isidro', -12.095320, -77.033960, ARRAY['glass', 'metal', 'electronics'], '+51 777 666 555', 'Mar-Dom 10am-6pm')
ON CONFLICT DO NOTHING;

-- Insert sample partner stores
INSERT INTO partner_stores (name, description, logo_url, category, address, discount_description, points_required) VALUES
  ('Café Verde', 'Cafetería orgánica comprometida con el medio ambiente', null, 'cafe', 'Av. Ecológica 100', '10% de descuento en tu consumo', 50),
  ('Restaurante Naturaleza', 'Cocina sostenible y saludable', null, 'restaurant', 'Calle Sostenible 200', '15% de descuento en menú del día', 100),
  ('EcoTienda', 'Productos ecológicos y sustentables', null, 'retail', 'Jr. Verde 300', '20% en productos seleccionados', 150)
ON CONFLICT DO NOTHING;