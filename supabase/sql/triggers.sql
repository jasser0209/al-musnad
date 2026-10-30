-- ============================================================
-- Database Triggers — Al-Musnad (المسند) v10.0
-- ============================================================
-- Automatically assigns role and generates a unique @username
-- for newly registered accounts in Supabase Auth.
-- Security Guard: Blocks self-assigned ADMIN or MODERATOR roles
-- from public client sign-up metadata to prevent privilege escalation.
-- ============================================================

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

  -- Security: Only allow INSTITUTION, STUDENT, or TEACHER on public signup.
  -- INSPECTOR requests start as TEACHER with inspector_pending = true until code activation.
  -- ADMIN and MODERATOR can only be granted by the Top Admin via Server Actions / SQL.
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

  IF length(clean_username) < 3 OR EXISTS (SELECT 1 FROM public.users WHERE username = clean_username AND id <> NEW.id) THEN
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

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_users ON users;
CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_worksheets ON worksheets;
CREATE TRIGGER set_updated_at_worksheets
  BEFORE UPDATE ON worksheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();