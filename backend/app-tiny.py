from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="AmoraVerse API", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class PoemRequest(BaseModel):
    prompt: str
    style: Optional[str] = "Free Verse"
    tone: Optional[str] = "Romantic"

class PoemResponse(BaseModel):
    poem: str
    model_used: str
    confidence_score: float

@app.get("/")
async def root():
    return {"message": "AmoraVerse API", "status": "online"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/generate-poem")
async def generate_poem(request: PoemRequest):
    poem = f"In {request.tone.lower()} whispers, {request.prompt}. A {request.style.lower()} of love."
    return PoemResponse(poem=poem, model_used="simple", confidence_score=0.8)

@app.get("/styles")
async def styles():
    return {"styles": ["Free Verse", "Ghazal", "Shayari", "Letter", "Rhymed"]}

@app.get("/tones")
async def tones():
    return {"tones": ["Soft", "Passionate", "Playful", "Soulful", "Romantic"]} 