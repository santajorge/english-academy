-- Schema for thebee'sniz English Academy

-- Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Courses Table
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2')),
    description TEXT,
    price DECIMAL(10,2) NOT NULL, -- Asume USD
    price_ars DECIMAL(10,2), -- Precio en Pesos Argentinos
    duration_months INTEGER, -- NULL o 0 significa vitalicio
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Lessons Table
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    vimeo_id TEXT, -- ID of the video in Vimeo Pro
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enrollments Table (Which student bought which course)
CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'expired')),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, course_id)
);

-- 5. Progress Table (Tracking lesson completion)
CREATE TABLE public.progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, lesson_id)
);

-- Row Level Security (RLS) setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: Users can read and update their own profile. Admins can read all.
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses: Anyone can view active courses.
CREATE POLICY "Anyone can view active courses" ON public.courses FOR SELECT USING (is_active = true);

-- Lessons: Only enrolled students can view lessons for their course, provided enrollment hasn't expired.
CREATE POLICY "Enrolled students can view lessons" ON public.lessons FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.enrollments
        WHERE enrollments.course_id = lessons.course_id
        AND enrollments.student_id = auth.uid()
        AND enrollments.status = 'active'
        AND (enrollments.expires_at IS NULL OR enrollments.expires_at > now())
    )
);

-- Enrollments: Students can view their own enrollments.
CREATE POLICY "Students can view own enrollments" ON public.enrollments FOR SELECT USING (student_id = auth.uid());

-- Progress: Students can view and update their own progress.
CREATE POLICY "Students can view own progress" ON public.progress FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can update own progress" ON public.progress FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can update own progress_update" ON public.progress FOR UPDATE USING (student_id = auth.uid());

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name', 
    new.email,
    'student'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
