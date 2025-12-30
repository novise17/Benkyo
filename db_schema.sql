-- Users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  password_hash text,
  created_at timestamptz DEFAULT now(),
  settings jsonb DEFAULT '{}'::jsonb
);

-- Decks
CREATE TABLE decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text,
  description text,
  is_public boolean DEFAULT FALSE,
  created_at timestamptz DEFAULT now()
);

-- Cards (supporting Basic, Cloze, and Problem types)
CREATE TYPE card_type AS ENUM ('basic','cloze','problem');
CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES decks(id) ON DELETE CASCADE,
  card_type card_type NOT NULL DEFAULT 'basic',
  front jsonb,   -- store structured content (markdown, blocks)
  back jsonb,
  metadata jsonb DEFAULT '{}'::jsonb, -- custom fields, difficulty, tags
  created_at timestamptz DEFAULT now()
);

-- Review records (SRS logs)
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  card_id uuid REFERENCES cards(id) ON DELETE CASCADE,
  rating smallint, -- 0..5 (like Anki)
  ef float,        -- ease factor
  interval integer,
  reps integer,
  lapses integer,
  due timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Problems (for Brilliant-style sequences)
CREATE TABLE problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES decks(id),
  title text,
  body jsonb, -- interactive blocks, steps, test harness
  hints jsonb,
  solution jsonb,
  difficulty float,
  created_at timestamptz DEFAULT now()
);

-- Media
CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  url text,
  mime text,
  created_at timestamptz DEFAULT now()
);

-- Simple sync metadata for conflict resolution
CREATE TABLE sync_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  device_id text,
  last_synced_at timestamptz
);