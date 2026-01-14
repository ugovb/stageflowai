from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    return {"msg": "Auth Login Placeholder"}

@router.post("/register")
def register():
    return {"msg": "Auth Register Placeholder"}
