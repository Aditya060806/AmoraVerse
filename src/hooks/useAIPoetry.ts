import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AIPoetryParams {
  prompt: string;
  style: string;
  tone: number;
  isPhotoAnalysis?: boolean;
}

interface AdvancedPoemTemplate {
  [key: string]: {
    [toneRange: string]: string[];
  };
}

const advancedTemplates: AdvancedPoemTemplate = {
  'free-verse': {
    'nostalgic': [
      `{prompt_emotion} like autumn leaves returning,
Memories drift through golden light.
In {prompt_setting}, we found each other,
Two souls writing poetry in silence.

Time has painted our love story
In shades of {prompt_metaphor},
Each moment a verse we'll never forget,
Each word a promise carved in time.`,
      
      `I remember {prompt_detail},
The way your eyes held starlight,
How {prompt_feeling} bloomed between us
Like flowers after winter's end.

In quiet moments, I still hear
The echo of your laughter,
See how {prompt_emotion} danced
In the spaces between our words.`
    ],
    'tender': [
      `In the gentle morning light,
Your {prompt_detail} speaks to me
Of love that needs no grand gestures,
Only the soft whisper of hearts aligned.

{prompt_emotion} flows between us
Like a river finding home,
Each touch a prayer, each glance
A promise written in {prompt_metaphor}.`,
      
      `Your presence is my sanctuary,
Where {prompt_feeling} finds its voice.
In {prompt_setting}, we discovered
Love's most tender dialect.

Every breath shared, every silence
Holds the weight of forever,
In your eyes, I see my soul
Reflected in {prompt_emotion}.`
    ],
    'passionate': [
      `Fire meets fire when we collide,
{prompt_emotion} burns away the night.
In {prompt_setting}, desire speaks
A language only hearts can hear.

Your touch ignites my very core,
Sets {prompt_feeling} blazing wild,
Each kiss a flame that lights the way
To love's most {prompt_metaphor} depths.`,
      
      `You are the storm I choose to face,
The {prompt_emotion} that shakes my soul.
In your arms, I find the courage
To love with {prompt_feeling} unleashed.

Together we write symphonies
In {prompt_metaphor} and flame,
Each moment charged with electricity,
Each word a spark that lights forever.`
    ],
    'playful': [
      `You make my heart do silly things,
Like {prompt_emotion} on a rainy day.
When we're together in {prompt_setting},
Even mundane moments turn to magic.

Your {prompt_detail} makes me smile,
The way you {prompt_feeling} without care.
Love with you is an adventure,
Written in {prompt_metaphor} and laughter.`,
      
      `Who knew {prompt_emotion} could be so fun?
You turn ordinary into extraordinary,
Make {prompt_setting} feel like playground
Where our hearts can dance and play.

In your silliness, I find my joy,
In your laughter, my favorite song.
Love shouldn't always be serious—
With you, it's {prompt_metaphor} and light.`
    ],
    'devotional': [
      `In sacred silence, I worship
The miracle of {prompt_emotion}.
You are my temple, my prayer,
The divine made {prompt_metaphor}.

In {prompt_setting}, I found God
Reflected in your gentle eyes.
Each day with you is holy ground,
Where {prompt_feeling} becomes sacrament.`,
      
      `My love for you transcends the flesh,
Becomes something {prompt_emotion} and pure.
In quiet devotion, I offer
My heart upon love's altar.

You are my creed, my sacred text,
The {prompt_metaphor} that lights my way.
In loving you, I find my purpose,
In your love, my eternal home.`
    ]
  },
  'shakespearean': {
    'tender': [
      `When gentle {prompt_emotion} doth grace thy face,
And {prompt_setting} holds our whispered vows,
My heart finds in thy love its resting place,
Where {prompt_feeling} like spring's sweet blossom grows.

Thy {prompt_detail} speaks what words cannot convey,
A language written in {prompt_metaphor}'s light,
That turns the ordinary into sacred day,
And makes each moment blessed beyond delight.

In thee I find what poets dare to dream,
A love that makes the very heavens sing.`
    ],
    'passionate': [
      `What {prompt_emotion} burns within these veins,
What fire consumes when thou art near!
In {prompt_setting}, passion's sweet refrains
Do make thy {prompt_detail} crystal clear.

My soul, a {prompt_metaphor} of desire,
Doth reach for thee with longing's flame,
Where {prompt_feeling} sets hearts on fire,
And love becomes our sacred claim.

No force on earth could tear apart
What passion writes upon the heart.`
    ]
  },
  'shayari': {
    'tender': [
      `तेरी {prompt_emotion} में छुपे हैं हज़ारों ख्वाब,
मेरी मोहब्बत का यही है हिसाब।
{prompt_setting} की याद में,
तुम्हारे बिना अधूरा है हर एक जवाब।

{prompt_detail} से मिली है जो खुशी,
वो {prompt_metaphor} की तरह है प्यारी।
तुम हो तो ज़िंदगी है, नहीं तो
सब कुछ लगता है अधूरा सा, भारी।`,
      
      `इश्क़ की इस {prompt_emotion} में,
तेरा नाम है सबसे प्यारा।
{prompt_setting} हो या कोई और जगह,
तू ही है मेरा सहारा।

{prompt_feeling} से भरी है ये दुनिया,
जब तू है मेरे साथ में।
{prompt_metaphor} की तरह चमकती है
तेरी मुस्कान मेरे हाथ में।`
    ]
  },
  'ghazal': {
    'passionate': [
      `हर सुबह तेरे {prompt_emotion} से शुरू होती है,
मेरी मोहब्बत की ये कहानी होती है।

{prompt_setting} में तेरे साथ बिताए पल,
मेरे दिल की हर {prompt_feeling} सुनती है।

तेरी {prompt_detail} में छुपा है जो जमाना,
वो मेरे ख्वाबों की {prompt_metaphor} होती है।

इश्क़ में हमने जो राह चुनी है,
वो सिर्फ़ हमारी मंज़िल होती है।`
    ]
  },
  'cute': {
    'playful': [
      `You're my favorite {prompt_emotion} ever! 💕
Like a {prompt_metaphor} in my pocket,
Making every day in {prompt_setting}
Feel like a warm, fuzzy blanket.

Your {prompt_detail} makes me go "awww"
And your {prompt_feeling} makes me smile.
Being with you is like having
The cutest puppy for a while! 

P.S. You're sweeter than ice cream! 🍦`,
      
      `Roses are red, violets are blue,
{prompt_emotion} is what I feel with you!
In {prompt_setting}, we laugh and play,
You make my heart go "yay!" all day.

Your {prompt_detail} is absolutely adorable,
Makes me feel all {prompt_feeling} and more-able
To love you like a {prompt_metaphor},
Forever and a day! 💖`
    ]
  }
};

