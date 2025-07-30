import React, { useState } from 'react';
import { Heart, Sparkles, Stars, Camera, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PromptGenerator } from '@/components/PromptGenerator';
import { PoemEditor } from '@/components/PoemEditor';
import { ShareOptions } from '@/components/ShareOptions';
import { LoveVault } from '@/components/LoveVault';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import heroImage from '@/assets/hero-romance.jpg';
import couplePhoto from '@/assets/couple-photo.jpg';
import loveLetter from '@/assets/love-letter.jpg';

const Index = () => {
  const [currentPoem, setCurrentPoem] = useState('');
  const [activeTab, setActiveTab] = useState('create');

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

  return (
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
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 animate-fade-in-up px-2 sm:px-4 md:px-0" style={{animationDelay: '0.6s'}}>
              <Button 
                variant="love" 
                size="lg"
                onClick={() => setActiveTab('create')}
                className="shadow-love w-full sm:w-auto text-xs sm:text-sm md:text-base h-10 sm:h-12 md:h-14 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Navigate to create poetry section"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" aria-hidden="true" />
                <span className="hidden md:inline">Start Creating Love</span>
                <span className="hidden sm:inline md:hidden">Create Poetry</span>
                <span className="sm:hidden">Create</span>
              </Button>
              <Button 
                variant="elegant" 
                size="lg"
                onClick={() => setActiveTab('vault')}
                className="w-full sm:w-auto text-xs sm:text-sm md:text-base h-10 sm:h-12 md:h-14 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Navigate to love vault to view saved poems"
              >
                <Stars className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" aria-hidden="true" />
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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 md:mb-8 bg-muted/50 backdrop-blur-sm gap-0.5 sm:gap-1 md:gap-0 h-10 sm:h-11">
            <TabsTrigger value="create" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <span className="hidden sm:inline">Create Poetry</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger value="edit" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <span className="hidden sm:inline">Refine Verse</span>
              <span className="sm:hidden">Edit</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <span className="hidden sm:inline">Share Love</span>
              <span className="sm:hidden">Share</span>
            </TabsTrigger>
            <TabsTrigger value="vault" className="font-soft data-[state=active]:bg-gradient-love data-[state=active]:text-white text-xs sm:text-sm h-8 sm:h-9">
              <span className="hidden sm:inline">Love Vault</span>
              <span className="sm:hidden">Vault</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <PhotoUpload onPhotoAnalyzed={handlePhotoAnalyzed} />
              <PromptGenerator onPoemGenerated={handlePoemGenerated} />
            </div>
            
            {/* Inspiration Gallery */}
            <div className="mt-6 sm:mt-8 md:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-elegant text-center text-primary mb-4 sm:mb-6 md:mb-8">
                Find Your Inspiration ✨
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="romance-card p-3 sm:p-4 md:p-6 text-center group cursor-pointer">
                  <img 
                    src={couplePhoto} 
                    alt="Romantic couple" 
                    className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-lg mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-elegant font-semibold text-primary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">From Photographs</h3>
                  <p className="text-xs sm:text-sm font-soft text-muted-foreground">
                    Let AI read the emotions in your cherished photos
                  </p>
                </div>
                
                <div className="romance-card p-3 sm:p-4 md:p-6 text-center group cursor-pointer">
                  <img 
                    src={loveLetter} 
                    alt="Love letter" 
                    className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-lg mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-elegant font-semibold text-primary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">From Your Heart</h3>
                  <p className="text-xs sm:text-sm font-soft text-muted-foreground">
                    Describe your feelings and watch them bloom into verse
                  </p>
                </div>
                
                <div className="romance-card p-3 sm:p-4 md:p-6 text-center group cursor-pointer sm:col-span-2 lg:col-span-1">
                  <div className="w-full h-32 sm:h-36 md:h-48 bg-gradient-poetry rounded-lg mb-2 sm:mb-3 md:mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary/60" />
                  </div>
                  <h3 className="font-elegant font-semibold text-primary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Surprise Me</h3>
                  <p className="text-xs sm:text-sm font-soft text-muted-foreground">
                    Generate random romantic verses for any occasion
                  </p>
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
            <LoveVault />
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
  );
};

export default Index;
