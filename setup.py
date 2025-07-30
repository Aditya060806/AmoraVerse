#!/usr/bin/env python3
"""
AmoraVerse Setup Script
Initializes the project with all necessary components
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def check_node_version():
    """Check if Node.js version is compatible"""
    try:
        result = subprocess.run("node --version", shell=True, capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"✅ Node.js {version} is installed")
        return True
    except:
        print("❌ Node.js is not installed or not in PATH")
        return False

def setup_backend():
    """Setup the Python backend"""
    print("\n🐍 Setting up Python backend...")
    
    # Create virtual environment
    if not run_command("python -m venv backend/venv", "Creating virtual environment"):
        return False
    
    # Activate virtual environment and install dependencies
    if os.name == 'nt':  # Windows
        pip_cmd = "backend\\venv\\Scripts\\pip"
    else:  # Unix/Linux/Mac
        pip_cmd = "backend/venv/bin/pip"
    
    if not run_command(f"{pip_cmd} install -r backend/requirements.txt", "Installing Python dependencies"):
        return False
    
    print("✅ Backend setup completed")
    return True

def setup_frontend():
    """Setup the React frontend"""
    print("\n⚛️ Setting up React frontend...")
    
    if not run_command("npm install", "Installing Node.js dependencies"):
        return False
    
    print("✅ Frontend setup completed")
    return True

def generate_dataset():
    """Generate the initial dataset"""
    print("\n📊 Generating dataset...")
    
    if not run_command("python scripts/generate_dataset.py", "Generating romantic poems dataset"):
        return False
    
    print("✅ Dataset generation completed")
    return True

def create_env_file():
    """Create environment file template"""
    env_content = """# AmoraVerse Environment Configuration

# API Keys (optional for fallback)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database
DATABASE_URL=sqlite:///data/amora-verse.db

# Model Settings
MODEL_PATH=model/amora-poet-model

# Server Settings
HOST=0.0.0.0
PORT=8000
RELOAD=true
"""
    
    env_file = Path("backend/.env")
    if not env_file.exists():
        with open(env_file, "w") as f:
            f.write(env_content)
        print("✅ Created .env file template")
    else:
        print("ℹ️ .env file already exists")

def create_directories():
    """Create necessary directories"""
    directories = [
        "data",
        "model",
        "backend/logs",
        "backend/data"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
    
    print("✅ Created necessary directories")

def main():
    """Main setup function"""
    print("🚀 AmoraVerse Setup Script")
    print("=" * 50)
    
    # Check prerequisites
    if not check_python_version():
        return False
    
    if not check_node_version():
        return False
    
    # Create directories
    create_directories()
    
    # Setup backend
    if not setup_backend():
        return False
    
    # Setup frontend
    if not setup_frontend():
        return False
    
    # Generate dataset
    if not generate_dataset():
        return False
    
    # Create environment file
    create_env_file()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Edit backend/.env with your API keys (optional)")
    print("2. Start the backend: npm run backend")
    print("3. Start the frontend: npm run dev")
    print("4. Train the model: npm run train")
    print("\n🌐 Access the application:")
    print("- Frontend: http://localhost:8080")
    print("- Backend API: http://localhost:8000")
    print("- API Docs: http://localhost:8000/docs")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 