#!/usr/bin/env python3
"""
AmoraVerse Backend Startup Script
Starts the FastAPI server with proper configuration
"""

import uvicorn
import os
import sys
from pathlib import Path

# Add current directory to Python path
sys.path.append(str(Path(__file__).parent))

if __name__ == "__main__":
    # Configuration
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    reload = os.getenv("RELOAD", "true").lower() == "true"
    
    print(f"🚀 Starting AmoraVerse Backend Server...")
    print(f"📍 Host: {host}")
    print(f"🔌 Port: {port}")
    print(f"🔄 Reload: {reload}")
    print(f"🌐 API URL: http://{host}:{port}")
    print(f"📚 API Docs: http://{host}:{port}/docs")
    
    # Start the server
    uvicorn.run(
        "app:app",
        host=host,
        port=port,
        reload=reload,
        log_level="info"
    ) 