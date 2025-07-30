import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Lock, Unlock, Heart, Star, BookOpen, Sparkles, ArrowLeft, Search, Filter, Bookmark, Share2, Copy, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoetryOfAditya: React.FC = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedText, setCopiedText] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Auto-focus on input when component mounts
  useEffect(() => {
    const input = document.getElementById('access-code-input');
    if (input) {
      input.focus();
    }
  }, []);

  const handleAccessCode = () => {
    if (accessCode === '1002') {
      setIsUnlocked(true);
      setError('');
      // Add success animation
      document.body.classList.add('unlock-success');
      setTimeout(() => {
        document.body.classList.remove('unlock-success');
      }, 2000);
    } else {
      setError('Invalid access code. Please try again.');
      // Add shake animation
      const card = document.querySelector('.access-card');
      if (card) {
        card.classList.add('shake');
        setTimeout(() => {
          card.classList.remove('shake');
        }, 500);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const toggleFavorite = (sectionId: string) => {
    setFavorites(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const categories = [
    { id: 'all', label: 'All Poetry', icon: BookOpen },
    { id: 'stages', label: '7 Stages', icon: Heart },
    { id: 'quotes', label: 'Quotes', icon: Star },
    { id: 'poems', label: 'Poems', icon: BookOpen },
    { id: 'definitions', label: 'Definitions', icon: Sparkles },
  ];

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <Card className="w-full max-w-md access-card relative z-10 transform transition-all duration-500 hover:scale-105 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Poetry of Aditya
            </CardTitle>
            <p className="text-gray-600 mt-3 text-lg">
              Enter the special access code to unlock this exclusive collection
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Input
                id="access-code-input"
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCode()}
                className="text-center text-xl font-mono border-2 border-purple-200 focus:border-purple-500 transition-colors"
              />
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-200 animate-shake">
                  {error}
                </div>
              )}
            </div>
            <Button 
              onClick={handleAccessCode}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Unlock className="w-5 h-5 mr-2" />
              Unlock Poetry
            </Button>
            
            <div className="text-center">
              <Link to="/" className="text-purple-600 hover:text-purple-800 text-sm flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to AmoraVerse
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header with Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <Unlock className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Poetry of Aditya
                </h1>
              </div>
            </div>
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              ✨ Exclusive Collection
            </Badge>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search through poetry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-purple-200 focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
                      : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 7 Stages of Love */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Heart className="w-6 h-6 mr-3" />
                  7 Stages of Love
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('stages')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('stages') ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('7 Stages of Love: Dilkashi, Uns, Ishq, Akidat, Ibadat, Junoon, Maut')}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { stage: 'Dilkashi', meaning: 'Attraction', color: 'from-red-400 to-pink-400' },
                  { stage: 'Uns', meaning: 'Infatuation', color: 'from-pink-400 to-purple-400' },
                  { stage: 'Ishq', meaning: 'Love', color: 'from-purple-400 to-indigo-400' },
                  { stage: 'Akidat', meaning: 'Trust', color: 'from-indigo-400 to-blue-400' },
                  { stage: 'Ibadat', meaning: 'Worship', color: 'from-blue-400 to-cyan-400' },
                  { stage: 'Junoon', meaning: 'Madness', color: 'from-cyan-400 to-teal-400' },
                  { stage: 'Maut', meaning: 'Death', color: 'from-teal-400 to-gray-400' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border border-gray-200 rounded-lg bg-gradient-to-r ${item.color} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    <h3 className="font-bold text-lg mb-1">{item.stage}</h3>
                    <p className="text-white/90">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Poetic Quotes and Phrases */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Poetic Quotes and Phrases
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('quotes')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('quotes') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-lg transform transition-all duration-300 hover:scale-105">
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "Itni gehrai se likhunga apne panno mein tumhe, ki padhne waalo roz talab ho jayegi tumhe dekhne ki."
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('Itni gehrai se likhunga apne panno mein tumhe, ki padhne waalo roz talab ho jayegi tumhe dekhne ki.')}
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="p-6 border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 rounded-r-lg transform transition-all duration-300 hover:scale-105">
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "In the realm of my poetry, you are the reason of creating the sense of muse at the core of mine."
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('In the realm of my poetry, you are the reason of creating the sense of muse at the core of mine.')}
                    className="text-pink-600 border-pink-300 hover:bg-pink-50"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Definition of Sajni */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Star className="w-6 h-6 mr-3" />
                  Definition of Sajni
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('sajni')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('sajni') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-lg"><strong>Sajni:</strong> Someone who's your constant. No matter if you see them daily or not, someone who resides deep in your veins and blood.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-l-4 border-orange-500">
                  <p className="text-lg">Sajni is someone you think of every time you pray to God.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-lg">Sajni is someone you can't even ignore, someone you can love for an entire lifetime and beyond.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-l-4 border-orange-500">
                  <p className="text-lg">Sajni is your comfort, your ocean of acceptance, a hug which can calm down each and every atom of you.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-lg">Sajni is someone beyond words and emotions, someone you'd let your existence merge into and dive into her eyes when you see your Sajni smile.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Miscellaneous Terms */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Miscellaneous Terms and Phrases</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('misc')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('misc') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <Badge variant="secondary" className="mb-2">dil-e-khush-Jahm</Badge>
                  <p className="text-sm">misconceived heart</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <Badge variant="secondary" className="mb-2">maktub</Badge>
                  <p className="text-sm">it is written</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <Badge variant="secondary" className="mb-2">taabir</Badge>
                  <p className="text-sm">interpretation of dreams</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <Badge variant="secondary" className="mb-2">Jevlis Ra</Badge>
                  <p className="text-sm">I love you! (Marathi/Men)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <Badge variant="secondary" className="mb-2">Jeulas ka</Badge>
                  <p className="text-sm">Have you eaten food? Fast lavkar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oh How I Wish Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Oh How I Wish Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('oh-wish')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('oh-wish') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700 italic">
                <p>Oh how I wish, that I was the music that you put your ears to and I would simply just add my soft spoken poems into your queue.</p>
                <p>Oh how I wish, I was the bracelet on your arms to be a reminder of love that we both understand.</p>
                <p>Oh how I wish, that I was the umbrella to protect you from the storm or at least let me be a coat that keeps you warm.</p>
                <p>Oh how I wish, I was the watch on your wrist to spend time with you I could never resist...</p>
              </div>
            </CardContent>
          </Card>

          {/* Thoughts on Love */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Thoughts on Love</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('thoughts-love')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('thoughts-love') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 text-gray-700">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p>If you could read my mind, you'll know how often I think about you, my mind has pictures of your smile stored in a folder named 'things I find cute'.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <p>I made you laugh the other day, after hearing the sound I stopped in my path. Everything was in slow motion. And I think I would love to get killed by your laugh.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p>I'm addicted to your name → That's why I keep practicing it on my neat tongue, but when you are near, I forget everything except to run.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <p>You are the reason people hate not being in love. You're a perfect poetry material, I've already turned you into poetry, Now, it's time to turn this fiction in my head real.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Short Flirty Lines */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Short Flirty/Romantic Lines</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('short-flirty')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('short-flirty') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "I can't hold a conversation, can I hold your hand?",
                  "Weaknesses: Your eyes.",
                  "You are all the music I will ever need.",
                  "I love you with all my belly, I would say heart but my belly is bigger.",
                  "I love vowels especially U.",
                  "Is there anything you'd change about me? ~ your last name."
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* One-Sided Love Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">One-Sided Love Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('one-sided-love')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('one-sided-love') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700 italic text-center">
                <p>I'll embrace the solitude, where my secret love resides,</p>
                <p>A one-sided lover's vigil, where my heart abides.</p>
                <p>For it's better to have loved alone, than to never love at all,</p>
                <p>In the solace of my longing, where silent whispers fall.</p>
              </div>
            </CardContent>
          </Card>

          {/* Hindi Poems */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Hindi Poems and Phrases</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('hindi-poems')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('hindi-poems') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <p className="text-gray-800">
                    जो बीत गया है वो, अब दौर ना आएगा; इस दिल में सिवा तेरे कोई और ना आएगा; घर फूँक दिया हमने, अब राख उठानी है, जिंदगी और कुछ भी नहीं, तेरी मेरी कहानी है।
                  </p>
                </div>
                <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
                  <p className="text-gray-800">Mere badalte andaaz ka iklauta raaz ho tum.</p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <p className="text-gray-800">Meri har kavita ka shirshak ho tum.</p>
                </div>
                <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
                  <p className="text-gray-800">Mujhe pyaar nahi ishq chahiye.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* English Romantic Quotes */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">English Romantic Quotes</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('english-quotes')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('english-quotes') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "You will never be unloved by me, you are too well tangled in my soul.",
                  "You are my Green!!",
                  "Shanivaar ki atki hui zindagi mein, Itvaar ka intezaar ho tum!",
                  "Do u like fruits? Can I be u nashpati.",
                  "You are fully dolled up!!",
                  "You are a mess, still a masterpiece."
                ].map((quote, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg bg-white">
                    <p className="text-gray-700">{quote}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hindi Poems Group 2 */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Hindi Poems and Phrases - Group 2</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('hindi-poems-group-2')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('hindi-poems-group-2') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <p className="text-gray-800">
                    Mujhe fursat kahan, main mausam suhana dekhoon, teri yaad se niklu toh zamaana dekhoon....
                  </p>
                </div>
                <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
                  <p className="text-gray-800">
                    Kuch toh chahat rahi hogi inn baarish ki boondon ki bhi, warna kaun girta hai iss zameen par aasmaan tak pahunchne ke baad.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <p className="text-gray-800">
                    Log apne mehboob se, mohabbat karte hain... Par mere apne mehboob ko hi mohabbat kaha hai.... Aur jab aapko mohabbat se mohabbat ho jaati hai..... Toh mohabbat ki inteha ho jaati hai.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Traitor in My Chest */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">The Traitor in My Chest Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('traitor-chest')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('traitor-chest') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>The traitor that resides in my chest, stays loyal to the remembrance of your name in any stage, she keeps my eyes telling to find things that remind me of you.</p>
                <p>When someone says "learn by heart", she means the song you're in.</p>
                <p>If I follow the quote, do as your heart says, your face will be all red with the blushes, your feet will never touch the hot floor, tears will turn into memories for your eyes, your wrists would always be filled with bangles, And: Your name and mine will become one.</p>
              </div>
            </CardContent>
          </Card>

          {/* Short Romantic Lines 2 */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Short Romantic Lines - List 2</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('short-romantic-lines-2')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('short-romantic-lines-2') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "If your love runs out, We'll use mine, I'll hotspot you!",
                  "You make me smile like a goofball.",
                  "You are a cougar.",
                  "Hold me close as I pour out my soul into these verses, you are the only anchor I need.",
                  "I never craved attention, until I tasted yours.",
                  "I am glad I love you, I cannot envisage a life without loving you.",
                  "You know, I'm starting to get a bit too happy seeing your name appear on my screen, and it's like I read it, and it's as if someone handed me a giant ice cream cone because you are the flower that is in bloom and I guess that makes sense of why my heart goes boom boom!",
                  "Were we destined to meet or was it just a sweet luck? My dear, you have no idea, how your smile has left me awestruck."
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hindi/English Mixed Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Hindi/English Mixed Poem - Ke Balat Kar</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('hindi-english-mixed')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('hindi-english-mixed') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Ke balat kar dekhte hain... tujhko aage badh nahi paate,</p>
                <p>Kitabe husn padhte hain, syllabus padh nahi paate.</p>
              </div>
            </CardContent>
          </Card>

          {/* Wo Aakash Mein Badal Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Wo Aakash Mein Badal Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('aakash-badal')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('aakash-badal') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2 text-gray-700">
                <p>Wo aakash mein badal.</p>
                <p>Wo aakash mein badal.</p>
                <p>Wo badal mein baarish.</p>
                <p>Wo baarish mein boondein.</p>
                <p>Wo boondon mein paani.</p>
                <p>Wo paani mein aansu.</p>
                <p>Wo aansu mein namak.</p>
                <p>Wo namak mein zakham.</p>
                <p>Wo zakham mein hun.</p>
                <p>Wo hun mein; Wo hun mein tun.</p>
                <p>Haan tun, har tun bas tum.</p>
              </div>
            </CardContent>
          </Card>

          {/* Flirty/Playful Lines */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Flirty/Playful Lines</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('flirty-lines')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('flirty-lines') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "I tried to send you something sexy but the mailman told me to get out of the mailbox.",
                  "I'm a man full of greed, I want to collect all your smiles, receive thousands of your kisses, And take upon myself all the troubles that ever try to come your way.",
                  "You are too fluent in me!"
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lafz Ki Shakal Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Lafz Ki Shakal Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('lafz-shakal')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('lafz-shakal') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Lafz ki shakal mein ehsaas likha jaata hai...</p>
                <p>Yahan paani ko bhi pyaas likha jaata hai...</p>
                <p>Mere jazbaat se waqif hai meri kalam...</p>
                <p>Main pyaar likhun toh uska naam likha jaata hai.</p>
              </div>
            </CardContent>
          </Card>

          {/* Tere Chehre Ko Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Tere Chehre Ko Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('tere-chehre-ko')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('tere-chehre-ko') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Tere chehre ko chaand batana ab bachkana lagta hai, teri gardan par sona sajana ab purana lagta hai,</p>
                <p>Kyunk i usse kya hi tolun sone mein, jis par zindagi apni haar di hai.</p>
                <p>Tere naam ko kehte rehna apne aap mein aarti hai.</p>
              </div>
            </CardContent>
          </Card>

          {/* You Are My Longest Hug */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">You Are My Longest Hug Description</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('you-are-my-longest-hug')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('you-are-my-longest-hug') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>You are my longest hug, my softest kiss and my most meaningful shooting star sighting in a world where I no longer believed in telescopes.</p>
                <p>You are the reason why Galileo must have first turned the telescope skywards, leading to the discovery of craters on the moon.</p>
                <p>It is said that because he loved the telescope so much and so dearly he used it to observe the sun, which eventually caused his blindness.</p>
                <p>Do you know what it feels like to be the blind guy who helped everyone else see the dark side of the moon?</p>
              </div>
            </CardContent>
          </Card>

          {/* Short Poetic Lines */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Short Poetic Lines - Group 3</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('short-poetic-lines')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('short-poetic-lines') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "If I were dared to shout to the world how much I love you, I would simply whisper it in your ears........",
                  "Bit by bit, she fits.",
                  "File by file, she is worthwhile.",
                  "Why so shy, butterfly? She is a lilac fairy.",
                  "And without realizing it, like a sacred epiphany, my soul found the home of my desires in you, I never knew that your body would be the cathedral of my prayers and my love."
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chandni Ugne Lagi Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Chandni Ugne Lagi Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('chandni-ugne-lagi')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('chandni-ugne-lagi') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Chandni ugne lagi hai baalon mein..</p>
                <p>Ye uns tun par haseen lagti hai....</p>
                <p>Yoon bhi acha hi lagta hai.</p>
                <p>Lekin dekh kar apni hamla shaakhein...</p>
                <p>Gulmohar phoola phoola rehta hai..</p>
                <p>Ab jo thodi si bhar gyi ho tum...</p>
                <p>Ye wazan tumpe acha lagta hai.</p>
              </div>
            </CardContent>
          </Card>

          {/* To the World Quote */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">To the World Quote</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('to-world-quote')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('to-world-quote') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                <p className="text-gray-800 italic text-center">
                  "To the world, you may be one person, but to one person, you may be the world."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quote on Thorns and Roses */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Quote on Thorns and Roses</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('thorns-and-roses')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('thorns-and-roses') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
                <p className="text-gray-800 italic text-center">
                  "He who dares not grasp the thorn, should never crave the rose."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* If I Think of Love Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">If I Think of Love Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('if-i-think-of-love')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('if-i-think-of-love') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700 italic">
                <p>If I should think of love, I'd think of you, your arms uplifted, Tying your hair in plaits above,</p>
                <p>The lyre shape of your arms and shoulders, the soft curve of your winding head.</p>
                <p>No melody is sweeter, nor could Orpheus so have bewitched. I think of this, And all my universe becomes perfection.</p>
                <p>But were you in my arms, dear love, The happiness would take my breath away, No thought could match that ecstasy, No song encompass it, no other worlds.</p>
                <p>If I should think of love, I'd think of you.</p>
              </div>
            </CardContent>
          </Card>

          {/* Hindi Internal Dialogue */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Hindi Internal Dialogue</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('hindi-internal-dialogue')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('hindi-internal-dialogue') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Dil kehta hai ki "Arrey uski bhi haan hai," Dimaag kehta hai "Par usne aisa kahan kaha hai"... dil kehta hai "Uski aankhon mein dekh," Dimaag kehta hai, "Par fir haath mein rehta kahan hai"...</p>
                <p>Mujhme ramiya hai laakh magar, poori kasti hai.</p>
                <p>Mujhme ramiya hai laakh magar, tu saari poori karti hai,</p>
                <p>Hum paas ho toh bas pyaar hi ho, jhagda toh duri karti hai.</p>
              </div>
            </CardContent>
          </Card>

          {/* Echoes of You */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Echoes of You</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('echoes-of-you')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('echoes-of-you') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                <p className="text-gray-800 italic">
                  Echoes of You: after you, I won't seek love again because I know if I do, I'll be searching for pieces of you in everyone I meet.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Husn-e-Jaana Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Husn-e-Jaana Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('husn-e-jaana')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('husn-e-jaana') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Husn-e-Jaana ki tareef mumkin nahi.</p>
                <p>Uska husn mujhe kuch aise fasaa kar deta hai,</p>
                <p>Usko choone jaata hu haath mara kar deta hai.</p>
                <p>Aankhein jhuk jaati hain, itna zyada chamakte hain,</p>
                <p>Uske jhumke mujhe jaise chaand bana kar deta hai.</p>
                <p>Aur ussey baatein karte waqt, uski baatein karni hain,</p>
                <p>Jo baat uski na ho toh wo arsuna kar deta hoon.</p>
                <p>Kismat badal jaati hai woh jisko bhi choo leta hai,</p>
                <p>Choo kar mitti ke keimat ko 10-20 guna kar deta hai.</p>
              </div>
            </CardContent>
          </Card>

          {/* She Is Water */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">She Is Water</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('she-is-water')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('she-is-water') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
                <p className="text-gray-800 italic">
                  She is water, powerful enough to drown you, soft enough to cleanse you, deep enough to save you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Short Poetic Reflections */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Short Poetic Reflections</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('short-poetic-reflections')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('short-poetic-reflections') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "And suddenly, every word I write or utter now breathes only your name.",
                  "In the quiet of my soul, you are the song that plays on repeat, a melody I never want to end."
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* In Your Eyes Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">In Your Eyes Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('in-your-eyes')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('in-your-eyes') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700 italic text-center">
                <p>In your eyes, I see the stars align,</p>
                <p>A love so pure, a bond divine.</p>
                <p>Your smile, it lights up my every day,</p>
                <p>In your embrace, I wish to stay.</p>
                <p>With every word, my heart takes flight,</p>
                <p>In your arms, the world feels right.</p>
                <p>Through every storm, our love will sail,</p>
                <p>Together forever, we shall prevail.</p>
              </div>
            </CardContent>
          </Card>

          {/* Description of Her Excitement */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Description of Her Excitement</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('description-excitement')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('description-excitement') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>When she is excited, her face becomes a canvas of pure joy, a sight I hold close to my heart.</p>
                <p>She looks absolutely breathtaking when she smiles -- those wide shining eyes filled with boundless happiness, and that smile, as radiant as a thousand suns.</p>
                <p>Every expression, every whisper, every graceful move she makes is poetry in motion.</p>
                <p>It's a silent verse that dances through my soul.</p>
                <p>In moments like these, I yearn to be by her side, to witness this divine beauty up close, to feel the warmth of her presence like a celestial embrace.</p>
              </div>
            </CardContent>
          </Card>

          {/* Samundar Ki Aadat Poem */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Samundar Ki Aadat Poem</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('samundar-ki-aadat')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('samundar-ki-aadat') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>Samundar ki aadat hai, kinaare chhod jaane ki.</p>
                <p>Lehron ki fitrat hai, wapas laut aane ki.</p>
                <p>Par ishq mera dariya nahi, lehron ka zariya nahi.</p>
                <p>Ek adhoori si chaahat hai, tumhe fir se chhu jaane ki.</p>
              </div>
            </CardContent>
          </Card>

          {/* Candle Flicker Narrative */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Candle Flicker Narrative</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('candle-flicker')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('candle-flicker') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                <p className="text-gray-800 italic">
                  As the last flicker of the candle died, the whispering shadows in the corner took form, and he realized that he was not alone in his own mind.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Final Short Lines */}
          <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl font-bold">Final Short Lines</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite('final-short-lines')}
                    className="text-white hover:bg-white/20"
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes('final-short-lines') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "You're my lady luck.",
                  "She's the proof God still loves me."
                ].map((line, index) => (
                  <div key={index} className="p-3 border border-purple-200 rounded-lg bg-white">
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
            <Badge variant="outline" className="text-purple-600 mb-4 text-lg">
              ✨ Exclusive Collection Unlocked ✨
            </Badge>
            <p className="text-gray-600 text-sm">
              Access Code: 1002 | Poetry of Aditya
            </p>
            {copiedText && (
              <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg animate-fade-in">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowLeft className="w-6 h-6 rotate-90" />
        </Button>
      </div>
    </div>
  );
};

export default PoetryOfAditya; 