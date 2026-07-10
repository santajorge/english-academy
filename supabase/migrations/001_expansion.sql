-- Migración para añadir soporte de email y caducidad de cursos

-- 1. Añadir columna email a profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Añadir columna duration_months a courses
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS duration_months INTEGER;

-- 3. Añadir columna expires_at a enrollments y actualizar constraint del status
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_status_check;
ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_status_check CHECK (status IN ('active', 'completed', 'cancelled', 'expired'));

-- 4. Reemplazar la función del trigger para que ahora capture el email
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
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email; -- Por si el usuario ya existía
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Llenar los emails de los usuarios existentes (opcional pero recomendado)
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- 6. Actualizar política de lectura de lecciones para bloquear acceso expirado
DROP POLICY IF EXISTS "Enrolled students can view lessons" ON public.lessons;
CREATE POLICY "Enrolled students can view lessons" ON public.lessons FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.enrollments
        WHERE enrollments.course_id = lessons.course_id
        AND enrollments.student_id = auth.uid()
        AND enrollments.status = 'active'
        AND (enrollments.expires_at IS NULL OR enrollments.expires_at > now())
    )
);
