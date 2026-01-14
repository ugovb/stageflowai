# Database Schema (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Introspection Phases (Static Config or Table)
CREATE TABLE phases (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, -- e.g. "The Call to Adventure"
    description TEXT,
    order_index INT UNIQUE
);

-- User Progress
CREATE TABLE user_journey (
    user_id UUID REFERENCES users(id),
    current_phase_id INT REFERENCES phases(id),
    is_locked BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}', -- Store specific answers
    PRIMARY KEY (user_id)
);

-- Chat History
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    phase_id INT REFERENCES phases(id),
    role TEXT NOT NULL, -- user/assistant
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Extracted Skills (The Inventory)
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name TEXT NOT NULL,
    category TEXT, -- Hard/Soft
    evidence_text TEXT, -- The "STAR" story
    source_message_id UUID REFERENCES chat_messages(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