export const useAIPoetry = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAdvancedPoem = async (params: AIPoetryParams): Promise<string> => {
    setIsGenerating(true);

    try {
      // Simulate more sophisticated AI processing
      await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));

      const { prompt, style, tone } = params;
      
      // Extract emotional context and key elements from prompt
      const promptAnalysis = analyzePrompt(prompt);
      
      // Determine tone category
      const toneLabels = ['nostalgic', 'tender', 'playful', 'passionate', 'devotional'];
      const toneIndex = Math.floor((tone / 100) * (toneLabels.length - 1));
      const currentTone = toneLabels[toneIndex];

      // Get appropriate template
      let templates: string[] = [];
      
      if (style === 'cute' && advancedTemplates.cute['playful']) {
        templates = advancedTemplates.cute['playful'];
      } else if (style === 'shayari' && advancedTemplates.shayari['tender']) {
        templates = advancedTemplates.shayari['tender'];
      } else if (style === 'ghazal' && advancedTemplates.ghazal['passionate']) {
        templates = advancedTemplates.ghazal['passionate'];
      } else if (style === 'shakespearean' && advancedTemplates.shakespearean[currentTone]) {
        templates = advancedTemplates.shakespearean[currentTone];
      } else {
        templates = advancedTemplates['free-verse'][currentTone] || advancedTemplates['free-verse']['tender'];
      }

      // Select random template
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      // Replace placeholders with context-appropriate content
      const poem = template
        .replace(/\{prompt_emotion\}/g, promptAnalysis.emotion)
        .replace(/\{prompt_setting\}/g, promptAnalysis.setting)
        .replace(/\{prompt_detail\}/g, promptAnalysis.detail)
        .replace(/\{prompt_feeling\}/g, promptAnalysis.feeling)
        .replace(/\{prompt_metaphor\}/g, promptAnalysis.metaphor);

      return poem;
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzePhotoForPoetry = async (analysisText: string): Promise<string> => {
    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Convert photo analysis into poetic elements
      const photoElements = extractPhotoElements(analysisText);
      
      const photoPoems = [
        `In this captured moment, time stands still,
Where ${photoElements.emotion} speaks without words.
The ${photoElements.lighting} illuminates
Love's truest expression in ${photoElements.setting}.

Your ${photoElements.expression} tells a story
That a thousand verses couldn't write,
A single frame that holds forever
In its gentle, sacred light.`,

        `Frozen in time, this precious scene
Where ${photoElements.emotion} lives and breathes.
The ${photoElements.colors} paint a love story
That the heart believes and never leaves.

In ${photoElements.setting}, we found magic,
Your ${photoElements.expression} the sweetest art.
This moment captured speaks of love
That lives within each beating heart.`
      ];

      return photoPoems[Math.floor(Math.random() * photoPoems.length)];
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAdvancedPoem,
    analyzePhotoForPoetry,
    isGenerating
  };
};

