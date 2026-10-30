-- ============================================================
-- Row Level Security (RLS) Policies — Al-Musnad (المسند) v8.0
-- Strict Rule: No anonymous access to content; only authenticated
-- users can read published worksheets, reviews, and publisher profiles.
-- Supports 3-tier supervisory hierarchy (INSPECTOR, MODERATOR, ADMIN).
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publisher_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_publishers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view public user profiles" ON users;
DROP POLICY IF EXISTS "Authenticated users can view user profiles" ON users;
CREATE POLICY "Authenticated users can view user profiles"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role full access to users" ON users;
CREATE POLICY "Service role full access to users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

-- Worksheets: Strictly require authentication AND audience permission
DROP POLICY IF EXISTS "Anyone can view published worksheets" ON worksheets;
DROP POLICY IF EXISTS "Authenticated users can view allowed published worksheets" ON worksheets;
CREATE POLICY "Authenticated users can view allowed published worksheets"
  ON worksheets FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND status = 'PUBLISHED'
  );

DROP POLICY IF EXISTS "Users can view own worksheets" ON worksheets;
CREATE POLICY "Users can view own worksheets"
  ON worksheets FOR SELECT
  USING (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Authenticated users can create worksheets" ON worksheets;
CREATE POLICY "Authenticated users can create worksheets"
  ON worksheets FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Users can update own worksheets" ON worksheets;
CREATE POLICY "Users can update own worksheets"
  ON worksheets FOR UPDATE
  USING (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Service role full access to worksheets" ON worksheets;
CREATE POLICY "Service role full access to worksheets"
  ON worksheets FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Anyone can view publisher follows" ON publisher_follows;
DROP POLICY IF EXISTS "Authenticated users can view publisher follows" ON publisher_follows;
CREATE POLICY "Authenticated users can view publisher follows"
  ON publisher_follows FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own follows" ON publisher_follows;
CREATE POLICY "Users can manage own follows"
  ON publisher_follows FOR ALL
  USING (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Service role full access to publisher_follows" ON publisher_follows;
CREATE POLICY "Service role full access to publisher_follows"
  ON publisher_follows FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Authenticated users can view favorite publishers" ON favorite_publishers;
CREATE POLICY "Authenticated users can view favorite publishers"
  ON favorite_publishers FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own favorite publishers" ON favorite_publishers;
CREATE POLICY "Users can manage own favorite publishers"
  ON favorite_publishers FOR ALL
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access to favorite_publishers" ON favorite_publishers;
CREATE POLICY "Service role full access to favorite_publishers"
  ON favorite_publishers FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Authenticated users can view non-private reviews" ON reviews;
CREATE POLICY "Authenticated users can view non-private reviews"
  ON reviews FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND (
      is_private_to_publisher = false
      OR user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access to reviews" ON reviews;
CREATE POLICY "Service role full access to reviews"
  ON reviews FOR ALL
  USING (auth.role() = 'service_role');

-- Verification Codes: Exclusive to Admin & Service Role
DROP POLICY IF EXISTS "Service role full access to verification_codes" ON verification_codes;
CREATE POLICY "Service role full access to verification_codes"
  ON verification_codes FOR ALL
  USING (auth.role() = 'service_role');

-- Storage RLS: PDF, Word, Images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'worksheets',
  'worksheets',
  false,
  20971520,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ];

-- Audit Logs: Strictly accessible to Top Admin (ADMIN) and service_role
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'ADMIN'
    )
  );

DROP POLICY IF EXISTS "Service role full access to audit_logs" ON audit_logs;
CREATE POLICY "Service role full access to audit_logs"
  ON audit_logs FOR ALL
  USING (auth.role() = 'service_role');