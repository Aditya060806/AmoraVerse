#!/usr/bin/env python3
"""
AmoraVerse Backend API - Minimal Version for Vercel
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AmoraVerse Poetry API",
    description="AI-powered romantic poetry generation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PoemRequest(BaseModel):
    prompt: str
    style: Optional[str] = "Free Verse"
    tone: Optional[str] = "Romantic"
    language: Optional[str] = "English"
    max_length: Optional[int] = 200

class PoemResponse(BaseModel):
    poem: str
    model_used: str
    confidence_score: float
    generation_time: float
    style: str
    tone: str

@app.get("/")
async def root():
    return {"message": "AmoraVerse Poetry API", "version": "1.0.0", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/generate-poem", response_model=PoemResponse)
async def generate_poem(request: PoemRequest):
    """Generate a romantic poem using cloud AI"""
    try:
        # For now, return a sample poem since we can't use heavy ML packages
        sample_poem = f"""
In the gentle whisper of dawn,
Where love's first light is born,
Your {request.tone.lower()} heart beats with mine,
A {request.style.lower()} dance, so divine.

{request.prompt}
        """.strip()
        
        return PoemResponse(
            poem=sample_poem,
            model_used="sample-generator",
            confidence_score=0.8,
            generation_time=0.5,
            style=request.style,
            tone=request.tone
        )
        
    except Exception as e:
        logger.error(f"Error generating poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate poem: {str(e)}")

@app.get("/styles")
async def get_available_styles():
    return {
        "styles": ["Free Verse", "Ghazal", "Shayari", "Letter", "Rhymed", "Sonnet", "Haiku"]
    }

@app.get("/tones")
async def get_available_tones():
    return {
        "tones": ["Soft", "Passionate", "Playful", "Soulful", "Apology", "Long-Distance", "Proposal"]
    }

@app.get("/languages")
async def get_available_languages():
    return {"languages": ["English", "Hindi", "Urdu", "Spanish", "French", "Mixed"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 