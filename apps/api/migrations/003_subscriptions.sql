-- User subscriptions (Lemon Squeezy)
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    subscription_id VARCHAR(100),
    subscription_status VARCHAR(50) DEFAULT 'free',
    plan_variant VARCHAR(100),
    current_period_end TIMESTAMP WITH TIME ZONE,
    lemon_customer_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON user_subscriptions(subscription_status);

-- Token usage tracking
CREATE TABLE IF NOT EXISTS token_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    usage_date DATE NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    UNIQUE(user_id, usage_date)
);

CREATE INDEX idx_token_usage_user_date ON token_usage(user_id, usage_date);
