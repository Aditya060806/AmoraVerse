#!/usr/bin/env python3
"""
AmoraVerse Backend API - Simplified Version for Vercel
FastAPI server for romantic poetry generation with cloud AI fallback only
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import os
import asyncio
from datetime import datetime
import logging
from dotenv import load_dotenv

# Load environment variables
try:
    load_dotenv()
except UnicodeDecodeError:
    import os
    from dotenv import dotenv_values
    
    try:
        env_vars = dotenv_values(".env", encoding="utf-8")
        for key, value in env_vars.items():
            os.environ[key] = value
    except Exception as e:
        print(f"Warning: Could not load .env file: {e}")
        os.environ.setdefault("PORT", "8001")
        os.environ.setdefault("HOST", "0.0.0.0")

# Import fallback handler only (no heavy ML packages)
try:
    from fallback_handler import FallbackHandler
    fallback_handler = FallbackHandler()
except ImportError:
    print("Warning: FallbackHandler not available")
    fallback_handler = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AmoraVerse Poetry API",
    description="AI-powered romantic poetry generation with cloud AI fallback",
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
    use_hybrid: Optional[bool] = True
    max_length: Optional[int] = 200

class PoemResponse(BaseModel):
    poem: str
    model_used: str
    confidence_score: float
    generation_time: float
    style: str
    tone: str

class TrainingRequest(BaseModel):
    user_poem: str
    user_prompt: str
    style: Optional[str] = "User Generated"
    tone: Optional[str] = "Personal"

class ModelStatus(BaseModel):
    local_model_loaded: bool
    fallback_available: bool
    dataset_size: int
    last_training: Optional[str]

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AmoraVerse Poetry API",
        "version": "1.0.0",
        "status": "online",
        "mode": "cloud-only"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "fallback_available": fallback_handler is not None and fallback_handler.is_available()
    }

@app.post("/generate-poem", response_model=PoemResponse)
async def generate_poem(request: PoemRequest):
    """Generate a romantic poem using cloud AI"""
    start_time = datetime.now()
    
    try:
        if not fallback_handler or not fallback_handler.is_available():
            raise HTTPException(status_code=503, detail="AI service not available")
        
        # Generate poem using cloud AI
        poem = await fallback_handler.generate_poem(
            request.prompt,
            request.style,
            request.tone,
            request.language,
            request.max_length
        )
        
        generation_time = (datetime.now() - start_time).total_seconds()
        
        return PoemResponse(
            poem=poem,
            model_used="cloud-ai",
            confidence_score=0.85,
            generation_time=generation_time,
            style=request.style,
            tone=request.tone
        )
        
    except Exception as e:
        logger.error(f"Error generating poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate poem: {str(e)}")

@app.post("/refine-poem")
async def refine_poem(request: PoemRequest):
    """Generate multiple variations of a poem"""
    try:
        if not fallback_handler or not fallback_handler.is_available():
            raise HTTPException(status_code=503, detail="AI service not available")
        
        variations = []
        for i in range(3):
            poem = await fallback_handler.generate_poem(
                request.prompt,
                request.style,
                request.tone,
                request.language,
                request.max_length
            )
            
            variations.append(PoemResponse(
                poem=poem,
                model_used="cloud-ai",
                confidence_score=0.85,
                generation_time=1.0,
                style=request.style,
                tone=request.tone
            ))
        
        return {
            "variations": variations,
            "original_prompt": request.prompt
        }
        
    except Exception as e:
        logger.error(f"Error refining poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to refine poem: {str(e)}")

@app.post("/add-user-poem")
async def add_user_poem(request: TrainingRequest, background_tasks: BackgroundTasks):
    """Add user poem to training dataset (simplified for Vercel)"""
    try:
        # In Vercel, we'll just log the poem instead of saving to file
        logger.info(f"User poem added: {request.user_prompt} -> {request.user_poem}")
        
        return {
            "message": "Poem logged for future training",
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Error adding user poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add poem: {str(e)}")

@app.get("/model-status", response_model=ModelStatus)
async def get_model_status():
    """Get current model status"""
    try:
        return ModelStatus(
            local_model_loaded=False,
            fallback_available=fallback_handler is not None and fallback_handler.is_available(),
            dataset_size=0,
            last_training=None
        )
        
    except Exception as e:
        logger.error(f"Error getting model status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get model status: {str(e)}")

@app.get("/styles")
async def get_available_styles():
    """Get available poetic styles"""
    return {
        "styles": [
            "Free Verse", "Ghazal", "Shayari", "Letter", "Rhymed", 
            "Sonnet", "Haiku", "Villanelle", "Sestina", "Ode"
        ]
    }

@app.get("/tones")
async def get_available_tones():
    """Get available emotional tones"""
    return {
        "tones": [
            "Soft", "Passionate", "Playful", "Soulful", "Apology",
            "Long-Distance", "Proposal", "Farewell", "Mystical", "Devotional",
            "Melancholic", "Joyful", "Intimate", "Yearning", "Grateful"
        ]
    }

@app.get("/languages")
async def get_available_languages():
    """Get available languages"""
    return {
        "languages": ["English", "Hindi", "Urdu", "Spanish", "French", "Mixed"]
    }

@app.post("/analyze-mood")
async def analyze_mood_from_image(image_data: str):
    """Analyze mood from uploaded image and suggest poetic prompts"""
    try:
        # Simplified mood analysis for Vercel
        suggestions = [
            "Write a romantic poem about a sunset",
            "Write a passionate poem about love at first sight",
            "Write a soulful poem about eternal love"
        ]
        
        return {
            "detected_mood": "romantic",
            "suggested_prompts": suggestions,
            "confidence": 0.85
        }
        
    except Exception as e:
        logger.error(f"Error analyzing mood: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to analyze mood: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host=host, port=port) 