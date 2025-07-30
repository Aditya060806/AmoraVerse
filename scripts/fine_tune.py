#!/usr/bin/env python3
"""
AmoraVerse Model Fine-tuning Script
Trains a custom model on romantic poetry dataset
"""

import os
import sys
import json
import logging
from pathlib import Path
import torch
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM, 
    TrainingArguments, 
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import Dataset
import numpy as np
from datetime import datetime

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
from data_manager import DataManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AmoraVerseTrainer:
    def __init__(self, model_name: str = "microsoft/DialoGPT-medium"):
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.data_manager = DataManager()
        
        logger.info(f"Using device: {self.device}")
    
    def load_model_and_tokenizer(self):
        """Load the base model and tokenizer"""
        try:
            logger.info(f"Loading model: {self.model_name}")
            
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
            
            # Add padding token if not present
            if self.tokenizer.pad_token is None:
                self.tokenizer.pad_token = self.tokenizer.eos_token
            
            self.model.to(self.device)
            
            logger.info("Model and tokenizer loaded successfully")
            
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
    
    def prepare_dataset(self, dataset_path: str = "data/romantic_poems_dataset.jsonl") -> Dataset:
        """Prepare the training dataset"""
        try:
            logger.info("Preparing training dataset...")
            
            # Load dataset
            dataset = []
            with open(dataset_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip():
                        dataset.append(json.loads(line))
            
            logger.info(f"Loaded {len(dataset)} training examples")
            
            # Format for training
            training_texts = []
            for entry in dataset:
                # Combine prompt and completion
                text = f"{entry['prompt']} {entry['completion']}"
                training_texts.append({"text": text})
            
            # Create dataset
            dataset = Dataset.from_list(training_texts)
            
            # Tokenize dataset
            def tokenize_function(examples):
                return self.tokenizer(
                    examples["text"],
                    truncation=True,
                    padding="max_length",
                    max_length=512,
                    return_tensors="pt"
                )
            
            tokenized_dataset = dataset.map(
                tokenize_function, 
                batched=True, 
                remove_columns=dataset.column_names
            )
            
            logger.info("Dataset prepared successfully")
            return tokenized_dataset
            
        except Exception as e:
            logger.error(f"Error preparing dataset: {str(e)}")
            raise
    
    def train_model(
        self, 
        dataset: Dataset, 
        output_dir: str = "model/amora-poet-model",
        num_epochs: int = 3,
        batch_size: int = 4,
        learning_rate: float = 2e-5
    ):
        """Train the model"""
        try:
            logger.info("Starting model training...")
            
            # Training arguments
            training_args = TrainingArguments(
                output_dir=output_dir,
                overwrite_output_dir=True,
                num_train_epochs=num_epochs,
                per_device_train_batch_size=batch_size,
                per_device_eval_batch_size=batch_size,
                save_steps=500,
                save_total_limit=2,
                logging_steps=100,
                learning_rate=learning_rate,
                warmup_steps=100,
                weight_decay=0.01,
                gradient_accumulation_steps=4,
                evaluation_strategy="no",
                save_strategy="steps",
                load_best_model_at_end=False,
                report_to=None,  # Disable wandb
                dataloader_pin_memory=False,
            )
            
            # Data collator
            data_collator = DataCollatorForLanguageModeling(
                tokenizer=self.tokenizer,
                mlm=False,
            )
            
            # Initialize trainer
            trainer = Trainer(
                model=self.model,
                args=training_args,
                train_dataset=dataset,
                data_collator=data_collator,
            )
            
            # Train the model
            logger.info("Training started...")
            train_result = trainer.train()
            
            # Save the model
            trainer.save_model()
            self.tokenizer.save_pretrained(output_dir)
            
            # Log training metrics
            metrics = train_result.metrics
            logger.info(f"Training completed. Metrics: {metrics}")
            
            # Log to database
            asyncio.run(self.data_manager.log_training(
                dataset_size=len(dataset),
                epochs=num_epochs,
                loss=metrics.get('train_loss', 0.0),
                status="completed"
            ))
            
            logger.info(f"Model saved to {output_dir}")
            
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise
    
    def evaluate_model(self, test_dataset: Dataset = None):
        """Evaluate the trained model"""
        try:
            logger.info("Evaluating model...")
            
            # Generate some test poems
            test_prompts = [
                "Write a romantic poem about first love",
                "Write a passionate poem about eternal love",
                "Write a soft poem about holding hands"
            ]
            
            for prompt in test_prompts:
                poem = self.generate_test_poem(prompt)
                logger.info(f"Prompt: {prompt}")
                logger.info(f"Generated: {poem}")
                logger.info("-" * 50)
            
        except Exception as e:
            logger.error(f"Error evaluating model: {str(e)}")
    
    def generate_test_poem(self, prompt: str, max_length: int = 100) -> str:
        """Generate a test poem"""
        try:
            inputs = self.tokenizer.encode(
                prompt, 
                return_tensors="pt", 
                truncation=True, 
                max_length=512
            ).to(self.device)
            
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
            
            generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract poem part
            if prompt in generated_text:
                poem = generated_text.replace(prompt, "").strip()
            else:
                poem = generated_text.strip()
            
            return poem
            
        except Exception as e:
            logger.error(f"Error generating test poem: {str(e)}")
            return "Error generating poem"
    
    def combine_datasets(self, output_file: str = "data/combined_dataset.jsonl"):
        """Combine original dataset with user-generated poems"""
        try:
            logger.info("Combining datasets...")
            
            combined_data = []
            
            # Add original dataset
            original_file = "data/romantic_poems_dataset.jsonl"
            if os.path.exists(original_file):
                with open(original_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        if line.strip():
                            combined_data.append(json.loads(line))
                logger.info(f"Added {len(combined_data)} original entries")
            
            # Add user poems
            user_file = "data/user_poems.jsonl"
            if os.path.exists(user_file):
                user_count = 0
                with open(user_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        if line.strip():
                            data = json.loads(line)
                            combined_data.append({
                                "prompt": data["prompt"],
                                "completion": data["completion"]
                            })
                            user_count += 1
                logger.info(f"Added {user_count} user-generated entries")
            
            # Write combined dataset
            with open(output_file, 'w', encoding='utf-8') as f:
                for entry in combined_data:
                    f.write(json.dumps(entry, ensure_ascii=False) + '\n')
            
            logger.info(f"Combined dataset saved with {len(combined_data)} entries")
            return len(combined_data)
            
        except Exception as e:
            logger.error(f"Error combining datasets: {str(e)}")
            return 0

def main():
    """Main training function"""
    try:
        logger.info("Starting AmoraVerse model training...")
        
        # Initialize trainer
        trainer = AmoraVerseTrainer()
        
        # Load model and tokenizer
        trainer.load_model_and_tokenizer()
        
        # Combine datasets
        combined_size = trainer.combine_datasets()
        if combined_size == 0:
            logger.error("No training data available")
            return
        
        # Prepare dataset
        dataset = trainer.prepare_dataset("data/combined_dataset.jsonl")
        
        # Train model
        trainer.train_model(
            dataset=dataset,
            num_epochs=3,
            batch_size=4,
            learning_rate=2e-5
        )
        
        # Evaluate model
        trainer.evaluate_model()
        
        logger.info("Training completed successfully!")
        
    except Exception as e:
        logger.error(f"Training failed: {str(e)}")
        raise

if __name__ == "__main__":
    import asyncio
    main() 