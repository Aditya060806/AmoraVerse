# AmoraVerse - AI Love Poetry Generator

A beautiful and romantic web application that generates AI-powered love poetry and creates personalized romantic experiences with a hybrid AI system combining fine-tuned local models and external APIs.

## 🌟 Features

### 🤖 AI-Powered Poetry Generation
- **Hybrid AI System**: Combines fine-tuned local models with GPT-4/Claude APIs
- **Custom Dataset**: 300+ romantic poems across multiple languages and styles
- **7 Stages of Love**: Dilkashi, Uns, Ishq, Akidat, Ibadat, Junoon, Maut
- **Multi-Language Support**: English, Hindi, Urdu, Spanish, French
- **Style Variations**: Free Verse, Ghazal, Shayari, Sonnet, Haiku, and more
- **Emotional Tones**: Soft, Passionate, Playful, Soulful, Apology, and more

### 🎨 Creative Features
- **Photo Upload & Mood Analysis**: Upload romantic photos for mood-based poetry
- **Love Vault**: Store and manage your romantic memories
- **Poem Editor**: Customize and edit generated poems
- **Share Options**: Share your creations with loved ones
- **Live Training Mode**: Add your poems to improve the AI model
- **Poetic Voice Presets**: TharoorStyle™, Rumi™, Shakespeare™, Faiz Ahmad Faiz™

### 📱 User Experience
- **Mobile Responsive**: Beautiful experience on all devices
- **Real-time Generation**: Fast, responsive poetry creation
- **Confidence Scoring**: AI confidence indicators for quality assurance
- **Multiple Variations**: Generate multiple poem versions
- **Export Options**: PDF, PNG, animated MP4 formats

## 🏗️ Architecture

```
AmoraVerse/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/          # Custom hooks including useAmoraVerseAPI
│   │   └── pages/          # Page components
├── backend/                 # FastAPI backend
│   ├── app.py              # Main API server
│   ├── poet_model.py       # Local AI model
│   ├── fallback_handler.py # External API integration
│   ├── data_manager.py     # Data management
│   └── requirements.txt    # Python dependencies
├── scripts/                # Training and data scripts
│   ├── generate_dataset.py # Dataset generation
│   └── fine_tune.py       # Model training
├── data/                   # Training data and logs
│   ├── romantic_poems_dataset.jsonl
│   ├── user_poems.jsonl
│   └── amora-verse.db
└── model/                  # Trained models
    └── amora-poet-model/
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- Python 3.8+
- Git

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/Aditya060806/AmoraVerse.git
cd AmoraVerse

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the backend server
python app.py
```

### Model Training
```bash
# Generate the dataset
python scripts/generate_dataset.py

# Train the model
python scripts/fine_tune.py
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
# API Keys (optional for fallback)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Database
DATABASE_URL=sqlite:///data/amora-verse.db

# Model Settings
MODEL_PATH=model/amora-poet-model
```

## 📊 Dataset Information

The AmoraVerse dataset includes:

### 7 Stages of Love (Persian/Urdu Tradition)
- **Dilkashi (Attraction)**: Initial attraction and interest
- **Uns (Infatuation)**: Sweet madness of infatuation
- **Ishq (Love)**: Deep, passionate love
- **Akidat (Trust)**: Building trust in relationships
- **Ibadat (Worship)**: Loving someone like worship
- **Junoon (Madness)**: All-consuming passion
- **Maut (Death)**: Love that transcends death

### Poetic Styles
- Free Verse, Ghazal, Shayari, Letter, Rhymed
- Sonnet, Haiku, Villanelle, Sestina, Ode

### Languages
- English, Hindi, Urdu, Spanish, French, Mixed

### Emotional Tones
- Soft, Passionate, Playful, Soulful, Apology
- Long-Distance, Proposal, Farewell, Mystical, Devotional

## 🤖 AI System Details

### Hybrid Architecture
1. **Local Model**: Fine-tuned DialoGPT for fast, private generation
2. **Fallback System**: GPT-4/Claude for high-quality results
3. **Confidence Scoring**: Automatic quality assessment
4. **Smart Routing**: Choose best model based on confidence

### Training Specifications
- **Base Model**: microsoft/DialoGPT-medium
- **Training Data**: 300+ romantic poems
- **Epochs**: 3-5 epochs
- **Learning Rate**: 2e-5
- **Batch Size**: 4
- **Optimizer**: AdamW

### API Endpoints
- `POST /generate-poem`: Generate romantic poetry
- `POST /refine-poem`: Generate multiple variations
- `POST /add-user-poem`: Add user poems to training data
- `GET /model-status`: Check model status
- `GET /styles`: Get available poetic styles
- `GET /tones`: Get available emotional tones
- `POST /analyze-mood`: Analyze mood from images

## 🎯 Usage Examples

### Generate a Romantic Poem
```javascript
const { generatePoem } = useAmoraVerseAPI();

const poem = await generatePoem({
  prompt: "Write a romantic poem about first love",
  style: "Free Verse",
  tone: "Passionate",
  language: "English"
});
```

### Add User Poem for Training
```javascript
const { addUserPoem } = useAmoraVerseAPI();

await addUserPoem({
  prompt: "Write about sunset love",
  poem: "Your love like sunset golden...",
  style: "Ghazal",
  tone: "Soulful"
});
```

## 📈 Performance Metrics

- **Generation Time**: < 2 seconds for local model
- **Confidence Score**: 0.7+ for high-quality poems
- **Dataset Size**: 300+ training examples
- **Model Accuracy**: Continuously improving with user feedback

## 🔄 Live Training

The system supports live training where:
1. Users can add their own poems
2. System automatically retrains when dataset grows
3. Model improves with user feedback
4. Maintains privacy with local training

## 🌍 Multi-Language Support

### Hindi Examples
```
जो बीत गया है वो, अब दौर ना आएगा;
इस दिल में सिवा तेरे कोई और ना आएगा;
```

### Urdu Examples
```
Husn-e-Jaana ki tareef mumkin nahi.
Uska husn mujhe kuch aise fasaa kar deta hai,
```

### Mixed Language Support
```
Ke balat kar dekhte hain... tujhko aage badh nahi paate,
Kitabe husn padhte hain, syllabus padh nahi paate.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your romantic poems to the dataset
4. Test the model training
5. Submit a pull request

### Adding Poems to Dataset
```bash
# Add your poems to data/user_poems.jsonl
echo '{"prompt": "Your prompt", "completion": "Your poem"}' >> data/user_poems.jsonl

# Retrain the model
python scripts/fine_tune.py
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Persian/Urdu poetic traditions
- Built with modern AI/ML technologies
- Community-driven dataset expansion
- Open-source poetry generation

## 📞 Support

For questions, issues, or contributions:
- GitHub Issues: [Report Issues](https://github.com/Aditya060806/AmoraVerse/issues)
- Discussions: [Join Discussions](https://github.com/Aditya060806/AmoraVerse/discussions)

---

**AmoraVerse** - Where AI meets the poetry of love 💕
