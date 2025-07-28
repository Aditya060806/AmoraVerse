import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EasterEggTrigger {
  phrases: string[];
  poem: string;
  title: string;
  emoji: string;
}

const easterEggs: EasterEggTrigger[] = [
  {
    phrases: ['i miss you', 'missing you', 'i miss u', 'miss you so much'],
    title: '💔 Long Distance Love',
    emoji: '💔',
    poem: `Miles apart, yet hearts entwined,
In dreams, your touch I always find.
Each sunrise whispers of your name,
This distance just cannot contain
The love that bridges every mile,
Until I see your precious smile.

Time zones can't divide our souls,
Love conquers space, makes broken whole.`
  },
  {
    phrases: ['i\'m sorry', 'im sorry', 'forgive me', 'i apologize', 'sorry baby'],
    title: '🙏 Heartfelt Apology',
    emoji: '🙏',
    poem: `In shadows of my wrong, I stand,
With trembling heart and outstretched hand.
These words feel small for pain so deep,
Forgiveness is the dream I keep.

Let love rebuild what pride tore down,
Turn my regret to healing ground.
In your mercy, I find my way,
To love you better, starting today.`
  },
  {
    phrases: ['goodbye', 'farewell', 'ending', 'over', 'last time'],
    title: '🕊️ Gentle Farewell',
    emoji: '🕊️',
    poem: `Not all love stories find their end,
Some become memories that transcend.
What we shared will always glow,
A constellation's gentle show.

In letting go, I wish you well,
May joy be yours, may your heart swell.
Though paths divide, you'll stay with me,
A treasured part of who I'll be.`
  },
  {
    phrases: ['marry me', 'proposal', 'will you marry me', 'wedding', 'engagement'],
    title: '💍 Marriage Proposal',
    emoji: '💍',
    poem: `In this moment, time stands still,
My heart speaks with unwavering will.
You are my dawn, my guiding star,
My home, no matter where we are.

Will you dance with me through time?
Make this love our paradigm?
Say yes to dreams we'll build as one,
Our greatest journey's just begun.

Forever starts with you and me,
Will you marry me?`
  },
  {
    phrases: ['forever', 'always', 'eternity', 'infinite', 'endless love'],
    title: '💫 Eternal Love',
    emoji: '💫',
    poem: `Beyond the count of stars above,
Beyond the depths of ocean's love,
Past where time itself may cease,
There lives our love's eternal peace.

Forever is not just a word,
It's every promise ever heard
In whispered vows and silent prayer,
A love that nothing can compare.

In every lifetime yet to be,
I choose you for eternity.`
  },
  {
    phrases: ['first kiss', 'our first kiss', 'that kiss', 'when you kissed me'],
    title: '💋 First Kiss Memory',
    emoji: '💋',
    poem: `In that instant when lips first met,
The world around us seemed to set
Into a golden, timeless frame,
Nothing would ever be the same.

Electric whispers, hearts that race,
The universe in that embrace.
A moment carved in memory's stone,
The kiss that claimed me as your own.`
  }
];

export const useEasterEggs = () => {
  const { toast } = useToast();
  const [lastTriggered, setLastTriggered] = useState<string | null>(null);

  const checkForEasterEgg = useCallback((prompt: string): string | null => {
    const lowercasePrompt = prompt.toLowerCase().trim();
    
    const triggered = easterEggs.find(egg => 
      egg.phrases.some(phrase => lowercasePrompt.includes(phrase))
    );

    if (triggered && triggered.title !== lastTriggered) {
      setLastTriggered(triggered.title);
      
      toast({
        title: `${triggered.emoji} Special moment detected!`,
        description: `Creating a ${triggered.title.split(' ').slice(1).join(' ')} poem...`,
        duration: 4000,
      });

      return triggered.poem;
    }

    return null;
  }, [lastTriggered, toast]);

  return { checkForEasterEgg };
};