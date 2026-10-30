-- =============================================================================
-- منصة المسند (Al-Musnad v9.0) — السكريبت الشامل لتهيئة Supabase دفعة واحدة
-- انسخ هذا الملف بالكامل والصقه في: Supabase Dashboard -> SQL Editor -> Run
-- =============================================================================

-- 1. إنشاء حاوية التخزين السحابية للملفات (`worksheets`) مع دعم PDF و Word والصور
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'worksheets',
  'worksheets',
  false,
  20971520, -- 20 MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/webp'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. سياسات أمان التخزين السحابي (Storage RLS Policies)
DROP POLICY IF EXISTS "Authenticated users can read worksheet files" ON storage.objects;
CREATE POLICY "Authenticated users can read worksheet files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated publishers can upload worksheet files" ON storage.objects;
CREATE POLICY "Authenticated publishers can upload worksheet files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Owners and staff can delete worksheet files" ON storage.objects;
CREATE POLICY "Owners and staff can delete worksheet files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

-- 3. دالة ومشغل (Trigger) المزامنة التلقائية للمستخدمين الجدد وإنشاء `@username`
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  raw_role TEXT;
  assigned_role public."Role";
  is_insp_pending BOOLEAN;
  raw_username TEXT;
  clean_username TEXT;
BEGIN
  raw_role := UPPER(COALESCE(NEW.raw_user_meta_data ->> 'role', 'TEACHER'));
  is_insp_pending := COALESCE((NEW.raw_user_meta_data ->> 'inspector_pending')::boolean, false);

  IF raw_role = 'INSTITUTION' THEN
    assigned_role := 'INSTITUTION'::public."Role";
  ELSIF raw_role = 'STUDENT' THEN
    assigned_role := 'STUDENT'::public."Role";
  ELSIF raw_role = 'INSPECTOR' THEN
    assigned_role := 'INSPECTOR'::public."Role";
    is_insp_pending := true;
  ELSE
    assigned_role := 'TEACHER'::public."Role";
  END IF;

  raw_username := LOWER(COALESCE(NEW.raw_user_meta_data ->> 'username', ''));
  clean_username := regexp_replace(raw_username, '[^a-z0-9_.]', '', 'g');

  IF length(clean_username) < 3 THEN
    clean_username := regexp_replace(LOWER(split_part(NEW.email, '@', 1)), '[^a-z0-9_]', '', 'g');
    IF length(clean_username) < 3 THEN
      clean_username := 'user';
    END IF;
    clean_username := clean_username || '_' || substr(replace(NEW.id::text, '-', ''), 1, 4);
  END IF;

  INSERT INTO public.users (
    id,
    email,
    username,
    name,
    school,
    student_grade,
    avatar_url,
    is_verified,
    inspector_pending,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    clean_username,
    COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'school',
    NEW.raw_user_meta_data ->> 'student_grade',
    NEW.raw_user_meta_data ->> 'avatar_url',
    false,
    is_insp_pending,
    assigned_role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    username = COALESCE(public.users.username, EXCLUDED.username),
    school = COALESCE(EXCLUDED.school, public.users.school),
    student_grade = COALESCE(EXCLUDED.student_grade, public.users.student_grade),
    role = EXCLUDED.role,
    inspector_pending = EXCLUDED.inspector_pending;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. ترقية جدول المستخدمين لدعم نظام الحماية من تخمين كلمة المرور (6 محاولات) ونظام المتصل / وضع الشبح (v11.0)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS locked_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS lock_reason TEXT DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS presence_status VARCHAR(20) DEFAULT 'ONLINE';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT NOW();
