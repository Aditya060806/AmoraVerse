#!/usr/bin/env python3
"""
AmoraVerse Fallback Handler
Handles external API calls when local model fails or has low confidence
"""

import aiohttp
import asyncio
import json
import logging
import os
from typing import Optional, Dict, Any
import google.generativeai as genai
from anthropic import Anthropic

logger = logging.getLogger(__name__)

class FallbackHandler:
    def __init__(self):
        self.google_client = None
        self.anthropic_client = None
        self.is_available = False
        
        # Initialize API clients
        self._initialize_clients()
    
    def _initialize_clients(self):
        """Initialize external API clients"""
        try:
            # Google AI (Gemini) client
            google_api_key = os.getenv("GOOGLE_API_KEY")
            if google_api_key:
                genai.configure(api_key=google_api_key)
                self.google_client = genai.GenerativeModel('gemini-pro')
                logger.info("Google AI (Gemini) client initialized")
            
            # Anthropic client
            anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
            if anthropic_api_key:
                self.anthropic_client = Anthropic(api_key=anthropic_api_key)
                logger.info("Anthropic client initialized")
            
            self.is_available = bool(self.google_client or self.anthropic_client)
            
        except Exception as e:
            logger.error(f"Error initializing API clients: {str(e)}")
            self.is_available = False
    
    def is_available(self) -> bool:
        """Check if fallback APIs are available"""
        return self.is_available
    
    async def generate_poem(
        self, 
        prompt: str, 
        style: str = "Free Verse",
        tone: str = "Romantic",
        language: str = "English",
        max_length: int = 200
    ) -> tuple[str, float]:
        """
        Generate poem using external APIs
        Returns: (poem, confidence_score)
        """
        try:
            # Try Google AI (Gemini) first
            if self.google_client:
                poem, confidence = await self._generate_with_google(
                    prompt, style, tone, language, max_length
                )
                if poem:
                    return poem, confidence
            
            # Try Anthropic if Google AI fails
            if self.anthropic_client:
                poem, confidence = await self._generate_with_anthropic(
                    prompt, style, tone, language, max_length
                )
                if poem:
                    return poem, confidence
            
            # Return fallback poem if all APIs fail
            return self._generate_fallback_poem(prompt, style, tone), 0.6
            
        except Exception as e:
            logger.error(f"Error in fallback generation: {str(e)}")
            return self._generate_fallback_poem(prompt, style, tone), 0.5
    
    async def _generate_with_google(
        self, 
        prompt: str, 
        style: str, 
        tone: str, 
        language: str, 
        max_length: int
    ) -> tuple[str, float]:
        """Generate poem using Google AI (Gemini) API"""
        try:
            system_prompt = self._create_system_prompt(style, tone, language)
            
            # Combine system prompt and user prompt
            full_prompt = f"{system_prompt}\n\nUser request: {prompt}"
            
            response = self.google_client.generate_content(
                full_prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=max_length,
                    temperature=0.8,
                    top_p=0.9,
                    top_k=50
                )
            )
            
            poem = response.text.strip()
            confidence = 0.85  # High confidence for Gemini Pro
            
            return poem, confidence
            
        except Exception as e:
            logger.error(f"Google AI API error: {str(e)}")
            return None, 0.0
    
    async def _generate_with_anthropic(
        self, 
        prompt: str, 
        style: str, 
        tone: str, 
        language: str, 
        max_length: int
    ) -> tuple[str, float]:
        """Generate poem using Anthropic Claude API"""
        try:
            system_prompt = self._create_system_prompt(style, tone, language)
            
            response = await self.anthropic_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=max_length,
                temperature=0.8,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            poem = response.content[0].text.strip()
            confidence = 0.8  # Good confidence for Claude
            
            return poem, confidence
            
        except Exception as e:
            logger.error(f"Anthropic API error: {str(e)}")
            return None, 0.0
    
    def _create_system_prompt(self, style: str, tone: str, language: str) -> str:
        """Create system prompt for external APIs"""
        style_instructions = {
            "Free Verse": "Write in free verse style without strict rhyme or meter",
            "Ghazal": "Write in ghazal style with couplets and refrain",
            "Shayari": "Write in shayari style with Urdu/Hindi poetic form",
            "Letter": "Write as a romantic love letter",
            "Rhymed": "Write with consistent rhyming scheme",
            "Sonnet": "Write in sonnet form (14 lines, iambic pentameter)",
            "Haiku": "Write in haiku form (5-7-5 syllables)",
            "Villanelle": "Write in villanelle form with repeating lines",
            "Sestina": "Write in sestina form with word repetition",
            "Ode": "Write as an ode praising love"
        }
        
        tone_instructions = {
            "Soft": "Use gentle, tender, and delicate language",
            "Passionate": "Use intense, fiery, and emotional language",
            "Playful": "Use light, humorous, and fun language",
            "Soulful": "Use deep, spiritual, and meaningful language",
            "Apology": "Express regret and seek forgiveness",
            "Long-Distance": "Focus on love across physical distance",
            "Proposal": "Express marriage proposal and commitment",
            "Farewell": "Express goodbye and parting emotions",
            "Mystical": "Include mystical and magical elements",
            "Devotional": "Express religious devotion and love"
        }
        
        language_instructions = {
            "English": "Write in English",
            "Hindi": "Write in Hindi with English transliteration",
            "Urdu": "Write in Urdu with English transliteration",
            "Spanish": "Write in Spanish",
            "French": "Write in French",
            "Mixed": "Mix Hindi and English naturally"
        }
        
        style_instruction = style_instructions.get(style, "Write a romantic poem")
        tone_instruction = tone_instructions.get(tone, "with romantic emotions")
        language_instruction = language_instructions.get(language, "in English")
        
        system_prompt = f"""You are AmoraVerse, an AI poet specializing in romantic poetry. 
{style_instruction} {tone_instruction} {language_instruction}.

Guidelines:
- Create emotionally resonant and beautiful poetry
- Use vivid imagery and metaphors
- Maintain the specified style and tone
- Keep the poem concise and impactful
- Focus on love, romance, and emotional connection
- Use natural, flowing language
- Avoid clichés when possible
- Create a complete, standalone poem

Respond only with the poem, no additional text or explanations."""
        
        return system_prompt
    
    def _generate_fallback_poem(self, prompt: str, style: str, tone: str) -> str:
        """Generate a simple fallback poem when APIs are unavailable"""
        fallback_poems = [
            "In the quiet of my heart,\nI find your love, a work of art.\nEvery moment spent with you,\nMakes all my dreams come true.",
            
            "Like stars that light the night,\nYour love fills my world with light.\nTogether we'll forever be,\nIn perfect harmony.",
            
            "Your smile is my favorite sight,\nYour love makes everything right.\nIn your arms, I find my home,\nNever feeling alone.",
            
            "Through every storm and every trial,\nYour love makes it all worthwhile.\nWith you, my heart is complete,\nOur love is pure and sweet.",
            
            "In the garden of my heart,\nYour love blooms, a work of art.\nEvery day I love you more,\nThan I ever did before."
        ]
        
        import random
        return random.choice(fallback_poems)
    
    async def test_api_connectivity(self) -> Dict[str, bool]:
        """Test connectivity to external APIs"""
        results = {
            "google_ai": False,
            "anthropic": False
        }
        
        try:
            if self.google_client:
                # Simple test with Google AI
                response = self.google_client.generate_content("Hello")
                results["google_ai"] = True
        except Exception as e:
            logger.error(f"Google AI connectivity test failed: {str(e)}")
        
        try:
            if self.anthropic_client:
                # Simple test with Anthropic
                response = await self.anthropic_client.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=5,
                    messages=[{"role": "user", "content": "Hello"}]
                )
                results["anthropic"] = True
        except Exception as e:
            logger.error(f"Anthropic connectivity test failed: {str(e)}")
        
        return results 