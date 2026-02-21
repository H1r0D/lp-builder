-- ============================================================
-- AI LPO Builder — Supabase Database Schema
-- ============================================================
-- Supabase SQL Editor にコピペして実行してください。
-- 順序: Extensions → Tables → Functions → Triggers → RLS
-- ============================================================

-- ─────────────────────────────────────────────
-- 0. Extensions
-- ─────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- 1. profiles テーブル
--    Supabase Auth の auth.users に紐づくユーザー情報
-- ─────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  avatar_url    text,
  display_name  text,

  -- 招待コード（ユニーク / 自動生成）
  referral_code text unique not null
    default upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8)),

  -- 紹介者の user id（NULL = 紹介なし）
  referred_by   uuid references public.profiles(id) on delete set null,

  -- AI 生成クレジット残数
  credits       integer not null default 3,

  -- サブスクプラン: free / starter / pro
  subscription_plan text not null default 'free'
    check (subscription_plan in ('free', 'starter', 'pro')),

  -- Stripe 連携
  stripe_customer_id    text,
  stripe_subscription_id text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table  public.profiles is 'ユーザープロフィール（auth.users 拡張）';
comment on column public.profiles.referral_code is '8桁 HEX の招待コード（自動生成）';
comment on column public.profiles.credits is 'AI 生成の残りクレジット数';

-- ─────────────────────────────────────────────
-- 2. projects テーブル
--    作成した LP の管理
-- ─────────────────────────────────────────────
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,

  -- LP のタイトル（ダッシュボード表示用）
  title         text not null default '無題のLP',

  -- LP の JSON コンテンツ（セクション構成、テキスト、画像 URL 等）
  json_content  jsonb not null default '{}'::jsonb,

  -- 公開状態
  status        text not null default 'draft'
    check (status in ('draft', 'published')),

  -- 公開 URL のスラッグ（公開時のみ使用）
  slug          text unique,

  -- メタ情報
  thumbnail_url text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table  public.projects is 'LP プロジェクト管理';
comment on column public.projects.json_content is 'LP 全体の JSON データ（セクション配列を含む）';

-- user_id で高速検索するインデックス
create index if not exists idx_projects_user_id on public.projects(user_id);

-- ─────────────────────────────────────────────
-- 3. analytics テーブル
--    PV・クリック等の日次計測データ
-- ─────────────────────────────────────────────
create table if not exists public.analytics (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects(id) on delete cascade,

  -- 日次メトリクス
  date          date not null default current_date,
  views         integer not null default 0,
  clicks        integer not null default 0,

  -- 流入元（リファラ）
  referrer      text,

  created_at    timestamptz not null default now()
);

comment on table  public.analytics is 'LP ごとの日次アクセス解析';

-- 複合インデックス: project × date で高速集計
create index if not exists idx_analytics_project_date
  on public.analytics(project_id, date);

-- 同一 project × date × referrer の重複を防止（UPSERT 用）
create unique index if not exists idx_analytics_unique_day
  on public.analytics(project_id, date, coalesce(referrer, '__direct__'));


-- ============================================================
-- 4. Functions & Triggers
-- ============================================================

-- ── updated_at 自動更新トリガー ──
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create or replace trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();


-- ── 新規ユーザー登録時に profiles を自動作成 ──
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (
    new.id,
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- auth.users への INSERT 時にトリガー発動
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ── 招待コード消費 & クレジット付与 ──
-- 紹介で登録した場合、双方に +3 クレジット
create or replace function public.apply_referral(
  p_user_id uuid,
  p_referral_code text
)
returns boolean as $$
declare
  v_referrer_id uuid;
begin
  -- 招待コードからユーザーを検索
  select id into v_referrer_id
  from public.profiles
  where referral_code = upper(p_referral_code)
    and id != p_user_id;  -- 自分自身の招待は不可

  if v_referrer_id is null then
    return false;
  end if;

  -- 既に紹介済みなら何もしない
  if (select referred_by from public.profiles where id = p_user_id) is not null then
    return false;
  end if;

  -- 紹介者を記録 & 双方にクレジット付与
  update public.profiles
  set referred_by = v_referrer_id,
      credits = credits + 3
  where id = p_user_id;

  update public.profiles
  set credits = credits + 3
  where id = v_referrer_id;

  return true;
end;
$$ language plpgsql security definer;


-- ============================================================
-- 5. Row Level Security (RLS)
-- ============================================================

-- ── profiles ──
alter table public.profiles enable row level security;

-- 自分のプロフィールのみ参照可能
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- 自分のプロフィールのみ更新可能
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- INSERT は handle_new_user トリガーが担当（security definer）
-- 明示的に service_role 以外の直接 INSERT は禁止


-- ── projects ──
alter table public.projects enable row level security;

-- 自分のプロジェクトのみ参照
create policy "projects_select_own" on public.projects
  for select using (auth.uid() = user_id);

-- 自分のプロジェクトのみ作成
create policy "projects_insert_own" on public.projects
  for insert with check (auth.uid() = user_id);

-- 自分のプロジェクトのみ更新
create policy "projects_update_own" on public.projects
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分のプロジェクトのみ削除
create policy "projects_delete_own" on public.projects
  for delete using (auth.uid() = user_id);


-- ── analytics ──
alter table public.analytics enable row level security;

-- analytics は project の所有者のみ参照可能
create policy "analytics_select_own" on public.analytics
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = analytics.project_id
        and projects.user_id = auth.uid()
    )
  );

-- analytics の INSERT は API 経由（service_role key）で行うため、
-- 認証ユーザーによる直接 INSERT は所有者チェック
create policy "analytics_insert_own" on public.analytics
  for insert with check (
    exists (
      select 1 from public.projects
      where projects.id = analytics.project_id
        and projects.user_id = auth.uid()
    )
  );

-- analytics の更新・削除は所有者のみ
create policy "analytics_update_own" on public.analytics
  for update using (
    exists (
      select 1 from public.projects
      where projects.id = analytics.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "analytics_delete_own" on public.analytics
  for delete using (
    exists (
      select 1 from public.projects
      where projects.id = analytics.project_id
        and projects.user_id = auth.uid()
    )
  );


-- ============================================================
-- 6. 公開 LP 用のポリシー（匿名アクセス許可）
-- ============================================================

-- 公開中の LP は slug 経由で誰でも参照可能
create policy "projects_select_published" on public.projects
  for select using (status = 'published' and slug is not null);


-- ============================================================
-- Done! 🎉
-- ============================================================
