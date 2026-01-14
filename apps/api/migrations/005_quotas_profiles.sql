-- QUOTA PLANS TABLE
CREATE TABLE IF NOT EXISTS quota_plans (
    id VARCHAR(50) PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    plan_type VARCHAR(20) NOT NULL DEFAULT 'recurring', -- 'recurring' or 'one_time'
    
    -- Profile depth
    profile_depth VARCHAR(20) NOT NULL DEFAULT 'basic', -- 'basic' or 'detailed'
    
    -- Monthly limits (-1 = unlimited, 0 = not included)
    monthly_cover_letters INTEGER DEFAULT 0,
    monthly_emails INTEGER DEFAULT 0,
    monthly_cv_exports INTEGER DEFAULT 0,
    
    -- Search limits
    max_search_results INTEGER DEFAULT 10,
    max_saved_companies INTEGER DEFAULT 5,
    
    -- Features
    can_export_pdf BOOLEAN DEFAULT FALSE,
    has_dashboard BOOLEAN DEFAULT FALSE,
    has_reminders BOOLEAN DEFAULT FALSE,
    
    -- AI Models allowed
    allowed_models TEXT[] DEFAULT ARRAY['openai/gpt-4o-mini'],
    
    -- Pricing (cents)
    price_cents INTEGER DEFAULT 0,
    price_yearly_cents INTEGER DEFAULT 0, -- NULL for one_time
    
    -- Display
    sort_order INTEGER DEFAULT 0,
    is_highlighted BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the 5 plans
INSERT INTO quota_plans (
    id, display_name, description, plan_type, profile_depth,
    monthly_cover_letters, monthly_emails, monthly_cv_exports,
    max_search_results, max_saved_companies,
    can_export_pdf, has_dashboard, has_reminders,
    allowed_models, price_cents, price_yearly_cents,
    sort_order, is_highlighted
) VALUES 
-- FREE
(
    'free', 
    'Gratuit', 
    'Découvrez StageFlow avec un profil basique',
    'recurring',
    'basic',
    0, 0, 0,           -- No generation
    3, 0,              -- 3 companies visible, no save
    FALSE, FALSE, FALSE,
    ARRAY['openai/gpt-4o-mini'],
    0, 0,
    1, FALSE
),

-- PROFIL PRO (One-Shot)
(
    'profil_pro', 
    'Profil Pro', 
    'Votre profil détaillé exportable, à vie',
    'one_time',        -- ONE TIME PURCHASE
    'detailed',
    0, 0, 1,           -- 1 CV export (the profile itself)
    0, 0,              -- No search included
    TRUE, FALSE, FALSE,
    ARRAY['openai/gpt-4o-mini', 'anthropic/claude-3.5-sonnet'],
    1999, NULL,        -- 19.99€ one time, no yearly
    2, FALSE
),

-- STARTER
(
    'starter', 
    'Starter', 
    'Pour commencer votre recherche',
    'recurring',
    'basic',
    5, 5, 2,
    10, 10,
    TRUE, FALSE, FALSE,
    ARRAY['openai/gpt-4o-mini'],
    499, 4990,         -- 4.99€/month or 49.90€/year
    3, FALSE
),

-- PRO
(
    'pro', 
    'Pro', 
    'Recherche intensive avec profil détaillé',
    'recurring',
    'detailed',        -- INCLUDES DETAILED PROFILE
    30, 30, 10,
    -1, 50,            -- Unlimited search, 50 saved
    TRUE, TRUE, TRUE,
    ARRAY['openai/gpt-4o-mini', 'anthropic/claude-3.5-sonnet'],
    999, 9990,         -- 9.99€/month
    4, TRUE            -- HIGHLIGHTED
),

-- UNLIMITED
(
    'unlimited', 
    'Unlimited', 
    'Sans limites, sans compromis',
    'recurring',
    'detailed',
    -1, -1, -1,
    -1, -1,
    TRUE, TRUE, TRUE,
    ARRAY['openai/gpt-4o-mini', 'anthropic/claude-3.5-sonnet', 'openai/gpt-4o'],
    1999, 19990,       -- 19.99€/month
    5, FALSE
)
ON CONFLICT (id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    price_cents = EXCLUDED.price_cents;


-- USER SUBSCRIPTIONS (Updated)
-- We alter existing or create new. Assuming fresh start or migration capability.
-- If table exists (from Phase 3), we might need ALTER. 
-- For safety in this prompt context, I'll use CREATE IF NOT EXISTS and maybe ALTER columns if needed.
-- Phase 3 created: id, user_id, subscription_id, subscription_status, plan_variant, current_period_end, lemon_customer_id
-- We need: plan_id, is_lifetime, purchased_at, current_period_start

DO $$ 
BEGIN 
    -- Add plan_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_subscriptions' AND column_name='plan_id') THEN
        ALTER TABLE user_subscriptions ADD COLUMN plan_id VARCHAR(50) REFERENCES quota_plans(id);
    END IF;

    -- Add is_lifetime if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_subscriptions' AND column_name='is_lifetime') THEN
        ALTER TABLE user_subscriptions ADD COLUMN is_lifetime BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add purchased_at if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_subscriptions' AND column_name='purchased_at') THEN
        ALTER TABLE user_subscriptions ADD COLUMN purchased_at TIMESTAMPTZ;
    END IF;
    
    -- Add current_period_start if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_subscriptions' AND column_name='current_period_start') THEN
        ALTER TABLE user_subscriptions ADD COLUMN current_period_start TIMESTAMPTZ;
    END IF;

    -- Rename subscription_status to status if needed, or mapping. 
    -- Phase 3 used 'subscription_status'. We'll stick to that or alias.
    -- Let's check user_usage from Phase 3? Phase 3 created 'token_usage'.
    -- 'user_usage' is new here.
END $$;

-- USER USAGE TRACKING
CREATE TABLE IF NOT EXISTS user_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Period (monthly reset)
    period_start DATE NOT NULL DEFAULT DATE_TRUNC('month', CURRENT_DATE),
    period_end DATE NOT NULL DEFAULT (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day')::DATE,
    
    -- Counters
    cover_letters_generated INTEGER DEFAULT 0,
    emails_generated INTEGER DEFAULT 0,
    cv_exports INTEGER DEFAULT 0,
    companies_viewed INTEGER DEFAULT 0,
    companies_saved INTEGER DEFAULT 0,
    
    -- Demo tracking (for Free tier)
    demo_letter_viewed BOOLEAN DEFAULT FALSE,
    demo_email_viewed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_usage_user_period ON user_usage(user_id, period_start DESC);


-- USER PROFILES (Store generated profiles)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Profile data
    profile_depth VARCHAR(20) NOT NULL, -- 'basic' or 'detailed'
    profile_data JSONB NOT NULL,        -- The actual profile content
    
    -- Generation metadata
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    generated_with_model VARCHAR(100),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    
    -- Export tracking
    last_exported_at TIMESTAMPTZ,
    export_count INTEGER DEFAULT 0,
    
    UNIQUE(user_id)  -- One profile per user (overwritten on regenerate)
);
