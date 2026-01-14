import yaml
import os
from typing import Dict, Any, Optional
from app.models.user import UserArchetype

# Path to the YAML file
PROMPTS_FILE = os.path.join(os.path.dirname(__file__), "../prompts/archetypes.yaml")

# Cache for loaded prompts
_PROMPTS_CACHE: Dict[int, Any] = {}

def load_prompts():
    """Loads prompts from the YAML file."""
    if not os.path.exists(PROMPTS_FILE):
        # Fallback if file is missing (mostly for tests or initial setup)
        return {}
    
    with open(PROMPTS_FILE, "r") as f:
        return yaml.safe_load(f)

def get_prompts_config() -> Dict[int, Any]:
    global _PROMPTS_CACHE
    if not _PROMPTS_CACHE:
        data = load_prompts()
        _PROMPTS_CACHE = data.get("phases", {})
    return _PROMPTS_CACHE

DEFAULT_PROMPT = {
    "system_prompt": "You are a helpful career coach assistant.",
    "initial_message": "How can I help you today?"
}

def get_phase_config(phase_id: int, archetype: UserArchetype = UserArchetype.GENERAL) -> Dict[str, Any]:
    """
    Retrieves the prompt configuration for a specific phase and user archetype.
    Falls back to 'default' if the archetype-specific prompt is missing.
    """
    phases = get_prompts_config()
    phase_data = phases.get(phase_id)
    
    if not phase_data:
        return DEFAULT_PROMPT
    
    # 1. Try to get specific archetype config
    archetype_key = archetype.value.lower()
    config = phase_data.get(archetype_key)
    
    # 2. Fallback to 'default' in YAML
    if not config:
        config = phase_data.get("default")
        
    # 3. Final Fallback (shouldn't happen if YAML is good)
    if not config:
        return DEFAULT_PROMPT

    # Merge top-level metadata (like 'name') if needed, though structure suggests distinct blocks.
    # We might want to include 'analyst_criteria' which might be shared or specific.
    # For now, let's assume the YAML structure I created:
    # phase:
    #   name: ...
    #   default: { ... }
    #   stem: { ... }
    
    # We construct the return dict. We might want to pass 'name' too.
    result = config.copy()
    if "name" in phase_data:
        result["name"] = phase_data["name"]
        
    # Hardcoded Analyst Criteria for now (as it wasn't in my YAML yet, but was in original file)
    # Ideally this moves to YAML too, but let's keep the existing strings for safety if not in YAML.
    # The original file had them in the dictionary. I should probably add them to YAML or keep them here.
    # Let's add a robust fallback for analyst_criteria if not in YAML.
    
    if "analyst_criteria" not in result:
        # Temporary fallback to keep previous logic working if YAML misses it
        result["analyst_criteria"] = _get_hardcoded_analyst_criteria(phase_id)
        
    return result

def _get_hardcoded_analyst_criteria(phase_id: int) -> str:
    """Legacy/Fallback criteria if not in YAML."""
    if phase_id == 1:
        return """
        The user has shared a specific story or experience that sparked their interest.
        They have provided enough detail to identify at least one core motivation or early skill.
        The story has some 'Situation' and 'Action' elements.
        """
    elif phase_id == 2:
        return """
        The user has described a specific challenge, doubt, or obstacle.
        They have explained how they addressed or moved past it (Action).
        A lesson or skill can be extracted from how they handled the situation.
        """
    return ""