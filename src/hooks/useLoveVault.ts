import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PoemEntry {
  id: string;
  poemText: string;
  dateCreated: string;
  source: 'Image' | 'Text' | 'Easter Egg';
  tags: string[];
  favorite: boolean;
  associatedImage?: string;
  title?: string;
  style?: string;
  tone?: string;
}

export const useLoveVault = () => {
  const [poems, setPoems] = useState<PoemEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load poems from localStorage on mount
  useEffect(() => {
    try {
      const savedPoems = localStorage.getItem('loveVault_poems');
      if (savedPoems) {
        setPoems(JSON.parse(savedPoems));
      }
    } catch (error) {
      console.error('Error loading poems from storage:', error);
      toast({
        title: "Storage Error",
        description: "Could not load saved poems",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Save poems to localStorage whenever poems change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('loveVault_poems', JSON.stringify(poems));
      } catch (error) {
        console.error('Error saving poems to storage:', error);
        toast({
          title: "Storage Error",
          description: "Could not save poem",
          variant: "destructive"
        });
      }
    }
  }, [poems, loading, toast]);

  const savePoem = (
    poemText: string, 
    source: 'Image' | 'Text' | 'Easter Egg',
    metadata?: {
      title?: string;
      style?: string;
      tone?: string;
      associatedImage?: string;
      tags?: string[];
    }
  ): string => {
    const newPoem: PoemEntry = {
      id: crypto.randomUUID(),
      poemText,
      dateCreated: new Date().toISOString(),
      source,
      tags: metadata?.tags || extractTags(poemText),
      favorite: false,
      title: metadata?.title,
      style: metadata?.style,
      tone: metadata?.tone,
      associatedImage: metadata?.associatedImage
    };

    setPoems(prev => [newPoem, ...prev]);
    
    toast({
      title: "💖 Poem Saved!",
      description: "Added to your Love Vault",
      duration: 3000,
    });

    return newPoem.id;
  };

  const deletePoem = (id: string) => {
    setPoems(prev => prev.filter(poem => poem.id !== id));
    toast({
      title: "Poem Removed",
      description: "Poem deleted from your vault",
      duration: 2000,
    });
  };

  const toggleFavorite = (id: string) => {
    setPoems(prev => prev.map(poem => 
      poem.id === id 
        ? { ...poem, favorite: !poem.favorite }
        : poem
    ));
  };

  const updateTags = (id: string, newTags: string[]) => {
    setPoems(prev => prev.map(poem => 
      poem.id === id 
        ? { ...poem, tags: newTags }
        : poem
    ));
  };

  const updateTitle = (id: string, title: string) => {
    setPoems(prev => prev.map(poem => 
      poem.id === id 
        ? { ...poem, title }
        : poem
    ));
  };

  const searchPoems = (query: string): PoemEntry[] => {
    if (!query.trim()) return poems;
    
    const lowercaseQuery = query.toLowerCase();
    return poems.filter(poem => 
      poem.poemText.toLowerCase().includes(lowercaseQuery) ||
      poem.title?.toLowerCase().includes(lowercaseQuery) ||
      poem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getStats = () => {
    const totalPoems = poems.length;
    const favorites = poems.filter(p => p.favorite).length;
    const bySource = poems.reduce((acc, poem) => {
      acc[poem.source] = (acc[poem.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const allTags = poems.flatMap(p => p.tags);
    const uniqueTags = [...new Set(allTags)];
    
    return {
      totalPoems,
      favorites,
      bySource,
      uniqueTags,
      recentPoems: poems.slice(0, 5)
    };
  };

  return {
    poems,
    loading,
    savePoem,
    deletePoem,
    toggleFavorite,
    updateTags,
    updateTitle,
    searchPoems,
    getStats
  };
};

function extractTags(poemText: string): string[] {
  const words = poemText.toLowerCase().split(/\s+/);
  const commonTags: Record<string, string[]> = {
    love: ['love', 'heart', 'soul', 'forever', 'always'],
    nature: ['moon', 'star', 'sun', 'flower', 'ocean', 'rain', 'sky'],
    emotion: ['miss', 'happy', 'sad', 'joy', 'tears', 'smile', 'laugh'],
    romantic: ['kiss', 'embrace', 'dance', 'wedding', 'marry', 'proposal'],
    time: ['moment', 'time', 'memory', 'remember', 'yesterday', 'tomorrow'],
    distance: ['away', 'far', 'distance', 'apart', 'miss', 'gone'],
    seasons: ['spring', 'summer', 'autumn', 'winter', 'fall'],
    feelings: ['warm', 'cold', 'bright', 'dark', 'light', 'gentle', 'soft']
  };

  const extractedTags: string[] = [];
  
  for (const [tag, keywords] of Object.entries(commonTags)) {
    if (keywords.some(keyword => words.includes(keyword))) {
      extractedTags.push(tag);
    }
  }

  // Add custom tags based on unique words
  const uniqueWords = words.filter(word => 
    word.length > 4 && 
    !['the', 'and', 'you', 'your', 'that', 'this', 'with', 'from', 'they', 'have', 'will', 'been'].includes(word)
  );
  
  if (uniqueWords.length > 0 && extractedTags.length < 3) {
    extractedTags.push(uniqueWords[0]);
  }

  return extractedTags.slice(0, 5); // Limit to 5 tags
}