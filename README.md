# AmoraVerse 🌹

> AI-powered romantic poetry generation platform with hybrid architecture combining local models and cloud AI

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Aditya060806/AmoraVerse)

## 🚀 Quick Deployment

### One-Click Deploy to Vercel
```bash
# Clone the project
git clone https://github.com/Aditya060806/AmoraVerse.git
cd AmoraVerse

# Install dependencies
npm install

# Deploy to Vercel
npm run deploy
```

### Detailed Deployment Guides
- [Quick Deployment Guide](./QUICK_DEPLOY.md) - Complete deployment in 5 minutes
- [Detailed Deployment Documentation](./DEPLOYMENT.md) - Complete deployment instructions

## ✨ Features

### 🎭 Poetry Generation
- **Hybrid AI Architecture**: Local models + Cloud AI fallback
- **Multiple Styles**: Free verse, sonnets, haiku, and more
- **Emotional Tones**: Romantic, passionate, gentle, mystical, and more
- **Multi-language Support**: English, Hindi, Urdu, and more

### 🖼️ Image Analysis
- **Mood Recognition**: Analyze emotions from photos
- **Smart Prompts**: Generate poetry suggestions based on images
- **Visual Inspiration**: Transform visual elements into poetry

### 💝 Personalization Features
- **Love Vault**: Save precious poems
- **Photo Upload**: Upload couple photos for inspiration
- **Sharing Options**: Multiple sharing formats (PDF, images)
- **User Training**: Add personal poems to improve models

### 🎨 User Experience
- **Modern UI**: Elegant responsive design
- **Real-time Generation**: Fast poetry creation
- **Interactive Editing**: Real-time modification and optimization
- **Mobile Optimized**: Perfect adaptation for phones and tablets

## 🏗️ Technical Architecture

### Frontend Tech Stack
- **React 18** + **TypeScript**
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **Shadcn/ui** - Component library
- **React Router** - Route management

### Backend Tech Stack
- **FastAPI** - Python web framework
- **Transformers** - AI model library
- **SQLite** - Lightweight database
- **Uvicorn** - ASGI server

### AI Models
- **Local Model**: Fine-tuned DialoGPT
- **Cloud Fallback**: OpenAI GPT-4 / Anthropic Claude
- **Hybrid Routing**: Smart selection of best models
- **Confidence Scoring**: Automatic quality assessment

## 📁 Project Structure

```
AmoraVerse/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
├── backend/              # Backend API
│   ├── app.py           # Main API server
│   ├── poet_model.py    # Local AI model
│   ├── fallback_handler.py # External API integration
│   └── requirements.txt  # Python dependencies
├── scripts/              # Training and data scripts
├── data/                 # Training data and logs
└── model/               # Trained models
```

## 🚀 Quick Start

### Local Development

1. **Clone the project**
```bash
git clone https://github.com/Aditya060806/AmoraVerse.git
cd AmoraVerse
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
# Start frontend
npm run dev

# Start backend (new terminal)
npm run backend
```

4. **Access the application**
- Frontend: http://localhost:8080
- API Documentation: http://localhost:8001/docs

### Production Deployment

#### Vercel Deployment (Recommended)
```bash
npm run deploy
```

#### Manual Deployment
```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:

```env
# API Configuration
VITE_API_URL=https://your-app.vercel.app/api

# Optional AI service keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## 📊 Dataset Information

### 7 Stages of Love (Persian/Urdu Tradition)
- **Dilkashi (Attraction)**: Initial attraction and interest
- **Uns (Infatuation)**: Sweet madness of infatuation
- **Ishq (Love)**: Deep, passionate love
- **Akidat (Trust)**: Building trust in relationships
- **Ibadat (Worship)**: Loving someone like worship
- **Junoon (Madness)**: All-consuming passion
- **Maut (Death)**: Love that transcends death

### Poetry Styles
- Free verse, Ghazal, Shayari, Letter, Rhymed
- Sonnet, Haiku, Villanelle, Sestina, Ode

### Language Support
- English, Hindi, Urdu, Spanish, French, Mixed

### Emotional Tones
- Soft, Passionate, Playful, Soulful, Apology
- Long-distance, Proposal, Farewell, Mystical, Devotional

## 🤖 AI System Details

### Hybrid Architecture
1. **Local Model**: Fine-tuned DialoGPT for fast, private generation
2. **Fallback System**: GPT-4/Claude for high-quality results
3. **Confidence Scoring**: Automatic quality assessment
4. **Smart Routing**: Choose best model based on confidence

### Training Specifications
- **Base Model**: microsoft/DialoGPT-medium
- **Training Data**: 300+ romantic poems
- **Training Epochs**: 3-5 epochs
- **Learning Rate**: 2e-5
- **Batch Size**: 4
- **Optimizer**: AdamW

### API Endpoints
- `POST /generate-poem`: Generate romantic poetry
- `POST /refine-poem`: Generate multiple variations
- `POST /add-user-poem`: Add user poems to training data
- `GET /model-status`: Check model status
- `GET /styles`: Get available poetry styles
- `GET /tones`: Get available emotional tones
- `POST /analyze-mood`: Analyze mood from images

## 🎯 Usage Examples

### Generate Romantic Poetry
```javascript
const { generatePoem } = useAmoraVerseAPI();

const poem = await generatePoem({
  prompt: "Write a romantic poem about first love",
  style: "Free Verse",
  tone: "Passionate",
  language: "English"
});
```

### Add User Poetry for Training
```javascript
const { addUserPoem } = useAmoraVerseAPI();

await addUserPoem({
  prompt: "Write about sunset love",
  poem: "Your poetry content...",
  style: "User Generated",
  tone: "Personal"
});
```

## 🤝 Contributing

Welcome contributions! Please check [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Process
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Transformers](https://huggingface.co/transformers/) - AI model library
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://reactjs.org/) - User interface library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

- **Project Link**: [https://github.com/Aditya060806/AmoraVerse](https://github.com/Aditya060806/AmoraVerse)
- **Issue Reports**: [Issues](https://github.com/Aditya060806/AmoraVerse/issues)
- **Feature Requests**: [Feature Requests](https://github.com/Aditya060806/AmoraVerse/discussions)

---

⭐ If this project helps you, please give it a star!
