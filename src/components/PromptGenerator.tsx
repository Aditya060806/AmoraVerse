
import React, { useState, useCallback } from 'react';
import { Feather, Heart, Sparkles, Wand2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { useAIPoetry } from '@/hooks/useAIPoetry';
import { useLoveVault } from '@/hooks/useLoveVault';

interface PromptGeneratorProps {
  onPoemGenerated: (poem: string) => void;
}

const INSPIRATION_PROMPTS = [
  "The way your eyes light up when you laugh...",
  "Our first kiss under the moonlight...",
  "The warmth of your hand in mine...",
  "Dancing in the kitchen at midnight...",
  "The way you hum while cooking...",
  "Our quiet Sunday mornings together...",
  "The sound of your voice saying my name...",
  "Our favorite song playing on the radio...",
  "The way you look at me across the room...",
  "Our walks in the park during autumn..."
];

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({ onPoemGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [tone, setTone] = useState([50]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  const { checkForEasterEgg } = useEasterEggs();
  const { generateAdvancedPoem, isGenerating } = useAIPoetry();
  const { savePoem } = useLoveVault();

  const toneLabels = ['Nostalgic', 'Tender', 'Playful', 'Passionate', 'Devotional'];
  const currentTone = toneLabels[Math.floor((tone[0] / 100) * (toneLabels.length - 1))];

  const handleInspirationClick = useCallback((inspirationPrompt: string) => {
    setPrompt(inspirationPrompt);
    setIsExpanded(false);
  }, []);

  const generatePoem = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty heart",
        description: "Please share what inspires your love...",
        variant: "destructive"
      });
      return;
    }

    try {
      const easterEggPoem = checkForEasterEgg(prompt);
      
      let generatedPoem: string;
      let poemSource: 'Text' | 'Easter Egg' = 'Text';
      
      if (easterEggPoem) {
        generatedPoem = easterEggPoem;
        poemSource = 'Easter Egg';
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        generatedPoem = await generateAdvancedPoem({
          prompt,
          style: style || 'free-verse',
          tone: tone[0]
        });
      }
      
      const toneLabels = ['Nostalgic', 'Tender', 'Playful', 'Passionate', 'Devotional'];
      const currentTone = toneLabels[Math.floor((tone[0] / 100) * (toneLabels.length - 1))];
      
      savePoem(generatedPoem, poemSource, {
        title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
        style: style || 'free-verse',
        tone: currentTone,
        tags: prompt.toLowerCase().split(/\s+/).filter(word => word.length > 3).slice(0, 3)
      });
      
      onPoemGenerated(generatedPoem);
      
      const successMessage = poemSource === 'Easter Egg' 
        ? "✨ Special moment poetry created!"
        : "💫 Poetry born from your heart!";
        
      toast({
        title: successMessage,
        description: "Your heart's whisper has become verse...",
        duration: 4000,
      });
    } catch (error) {
      console.error('Poem generation error:', error);
      toast({
        title: "Generation Error",
        description: "Could not generate poem. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="romance-card p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="relative">
            <Feather className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary animate-pulse-love" />
            <Heart className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-accent absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 animate-float-heart" />
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-elegant font-semibold text-primary mb-1 sm:mb-2 text-center">
          Poetry Prompt
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-soft text-center px-1 sm:px-2 md:px-0">
          Share your heart's whisper and watch it bloom into poetry
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <label className="block text-xs sm:text-sm font-soft font-medium">
              What inspires your love? ✨
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs h-6 px-2 text-muted-foreground hover:text-primary"
              aria-expanded={isExpanded}
              aria-label="Toggle inspiration prompts"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Ideas
            </Button>
          </div>
          
          {isExpanded && (
            <div className="mb-2 p-2 sm:p-3 bg-muted/30 rounded-lg border border-primary/10">
              <p className="text-xs font-soft text-muted-foreground mb-2">
                Click any idea to use it as inspiration:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                {INSPIRATION_PROMPTS.map((inspirationPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleInspirationClick(inspirationPrompt)}
                    className="text-left text-xs sm:text-sm p-1 sm:p-2 rounded hover:bg-primary/10 transition-colors text-primary/80 hover:text-primary"
                  >
                    {inspirationPrompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <Textarea
            placeholder="Our first dance under the starlit sky... Her laugh when it rains... The way you hold my hand..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="font-soft resize-none border-primary/20 focus:border-primary/40 text-xs sm:text-sm md:text-base"
            rows={3}
            aria-describedby="prompt-description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-soft font-medium mb-1 sm:mb-2">
              Poetry Style 💫
            </label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="font-soft border-primary/20 text-xs sm:text-sm md:text-base h-10 sm:h-11">
                <SelectValue placeholder="Choose your style..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free-verse">💫 Free Verse</SelectItem>
                <SelectItem value="shayari">💞 Shayari</SelectItem>
                <SelectItem value="shakespearean">🎭 Shakespearean</SelectItem>
                <SelectItem value="cute">🧸 Cute & Funny</SelectItem>
                <SelectItem value="ghazal">🌸 Ghazal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-soft font-medium mb-1 sm:mb-2">
              Emotional Tone: {currentTone} 💕
            </label>
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 border border-primary/20 rounded-lg">
              <Slider
                value={tone}
                onValueChange={setTone}
                max={100}
                step={25}
                className="w-full"
                aria-label={`Emotional tone: ${currentTone}`}
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={generatePoem}
          variant="love" 
          size="lg"
          className="w-full text-xs sm:text-sm md:text-base h-12 sm:h-14 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={isGenerating}
          aria-describedby="prompt-description"
        >
          {isGenerating ? (
            <>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 animate-pulse-love" />
              <span className="hidden md:inline">Weaving your heart into verse...</span>
              <span className="hidden sm:inline md:hidden">Creating poetry...</span>
              <span className="sm:hidden">Creating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
              <span className="hidden md:inline">Generate Love Poetry</span>
              <span className="hidden sm:inline md:hidden">Generate Poetry</span>
              <span className="sm:hidden">Generate</span>
            </>
          )}
        </Button>
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <p 
          id="prompt-description"
          className="text-xs text-muted-foreground font-soft italic px-1 sm:px-0"
        >
          "Poetry is the echo of the heart's whisper in the soul's silence"
        </p>
      </div>
    </Card>
  );
};
