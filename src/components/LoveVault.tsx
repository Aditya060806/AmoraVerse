import React, { useState } from 'react';
import { Heart, Calendar, Tag, Plus, BookHeart, Sparkles, Edit3, Trash2, Star, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLoveVault } from '@/hooks/useLoveVault';
import { useToast } from '@/hooks/use-toast';

interface LoveVaultProps {
  onNavigateToCreate?: () => void;
}

export const LoveVault: React.FC<LoveVaultProps> = ({ onNavigateToCreate }) => {
  const { poems, loading, deletePoem, toggleFavorite, updateTitle, updateTags } = useLoveVault();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const favoritePoems = poems.filter(poem => poem.favorite);
  const recentPoems = poems.slice(0, 5);

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.poemText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poem.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'favorites') return matchesSearch && poem.favorite;
    if (filter === 'recent') return matchesSearch && recentPoems.includes(poem);
    return matchesSearch;
  });

  const handleCreateNewMemory = () => {
    toast({
      title: "✨ Create New Memory",
      description: "Navigate to the create section to start your new poem...",
    });
    if (onNavigateToCreate) {
      onNavigateToCreate();
    }
  };

  const handleDeletePoem = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePoem(id);
    }
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  const handleEditTitle = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle || '');
  };

  const handleSaveTitle = (id: string) => {
    if (editTitle.trim()) {
      updateTitle(id, editTitle.trim());
      setEditingId(null);
      setEditTitle('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  if (loading) {
    return (
      <Card className="romance-card p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your love vault...</p>
        </div>
      </Card>
    );
  }

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

      {/* Search and Filter */}
      <div className="mb-4 sm:mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your poems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 vault-search-input"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="text-xs vault-filter-button"
          >
            All ({poems.length})
          </Button>
          <Button
            variant={filter === 'favorites' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('favorites')}
            className="text-xs vault-filter-button"
          >
            <Star className="w-3 h-3 mr-1" />
            Favorites ({favoritePoems.length})
          </Button>
          <Button
            variant={filter === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('recent')}
            className="text-xs vault-filter-button"
          >
            Recent ({recentPoems.length})
          </Button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Empty State */}
        {poems.length === 0 && (
          <div className="text-center py-8">
            <BookHeart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h4 className="text-lg font-elegant text-primary mb-2">Your Love Vault is Empty</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start creating beautiful poems to fill your vault with love
            </p>
            <Button onClick={handleCreateNewMemory} variant="love" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Poem
            </Button>
          </div>
        )}

        {/* No Search Results */}
        {poems.length > 0 && filteredPoems.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h4 className="text-lg font-elegant text-primary mb-2">No Poems Found</h4>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Poems Timeline */}
        {filteredPoems.length > 0 && (
          <div>
            <h4 className="font-soft font-medium mb-3 flex items-center text-sm sm:text-base">
              <Calendar className="w-4 h-4 text-primary mr-2" />
              {filter === 'favorites' ? 'Favorite Verses' : 
               filter === 'recent' ? 'Recent Memories' : 'Memory Timeline'}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {filteredPoems.map((poem, index) => (
                <div key={poem.id} className="relative">
                  {/* Timeline line */}
                  {index < filteredPoems.length - 1 && (
                    <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 vault-timeline-line"></div>
                  )}
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-love rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    
                    <Card className="flex-1 p-3 sm:p-4 bg-gradient-poetry border-primary/10 vault-poem-card">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                        <div className="flex-1">
                          {editingId === poem.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveTitle(poem.id);
                                  if (e.key === 'Escape') handleCancelEdit();
                                }}
                                autoFocus
                              />
                              <Button size="sm" onClick={() => handleSaveTitle(poem.id)}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <h5 className="font-elegant font-medium text-primary text-sm sm:text-base">
                              {poem.title || 'Untitled Poem'}
                            </h5>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(poem.dateCreated).toLocaleDateString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {poem.source}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-muted-foreground font-soft mb-3 line-clamp-3">
                        {poem.poemText}
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
                        
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleFavorite(poem.id)}
                            className="p-1 h-auto"
                          >
                            <Heart className={`w-4 h-4 ${poem.favorite ? 'text-accent fill-current' : 'text-muted-foreground'}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditTitle(poem.id, poem.title || '')}
                            className="p-1 h-auto"
                          >
                            <Edit3 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeletePoem(poem.id, poem.title || 'Untitled')}
                            className="p-1 h-auto text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create New Memory Button */}
        <Button 
          variant="elegant" 
          className="w-full text-sm sm:text-base" 
          size="lg"
          onClick={handleCreateNewMemory}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Memory
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground font-soft italic">
          "Every saved poem is a heartbeat preserved in time"
        </p>
        {poems.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {poems.length} poem{poems.length !== 1 ? 's' : ''} in your vault
          </p>
        )}
      </div>
    </Card>
  );
};