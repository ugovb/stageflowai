# Project Brief: Stage Flow AI

## Executive Summary
Stage Flow AI is a comprehensive internship application assistant that transforms the chaotic process of finding an internship into a structured, guided journey. It solves the problem of generic, low-impact applications by using a Socratic AI to build a deep, evidence-based student profile, which then powers a targeted search and automates the creation of hyper-personalized cover letters and CVs. The key value proposition is the "Gate-based" introspection methodology that ensures students don't just "apply," but prove their competence through a rigorous, gamified process.

## Problem Statement
Students, particularly in Humanities and "non-vocational" fields, struggle to translate their academic experiences into professional value. 
*   **Pain Point:** They lack the vocabulary to describe their skills (e.g., "I just wrote a paper" vs. "I performed comparative strategic analysis").
*   **Current Failure:** Existing tools are either simple resume templates or generic AI chat wrappers that hallucinate or produce generic fluff.
*   **Urgency:** The internship market is hyper-competitive; generic applications are automatically rejected. Students need a tool that acts as a career coach, not just a typist.

## Proposed Solution
A web-based application replacing a previous n8n workflow.
*   **Core Concept:** A "Hero's Journey" Dashboard (Metro Map UI) guiding the user through 10 strict introspection phases.
*   **Differentiation:** 
    1.  **Socratic Introspection:** The AI probes deep using domain-specific "Hidden Menus" to uncover forgotten skills.
    2.  **Evidence First:** No skill is added to the profile without "STAR" proof (Situation, Task, Action, Result).
    3.  **Network-First Search:** Prioritizes finding alumni and qualitative matches over just job board scraping.

## Target Users
*   **Primary Segment:** University students (Undergraduate/Master's) actively seeking internships.
    *   **Sub-segment:** Humanities/Arts/Social Science students who feel their degree is "unmarketable."
    *   **Behavior:** Anxious, disorganized, often applying to 50+ places with the same generic letter.
*   **Secondary Segment:** Career Centers at Universities (B2B potential) looking to scale their counseling.

## Goals & Success Metrics
*   **Business Objectives:**
    *   Launch a stable, standalone web application (replacing n8n).
    *   Validate the "Introspection Quality" (do users actually finish the 10 steps?).
*   **User Success Metrics:**
    *   **Completion Rate:** % of users who pass the final "Vision" Gate.
    *   **Inventory Size:** Average number of "Validated Skills" per user.
    *   **Application Confidence:** User self-reported confidence increase after generating a cover letter.

## MVP Scope
**Core Features (Must Have):**
*   **The Metro Map Dashboard:** Visual progress tracker for the 10-phase methodology.
*   **Socratic AI Agent:** "Interviewer" + "Analyst" duo that gates progress based on answer quality.
*   **Domain-Specific Menus:** Hidden checklists for at least 3 major archetypes (e.g., STEM, Humanities, Business).
*   **Skill Inventory:** Read-only sidebar that populates in real-time as the AI "catches" skills.
*   **Search Integration:** API-driven search (Perplexity/Serp) for companies based on geography/domain.
*   **Document Generator:** Markdown profile export + PDF Cover Letter generation.

**Out of Scope for MVP:**
*   **Alumni Network Integration:** (Post-MVP feature).
*   **Direct "One-Click Apply":** (Too complex legally/technically for now; focus on generating the assets).
*   **Social Sharing:** No multiplayer mode yet.

## Post-MVP Vision
*   **Phase 2:** "Alumni Hunter" – scraping LinkedIn to find school alumni at target companies.
*   **Phase 3:** B2B Dashboard for University Career Centers to track student progress.

## Technical Considerations
*   **Architecture:**
    *   **Backend:** Python (FastAPI or Django) or Node.js (Express/NestJS). *Decision: Python preferred for AI library ecosystem.*
    *   **Frontend:** React or Next.js for the "Map" visualization.
    *   **Database:** PostgreSQL (User State) + Vector DB (RAG for industry standards).
    *   **AI:** LangChain / Vercel AI SDK orchestrating the agents.

## Risks & Open Questions
*   **Risk:** **User Fatigue.** 10 phases is a lot. 
    *   *Mitigation:* The "Gamified" Map and "Inventory" rewards must be very satisfying.
*   **Risk:** **API Costs.** Deep Socratic loops burn tokens.
    *   *Mitigation:* Optimize prompts and use smaller models for the "Analyst" checker.
*   **Question:** How strict should the "Gate" be? (Too strict = rage quit; Too loose = garbage profile).

## Next Steps
1.  **PM Handoff:** Review this brief and begin PRD generation.
2.  **Tech Stack Selection:** Confirm Python/FastAPI vs Node.
3.  **UX Wireframing:** Sketch the "Metro Map" interaction.
