-- Migración para soporte bimonetario

-- 1. Añadir columna de precio en ARS a los cursos
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price_ars DECIMAL(10,2);
