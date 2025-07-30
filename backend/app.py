#!/usr/bin/env python3
"""
AmoraVerse Backend API
FastAPI server for romantic poetry generation with hybrid model system
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
    # If there's an encoding issue, try to load with explicit encoding
    import os
    from dotenv import dotenv_values
    
    try:
        # Try to read the .env file with explicit encoding
        env_vars = dotenv_values(".env", encoding="utf-8")
        for key, value in env_vars.items():
            os.environ[key] = value
    except Exception as e:
        print(f"Warning: Could not load .env file: {e}")
        # Set default values if .env file cannot be loaded
        os.environ.setdefault("PORT", "8001")
        os.environ.setdefault("HOST", "0.0.0.0")
        os.environ.setdefault("DATABASE_URL", "sqlite:///data/amora-verse.db")
        os.environ.setdefault("MODEL_PATH", "model/amora-poet-model")

# Import our custom modules
from poet_model import AmoraVersePoet
from fallback_handler import FallbackHandler
from data_manager import DataManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AmoraVerse Poetry API",
    description="AI-powered romantic poetry generation with hybrid model system",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
poet_model = AmoraVersePoet()
fallback_handler = FallbackHandler()
data_manager = DataManager()

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
        "status": "active"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_status": await get_model_status()
    }

@app.post("/generate-poem", response_model=PoemResponse)
async def generate_poem(request: PoemRequest):
    """
    Generate a romantic poem based on the provided prompt
    """
    try:
        start_time = datetime.now()
        
        logger.info(f"Generating poem for prompt: {request.prompt[:50]}...")
        
        # Generate poem using hybrid system
        if request.use_hybrid:
            poem, model_used, confidence = await generate_hybrid_poem(
                request.prompt, 
                request.style, 
                request.tone,
                request.language,
                request.max_length
            )
        else:
            # Use only local model
            poem, confidence = await poet_model.generate_poem(
                request.prompt,
                style=request.style,
                tone=request.tone,
                language=request.language,
                max_length=request.max_length
            )
            model_used = "local_model"
        
        generation_time = (datetime.now() - start_time).total_seconds()
        
        # Log the generation
        await data_manager.log_generation(
            prompt=request.prompt,
            poem=poem,
            model_used=model_used,
            confidence=confidence,
            generation_time=generation_time
        )
        
        return PoemResponse(
            poem=poem,
            model_used=model_used,
            confidence_score=confidence,
            generation_time=generation_time,
            style=request.style,
            tone=request.tone
        )
        
    except Exception as e:
        logger.error(f"Error generating poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate poem: {str(e)}")

async def generate_hybrid_poem(
    prompt: str, 
    style: str, 
    tone: str, 
    language: str,
    max_length: int
) -> tuple[str, str, float]:
    """
    Generate poem using hybrid system (local model + fallback)
    """
    try:
        # First, try local model
        poem, confidence = await poet_model.generate_poem(
            prompt, style, tone, language, max_length
        )
        
        # If confidence is low, use fallback
        if confidence < 0.7:  # Threshold for fallback
            logger.info("Low confidence, using fallback model")
            fallback_poem, fallback_confidence = await fallback_handler.generate_poem(
                prompt, style, tone, language, max_length
            )
            
            # Use the better result
            if fallback_confidence > confidence:
                return fallback_poem, "fallback_model", fallback_confidence
            else:
                return poem, "local_model", confidence
        else:
            return poem, "local_model", confidence
            
    except Exception as e:
        logger.warning(f"Local model failed, using fallback: {str(e)}")
        # Fallback to external API
        fallback_poem, fallback_confidence = await fallback_handler.generate_poem(
            prompt, style, tone, language, max_length
        )
        return fallback_poem, "fallback_model", fallback_confidence

@app.post("/refine-poem")
async def refine_poem(request: PoemRequest):
    """
    Refine an existing poem or generate variations
    """
    try:
        # Generate multiple variations
        variations = []
        for i in range(3):
            poem, model_used, confidence = await generate_hybrid_poem(
                request.prompt, request.style, request.tone, request.language, request.max_length
            )
            variations.append({
                "poem": poem,
                "confidence": confidence,
                "model_used": model_used
            })
        
        return {
            "variations": variations,
            "original_prompt": request.prompt
        }
        
    except Exception as e:
        logger.error(f"Error refining poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to refine poem: {str(e)}")

@app.post("/add-user-poem")
async def add_user_poem(request: TrainingRequest, background_tasks: BackgroundTasks):
    """
    Add user-generated poem to training dataset
    """
    try:
        # Add to dataset
        await data_manager.add_user_poem(
            prompt=request.user_prompt,
            poem=request.user_poem,
            style=request.style,
            tone=request.tone
        )
        
        # Schedule background training if dataset is large enough
        background_tasks.add_task(schedule_retraining)
        
        return {
            "message": "Poem added to training dataset",
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Error adding user poem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add poem: {str(e)}")

async def schedule_retraining():
    """
    Schedule model retraining if dataset has grown significantly
    """
    try:
        dataset_size = await data_manager.get_dataset_size()
        if dataset_size > 500:  # Retrain if we have 500+ new poems
            logger.info("Scheduling model retraining...")
            await poet_model.retrain_model()
            
    except Exception as e:
        logger.error(f"Error scheduling retraining: {str(e)}")

@app.get("/model-status", response_model=ModelStatus)
async def get_model_status():
    """
    Get current model status and statistics
    """
    try:
        dataset_size = await data_manager.get_dataset_size()
        last_training = await data_manager.get_last_training_date()
        
        return ModelStatus(
            local_model_loaded=poet_model.is_model_loaded(),
            fallback_available=fallback_handler.is_available(),
            dataset_size=dataset_size,
            last_training=last_training
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
    """
    Analyze mood from uploaded image and suggest poetic prompts
    """
    try:
        # This would integrate with image analysis
        # For now, return default suggestions
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