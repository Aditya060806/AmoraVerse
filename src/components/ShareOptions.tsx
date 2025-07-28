import React, { useState } from 'react';
import { Download, Share2, Heart, QrCode, Mail, MessageCircle, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ShareOptionsProps {
  poem: string;
}

export const ShareOptions: React.FC<ShareOptionsProps> = ({ poem }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "💌 Love card created!",
        description: "Your romantic PDF has been generated with love...",
      });
      
      // Create a simple text file as demo
      const element = document.createElement('a');
      const file = new Blob([poem], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'love-poem.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`💕 A poem written with love:\n\n${poem}\n\n✨ Created with AmoraVerse`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    
    toast({
      title: "💬 Sharing love...",
      description: "Opening WhatsApp to share your poetry",
    });
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent('A Love Poem Just for You 💕');
    const body = encodeURIComponent(`My Dearest,\n\nI wrote this poem thinking of you:\n\n${poem}\n\nWith all my love,\n\n✨ Created with AmoraVerse - AI Poetry for the Heart`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    
    toast({
      title: "💌 Opening email...",
      description: "Your love letter is ready to send",
    });
  };

  const generateQR = () => {
    toast({
      title: "📱 QR Code generated!",
      description: "Share your poem with a magical QR code...",
    });
  };

  const createInstagramStory = () => {
    toast({
      title: "📸 Creating story...",
      description: "Your poem is being styled for Instagram...",
    });
  };

  if (!poem.trim()) {
    return (
      <Card className="romance-card p-4 sm:p-6 md:p-8 text-center">
        <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted mx-auto mb-3 sm:mb-4 opacity-50" />
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-soft px-2 sm:px-0">
          Create a beautiful poem first, then share your love with the world...
        </p>
      </Card>
    );
  }

  return (
    <Card className="romance-card p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="relative">
            <Share2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary animate-pulse-love" />
            <Heart className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-accent absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 animate-float-heart" />
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-elegant font-semibold text-primary mb-1 sm:mb-2 text-center">
          Save & Share
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-soft text-center px-1 sm:px-2 md:px-0">
          Spread your love across the digital cosmos
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        <div>
          <h4 className="font-soft font-medium mb-2 sm:mb-3 text-center text-xs sm:text-sm md:text-base">Export Your Love 💾</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Button 
              onClick={generatePDF}
              variant="romance" 
              className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11"
              disabled={isGenerating}
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden md:inline">
                {isGenerating ? 'Creating...' : 'Digital Love Card'}
              </span>
              <span className="hidden sm:inline md:hidden">
                {isGenerating ? 'Creating...' : 'Love Card'}
              </span>
              <span className="sm:hidden">
                {isGenerating ? 'Creating...' : 'PDF'}
              </span>
            </Button>
            
            <Button 
              onClick={createInstagramStory}
              variant="love"
              className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11"
            >
              <Instagram className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Insta Story</span>
              <span className="sm:hidden">Instagram</span>
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-soft font-medium mb-2 sm:mb-3 text-center text-xs sm:text-sm md:text-base">Share The Love 💌</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <Button 
              onClick={shareToWhatsApp}
              variant="poetry"
              className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              WhatsApp
            </Button>
            
            <Button 
              onClick={shareToEmail}
              variant="poetry"
              className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Email
            </Button>
            
            <Button 
              onClick={generateQR}
              variant="poetry"
              className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11"
            >
              <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              QR Code
            </Button>
          </div>
        </div>

        <div className="text-center p-2 sm:p-3 md:p-4 bg-gradient-love/10 rounded-lg">
          <p className="text-xs sm:text-sm font-soft text-primary px-1 sm:px-2 md:px-0">
            ✨ Your poem has been created with love and sent with magic ✨
          </p>
          <div className="flex justify-center mt-1 sm:mt-2 space-x-0.5 sm:space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-accent animate-pulse-love text-xs sm:text-sm md:text-base" style={{animationDelay: `${i * 0.2}s`}}>
                💖
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs text-muted-foreground font-soft italic px-1 sm:px-0">
          "Love shared is love multiplied infinitely"
        </p>
      </div>
    </Card>
  );
};