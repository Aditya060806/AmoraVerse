#!/usr/bin/env python3
"""
AmoraVerse Data Manager
Manages user-generated poems and training data
"""

import json
import os
import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Optional
import sqlite3
from pathlib import Path

logger = logging.getLogger(__name__)

class DataManager:
    def __init__(self, db_path: str = "data/amoraverse.db"):
        self.db_path = db_path
        self.user_poems_file = "data/user_poems.jsonl"
        self.generation_logs_file = "data/generation_logs.jsonl"
        
        # Ensure data directory exists
        os.makedirs("data", exist_ok=True)
        
        # Initialize database
        self._init_database()
    
    def _init_database(self):
        """Initialize SQLite database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Create tables
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_poems (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    prompt TEXT NOT NULL,
                    poem TEXT NOT NULL,
                    style TEXT,
                    tone TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS generation_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    prompt TEXT NOT NULL,
                    poem TEXT NOT NULL,
                    model_used TEXT NOT NULL,
                    confidence REAL,
                    generation_time REAL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS model_training (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    training_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    dataset_size INTEGER,
                    epochs INTEGER,
                    loss REAL,
                    status TEXT
                )
            ''')
            
            conn.commit()
            conn.close()
            logger.info("Database initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing database: {str(e)}")
    
    async def add_user_poem(
        self, 
        prompt: str, 
        poem: str, 
        style: str = "User Generated",
        tone: str = "Personal"
    ):
        """Add user-generated poem to database and JSONL file"""
        try:
            # Add to database
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO user_poems (prompt, poem, style, tone)
                VALUES (?, ?, ?, ?)
            ''', (prompt, poem, style, tone))
            
            conn.commit()
            conn.close()
            
            # Add to JSONL file
            user_poem_entry = {
                "prompt": prompt,
                "completion": poem,
                "style": style,
                "tone": tone,
                "source": "user_generated",
                "timestamp": datetime.now().isoformat()
            }
            
            with open(self.user_poems_file, 'a', encoding='utf-8') as f:
                f.write(json.dumps(user_poem_entry, ensure_ascii=False) + '\n')
            
            logger.info(f"User poem added successfully")
            
        except Exception as e:
            logger.error(f"Error adding user poem: {str(e)}")
            raise
    
    async def log_generation(
        self, 
        prompt: str, 
        poem: str, 
        model_used: str, 
        confidence: float, 
        generation_time: float
    ):
        """Log poem generation for analytics"""
        try:
            # Add to database
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO generation_logs (prompt, poem, model_used, confidence, generation_time)
                VALUES (?, ?, ?, ?, ?)
            ''', (prompt, poem, model_used, confidence, generation_time))
            
            conn.commit()
            conn.close()
            
            # Add to JSONL file
            log_entry = {
                "prompt": prompt,
                "poem": poem,
                "model_used": model_used,
                "confidence": confidence,
                "generation_time": generation_time,
                "timestamp": datetime.now().isoformat()
            }
            
            with open(self.generation_logs_file, 'a', encoding='utf-8') as f:
                f.write(json.dumps(log_entry, ensure_ascii=False) + '\n')
            
        except Exception as e:
            logger.error(f"Error logging generation: {str(e)}")
    
    async def get_dataset_size(self) -> int:
        """Get total size of training dataset"""
        try:
            # Count original dataset
            original_size = 0
            if os.path.exists("data/romantic_poems_dataset.jsonl"):
                with open("data/romantic_poems_dataset.jsonl", 'r', encoding='utf-8') as f:
                    original_size = sum(1 for line in f if line.strip())
            
            # Count user poems
            user_size = 0
            if os.path.exists(self.user_poems_file):
                with open(self.user_poems_file, 'r', encoding='utf-8') as f:
                    user_size = sum(1 for line in f if line.strip())
            
            return original_size + user_size
            
        except Exception as e:
            logger.error(f"Error getting dataset size: {str(e)}")
            return 0
    
    async def get_last_training_date(self) -> Optional[str]:
        """Get the last training date"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT training_date FROM model_training 
                ORDER BY training_date DESC LIMIT 1
            ''')
            
            result = cursor.fetchone()
            conn.close()
            
            return result[0] if result else None
            
        except Exception as e:
            logger.error(f"Error getting last training date: {str(e)}")
            return None
    
    async def log_training(
        self, 
        dataset_size: int, 
        epochs: int, 
        loss: float, 
        status: str = "completed"
    ):
        """Log model training session"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO model_training (dataset_size, epochs, loss, status)
                VALUES (?, ?, ?, ?)
            ''', (dataset_size, epochs, loss, status))
            
            conn.commit()
            conn.close()
            
            logger.info(f"Training session logged: {status}")
            
        except Exception as e:
            logger.error(f"Error logging training: {str(e)}")
    
    async def get_user_poems(self, limit: int = 100) -> List[Dict]:
        """Get recent user-generated poems"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT prompt, poem, style, tone, created_at 
                FROM user_poems 
                ORDER BY created_at DESC 
                LIMIT ?
            ''', (limit,))
            
            results = cursor.fetchall()
            conn.close()
            
            poems = []
            for row in results:
                poems.append({
                    "prompt": row[0],
                    "poem": row[1],
                    "style": row[2],
                    "tone": row[3],
                    "created_at": row[4]
                })
            
            return poems
            
        except Exception as e:
            logger.error(f"Error getting user poems: {str(e)}")
            return []
    
    async def get_generation_stats(self) -> Dict:
        """Get generation statistics"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total generations
            cursor.execute('SELECT COUNT(*) FROM generation_logs')
            total_generations = cursor.fetchone()[0]
            
            # Model usage stats
            cursor.execute('''
                SELECT model_used, COUNT(*) 
                FROM generation_logs 
                GROUP BY model_used
            ''')
            model_stats = dict(cursor.fetchall())
            
            # Average confidence
            cursor.execute('SELECT AVG(confidence) FROM generation_logs')
            avg_confidence = cursor.fetchone()[0] or 0
            
            # Average generation time
            cursor.execute('SELECT AVG(generation_time) FROM generation_logs')
            avg_time = cursor.fetchone()[0] or 0
            
            conn.close()
            
            return {
                "total_generations": total_generations,
                "model_usage": model_stats,
                "average_confidence": round(avg_confidence, 3),
                "average_generation_time": round(avg_time, 3)
            }
            
        except Exception as e:
            logger.error(f"Error getting generation stats: {str(e)}")
            return {}
    
    async def export_training_data(self, output_file: str = "data/combined_dataset.jsonl"):
        """Export combined training data for model training"""
        try:
            combined_data = []
            
            # Add original dataset
            if os.path.exists("data/romantic_poems_dataset.jsonl"):
                with open("data/romantic_poems_dataset.jsonl", 'r', encoding='utf-8') as f:
                    for line in f:
                        if line.strip():
                            combined_data.append(json.loads(line))
            
            # Add user poems
            if os.path.exists(self.user_poems_file):
                with open(self.user_poems_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        if line.strip():
                            data = json.loads(line)
                            # Convert to training format
                            combined_data.append({
                                "prompt": data["prompt"],
                                "completion": data["completion"]
                            })
            
            # Write combined dataset
            with open(output_file, 'w', encoding='utf-8') as f:
                for entry in combined_data:
                    f.write(json.dumps(entry, ensure_ascii=False) + '\n')
            
            logger.info(f"Exported {len(combined_data)} training examples to {output_file}")
            return len(combined_data)
            
        except Exception as e:
            logger.error(f"Error exporting training data: {str(e)}")
            return 0
    
    async def cleanup_old_logs(self, days: int = 30):
        """Clean up old generation logs"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Delete logs older than specified days
            cursor.execute('''
                DELETE FROM generation_logs 
                WHERE created_at < datetime('now', '-{} days')
            '''.format(days))
            
            deleted_count = cursor.rowcount
            conn.commit()
            conn.close()
            
            logger.info(f"Cleaned up {deleted_count} old log entries")
            
        except Exception as e:
            logger.error(f"Error cleaning up logs: {str(e)}")
    
    async def backup_database(self, backup_path: str = None):
        """Create a backup of the database"""
        try:
            if not backup_path:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                backup_path = f"data/backup_{timestamp}.db"
            
            import shutil
            shutil.copy2(self.db_path, backup_path)
            
            logger.info(f"Database backed up to {backup_path}")
            
        except Exception as e:
            logger.error(f"Error backing up database: {str(e)}") 