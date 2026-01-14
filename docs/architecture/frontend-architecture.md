# Frontend Architecture

## Project Structure (Detailed)

```text
apps/web/
├── src/
│   ├── app/                 # Next.js App Router (Pages & Layouts)
│   │   ├── (auth)/          # Auth group (login, register)
│   │   ├── (dashboard)/     # Protected dashboard group
│   │   │   ├── metro/       # Metro Map page
│   │   │   ├── chat/        # Socratic chat page
│   │   │   └── inventory/   # Skill inventory page
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── layout/          # Navbar, Sidebar, Shell
│   │   ├── features/        # Business-logic components
│   │   │   ├── map/         # MetroMap, PhaseNode
│   │   │   ├── chat/        # ChatWindow, MessageBubble
│   │   │   └── inventory/   # SkillCard, InventoryList
│   │   └── ui/              # Shadcn/UI (Atomic)
│   ├── hooks/               # Custom hooks (useAuth, useChat)
│   ├── lib/                 # Utilities & API wrappers
│   │   ├── api/             # Typed fetch wrappers
│   │   └── utils.ts         # Tailwind/CN helpers
│   ├── store/               # Zustand stores
│   └── types/               # Local TS types
├── public/                  # Static assets
└── tailwind.config.ts
```

## Component Organization
`apps/web/src/components`
- `/layout`: Shell, Sidebar, Navigation
- `/features`:
  - `/map`: Metro Map components
  - `/chat`: Chat bubble, input, typing indicators
  - `/inventory`: Skill cards, list view
  - `/dashboard`: Main dashboard assembly
- `/ui`: Atomic design elements (Buttons, Inputs) from Shadcn

## State Management (Zustand)
```typescript
// store/useJourneyStore.ts
interface JourneyState {
  currentPhase: number;
  skills: Skill[];
  isLocked: boolean;
  addSkill: (skill: Skill) => void;
  unlockPhase: () => void;
}
```

## Frontend Services
Services in `apps/web/src/lib/api` will use a typed `fetch` wrapper to communicate with the FastAPI backend, handling JWT injection automatically via Supabase Auth helpers.
