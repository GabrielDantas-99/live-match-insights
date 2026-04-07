
-- 1. PROFILES
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE NOT NULL,
  riot_puuid text UNIQUE,
  riot_summoner_id text,
  preferred_region text NOT NULL DEFAULT 'BR1',
  theme text NOT NULL DEFAULT 'dark',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. SUMMONERS
CREATE TABLE public.summoners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  puuid text UNIQUE NOT NULL,
  summoner_id text UNIQUE NOT NULL,
  account_id text,
  summoner_name text NOT NULL,
  profile_icon_id integer,
  summoner_level integer,
  region text NOT NULL DEFAULT 'BR1',
  last_fetched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.summoners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read summoners" ON public.summoners FOR SELECT TO authenticated USING (true);

-- 3. LIVE_MATCHES
CREATE TABLE public.live_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id bigint UNIQUE NOT NULL,
  platform_id text NOT NULL,
  game_mode text,
  game_type text,
  game_queue_config_id integer,
  game_start_time bigint,
  game_length integer,
  raw_data jsonb NOT NULL,
  last_updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.live_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read live_matches" ON public.live_matches FOR SELECT TO authenticated USING (true);

-- 4. MATCH_PARTICIPANTS
CREATE TABLE public.match_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  live_match_id uuid REFERENCES public.live_matches(id) ON DELETE CASCADE NOT NULL,
  puuid text NOT NULL,
  summoner_name text NOT NULL,
  team_id integer NOT NULL,
  champion_id integer NOT NULL,
  champion_name text,
  spell1_id integer,
  spell2_id integer,
  position text,
  kills integer NOT NULL DEFAULT 0,
  deaths integer NOT NULL DEFAULT 0,
  assists integer NOT NULL DEFAULT 0,
  cs integer NOT NULL DEFAULT 0,
  gold_earned integer NOT NULL DEFAULT 0,
  vision_score integer NOT NULL DEFAULT 0,
  items jsonb NOT NULL DEFAULT '[]',
  runes jsonb NOT NULL DEFAULT '{}',
  is_bot boolean NOT NULL DEFAULT false,
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(live_match_id, puuid)
);
ALTER TABLE public.match_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read match_participants" ON public.match_participants FOR SELECT TO authenticated USING (true);

-- 5. MATCH_EVENTS
CREATE TABLE public.match_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  live_match_id uuid REFERENCES public.live_matches(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  timestamp_ms bigint NOT NULL,
  killer_puuid text,
  victim_puuid text,
  assisting_puuids jsonb DEFAULT '[]',
  position_x integer,
  position_y integer,
  extra_data jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read match_events" ON public.match_events FOR SELECT TO authenticated USING (true);

-- 6. WATCHED_SUMMONERS
CREATE TABLE public.watched_summoners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  summoner_id uuid REFERENCES public.summoners(id) ON DELETE CASCADE NOT NULL,
  nickname text,
  notify_kills boolean NOT NULL DEFAULT false,
  notify_baron boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(profile_id, summoner_id)
);
ALTER TABLE public.watched_summoners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own watched_summoners" ON public.watched_summoners FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert own watched_summoners" ON public.watched_summoners FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update own watched_summoners" ON public.watched_summoners FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete own watched_summoners" ON public.watched_summoners FOR DELETE USING (auth.uid() = profile_id);

-- 7. MATCH_HISTORY_CACHE
CREATE TABLE public.match_history_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id text UNIQUE NOT NULL,
  puuid text NOT NULL,
  region text NOT NULL DEFAULT 'BR1',
  game_mode text,
  game_duration integer,
  win boolean,
  champion_id integer,
  champion_name text,
  kills integer,
  deaths integer,
  assists integer,
  cs integer,
  gold_earned integer,
  vision_score integer,
  items jsonb DEFAULT '[]',
  raw_data jsonb,
  played_at timestamptz,
  cached_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.match_history_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read match_history_cache" ON public.match_history_cache FOR SELECT TO authenticated USING (true);

-- 8. EXPORT_SESSIONS
CREATE TABLE public.export_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  live_match_id uuid REFERENCES public.live_matches(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pending',
  file_url text,
  row_count integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
ALTER TABLE public.export_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own export_sessions" ON public.export_sessions FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can create own export_sessions" ON public.export_sessions FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- INDEXES
CREATE INDEX idx_summoners_puuid ON public.summoners(puuid);
CREATE INDEX idx_summoners_name_region ON public.summoners(summoner_name, region);
CREATE INDEX idx_live_matches_game_id ON public.live_matches(game_id);
CREATE INDEX idx_live_matches_updated ON public.live_matches(last_updated_at DESC);
CREATE INDEX idx_participants_match ON public.match_participants(live_match_id);
CREATE INDEX idx_participants_puuid ON public.match_participants(puuid);
CREATE INDEX idx_events_match ON public.match_events(live_match_id);
CREATE INDEX idx_events_type ON public.match_events(event_type);
CREATE INDEX idx_history_puuid ON public.match_history_cache(puuid);
CREATE INDEX idx_history_played ON public.match_history_cache(played_at DESC);
CREATE INDEX idx_watched_profile ON public.watched_summoners(profile_id);

-- UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- TRIGGERS
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_last_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_live_matches_last_updated_at
  BEFORE UPDATE ON public.live_matches
  FOR EACH ROW EXECUTE FUNCTION public.update_last_updated_at_column();

-- STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('csv-exports', 'csv-exports', false, 10485760, ARRAY['text/csv']);

CREATE POLICY "Authenticated users can upload csv-exports" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'csv-exports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can read own csv-exports" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'csv-exports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can delete own csv-exports" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'csv-exports' AND auth.uid()::text = (storage.foldername(name))[1]);
