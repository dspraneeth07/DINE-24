
-- Create menu table with all the provided data
CREATE TABLE public.menu_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  offer_price INTEGER,
  orders_placed INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  is_veg BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert all the menu data
INSERT INTO public.menu_items (id, name, quantity, category, price, offer_price, orders_placed, rating, is_veg) VALUES
(1, 'Idli with Chutney', '2 Pieces', 'Breakfast', 60, 50, 320, 4.5, true),
(2, 'Masala Dosa', '1 Piece', 'Breakfast', 90, 75, 410, 4.7, true),
(3, 'Poori Bhaji', '4 Pooris', 'Breakfast', 80, 65, 275, 4.3, true),
(4, 'Aloo Paratha', '1 Paratha', 'Breakfast', 70, 60, 230, 4.4, true),
(5, 'Upma', '1 Bowl', 'Breakfast', 55, 45, 210, 4.2, true),
(6, 'Pongal', '1 Plate', 'Breakfast', 65, 55, 190, 4.1, true),
(7, 'Chole Bhature', '2 Bhature', 'Breakfast', 100, 85, 310, 4.6, true),
(8, 'Bread Omelette', '2 Slices', 'Breakfast', 50, 40, 180, 4.0, false),
(9, 'Dhokla', '6 Pieces', 'Breakfast', 60, 50, 200, 4.3, true),
(10, 'Rava Dosa', '1 Piece', 'Breakfast', 75, 65, 170, 4.1, true),
(11, 'Veg Thali', 'Full Plate', 'Main Course', 180, 150, 220, 4.5, true),
(12, 'Chicken Biryani', '1 Plate', 'Main Course', 250, 220, 460, 4.8, false),
(13, 'Paneer Butter Masala', '1 Bowl', 'Main Course', 190, 160, 240, 4.6, true),
(14, 'Rajma Chawal', 'Full Plate', 'Main Course', 120, 100, 200, 4.3, true),
(15, 'Butter Naan', '2 Pieces', 'Main Course', 50, 40, 300, 4.7, true),
(16, 'Fish Curry & Rice', 'Full Plate', 'Main Course', 230, 200, 170, 4.4, false),
(17, 'Tandoori Chicken', 'Half Plate', 'Main Course', 280, 250, 190, 4.6, false),
(18, 'Mutton Rogan Josh', '1 Bowl', 'Main Course', 300, 270, 160, 4.5, false),
(19, 'Mixed Veg Curry', '1 Bowl', 'Main Course', 120, 100, 180, 4.2, true),
(20, 'Kadai Paneer', '1 Bowl', 'Main Course', 180, 150, 200, 4.5, true),
(21, 'Gulab Jamun', '2 Pieces', 'Dessert', 50, 40, 240, 4.7, true),
(22, 'Rasgulla', '2 Pieces', 'Dessert', 50, 40, 180, 4.5, true),
(23, 'Rasmalai', '1 Bowl', 'Dessert', 80, 70, 160, 4.6, true),
(24, 'Jalebi', '100 grams', 'Dessert', 60, 50, 210, 4.3, true),
(25, 'Kaju Katli', '5 Pieces', 'Dessert', 120, 100, 170, 4.4, true),
(26, 'Gajar Ka Halwa', '1 Bowl', 'Dessert', 90, 75, 150, 4.6, true),
(27, 'Mysore Pak', '3 Pieces', 'Dessert', 70, 60, 130, 4.2, true),
(28, 'Kulfi', '1 Stick', 'Dessert', 40, 30, 190, 4.5, true),
(29, 'Ice Cream Sundae', '1 Cup', 'Dessert', 80, 65, 200, 4.6, true),
(30, 'Chocolate Brownie', '1 Piece', 'Dessert', 70, 60, 175, 4.4, true),
(31, 'Aloo Paratha', '2 pieces', 'Breakfast', 90, 75, 210, 4.6, true),
(32, 'Misal Pav', '1 plate', 'Breakfast', 120, 100, 190, 4.4, true),
(33, 'Moong Dal Khichdi', '1 bowl', 'Main Course', 150, 130, 180, 4.3, true),
(34, 'Chicken Korma', '1 bowl', 'Main Course', 300, 270, 145, 4.5, false),
(35, 'Mango Lassi', '300ml glass', 'Drinks', 80, 60, 170, 4.7, true),
(36, 'Rasmalai', '2 pieces', 'Dessert', 100, 85, 150, 4.8, true),
(37, 'Dhokla', '1 plate', 'Snacks', 90, 70, 160, 4.4, true),
(38, 'Jalebi', '100g', 'Dessert', 70, 50, 220, 4.6, true),
(39, 'Filter Coffee', '150ml', 'Drinks', 50, 35, 310, 4.9, true),
(40, 'Pav Bhaji', '1 plate', 'Snacks', 130, 110, 210, 4.5, true),
(41, 'Veg Thukpa', '1 bowl', 'Specials', 160, 140, 105, 4.2, true),
(42, 'Chicken Shawarma', '1 roll', 'Snacks', 120, 100, 175, 4.6, false),
(43, 'Pesarattu', '2 pieces', 'Breakfast', 90, 75, 130, 4.3, true),
(44, 'Ragi Dosa', '2 pieces', 'Breakfast', 100, 80, 115, 4.4, true),
(45, 'Chole Bhature', '1 plate', 'Main Course', 160, 140, 195, 4.5, true),
(46, 'Paneer Butter Masala', '1 bowl', 'Main Course', 220, 190, 205, 4.7, true),
(47, 'Pineapple Juice', '300ml', 'Drinks', 90, 70, 165, 4.6, true),
(48, 'Samosa', '2 pieces', 'Snacks', 40, 30, 280, 4.2, true),
(49, 'Mutton Biryani', '1 Full Plate', 'Main Course', 320, 280, 200, 4.8, false),
(50, 'Kaju Katli', '100g', 'Dessert', 150, 120, 130, 4.7, true),
(51, 'Vegetable Pizza', 'Medium', 'Pizza', 250, 220, 180, 4.4, true),
(52, 'Masala Idli', '1 plate', 'Breakfast', 80, 65, 140, 4.2, true),
(53, 'Rose Milk', '300ml', 'Drinks', 60, 45, 160, 4.6, true),
(54, 'Medu Vada', '2 pieces', 'Snacks', 70, 55, 190, 4.3, true),
(55, 'Chicken Fried Rice', '1 plate', 'Main Course', 180, 160, 240, 4.5, false),
(56, 'Sweet Pongal', '1 bowl', 'Dessert', 90, 70, 145, 4.6, true),
(57, 'Chocolate Brownie', '1 piece', 'Dessert', 120, 100, 130, 4.7, true),
(58, 'Corn Cheese Balls', '6 pieces', 'Snacks', 140, 120, 110, 4.3, true),
(59, 'Spring Roll', '4 pieces', 'Snacks', 130, 110, 125, 4.2, true),
(60, 'Malai Kofta', '1 bowl', 'Main Course', 210, 180, 150, 4.6, true),
(61, 'Veg Manchurian', '1 plate', 'Snacks', 150, 130, 140, 4.4, true),
(62, 'Lemon Soda', '300ml', 'Drinks', 40, 30, 175, 4.5, true),
(63, 'Sabudana Khichdi', '1 plate', 'Specials', 100, 85, 110, 4.3, true),
(64, 'Mysore Pak', '100g', 'Dessert', 90, 70, 150, 4.6, true),
(65, 'Butter Naan', '2 pieces', 'Main Course', 60, 50, 230, 4.7, true),
(66, 'Aam Panna', '300ml', 'Drinks', 70, 55, 160, 4.4, true),
(67, 'Rajma Chawal', '1 plate', 'Main Course', 150, 130, 140, 4.3, true),
(68, 'Chicken Lollipop', '6 pieces', 'Snacks', 200, 170, 190, 4.6, false),
(69, 'Cheese Burst Pizza', 'Medium', 'Pizza', 320, 290, 175, 4.7, true),
(70, 'Shahi Tukda', '1 piece', 'Dessert', 100, 80, 120, 4.5, true),
(71, 'Ghee Roast Dosa', '1 piece', 'Breakfast', 110, 90, 165, 4.4, true),
(72, 'Tomato Soup', '1 bowl', 'Specials', 90, 75, 130, 4.3, true),
(73, 'Lassi', '300ml', 'Drinks', 60, 45, 220, 4.7, true),
(74, 'Kanda Poha', '1 plate', 'Breakfast', 70, 55, 135, 4.3, true),
(75, 'Methi Thepla', '3 pieces', 'Breakfast', 100, 85, 115, 4.4, true),
(76, 'Gobi Paratha', '2 pieces', 'Breakfast', 110, 90, 130, 4.2, true),
(77, 'Chicken Curry', '1 bowl', 'Main Course', 270, 240, 160, 4.5, false),
(78, 'Veg Pulao', '1 plate', 'Main Course', 150, 130, 155, 4.3, true),
(79, 'Kathi Roll', '1 roll', 'Snacks', 120, 100, 140, 4.4, true),
(80, 'Rabri', '1 bowl', 'Dessert', 110, 90, 125, 4.6, true),
(81, 'Chilli Paneer', '1 plate', 'Snacks', 160, 140, 165, 4.5, true),
(82, 'Tandoori Chicken', 'Half', 'Specials', 300, 270, 180, 4.7, false),
(83, 'Fruit Salad', '1 bowl', 'Dessert', 120, 100, 150, 4.4, true),
(84, 'Veg Cheese Sandwich', '1 plate', 'Snacks', 90, 75, 140, 4.2, true),
(85, 'Kulfi', '1 stick', 'Dessert', 60, 45, 190, 4.6, true),
(86, 'Butter Chicken', '1 bowl', 'Main Course', 290, 260, 200, 4.8, false),
(87, 'Bhindi Fry', '1 bowl', 'Main Course', 130, 110, 120, 4.2, true),
(88, 'Sambar Idli', '2 pieces', 'Breakfast', 90, 75, 135, 4.3, true),
(89, 'Neer Dosa', '3 pieces', 'Breakfast', 100, 80, 115, 4.4, true),
(90, 'Egg Curry', '1 bowl', 'Main Course', 180, 160, 145, 4.5, false),
(91, 'Chaas (Buttermilk)', '250ml', 'Drinks', 30, 20, 160, 4.6, true),
(92, 'Sev Puri', '1 plate', 'Snacks', 90, 70, 185, 4.5, true),
(93, 'Veg Fried Rice', '1 plate', 'Main Course', 150, 130, 175, 4.4, true),
(94, 'Chicken Biryani (Boneless)', '1 plate', 'Main Course', 300, 270, 215, 4.7, false),
(95, 'Coconut Barfi', '100g', 'Dessert', 80, 60, 120, 4.5, true),
(96, 'Mango Kulfi', '1 stick', 'Dessert', 70, 50, 140, 4.6, true),
(97, 'Egg Bhurji', '1 plate', 'Snacks', 110, 90, 130, 4.3, false),
(98, 'Bhel Puri', '1 plate', 'Snacks', 80, 60, 160, 4.4, true),
(99, 'Chicken Nuggets', '6 pieces', 'Snacks', 160, 140, 150, 4.4, false),
(100, 'Vegetable Lasagna', '1 plate', 'Specials', 250, 220, 125, 4.5, true);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  num_people INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  arrival_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  table_number TEXT,
  table_capacity INTEGER,
  order_type TEXT CHECK (order_type IN ('now', 'later')),
  total_amount DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reservation_items table for ordered items
CREATE TABLE public.reservation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES public.reservations(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES public.menu_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables configuration for the restaurant
CREATE TABLE public.restaurant_tables (
  id SERIAL PRIMARY KEY,
  table_number TEXT UNIQUE NOT NULL,
  seating_capacity INTEGER NOT NULL,
  section TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert restaurant tables data
INSERT INTO public.restaurant_tables (table_number, seating_capacity, section) VALUES
('A1', 4, 'Section A'),
('A2', 4, 'Section A'),
('A3', 4, 'Section A'),
('A4', 4, 'Section A'),
('A5', 4, 'Section A'),
('B1', 6, 'Section B'),
('B2', 6, 'Section B'),
('B3', 6, 'Section B'),
('B4', 6, 'Section B'),
('B5', 6, 'Section B'),
('C1', 8, 'Section C'),
('C2', 8, 'Section C'),
('C3', 8, 'Section C'),
('C4', 8, 'Section C'),
('C5', 8, 'Section C'),
('PC1', 10, 'Private Cabin'),
('PC2', 10, 'Private Cabin'),
('PC3', 10, 'Private Cabin'),
('PC4', 10, 'Private Cabin'),
('PC5', 10, 'Private Cabin');
