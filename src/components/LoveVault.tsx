import React, { useState } from 'react';
import { Heart, Calendar, Tag, Plus, BookHeart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SavedPoem {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  favorite: boolean;
}

export const LoveVault: React.FC = () => {
  const [savedPoems] = useState<SavedPoem[]>([
    {
      id: '1',
      title: 'Sunset by the Lake',
      content: 'In golden light, your hand in mine...',
      date: '2024-01-15',
      tags: ['romantic', 'nature'],
      favorite: true
    },
    {
      id: '2',
      title: 'Morning Coffee Love',
      content: 'Steam rises like our shared dreams...',
      date: '2024-01-10',
      tags: ['daily-life', 'sweet'],
      favorite: false
    },
    {
      id: '3',
      title: 'Anniversary Wishes',
      content: 'Three years of building forever...',
      date: '2024-01-05',
      tags: ['anniversary', 'milestone'],
      favorite: true
    }
  ]);

  const favoritePoems = savedPoems.filter(poem => poem.favorite);

  return (
    <Card className="romance-card p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="relative">
            <BookHeart className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse-love" />
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent absolute -top-1 -right-1 animate-float-heart" />
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-elegant font-semibold text-primary mb-2 text-center">
          LoveVault
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-soft text-center px-2 sm:px-0">
          Your personal treasury of written hearts and whispered dreams
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Favorite Poems Section */}
        {favoritePoems.length > 0 && (
          <div>
            <h4 className="font-soft font-medium mb-3 flex items-center text-sm sm:text-base">
              <Heart className="w-4 h-4 text-accent mr-2" />
              Favorite Verses
            </h4>
            <div className="grid gap-3">
              {favoritePoems.map((poem) => (
                <Card key={poem.id} className="p-3 sm:p-4 bg-gradient-love/5 border-accent/30 hover:border-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-elegant font-medium text-primary text-sm sm:text-base">{poem.title}</h5>
                    <Heart className="w-4 h-4 text-accent fill-current flex-shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-soft mb-3 line-clamp-2">
                    {poem.content}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(poem.date).toLocaleDateString()}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {poem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Poems Timeline */}
        <div>
          <h4 className="font-soft font-medium mb-3 flex items-center text-sm sm:text-base">
            <Calendar className="w-4 h-4 text-primary mr-2" />
            Memory Timeline
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {savedPoems.map((poem, index) => (
              <div key={poem.id} className="relative">
                {/* Timeline line */}
                {index < savedPoems.length - 1 && (
                  <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-primary/20"></div>
                )}
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-love rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  <Card className="flex-1 p-3 sm:p-4 bg-gradient-poetry border-primary/10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                      <h5 className="font-elegant font-medium text-primary text-sm sm:text-base">{poem.title}</h5>
                      <div className="text-xs text-muted-foreground">
                        {new Date(poem.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground font-soft mb-3">
                      {poem.content}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex gap-1 flex-wrap">
                        {poem.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-primary/30">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {poem.favorite && (
                        <Heart className="w-4 h-4 text-accent fill-current flex-shrink-0" />
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="elegant" className="w-full text-sm sm:text-base" size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Create New Memory
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground font-soft italic">
          "Every saved poem is a heartbeat preserved in time"
        </p>
      </div>
    </Card>
  );
};