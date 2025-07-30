import React, { useState } from 'react';
import { Heart, Sparkles, Stars, Camera, BookOpen, Wand2, Image as ImageIcon, PenTool, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PromptGenerator } from '@/components/PromptGenerator';
import { PoemEditor } from '@/components/PoemEditor';
import { ShareOptions } from '@/components/ShareOptions';
import { LoveVault } from '@/components/LoveVault';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAIPoetry } from '@/hooks/useAIPoetry';
import heroImage from '@/assets/hero-romance.jpg';
import couplePhoto from '@/assets/couple-photo.jpg';
import loveLetter from '@/assets/love-letter.jpg';

const Index = () => {
  const [currentPoem, setCurrentPoem] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const { toast } = useToast();
  const { generateRandomPoem, isGenerating } = useAIPoetry();

  const handlePhotoAnalyzed = (analysis: string) => {
    // Convert analysis to poem format
    const poem = analysis.split('. ').join('.\n\n');
    setCurrentPoem(poem);
    setActiveTab('edit');
  };

  const handlePoemGenerated = (poem: string) => {
    setCurrentPoem(poem);
    setActiveTab('edit');
  };

  const handleInspirationCardClick = async (type: 'photo' | 'heart' | 'surprise', event: React.MouseEvent) => {
    // Add click animation
    const target = event.currentTarget as HTMLElement;
    target.classList.add('animate-card-hover');
    setTimeout(() => {
      target.classList.remove('animate-card-hover');
    }, 600);

    switch (type) {
      case 'photo':
        toast({
          title: "📸 Photo Poetry",
          description: "Upload a photo to generate poetry from your memories...",
        });
        setActiveTab('create');
        break;
      
      case 'heart':
        toast({
          title: "💝 Heart Poetry",
          description: "Share your feelings and watch them bloom into verse...",
        });
        setActiveTab('create');
        break;
      
      case 'surprise':
        toast({
          title: "✨ Surprise Poetry",
          description: "Generating a random romantic verse for you...",
        });
        
        try {
          const randomPoem = await generateRandomPoem();
          setCurrentPoem(randomPoem);
          setActiveTab('edit');
          toast({
            title: "🎉 Surprise Poem Generated!",
            description: "Your random romantic verse is ready to be refined...",
          });
        } catch (error) {
          toast({
            title: "❌ Generation Failed",
            description: "Please try again or use a different inspiration method.",
            variant: "destructive"
          });
        }
        break;
    }
  };

  const handleHeroButtonClick = (tab: string, event: React.MouseEvent) => {
    // Add button press animation
    const target = event.currentTarget as HTMLElement;
    target.classList.add('button-press');
    setTimeout(() => {
      target.classList.remove('button-press');
    }, 200);

    // Navigate to the specified tab
    setActiveTab(tab);
    
    // Smooth scroll to the tabs section
    setTimeout(() => {
      const tabsSection = document.querySelector('[data-tabs-section]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
    
    // Show toast notification
    if (tab === 'create') {
      toast({
        title: "💖 Start Creating",
        description: "Let's create something beautiful together...",
      });
    } else if (tab === 'vault') {
      toast({
        title: "📚 Explore Vault",
        description: "Discover your saved poems and memories...",
      });
    }
  };

    return (
    <>
      {/* Developed By Section - Fixed Position Outside Scrollable Content */}
      <div 
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          pointerEvents: 'auto',
          transform: 'none',
          willChange: 'auto'
        }}
        className="developed-by-fixed"
      >
        <div className="text-center">
          <p className="text-xs font-medium mb-2 text-primary/80">Developed By</p>
          <div className="flex space-x-2">
            <a
              href="https://github.com/Aditya060806"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-110"
              aria-label="Visit GitHub Profile"
            >
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/adityapandey_06/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-110"
              aria-label="Visit Instagram Profile"
            >
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
       <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Floating hearts animation */}
            <div className="absolute top-0 left-1/4 text-base sm:text-lg md:text-2xl animate-float-heart opacity-60">💖</div>
            <div className="absolute top-4 sm:top-6 md:top-10 right-1/4 text-sm sm:text-base md:text-xl animate-float-heart opacity-50" style={{animationDelay: '1s'}}>💫</div>
            <div className="absolute top-8 sm:top-12 md:top-20 left-1/3 text-xs sm:text-sm md:text-lg animate-float-heart opacity-40" style={{animationDelay: '2s'}}>✨</div>
            
            <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in-up flex justify-center items-center">
              <img 
                src="/AmoraVerse-bg.png" 
                alt="AmoraVerse" 
                className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 object-contain drop-shadow-2xl"
              />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-elegant text-primary/80 mb-2 sm:mb-3 md:mb-4 animate-fade-in-up px-1 sm:px-2 md:px-0" style={{animationDelay: '0.2s'}}>
              Where AI meets the language of love
            </p>
            
            <p className="text-sm sm:text-base md:text-lg font-soft text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up px-2 sm:px-4 md:px-0" style={{animationDelay: '0.4s'}}>
              Transform your deepest emotions into beautiful poetry. Generate, refine, and share 
              personalized love poems that capture the essence of your heart.
            </p>
            
                         <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 animate-fade-in-up px-2 sm:px-4 md:px-0" style={{animationDelay: '0.6s'}}>
              <Button 
                variant="love" 
                size="lg"
                 onClick={(e) => handleHeroButtonClick('create', e)}
                 className="hero-button hero-button-love shadow-love w-full sm:w-64 md:w-72 text-sm sm:text-base md:text-lg h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 hover:scale-105"
                aria-label="Navigate to create poetry section"
              >
                 <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" aria-hidden="true" />
                <span className="hidden md:inline">Start Creating Love</span>
                <span className="hidden sm:inline md:hidden">Create Poetry</span>
                <span className="sm:hidden">Create</span>
              </Button>
              <Button 
                variant="elegant" 
                size="lg"
                 onClick={(e) => handleHeroButtonClick('vault', e)}
                 className="hero-button hero-button-elegant w-full sm:w-64 md:w-72 text-sm sm:text-base md:text-lg h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 hover:scale-105"
                aria-label="Navigate to love vault to view saved poems"
              >
                 <Stars className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" aria-hidden="true" />
                <span className="hidden md:inline">Explore Vault</span>
                <span className="hidden sm:inline md:hidden">View Vault</span>
                <span className="sm:hidden">Vault</span>
              </Button>
            </div>
            
            {/* Poetry of Aditya Link */}
            <div className="mt-4 sm:mt-6 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <Link to="/poetry-of-aditya">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Poetry of Aditya</span>
                  <span className="sm:hidden">Aditya's Poetry</span>
                </Button>
              </Link>
            </div>
            
            {/* Pixel Amor Link */}
            <div className="mt-2 sm:mt-3 animate-fade-in-up" style={{animationDelay: '1s'}}>
              <a 
                href="https://pixel-amor.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Visit Pixel Amor</span>
                  <span className="sm:hidden">Pixel Amor</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
       <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12" data-tabs-section>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 md:mb-8 bg-muted/50 backdrop-blur-sm gap-0.5 sm:gap-1 md:gap-0 h-10 sm:h-11">
            <TabsTrigger value="create" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger value="edit" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <PenTool className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Refine Verse</span>
              <span className="sm:hidden">Edit</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Share Love</span>
              <span className="sm:hidden">Share</span>
            </TabsTrigger>
            <TabsTrigger value="vault" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Love Vault</span>
              <span className="sm:hidden">Vault</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <PhotoUpload onPhotoAnalyzed={handlePhotoAnalyzed} />
              <PromptGenerator onPoemGenerated={handlePoemGenerated} />
            </div>
            
            {/* Enhanced Inspiration Gallery */}
            <div className="mt-6 sm:mt-8 md:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-elegant text-center text-primary mb-4 sm:mb-6 md:mb-8">
                Find Your Inspiration ✨
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Photo Inspiration Card */}
                <div 
                  className="romance-card inspiration-card p-4 sm:p-6 md:p-8 text-center group cursor-pointer relative overflow-hidden"
                  onClick={(e) => handleInspirationCardClick('photo', e)}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 text-accent animate-float-heart opacity-60">📸</div>
                  <div className="absolute bottom-2 left-2 text-accent animate-float-heart opacity-40" style={{animationDelay: '1s'}}>💖</div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative inline-block">
                        <img 
                          src="/inspiration-photo.png" 
                          alt="Romantic couple at sunset" 
                          className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 inspiration-image"
                          onError={(e) => {
                            e.currentTarget.src = couplePhoto;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                          <ImageIcon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-elegant font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base md:text-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 mr-2 text-accent" />
                      From Photographs
                    </h3>
                    <p className="text-xs sm:text-sm font-soft text-muted-foreground mb-3 sm:mb-4">
                      Let AI read the emotions in your cherished photos and transform them into poetry
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1 text-accent" />
                        Memories
                      </span>
                      <span className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-1 text-accent" />
                        Emotions
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Heart Inspiration Card */}
                <div 
                  className="romance-card inspiration-card p-4 sm:p-6 md:p-8 text-center group cursor-pointer relative overflow-hidden"
                  onClick={(e) => handleInspirationCardClick('heart', e)}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 text-accent animate-float-heart opacity-60">💝</div>
                  <div className="absolute bottom-2 left-2 text-accent animate-float-heart opacity-40" style={{animationDelay: '1s'}}>✨</div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative inline-block">
                        <img 
                          src="/inspiration-heart.png" 
                          alt="Handwritten love letter with rose petals" 
                          className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 inspiration-image"
                          onError={(e) => {
                            e.currentTarget.src = loveLetter;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                          <PenTool className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-elegant font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base md:text-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 mr-2 text-accent" />
                      From Your Heart
                    </h3>
                    <p className="text-xs sm:text-sm font-soft text-muted-foreground mb-3 sm:mb-4">
                      Describe your feelings and watch them bloom into beautiful verses
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1 text-accent" />
                        Feelings
                      </span>
                      <span className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-1 text-accent" />
                        Dreams
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Surprise Inspiration Card */}
                <div 
                  className="romance-card inspiration-card p-4 sm:p-6 md:p-8 text-center group cursor-pointer relative overflow-hidden sm:col-span-2 lg:col-span-1"
                  onClick={(e) => handleInspirationCardClick('surprise', e)}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 text-accent animate-float-heart opacity-60">✨</div>
                  <div className="absolute bottom-2 left-2 text-accent animate-float-heart opacity-40" style={{animationDelay: '1s'}}>💫</div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative inline-block w-full">
                        <div className="w-full h-32 sm:h-36 md:h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                          {/* Animated sparkles */}
                          <div className="absolute inset-0">
                            <div className="absolute top-4 left-4 text-accent animate-float-heart">✨</div>
                            <div className="absolute top-8 right-6 text-accent animate-float-heart" style={{animationDelay: '0.5s'}}>💫</div>
                            <div className="absolute bottom-6 left-8 text-accent animate-float-heart" style={{animationDelay: '1s'}}>⭐</div>
                            <div className="absolute bottom-4 right-4 text-accent animate-float-heart" style={{animationDelay: '1.5s'}}>🌟</div>
                          </div>
                          
                          <div className="relative z-10">
                            <Wand2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <div className="mt-2 text-xs text-muted-foreground font-soft">AI Magic</div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                                         <h3 className="font-elegant font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base md:text-lg flex items-center justify-center">
                       <Wand2 className={`w-4 h-4 mr-2 text-accent ${isGenerating ? 'animate-spin' : ''}`} />
                       {isGenerating ? 'Generating...' : 'Surprise Me'}
                     </h3>
                    <p className="text-xs sm:text-sm font-soft text-muted-foreground mb-3 sm:mb-4">
                      Generate random romantic verses for any occasion with AI magic
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Zap className="w-3 h-3 mr-1 text-accent" />
                        Random
                      </span>
                      <span className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-1 text-accent" />
                        Magic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced call-to-action */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground font-soft italic mb-3">
                  Choose your inspiration and let love guide your words...
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="text-accent animate-pulse-love">💖</span>
                  <span className="text-accent animate-pulse-love" style={{animationDelay: '0.2s'}}>✨</span>
                  <span className="text-accent animate-pulse-love" style={{animationDelay: '0.4s'}}>💝</span>
                  <span className="text-accent animate-pulse-love" style={{animationDelay: '0.6s'}}>🌟</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            {currentPoem ? (
              <PoemEditor poem={currentPoem} onPoemUpdated={setCurrentPoem} />
            ) : (
              <div className="romance-card p-4 sm:p-6 md:p-8 lg:p-12 text-center">
                <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-muted mx-auto mb-3 sm:mb-4 md:mb-6 opacity-50" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-elegant text-primary mb-2 sm:mb-3 md:mb-4">No Poem to Edit Yet</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-soft mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2 md:px-0">
                  Create a beautiful poem first, then return here to refine it into perfection
                </p>
                <Button 
                  variant="love" 
                  onClick={() => setActiveTab('create')}
                  className="text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
                >
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Start Creating
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="share">
            <ShareOptions poem={currentPoem} />
          </TabsContent>

          <TabsContent value="vault">
            <LoveVault onNavigateToCreate={() => setActiveTab('create')} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-poetry border-t border-primary/10 py-4 sm:py-6 md:py-8 mt-8 sm:mt-12 md:mt-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 text-center">
          <div className="flex justify-center space-x-0.5 sm:space-x-1 md:space-x-2 mb-2 sm:mb-3 md:mb-4">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="text-accent animate-pulse-love text-xs sm:text-sm md:text-base" style={{animationDelay: `${i * 0.1}s`}}>
                💖
              </span>
            ))}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-romantic text-primary mb-1 sm:mb-2">AmoraVerse</h3>
          <p className="text-xs sm:text-sm font-soft text-muted-foreground italic px-2 sm:px-4 md:px-0">
            "Where every word is written with love, and every verse carries a heartbeat"
          </p>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;
