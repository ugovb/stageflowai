from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from duckduckgo_search import DDGS

router = APIRouter()

class CompanyResult(BaseModel):
    id: str
    name: str
    industry: str = "Unknown"
    location: str = "Unknown"
    description: str
    compatibility_score: int = 0
    logo_url: Optional[str] = None
    url: Optional[str] = None

@router.get("/companies", response_model=List[CompanyResult])
async def search_companies(
    q: Optional[str] = Query(None),
    location: Optional[str] = Query(None)
):
    """
    Search for companies/internships using DuckDuckGo.
    """
    if not q:
        return []
    
    search_query = f"{q} internship"
    if location:
        search_query += f" in {location}"
        
    results = []
    try:
        # Use DDGS context manager
        with DDGS() as ddgs:
            # Simple text search
            ddg_results = list(ddgs.text(search_query, max_results=10))
            
            for i, res in enumerate(ddg_results):
                title = res.get("title", "Unknown")
                body = res.get("body", "")
                href = res.get("href", "")
                
                # Simple heuristic to clean title
                name = title.split("-")[0].split("|")[0].strip()
                
                results.append(CompanyResult(
                    id=str(i),
                    name=name,
                    description=body[:200] + "...",
                    url=href,
                    industry="Internet Search",
                    location=location or "Global",
                    compatibility_score=85 - (i * 5) # Fake score based on rank
                ))
                
    except Exception as e:
        print(f"DDG Search Error: {e}")
        # Return empty list or fallback mock in case of rate limit
        return []
        
    return results