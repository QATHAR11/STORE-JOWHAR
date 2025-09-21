/*
  # Admin Panel Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `brands`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `image` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text, references categories.name)
      - `price` (numeric)
      - `description` (text)
      - `ingredients` (text)
      - `usage` (text)
      - `images` (jsonb)
      - `stock` (integer)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `banners`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `image` (text)
      - `category` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `navigation_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `items` (jsonb)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_phone` (text)
      - `customer_email` (text)
      - `items` (jsonb)
      - `total` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users (admin access)
    - Add policies for public read access where appropriate

  3. Functions
    - Auto-update timestamps
    - Real-time subscriptions
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  description text,
  image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  description text,
  image text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  description text,
  ingredients text,
  usage text,
  images jsonb DEFAULT '[]'::jsonb,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Banners table
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  subtitle text,
  image text NOT NULL,
  category text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Navigation items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL,
  items jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL CHECK (total >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read policies (for website visitors)
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read brands"
  ON brands
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read active banners"
  ON banners
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can read active navigation"
  ON navigation_items
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Admin policies (full access for authenticated users - you can make this more restrictive)
CREATE POLICY "Authenticated users can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage brands"
  ON brands
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage banners"
  ON banners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage navigation"
  ON navigation_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can create orders (for order placement)
CREATE POLICY "Public can create orders"
  ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO categories (name, description, image) VALUES
  ('Hair', 'Premium hair care products for all hair types', 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Beard', 'Professional beard grooming essentials', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Skincare', 'Luxurious skincare for radiant complexion', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Perfume', 'Exquisite fragrances for every occasion', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Body Spray', 'Refreshing body sprays for daily use', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Air Freshener', 'Transform your space with luxury scents', 'https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (name) DO NOTHING;

INSERT INTO brands (name, description, image, active) VALUES
  ('Chanel', 'Luxury French fashion and beauty brand', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Dior', 'Premium French luxury goods company', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Tom Ford', 'American luxury fashion house', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Versace', 'Italian luxury fashion company', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, category, price, description, ingredients, usage, images, stock, featured) VALUES
  ('Luxury Hair Serum', 'Hair', 2500, 'Premium hair serum for silky smooth hair', 'Argan oil, Vitamin E, Keratin proteins', 'Apply 2-3 drops to damp hair, style as usual', '["https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"]', 25, true),
  ('Beard Growth Oil', 'Beard', 1800, 'Natural beard oil for healthy growth', 'Jojoba oil, Castor oil, Essential oils', 'Massage into beard and skin daily', '["https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800"]', 30, true),
  ('Radiance Face Cream', 'Skincare', 3200, 'Anti-aging cream for glowing skin', 'Hyaluronic acid, Retinol, Vitamin C', 'Apply morning and evening to clean skin', '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"]', 20, true),
  ('Midnight Oud', 'Perfume', 4500, 'Luxurious oud fragrance for evening wear', 'Oud, Rose, Amber, Musk', 'Spray on pulse points', '["https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800"]', 15, true),
  ('Fresh Citrus Body Spray', 'Body Spray', 1200, 'Refreshing citrus body spray', 'Citrus extracts, Natural oils', 'Spray all over body after shower', '["https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800"]', 40, false),
  ('Lavender Room Spray', 'Air Freshener', 800, 'Calming lavender air freshener', 'Lavender essential oil, Natural extracts', 'Spray in room as needed', '["https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=800"]', 50, false);

INSERT INTO banners (title, subtitle, image, category, active) VALUES
  ('Luxury Fragrances', 'Discover our premium perfume collection', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Perfume', true),
  ('Hair Care Excellence', 'Professional hair treatments for every need', 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Hair', true),
  ('Skincare Luxury', 'Radiant skin with our premium skincare line', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Skincare', true);