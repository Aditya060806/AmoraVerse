import React, { useState, useEffect } from 'react';
import { Edit3, RefreshCw, Languages, Image, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PoemEditorProps {
  poem: string;
  onPoemUpdated: (updatedPoem: string) => void;
}

export const PoemEditor: React.FC<PoemEditorProps> = ({ poem, onPoemUpdated }) => {
  const [editedPoem, setEditedPoem] = useState(poem);
  const [enhanceImagery, setEnhanceImagery] = useState(false);
  const [addMetaphors, setAddMetaphors] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setEditedPoem(poem);
    setIsTyping(true);
    
    // Simulate typewriter effect
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, [poem]);

  const refinePoem = async () => {
    if (!editedPoem.trim()) return;

    setIsRefining(true);

    // Simulate AI refinement
    setTimeout(() => {
      let refinedPoem = editedPoem;
      
      if (enhanceImagery) {
        refinedPoem = refinedPoem.replace(/smile/gi, 'radiant smile that illuminates the darkest corners of my soul');
        refinedPoem = refinedPoem.replace(/love/gi, 'love that burns like a thousand stars');
      }
      
      if (addMetaphors) {
        refinedPoem = refinedPoem.replace(/heart/gi, 'heart, a compass pointing always toward you');
        refinedPoem = refinedPoem.replace(/eyes/gi, 'eyes, twin galaxies holding all my tomorrows');
      }

      if (selectedLanguage === 'hindi') {
        refinedPoem = `तुम्हारी मुस्कान में छुपा है सारा जहाँ,
मेरी मोहब्बत की ये है सबसे प्यारी कहानी।
हर धड़कन में तुम्हारा ही नाम है,
तुम हो मेरी जिंदगी की असली निशानी।`;
      } else if (selectedLanguage === 'french') {
        refinedPoem = `Dans tes yeux, je trouve mon univers,
Ton sourire, ma plus belle découverte.
L'amour que nous partageons, si sincère,
Est la mélodie de mon cœur qui s'ouvre.`;
      }

      setEditedPoem(refinedPoem);
      onPoemUpdated(refinedPoem);
      setIsRefining(false);
      
      toast({
        title: "✨ Verse refined!",
        description: "Your poetry has been elevated to new heights...",
      });
    }, 3000);
  };

  const regenerateLines = () => {
    const lines = editedPoem.split('\n');
    const randomLineIndex = Math.floor(Math.random() * lines.length);
    
    const newLines = [
      "In your presence, time becomes a gentle whisper",
      "Your love paints rainbows across my stormy skies",
      "Each moment with you feels like coming home",
      "You are the verse my heart always wanted to write"
    ];
    
    lines[randomLineIndex] = newLines[Math.floor(Math.random() * newLines.length)];
    const newPoem = lines.join('\n');
    setEditedPoem(newPoem);
    onPoemUpdated(newPoem);
  };

  return (
    <Card className="romance-card p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="relative">
            <Edit3 className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse-love" />
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent absolute -top-1 -right-1 animate-float-heart" />
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-elegant font-semibold text-primary mb-2 text-center">
          Refine Your Verse
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-soft text-center px-2 sm:px-0">
          Polish your poetry until it shines like starlight
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-soft font-medium mb-2">
            Your Poem 💖
          </label>
          <div className="relative">
            <Textarea
              value={editedPoem}
              onChange={(e) => {
                setEditedPoem(e.target.value);
                onPoemUpdated(e.target.value);
              }}
              className={`font-elegant text-sm sm:text-base leading-relaxed border-primary/20 focus:border-primary/40 min-h-[150px] sm:min-h-[200px] ${
                isTyping ? 'typewriter' : ''
              }`}
              placeholder="Your beautiful verse will appear here..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-soft font-medium">
                Emphasize Imagery 🌅
              </label>
              <Switch
                checked={enhanceImagery}
                onCheckedChange={setEnhanceImagery}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-soft font-medium">
                Add Metaphors 🌙
              </label>
              <Switch
                checked={addMetaphors}
                onCheckedChange={setAddMetaphors}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-soft font-medium mb-2">
              Translate To 🌍
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="font-soft border-primary/20 text-sm sm:text-base">
                <SelectValue placeholder="Keep original language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindi">💫 Hindi</SelectItem>
                <SelectItem value="french">🇫🇷 French</SelectItem>
                <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                <SelectItem value="urdu">✨ Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button 
            onClick={refinePoem}
            variant="love" 
            className="flex-1 text-sm sm:text-base"
            disabled={isRefining}
          >
            {isRefining ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                <span className="hidden sm:inline">Refining...</span>
                <span className="sm:hidden">Refining...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Enhance Verse</span>
                <span className="sm:hidden">Enhance</span>
              </>
            )}
          </Button>
          
          <Button 
            onClick={regenerateLines}
            variant="poetry"
            className="flex-1 text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Regenerate Lines</span>
            <span className="sm:hidden">Regenerate</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground font-soft italic">
          "The best poems are never finished, only released into love"
        </p>
      </div>
    </Card>
  );
};