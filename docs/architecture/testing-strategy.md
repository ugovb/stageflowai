# Testing Strategy

## Testing Pyramid
- **E2E (Playwright):** Critical flows only (Login -> Complete Phase 1 -> Check Inventory).
- **Backend Unit (Pytest):** Heavy focus here. Test the "Analyst" logic—does it correctly identify a valid STAR answer vs. a vague one? Test Prompt handling.
- **Frontend Unit (Jest/Vitest):** Test complex UI logic (Metro Map navigation, State updates).

## Accessibility Testing
To meet NFR2 (WCAG AA):
- **Automated:** Integrate `axe-core` into Playwright E2E tests and `jest-axe` for unit tests.
- **Manual Check:** Periodic keyboard navigation audits and Screen Reader testing (VoiceOver/NVDA) on critical flows.
- **Color Contrast:** Use Tailwind's default palette and verify with automated tools to ensure AA compliance.
