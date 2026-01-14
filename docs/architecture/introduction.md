# Introduction

This document outlines the complete fullstack architecture for **Stage Flow AI**, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

## Starter Template or Existing Project
**Status:** Greenfield implementation (transitioning from n8n prototype).
**Starter Strategy:** Custom **Turborepo** setup to manage:
- `apps/web`: Next.js frontend
- `apps/api`: FastAPI backend
- `packages/shared`: Shared TypeScript types (generated from Pydantic) and configs.

This structure supports the "Modular Monolith" requirement and facilitates rapid iteration on both the UI and the AI logic simultaneously.

## Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026-01-10 | 1.0 | Initial Unified Architecture (YOLO Mode) | Winston (Architect) |
