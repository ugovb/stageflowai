from pydantic import BaseModel
from typing import Optional, List, Any
from enum import Enum


class ProfileDepth(str, Enum):
    BASIC = "basic"
    DETAILED = "detailed"


class BasicProfile(BaseModel):
    """Profile for Free/Starter users."""
    full_name: str
    current_status: str
    location: Optional[str] = None
    
    education: List[str] = []
    hard_skills: List[str] = []
    languages: List[str] = []
    experiences: List[dict] = []  # Simple list
    interests: List[str] = []
    
    search_criteria: dict = {}


class DetailedProfile(BasicProfile):
    """Extended profile for Pro/Unlimited/Profil Pro users."""
    
    # SWOT Analysis
    swot: dict = {} # {strengths: [], weaknesses: [], opportunities: [], threats: []}
    
    # Scored skills
    skills_assessment: List[dict] = [] # [{name, score, benchmark, gap_analysis}]
    
    # Soft skills detected from conversation
    soft_skills: List[dict] = [] # [{name, evidence, confidence_score}]
    
    # Experience deep analysis
    experiences_detailed: List[dict] = [] # [{..., impact_metrics, transferable_skills, story_angle}]
    
    # Career recommendations
    career_recommendations: List[dict] = [] # [{path, reasoning, required_actions}]
    
    # Professional summary variations
    summaries: dict = {} # {linkedin: str, cv_short: str, cv_long: str, elevator_pitch: str}
    
    # Unique value proposition
    unique_value_proposition: str = ""


class ProfileAnalyzer:
    """Generates user profiles at different depth levels."""
    
    def __init__(self, llm_client: Any, model: str = "openai/gpt-4o-mini"):
        self.llm = llm_client
        self.model = model
    
    async def generate_basic_profile(self, onboarding_data: dict) -> BasicProfile:
        """Generate a basic profile from onboarding responses."""
        
        prompt = """
        Analyse les réponses d'onboarding suivantes et génère un profil structuré.
        
        RÉPONSES UTILISATEUR:
        {data}
        
        Génère un JSON avec:
        - full_name: Nom complet
        - current_status: Statut actuel (ex: "Étudiant M2 Biotechnologies")
        - location: Ville/Région
        - education: Liste des formations (strings simples)
        - hard_skills: Liste des compétences techniques
        - languages: Liste des langues avec niveau
        - experiences: Liste simplifiée [{"title", "company", "duration"}]
        - interests: Domaines d'intérêt
        - search_criteria: Critères de recherche de stage
        
        Sois concis et factuel.
        """
        
        # Note: Assuming llm_client has a 'chat' method as per prompt example
        response = await self.llm.chat(
            model=self.model,
            messages=[{"role": "user", "content": prompt.format(data=onboarding_data)}],
            response_format={"type": "json_object"}
        )
        
        return BasicProfile(**response)
    
    async def generate_detailed_profile(
        self, 
        onboarding_data: dict,
        conversation_history: List[dict]  # Full chat history for soft skills detection
    ) -> DetailedProfile:
        """Generate a detailed profile with deep analysis."""
        
        # Step 1: Get basic profile
        basic = await self.generate_basic_profile(onboarding_data)
        
        # Step 2: SWOT Analysis
        swot_prompt = """
        Basé sur ce profil, génère une analyse SWOT personnalisée:
        
        PROFIL: {basic}
        
        Retourne un JSON:
        {{
            "strengths": ["force 1 avec explication", ...],
            "weaknesses": ["faiblesse 1 avec conseil d'amélioration", ...],
            "opportunities": ["opportunité marché 1", ...],
            "threats": ["menace/défi 1", ...]
        }}
        
        Sois spécifique au profil, pas générique.
        """
        
        swot = await self.llm.chat(
            model="anthropic/claude-3.5-sonnet",  # Better analysis
            messages=[{"role": "user", "content": swot_prompt.format(basic=basic.model_dump())}],
            response_format={"type": "json_object"}
        )
        
        # Step 3: Soft Skills Detection from conversation
        soft_skills_prompt = """
        Analyse cette conversation d'onboarding et détecte les soft skills implicites:
        
        CONVERSATION:
        {history}
        
        Pour chaque soft skill détectée, donne:
        - name: Nom du soft skill
        - evidence: Citation ou comportement qui le prouve
        - confidence_score: 0-100
        
        Retourne un JSON: {{"soft_skills": [...]}}
        """
        
        soft_skills = await self.llm.chat(
            model="anthropic/claude-3.5-sonnet",
            messages=[{"role": "user", "content": soft_skills_prompt.format(history=conversation_history)}],
            response_format={"type": "json_object"}
        )
        
        # Step 4: Career Recommendations
        career_prompt = """
        Basé sur ce profil SWOT, recommande 3 pistes de carrière:
        
        PROFIL: {basic}
        SWOT: {swot}
        
        Pour chaque recommandation:
        - path: Intitulé du métier/secteur
        - reasoning: Pourquoi ça correspond au profil
        - required_actions: Actions concrètes pour y arriver
        
        Retourne: {{"recommendations": [...]}}
        """
        
        recommendations = await self.llm.chat(
            model="anthropic/claude-3.5-sonnet",
            messages=[{"role": "user", "content": career_prompt.format(
                basic=basic.model_dump(), 
                swot=swot
            )}],
            response_format={"type": "json_object"}
        )
        
        # Step 5: Generate summaries
        summary_prompt = """
        Génère plusieurs versions du résumé professionnel:
        
        PROFIL: {basic}
        
        Retourne:
        {{
            "linkedin": "Résumé LinkedIn (300 chars max)",
            "cv_short": "Accroche CV courte (2 lignes)",
            "cv_long": "Résumé CV détaillé (5-6 lignes)",
            "elevator_pitch": "Pitch oral 30 secondes",
            "unique_value_proposition": "Ce qui rend ce profil unique (1 phrase)"
        }}
        """
        
        summaries = await self.llm.chat(
            model=self.model,
            messages=[{"role": "user", "content": summary_prompt.format(basic=basic.model_dump())}],
            response_format={"type": "json_object"}
        )
        
        return DetailedProfile(
            **basic.model_dump(),
            swot=swot,
            skills_assessment=[],  # TODO: Implement skill scoring
            soft_skills=soft_skills.get("soft_skills", []),
            experiences_detailed=[],  # TODO: Deep experience analysis
            career_recommendations=recommendations.get("recommendations", []),
            summaries=summaries,
            unique_value_proposition=summaries.get("unique_value_proposition", "")
        )