function analyzePrompt(prompt: string) {
  const words = prompt.toLowerCase().split(/\s+/);
  
  // Emotion mapping
  const emotions = {
    happy: ['smile', 'laugh', 'joy', 'happy', 'cheerful', 'bright'],
    love: ['love', 'adore', 'cherish', 'treasure', 'heart', 'soul'],
    nostalgic: ['remember', 'memory', 'past', 'first', 'used', 'back'],
    longing: ['miss', 'want', 'need', 'wish', 'hope', 'dream'],
    tender: ['gentle', 'soft', 'warm', 'tender', 'sweet', 'kind']
  };

  // Setting indicators
  const settings = {
    nature: ['garden', 'beach', 'mountain', 'forest', 'sunset', 'sunrise', 'rain', 'moonlight'],
    home: ['home', 'bed', 'kitchen', 'room', 'house', 'apartment'],
    romantic: ['dinner', 'date', 'restaurant', 'candles', 'roses', 'wine'],
    casual: ['walk', 'talk', 'coffee', 'park', 'street', 'everyday']
  };

  // Analyze emotion
  let detectedEmotion = 'tenderness';
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => words.includes(keyword))) {
      detectedEmotion = emotion;
      break;
    }
  }

  // Analyze setting
  let detectedSetting = 'our quiet moments';
  for (const [setting, keywords] of Object.entries(settings)) {
    if (keywords.some(keyword => words.includes(keyword))) {
      detectedSetting = keywords.find(keyword => words.includes(keyword)) || setting;
      break;
    }
  }

  // Generate contextual elements
  const metaphors = [
    'starlight on water', 'petals in the wind', 'whispered promises', 
    'golden threads', 'morning dew', 'gentle rainfall', 'warm candlelight',
    'silk and shadow', 'cherry blossoms', 'autumn leaves'
  ];

  const feelings = [
    'butterflies', 'warmth', 'electricity', 'peace', 'wonder', 
    'magic', 'serenity', 'passion', 'comfort', 'bliss'
  ];

  const details = [
    'eyes', 'smile', 'touch', 'voice', 'laughter', 'hands', 
    'presence', 'embrace', 'gaze', 'whisper'
  ];

  return {
    emotion: detectedEmotion,
    setting: detectedSetting,
    metaphor: metaphors[Math.floor(Math.random() * metaphors.length)],
    feeling: feelings[Math.floor(Math.random() * feelings.length)],
    detail: details[Math.floor(Math.random() * details.length)]
  };
}

function extractPhotoElements(analysis: string) {
  // Extract elements from photo analysis text
  const words = analysis.toLowerCase();
  
  const emotions = ['tenderness', 'joy', 'love', 'serenity', 'passion', 'wonder'];
  const expressions = ['smile', 'gaze', 'embrace', 'touch', 'glance', 'presence'];
  const settings = ['gentle backdrop', 'intimate space', 'natural setting', 'cozy environment'];
  const lighting = ['soft light', 'warm glow', 'golden hour', 'gentle illumination'];
  const colors = ['warm tones', 'soft hues', 'gentle shades', 'harmonious colors'];

  return {
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    expression: expressions[Math.floor(Math.random() * expressions.length)],
    setting: settings[Math.floor(Math.random() * settings.length)],
    lighting: lighting[Math.floor(Math.random() * lighting.length)],
    colors: colors[Math.floor(Math.random() * colors.length)]
  };
}