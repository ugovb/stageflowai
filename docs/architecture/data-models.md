# Data Models

## Conceptual Models

### User
**Purpose:** Core identity and profile link.
**Key Attributes:**
- `id`: UUID (PK)
- `email`: String
- `full_name`: String
- `current_phase`: Integer (1-10) - *Tracks progress on the "Map"*

### JourneySession
**Purpose:** Represents the state of the introspection journey.
**Key Attributes:**
- `user_id`: UUID (FK)
- `phase_id`: Integer
- `messages`: JSONB (List of chat objects)
- `context`: JSONB (Accumulated facts for RAG)
- `is_locked`: Boolean (Gate status)

### Skill (The "Inventory")
**Purpose:** Verified evidence-based skills extracted by the "Analyst".
**Key Attributes:**
- `id`: UUID
- `user_id`: UUID
- `name`: String (e.g., "Conflict Resolution")
- `category`: Enum (Hard/Soft/Tool)
- `evidence`: String (The "STAR" story)
- `confidence_score`: Float

### Company
**Purpose:** Target entity for applications.
**Key Attributes:**
- `id`: UUID
- `name`: String
- `domain`: String
- `location`: String
- `meta_data`: JSONB (Enriched data from Perplexity/Search)

## Shared TypeScript Interface (Example)

```typescript
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  currentPhase: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'HARD' | 'SOFT' | 'TOOL';
  evidence: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
```
