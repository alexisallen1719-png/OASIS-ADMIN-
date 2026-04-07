-- Oasis Platform Initial Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Create Enums
CREATE TYPE intake_status_type AS ENUM ('pending', 'completed');
CREATE TYPE account_status_type AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE appointment_status_type AS ENUM ('scheduled', 'arrived', 'in_session', 'completed', 'canceled', 'no_show');
CREATE TYPE room_status_type AS ENUM ('ready', 'occupied', 'cleaning');

-- 2. Clients Table
CREATE TABLE public.clients (
    client_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    birthday DATE,
    intake_status intake_status_type DEFAULT 'pending',
    notes TEXT,
    loyalty_status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Staff Table
CREATE TABLE public.staff (
    staff_id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Maps to auth.users in Supabase typically
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    occupation TEXT,
    zodiac_sign TEXT,
    favorite_food TEXT,
    favorite_service TEXT,
    favorite_music TEXT,
    profile_photo TEXT,
    bio TEXT,
    clocked_in BOOLEAN DEFAULT false,
    availability_status BOOLEAN DEFAULT true,
    commission_rate NUMERIC(5,2) DEFAULT 0.00,
    account_status account_status_type DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Services Table
CREATE TABLE public.services (
    service_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- minutes
    price NUMERIC(10,2) NOT NULL,
    room_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Rooms Table
CREATE TABLE public.rooms (
    room_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_name TEXT NOT NULL,
    room_status room_status_type DEFAULT 'ready',
    last_cleaned TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Appointments Table
CREATE TABLE public.appointments (
    appointment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(client_id) ON DELETE CASCADE,
    staff_id UUID REFERENCES public.staff(staff_id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(service_id) ON DELETE SET NULL,
    room_id UUID REFERENCES public.rooms(room_id) ON DELETE SET NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status appointment_status_type DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Retail Products Table
CREATE TABLE public.retail_products (
    product_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_name TEXT NOT NULL,
    barcode TEXT UNIQUE,
    price NUMERIC(10,2) NOT NULL,
    inventory_count INTEGER DEFAULT 0,
    commission_percentage NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Sales Transactions Table
CREATE TABLE public.sales_transactions (
    transaction_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    staff_id UUID REFERENCES public.staff(staff_id) ON DELETE SET NULL,
    product_id UUID REFERENCES public.retail_products(product_id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(client_id) ON DELETE SET NULL,
    commission_amount NUMERIC(10,2) DEFAULT 0.00,
    tip_amount NUMERIC(10,2) DEFAULT 0.00,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retail_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_transactions ENABLE ROW LEVEL SECURITY;

-- Note: Basic policies allowing authenticated users read/write for now, to be refined based on roles
CREATE POLICY "Enable read access for all authenticated users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all authenticated users" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.appointments FOR INSERT WITH CHECK (true);
