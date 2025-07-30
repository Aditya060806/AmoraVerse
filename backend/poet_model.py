#!/usr/bin/env python3
"""
AmoraVerse Poet Model
Local poetry generation model with fine-tuning capabilities
"""

import json
import os
import asyncio
import logging
from typing import Optional, Dict, Any, List
from datetime import datetime
import numpy as np
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM, 
    TrainingArguments, 
    Trainer,
    DataCollatorForLanguageModeling
)
import torch
from datasets import Dataset
import re

logger = logging.getLogger(__name__)

class AmoraVersePoet:
    def __init__(self, model_path: str = "model/amora-poet-model"):
        self.model_path = model_path
        self.tokenizer = None
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.is_loaded = False
        
        # Load model on initialization
        self.load_model()
    
    def load_model(self):
        """Load the fine-tuned model"""
        try:
            if os.path.exists(self.model_path):
                logger.info(f"Loading model from {self.model_path}")
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
                self.model = AutoModelForCausalLM.from_pretrained(self.model_path)
                self.model.to(self.device)
                self.is_loaded = True
                logger.info("Model loaded successfully")
            else:
                logger.warning(f"Model not found at {self.model_path}, using base model")
                self.load_base_model()
                
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            self.load_base_model()
    
    def load_base_model(self):
        """Load base model for fallback"""
        try:
            # Use a smaller, faster model for local generation
            model_name = "microsoft/DialoGPT-medium"  # Good for conversational text
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModelForCausalLM.from_pretrained(model_name)
            self.model.to(self.device)
            self.is_loaded = True
            logger.info("Base model loaded successfully")
            
        except Exception as e:
            logger.error(f"Error loading base model: {str(e)}")
            self.is_loaded = False
    
    def is_model_loaded(self) -> bool:
        """Check if model is loaded"""
        return self.is_loaded
    
    async def generate_poem(
        self, 
        prompt: str, 
        style: str = "Free Verse",
        tone: str = "Romantic",
        language: str = "English",
        max_length: int = 200
    ) -> tuple[str, float]:
        """
        Generate a romantic poem
        Returns: (poem, confidence_score)
        """
        try:
            if not self.is_loaded:
                raise Exception("Model not loaded")
            
            # Format the prompt with style and tone
            formatted_prompt = self._format_prompt(prompt, style, tone, language)
            
            # Tokenize input
            inputs = self.tokenizer.encode(
                formatted_prompt, 
                return_tensors="pt", 
                truncation=True, 
                max_length=512
            ).to(self.device)
            
            # Generate poem
            with torch.no_grad():
                outputs = self.model.generate(
                    inputs,
                    max_length=max_length + len(inputs[0]),
                    num_return_sequences=1,
                    temperature=0.8,
                    top_k=50,
                    top_p=0.9,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    eos_token_id=self.tokenizer.eos_token_id,
                    no_repeat_ngram_size=3
                )
            
            # Decode the generated text
            generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract the poem part (remove the prompt)
            poem = self._extract_poem(generated_text, formatted_prompt)
            
            # Calculate confidence score
            confidence = self._calculate_confidence(poem, style, tone)
            
            return poem, confidence
            
        except Exception as e:
            logger.error(f"Error generating poem: {str(e)}")
            # Return a fallback poem
            return self._generate_fallback_poem(prompt, style, tone), 0.5
    
    def _format_prompt(self, prompt: str, style: str, tone: str, language: str) -> str:
        """Format the prompt with style and tone instructions"""
        style_instructions = {
            "Free Verse": "Write a free verse romantic poem",
            "Ghazal": "Write a ghazal (Persian/Urdu poetic form) about love",
            "Shayari": "Write a shayari (Urdu poetry) about romance",
            "Letter": "Write a romantic love letter in poetic form",
            "Rhymed": "Write a rhymed romantic poem",
            "Sonnet": "Write a sonnet about love",
            "Haiku": "Write a haiku about love",
            "Villanelle": "Write a villanelle about romance",
            "Sestina": "Write a sestina about love",
            "Ode": "Write an ode to love"
        }
        
        tone_instructions = {
            "Soft": "with gentle, tender emotions",
            "Passionate": "with intense, fiery passion",
            "Playful": "with light, playful humor",
            "Soulful": "with deep, spiritual connection",
            "Apology": "expressing regret and seeking forgiveness",
            "Long-Distance": "about love across distance",
            "Proposal": "about marriage proposal",
            "Farewell": "about saying goodbye",
            "Mystical": "with mystical, magical elements",
            "Devotional": "with religious devotion and love"
        }
        
        style_instruction = style_instructions.get(style, "Write a romantic poem")
        tone_instruction = tone_instructions.get(tone, "with romantic emotions")
        
        if language == "Hindi":
            return f"{style_instruction} in Hindi {tone_instruction}: {prompt}"
        elif language == "Urdu":
            return f"{style_instruction} in Urdu {tone_instruction}: {prompt}"
        elif language == "Mixed":
            return f"{style_instruction} mixing Hindi and English {tone_instruction}: {prompt}"
        else:
            return f"{style_instruction} in English {tone_instruction}: {prompt}"
    
    def _extract_poem(self, generated_text: str, prompt: str) -> str:
        """Extract the poem part from generated text"""
        # Remove the original prompt
        if prompt in generated_text:
            poem = generated_text.replace(prompt, "").strip()
        else:
            poem = generated_text.strip()
        
        # Clean up the poem
        poem = re.sub(r'^\s*[:\-]\s*', '', poem)  # Remove leading punctuation
        poem = re.sub(r'\n\s*\n', '\n\n', poem)  # Normalize line breaks
        
        return poem
    
    def _calculate_confidence(self, poem: str, style: str, tone: str) -> float:
        """Calculate confidence score for the generated poem"""
        confidence = 0.7  # Base confidence
        
        # Check poem length
        if len(poem) > 50:
            confidence += 0.1
        
        # Check for poetic elements
        if any(word in poem.lower() for word in ['love', 'heart', 'soul', 'forever', 'beautiful']):
            confidence += 0.1
        
        # Check for rhyming (for rhymed style)
        if style == "Rhymed" and self._has_rhyming(poem):
            confidence += 0.1
        
        # Check for proper line breaks
        if '\n' in poem:
            confidence += 0.05
        
        return min(confidence, 1.0)
    
    def _has_rhyming(self, poem: str) -> bool:
        """Check if poem has rhyming lines"""
        lines = [line.strip() for line in poem.split('\n') if line.strip()]
        if len(lines) < 2:
            return False
        
        # Simple rhyming check (last word of each line)
        rhyming_pairs = 0
        for i in range(0, len(lines) - 1, 2):
            if i + 1 < len(lines):
                line1 = lines[i].split()[-1] if lines[i].split() else ""
                line2 = lines[i + 1].split()[-1] if lines[i + 1].split() else ""
                if line1 and line2 and line1[-2:] == line2[-2:]:
                    rhyming_pairs += 1
        
        return rhyming_pairs > 0
    
    def _generate_fallback_poem(self, prompt: str, style: str, tone: str) -> str:
        """Generate a simple fallback poem"""
        fallback_poems = [
            f"In the depths of my heart, I find you,\nEvery moment with you feels brand new.\nYour love is my guiding light,\nMaking everything feel so right.",
            
            f"Like stars in the night sky so bright,\nYour love fills my world with light.\nTogether we'll forever be,\nIn perfect harmony.",
            
            f"Your smile is my favorite sight,\nYour love makes everything right.\nIn your arms, I find my home,\nNever feeling alone."
        ]
        
        return random.choice(fallback_poems)
    
    async def train_model(self, dataset_path: str = "data/romantic_poems_dataset.jsonl"):
        """Train the model on the romantic poetry dataset"""
        try:
            logger.info("Starting model training...")
            
            # Load dataset
            dataset = self._load_dataset(dataset_path)
            if not dataset:
                raise Exception("No training data found")
            
            # Prepare training data
            training_data = self._prepare_training_data(dataset)
            
            # Initialize tokenizer and model for training
            model_name = "microsoft/DialoGPT-medium"
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            model = AutoModelForCausalLM.from_pretrained(model_name)
            
            # Add padding token
            tokenizer.pad_token = tokenizer.eos_token
            
            # Tokenize dataset
            def tokenize_function(examples):
                return tokenizer(
                    examples["text"],
                    truncation=True,
                    padding="max_length",
                    max_length=512
                )
            
            tokenized_dataset = training_data.map(tokenize_function, batched=True)
            
            # Training arguments
            training_args = TrainingArguments(
                output_dir="./model",
                overwrite_output_dir=True,
                num_train_epochs=3,
                per_device_train_batch_size=4,
                save_steps=500,
                save_total_limit=2,
                logging_steps=100,
                learning_rate=2e-5,
                warmup_steps=100,
                weight_decay=0.01,
                gradient_accumulation_steps=4,
            )
            
            # Data collator
            data_collator = DataCollatorForLanguageModeling(
                tokenizer=tokenizer,
                mlm=False,
            )
            
            # Initialize trainer
            trainer = Trainer(
                model=model,
                args=training_args,
                train_dataset=tokenized_dataset,
                data_collator=data_collator,
            )
            
            # Train the model
            trainer.train()
            
            # Save the model
            trainer.save_model(self.model_path)
            tokenizer.save_pretrained(self.model_path)
            
            logger.info("Model training completed successfully")
            
            # Reload the trained model
            self.load_model()
            
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise
    
    def _load_dataset(self, dataset_path: str) -> List[Dict[str, str]]:
        """Load the training dataset"""
        dataset = []
        try:
            with open(dataset_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip():
                        dataset.append(json.loads(line))
            logger.info(f"Loaded {len(dataset)} training examples")
        except Exception as e:
            logger.error(f"Error loading dataset: {str(e)}")
        
        return dataset
    
    def _prepare_training_data(self, dataset: List[Dict[str, str]]) -> Dataset:
        """Prepare training data for the model"""
        training_texts = []
        
        for entry in dataset:
            # Format as prompt + completion
            text = f"{entry['prompt']} {entry['completion']}"
            training_texts.append({"text": text})
        
        return Dataset.from_list(training_texts)
    
    async def retrain_model(self):
        """Retrain the model with new data"""
        try:
            # Combine original dataset with user-generated poems
            combined_dataset_path = "data/combined_dataset.jsonl"
            await self._combine_datasets(combined_dataset_path)
            
            # Train on combined dataset
            await self.train_model(combined_dataset_path)
            
        except Exception as e:
            logger.error(f"Error retraining model: {str(e)}")
    
    async def _combine_datasets(self, output_path: str):
        """Combine original dataset with user-generated poems"""
        try:
            original_data = self._load_dataset("data/romantic_poems_dataset.jsonl")
            user_data = self._load_dataset("data/user_poems.jsonl")
            
            combined_data = original_data + user_data
            
            with open(output_path, 'w', encoding='utf-8') as f:
                for entry in combined_data:
                    f.write(json.dumps(entry, ensure_ascii=False) + '\n')
            
            logger.info(f"Combined dataset saved with {len(combined_data)} entries")
            
        except Exception as e:
            logger.error(f"Error combining datasets: {str(e)}")

# Import random for fallback poems
import random 