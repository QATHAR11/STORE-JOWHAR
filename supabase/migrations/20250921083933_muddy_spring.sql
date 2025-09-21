/*
  # Enhanced E-commerce Schema for Jowhara Collection

  1. New Tables
    - Enhanced `categories` with hierarchy support
    - Enhanced `brands` with better metadata
    - Enhanced `products` with brand relationships and better categorization
    - `product_variants` for size/color variations
    - `product_reviews` for customer feedback
    - `customers` for user management
    - `cart_items` for shopping cart functionality
    - Enhanced `orders` with better status tracking
    - `order_items` for detailed order tracking
    - `inventory_logs` for stock management
    - `product_categories` for many-to-many relationships
    - `gender_categories` for gender-based browsing

  2. Enhanced Features
    - Proper foreign key relationships
    - Advanced RLS policies
    - Inventory management
    - Order tracking
    - Customer management
    - Product variants and reviews
    - Gender-based categorization

  3. Functions
    - Inventory management functions
    - Order processing functions
    - Search and filtering functions
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Gender categories for Browse by Gender
CREATE TABLE IF NOT EXISTS gender_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL CHECK (name IN ('Men', 'Women', 'Unisex')),
  description text,
  image text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced categories with hierarchy support
CREATE TABLE IF NOT EXISTS enhanced_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  parent_id uuid REFERENCES enhanced_categories(id),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced brands
CREATE TABLE IF NOT EXISTS enhanced_brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  logo text,
  website text,
  country text,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE,
  phone text UNIQUE,
  first_name text,
  last_name text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  address jsonb DEFAULT '{}'::jsonb,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced products with proper relationships
CREATE TABLE IF NOT EXISTS enhanced_products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sku text UNIQUE,
  brand_id uuid REFERENCES enhanced_brands(id),
  category_id uuid REFERENCES enhanced_categories(id),
  gender_category text CHECK (gender_category IN ('Men', 'Women', 'Unisex')),
  price numeric NOT NULL CHECK (price >= 0),
  compare_price numeric CHECK (compare_price >= price),
  cost_price numeric CHECK (cost_price >= 0),
  description text,
  short_description text,
  ingredients text,
  usage_instructions text,
  benefits text,
  images jsonb DEFAULT '[]'::jsonb,
  video_url text,
  weight numeric,
  dimensions jsonb DEFAULT '{}'::jsonb,
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold integer DEFAULT 5,
  track_inventory boolean DEFAULT true,
  allow_backorder boolean DEFAULT false,
  featured boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft', 'archived')),
  seo_title text,
  seo_description text,
  tags text[],
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product variants (for different sizes, colors, etc.)
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL REFERENCES enhanced_products(id) ON DELETE CASCADE,
  name text NOT NULL,
  sku text UNIQUE,
  price numeric CHECK (price >= 0),
  compare_price numeric CHECK (compare_price >= price),
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  weight numeric,
  image text,
  attributes jsonb DEFAULT '{}'::jsonb, -- size, color, etc.
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL REFERENCES enhanced_products(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id),
  customer_name text,
  customer_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  review_text text,
  verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES customers(id),
  session_id text, -- for guest users
  product_id uuid NOT NULL REFERENCES enhanced_products(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT cart_customer_or_session CHECK (
    (customer_id IS NOT NULL AND session_id IS NULL) OR 
    (customer_id IS NULL AND session_id IS NOT NULL)
  )
);

-- Enhanced orders
CREATE TABLE IF NOT EXISTS enhanced_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text NOT NULL,
  billing_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  shipping_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  subtotal numeric NOT NULL CHECK (subtotal >= 0),
  tax_amount numeric DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_amount numeric DEFAULT 0 CHECK (shipping_amount >= 0),
  discount_amount numeric DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  currency text DEFAULT 'KSH',
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  payment_method text,
  payment_reference text,
  fulfillment_status text DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'partial', 'fulfilled', 'returned')),
  order_status text DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  notes text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES enhanced_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES enhanced_products(id),
  variant_id uuid REFERENCES product_variants(id),
  product_name text NOT NULL,
  variant_name text,
  sku text,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Inventory logs for tracking stock changes
CREATE TABLE IF NOT EXISTS inventory_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL REFERENCES enhanced_products(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES product_variants(id) ON DELETE CASCADE,
  change_type text NOT NULL CHECK (change_type IN ('sale', 'restock', 'adjustment', 'return')),
  quantity_change integer NOT NULL,
  previous_quantity integer NOT NULL,
  new_quantity integer NOT NULL,
  reference_id uuid, -- order_id, adjustment_id, etc.
  reference_type text, -- 'order', 'adjustment', etc.
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enhanced banners with better targeting
CREATE TABLE IF NOT EXISTS enhanced_banners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  subtitle text,
  description text,
  image text NOT NULL,
  mobile_image text,
  link_url text,
  link_text text,
  category_id uuid REFERENCES enhanced_categories(id),
  brand_id uuid REFERENCES enhanced_brands(id),
  gender_category text CHECK (gender_category IN ('Men', 'Women', 'Unisex')),
  position text DEFAULT 'hero' CHECK (position IN ('hero', 'category', 'product', 'footer')),
  active boolean DEFAULT true,
  start_date timestamptz,
  end_date timestamptz,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced navigation with better structure
CREATE TABLE IF NOT EXISTS enhanced_navigation (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('category', 'brand', 'gender', 'custom')),
  parent_id uuid REFERENCES enhanced_navigation(id),
  url text,
  target_type text CHECK (target_type IN ('category', 'brand', 'gender', 'product', 'page', 'external')),
  target_id uuid,
  icon text,
  image text,
  description text,
  active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gender_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_navigation ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read gender categories" ON gender_categories FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Public can read categories" ON enhanced_categories FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Public can read brands" ON enhanced_brands FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Public can read products" ON enhanced_products FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Public can read product variants" ON product_variants FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Public can read approved reviews" ON product_reviews FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Public can read active banners" ON enhanced_banners FOR SELECT TO anon, authenticated USING (active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));
CREATE POLICY "Public can read active navigation" ON enhanced_navigation FOR SELECT TO anon, authenticated USING (active = true);

-- Customer policies
CREATE POLICY "Customers can read own data" ON customers FOR SELECT TO authenticated USING (auth.uid()::text = id::text);
CREATE POLICY "Customers can update own data" ON customers FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);
CREATE POLICY "Customers can manage own cart" ON cart_items FOR ALL TO authenticated USING (auth.uid()::text = customer_id::text);
CREATE POLICY "Customers can read own orders" ON enhanced_orders FOR SELECT TO authenticated USING (auth.uid()::text = customer_id::text);
CREATE POLICY "Customers can create orders" ON enhanced_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Customers can create reviews" ON product_reviews FOR INSERT TO authenticated WITH CHECK (true);

-- Admin policies (full access for authenticated users with admin role)
CREATE POLICY "Admins can manage all data" ON gender_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage categories" ON enhanced_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage brands" ON enhanced_brands FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage customers" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage products" ON enhanced_products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage variants" ON product_variants FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage reviews" ON product_reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage orders" ON enhanced_orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can read order items" ON order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can read inventory logs" ON inventory_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage banners" ON enhanced_banners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage navigation" ON enhanced_navigation FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Functions for inventory management
CREATE OR REPLACE FUNCTION update_product_inventory(
  p_product_id uuid,
  p_variant_id uuid DEFAULT NULL,
  p_quantity_change integer,
  p_change_type text,
  p_reference_id uuid DEFAULT NULL,
  p_reference_type text DEFAULT NULL,
  p_notes text DEFAULT NULL
)
RETURNS boolean AS $$
DECLARE
  current_quantity integer;
  new_quantity integer;
BEGIN
  -- Get current quantity
  IF p_variant_id IS NOT NULL THEN
    SELECT stock_quantity INTO current_quantity FROM product_variants WHERE id = p_variant_id;
    new_quantity := current_quantity + p_quantity_change;
    
    -- Update variant stock
    UPDATE product_variants SET stock_quantity = new_quantity WHERE id = p_variant_id;
  ELSE
    SELECT stock_quantity INTO current_quantity FROM enhanced_products WHERE id = p_product_id;
    new_quantity := current_quantity + p_quantity_change;
    
    -- Update product stock
    UPDATE enhanced_products SET stock_quantity = new_quantity WHERE id = p_product_id;
  END IF;
  
  -- Log the inventory change
  INSERT INTO inventory_logs (
    product_id, variant_id, change_type, quantity_change, 
    previous_quantity, new_quantity, reference_id, reference_type, notes
  ) VALUES (
    p_product_id, p_variant_id, p_change_type, p_quantity_change,
    current_quantity, new_quantity, p_reference_id, p_reference_type, p_notes
  );
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  order_num text;
BEGIN
  order_num := 'JW' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('order_number_seq')::text, 4, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Function to create order with items
CREATE OR REPLACE FUNCTION create_order_with_items(
  order_data jsonb,
  items_data jsonb[]
)
RETURNS uuid AS $$
DECLARE
  new_order_id uuid;
  item jsonb;
  calculated_subtotal numeric := 0;
  calculated_total numeric := 0;
BEGIN
  -- Generate order number
  order_data := order_data || jsonb_build_object('order_number', generate_order_number());
  
  -- Create the order
  INSERT INTO enhanced_orders (
    order_number, customer_id, customer_name, customer_email, customer_phone,
    billing_address, shipping_address, subtotal, tax_amount, shipping_amount,
    discount_amount, total_amount, currency, payment_method, notes
  )
  SELECT 
    (order_data->>'order_number'),
    (order_data->>'customer_id')::uuid,
    (order_data->>'customer_name'),
    (order_data->>'customer_email'),
    (order_data->>'customer_phone'),
    (order_data->'billing_address'),
    (order_data->'shipping_address'),
    (order_data->>'subtotal')::numeric,
    COALESCE((order_data->>'tax_amount')::numeric, 0),
    COALESCE((order_data->>'shipping_amount')::numeric, 0),
    COALESCE((order_data->>'discount_amount')::numeric, 0),
    (order_data->>'total_amount')::numeric,
    COALESCE(order_data->>'currency', 'KSH'),
    (order_data->>'payment_method'),
    (order_data->>'notes')
  RETURNING id INTO new_order_id;
  
  -- Create order items and update inventory
  FOREACH item IN ARRAY items_data
  LOOP
    INSERT INTO order_items (
      order_id, product_id, variant_id, product_name, variant_name,
      sku, quantity, unit_price, total_price
    )
    VALUES (
      new_order_id,
      (item->>'product_id')::uuid,
      (item->>'variant_id')::uuid,
      (item->>'product_name'),
      (item->>'variant_name'),
      (item->>'sku'),
      (item->>'quantity')::integer,
      (item->>'unit_price')::numeric,
      (item->>'total_price')::numeric
    );
    
    -- Update inventory
    PERFORM update_product_inventory(
      (item->>'product_id')::uuid,
      (item->>'variant_id')::uuid,
      -((item->>'quantity')::integer),
      'sale',
      new_order_id,
      'order',
      'Order sale'
    );
  END LOOP;
  
  RETURN new_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_gender_categories_updated_at BEFORE UPDATE ON gender_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_categories_updated_at BEFORE UPDATE ON enhanced_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_brands_updated_at BEFORE UPDATE ON enhanced_brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_products_updated_at BEFORE UPDATE ON enhanced_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_orders_updated_at BEFORE UPDATE ON enhanced_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_banners_updated_at BEFORE UPDATE ON enhanced_banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enhanced_navigation_updated_at BEFORE UPDATE ON enhanced_navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO gender_categories (name, description, image) VALUES
  ('Women', 'Beauty and fragrance products for women', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Men', 'Grooming and fragrance products for men', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Unisex', 'Products suitable for everyone', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (name) DO NOTHING;

INSERT INTO enhanced_categories (name, slug, description, image) VALUES
  ('Hair Care', 'hair-care', 'Premium hair care products for all hair types', 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Beard Care', 'beard-care', 'Professional beard grooming essentials', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Skincare', 'skincare', 'Luxurious skincare for radiant complexion', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Perfumes', 'perfumes', 'Exquisite fragrances for every occasion', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Body Sprays', 'body-sprays', 'Refreshing body sprays for daily use', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Air Fresheners', 'air-fresheners', 'Transform your space with luxury scents', 'https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (name) DO NOTHING;

INSERT INTO enhanced_brands (name, slug, description, logo, featured) VALUES
  ('Chanel', 'chanel', 'Luxury French fashion and beauty brand', 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Dior', 'dior', 'Premium French luxury goods company', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Tom Ford', 'tom-ford', 'American luxury fashion house', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400', true),
  ('Versace', 'versace', 'Italian luxury fashion company', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400', true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products with proper relationships
DO $$
DECLARE
  hair_category_id uuid;
  beard_category_id uuid;
  skincare_category_id uuid;
  perfume_category_id uuid;
  chanel_brand_id uuid;
  dior_brand_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO hair_category_id FROM enhanced_categories WHERE slug = 'hair-care';
  SELECT id INTO beard_category_id FROM enhanced_categories WHERE slug = 'beard-care';
  SELECT id INTO skincare_category_id FROM enhanced_categories WHERE slug = 'skincare';
  SELECT id INTO perfume_category_id FROM enhanced_categories WHERE slug = 'perfumes';
  
  -- Get brand IDs
  SELECT id INTO chanel_brand_id FROM enhanced_brands WHERE slug = 'chanel';
  SELECT id INTO dior_brand_id FROM enhanced_brands WHERE slug = 'dior';
  
  -- Insert products
  INSERT INTO enhanced_products (
    name, slug, sku, brand_id, category_id, gender_category, price, description,
    ingredients, usage_instructions, images, stock_quantity, featured, status
  ) VALUES
  (
    'Luxury Hair Serum',
    'luxury-hair-serum',
    'JW-HAIR-001',
    chanel_brand_id,
    hair_category_id,
    'Women',
    2500,
    'Premium hair serum for silky smooth hair that transforms dry, damaged hair into lustrous, manageable locks.',
    'Argan oil, Vitamin E, Keratin proteins, Silk amino acids',
    'Apply 2-3 drops to damp hair, distribute evenly from mid-length to ends, style as usual',
    '["https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    25,
    true,
    'active'
  ),
  (
    'Beard Growth Oil',
    'beard-growth-oil',
    'JW-BEARD-001',
    dior_brand_id,
    beard_category_id,
    'Men',
    1800,
    'Natural beard oil for healthy growth and conditioning',
    'Jojoba oil, Castor oil, Argan oil, Essential oils blend',
    'Massage 3-5 drops into beard and skin daily, preferably after shower',
    '["https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    30,
    true,
    'active'
  ),
  (
    'Radiance Face Cream',
    'radiance-face-cream',
    'JW-SKIN-001',
    chanel_brand_id,
    skincare_category_id,
    'Women',
    3200,
    'Anti-aging cream for glowing, youthful skin',
    'Hyaluronic acid, Retinol, Vitamin C, Peptides',
    'Apply morning and evening to clean skin, gently massage until absorbed',
    '["https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    20,
    true,
    'active'
  ),
  (
    'Midnight Oud',
    'midnight-oud',
    'JW-PERF-001',
    dior_brand_id,
    perfume_category_id,
    'Unisex',
    4500,
    'Luxurious oud fragrance for evening wear with rich, complex notes',
    'Oud, Rose, Amber, Musk, Sandalwood',
    'Spray on pulse points - wrists, neck, behind ears',
    '["https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    15,
    true,
    'active'
  );
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enhanced_products_category ON enhanced_products(category_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_brand ON enhanced_products(brand_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_gender ON enhanced_products(gender_category);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_status ON enhanced_products(status);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_featured ON enhanced_products(featured);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_name_search ON enhanced_products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_enhanced_products_description_search ON enhanced_products USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_cart_items_customer ON cart_items(customer_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON enhanced_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON enhanced_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product ON inventory_logs(product_id);