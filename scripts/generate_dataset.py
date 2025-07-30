#!/usr/bin/env python3
"""
AmoraVerse Dataset Generator
Creates a comprehensive dataset of romantic poetry for fine-tuning
"""

import json
import random
from typing import List, Dict, Any

class AmoraVerseDatasetGenerator:
    def __init__(self):
        self.styles = ["Free Verse", "Ghazal", "Shayari", "Letter", "Rhymed", "Sonnet", "Haiku"]
        self.tones = ["Soft", "Passionate", "Playful", "Soulful", "Apology", "Long-Distance", "Proposal", "Farewell", "Mystical", "Devotional"]
        self.languages = ["English", "Hindi", "Urdu", "Mixed"]
        
    def create_7_stages_dataset(self) -> List[Dict[str, str]]:
        """Create dataset based on the 7 stages of love"""
        stages = {
            "Dilkashi (Attraction)": [
                "Write a poem about the first moment of attraction",
                "Describe the feeling of being drawn to someone",
                "Express the initial spark of interest"
            ],
            "Uns (Infatuation)": [
                "Write about the sweet madness of infatuation",
                "Describe the butterflies and daydreams",
                "Express the overwhelming thoughts of someone"
            ],
            "Ishq (Love)": [
                "Write about deep, passionate love",
                "Describe the intensity of true love",
                "Express the completeness of being in love"
            ],
            "Akidat (Trust)": [
                "Write about building trust in love",
                "Describe the foundation of a relationship",
                "Express the security of mutual trust"
            ],
            "Ibadat (Worship)": [
                "Write about loving someone like worship",
                "Describe the divine nature of love",
                "Express the reverence for your beloved"
            ],
            "Junoon (Madness)": [
                "Write about the madness of love",
                "Describe the obsessive nature of deep love",
                "Express the all-consuming passion"
            ],
            "Maut (Death)": [
                "Write about love that transcends death",
                "Describe eternal love beyond life",
                "Express the immortality of true love"
            ]
        }
        
        dataset = []
        for stage, prompts in stages.items():
            for prompt in prompts:
                dataset.append({
                    "prompt": f"Write a {random.choice(self.tones).lower()} poem about {stage.lower()}: {prompt}",
                    "completion": self._generate_stage_completion(stage, prompt)
                })
        return dataset
    
    def _generate_stage_completion(self, stage: str, prompt: str) -> str:
        """Generate appropriate completion for each stage"""
        completions = {
            "Dilkashi (Attraction)": [
                "In the crowded room, my eyes found yours,\nA moment suspended in time's gentle pause.\nYour smile, a beacon in the night,\nDrawing me closer with magnetic might.",
                "First sight, first light, first breath,\nYour presence makes my heart forget.\nIn your eyes, I see my fate,\nA love that time cannot abate."
            ],
            "Uns (Infatuation)": [
                "Day and night, your name I whisper,\nIn every dream, your face I see.\nMy heart beats only for your rhythm,\nIn this sweet madness, I am free.",
                "Butterflies dance in my stomach,\nWhen I think of your gentle touch.\nYour voice echoes in my mind,\nI love you, oh, so much."
            ],
            "Ishq (Love)": [
                "Beyond the stars, beyond the moon,\nMy love for you will never end.\nIn every breath, in every heartbeat,\nYou are my lover, my best friend.",
                "Deep as oceans, high as mountains,\nMy love for you knows no bounds.\nIn your arms, I find my heaven,\nWhere true happiness abounds."
            ],
            "Akidat (Trust)": [
                "In your eyes, I see my future,\nA love built on trust so true.\nTogether we face life's challenges,\nMy heart belongs only to you.",
                "Trust is the foundation of our love,\nBuilt brick by brick with care.\nIn your promises, I find my strength,\nA bond beyond compare."
            ],
            "Ibadat (Worship)": [
                "You are my temple, my sacred space,\nIn your love, I find my grace.\nEvery prayer, every devotion,\nLeads me to your sweet embrace.",
                "Like a devotee to his deity,\nI worship you with all my heart.\nYour love is my religion,\nFrom which I never want to part."
            ],
            "Junoon (Madness)": [
                "Mad with love, I roam the streets,\nYour name etched in my heart's beats.\nIn this madness, I find my peace,\nMy love for you will never cease.",
                "Crazy in love, that's what I am,\nYour love has made me who I am.\nIn this beautiful insanity,\nI find my perfect harmony."
            ],
            "Maut (Death)": [
                "Even death cannot separate us,\nOur love transcends the mortal plane.\nIn every life, in every universe,\nMy love for you will remain.",
                "Beyond the grave, beyond the stars,\nOur love will never fade away.\nIn eternity, we'll be together,\nForever and a day."
            ]
        }
        return random.choice(completions.get(stage, ["Love transcends all boundaries."]))
    
    def create_quotes_dataset(self) -> List[Dict[str, str]]:
        """Create dataset from the provided quotes and phrases"""
        quotes_data = [
            {
                "prompt": "Write a deep romantic poem about writing someone in your pages",
                "completion": "Itni gehrai se likhunga apne panno mein tumhe,\nki padhne waalo roz talab ho jayegi tumhe dekhne ki.\nIn the realm of my poetry, you are the reason of creating the sense of muse at the core of mine."
            },
            {
                "prompt": "Write a poem about Sajni - someone who is your constant",
                "completion": "Sajni: Someone who's your constant. No matter if you see them daily or not, someone who resides deep in your veins and blood.\nSajni is someone you think of every time you pray to God.\nSajni is someone you can't even ignore, someone you can love for an entire lifetime and beyond.\nSajni is your comfort, your ocean of acceptance, a hug which can calm down each and every atom of you.\nSajni is someone beyond words and emotions, someone you'd let your existence merge into and dive into her eyes when you see your Sajni smile."
            },
            {
                "prompt": "Write a romantic poem about wishes and desires",
                "completion": "Oh how I wish, that I was the music that you put your ears to and I would simply just add my soft spoken poems into your queue.\nOh how I wish, I was the bracelet on your arms to be a reminder of love that we both understand.\nOh how I wish, that I was the umbrella to protect you from the storm or at least let me be a coat that keeps you warm.\nOh how I wish, I was the watch on your wrist to spend time with you I could never resist..."
            },
            {
                "prompt": "Write a poem about being addicted to someone's name",
                "completion": "I'm addicted to your name → That's why I keep practicing it on my neat tongue, but when you are near, I forget everything except to run.\nYou are the reason people hate not being in love. You're a perfect poetry material, I've already turned you into poetry, Now, it's time to turn this fiction in my head real."
            },
            {
                "prompt": "Write a flirty romantic poem",
                "completion": "I can't hold a conversation, can I hold your hand?\nWeaknesses: Your eyes.\nYou are all the music I will ever need.\nI love you with all my belly, I would say heart but my belly is bigger.\nI love vowels especially U.\nIs there anything you'd change about me? ~ your last name."
            },
            {
                "prompt": "Write a poem about one-sided love",
                "completion": "I'll embrace the solitude, where my secret love resides,\nA one-sided lover's vigil, where my heart abides.\nFor it's better to have loved alone, than to never love at all,\nIn the solace of my longing, where silent whispers fall."
            },
            {
                "prompt": "Write a Hindi poem about past and future",
                "completion": "जो बीत गया है वो, अब दौर ना आएगा;\nइस दिल में सिवा तेरे कोई और ना आएगा;\nघर फूँक दिया हमने, अब राख उठानी है,\nजिंदगी और कुछ भी नहीं, तेरी मेरी कहानी है।"
            },
            {
                "prompt": "Write a poem about being someone's green",
                "completion": "You will never be unloved by me, you are too well tangled in my soul.\nYou are my Green!!\nShanivaar ki atki hui zindagi mein, Itvaar ka intezaar ho tum!\nDo u like fruits? Can I be u nashpati.\nYou are fully dolled up!!\nYou are a mess, still a masterpiece."
            },
            {
                "prompt": "Write a poem about the traitor in your chest",
                "completion": "The traitor that resides in my chest, stays loyal to the remembrance of your name in any stage, she keeps my eyes telling to find things that remind me of you.\nWhen someone says \"learn by heart\", she means the song you're in.\nIf I follow the quote, do as your heart says, your face will be all red with the blushes, your feet will never touch the hot floor, tears will turn into memories for your eyes, your wrists would always be filled with bangles, And: Your name and mine will become one."
            },
            {
                "prompt": "Write a poem about being someone's longest hug",
                "completion": "You are my longest hug, my softest kiss and my most meaningful shooting star sighting in a world where I no longer believed in telescopes.\nYou are the reason why Galileo must have first turned the telescope skywards, leading to the discovery of craters on the moon.\nIt is said that because he loved the telescope so much and so dearly he used it to observe the sun, which eventually caused his blindness.\nDo you know what it feels like to be the blind guy who helped everyone else see the dark side of the moon?"
            },
            {
                "prompt": "Write a poem about finding home in someone",
                "completion": "And without realizing it, like a sacred epiphany, my soul found the home of my desires in you, I never knew that your body would be the cathedral of my prayers and my love."
            },
            {
                "prompt": "Write a poem about someone being your world",
                "completion": "To the world, you may be one person, but to one person, you may be the world."
            },
            {
                "prompt": "Write a poem about thinking of love",
                "completion": "If I should think of love, I'd think of you, your arms uplifted, Tying your hair in plaits above,\nThe lyre shape of your arms and shoulders, the soft curve of your winding head.\nNo melody is sweeter, nor could Orpheus so have bewitched. I think of this, And all my universe becomes perfection.\nBut were you in my arms, dear love, The happiness would take my breath away, No thought could match that ecstasy, No song encompass it, no other worlds.\nIf I should think of love, I'd think of you."
            },
            {
                "prompt": "Write a poem about searching for pieces of someone in others",
                "completion": "Echoes of You: after you, I won't seek love again because I know if I do, I'll be searching for pieces of you in everyone I meet."
            },
            {
                "prompt": "Write a poem about someone being water",
                "completion": "She is water, powerful enough to drown you, soft enough to cleanse you, deep enough to save you."
            },
            {
                "prompt": "Write a poem about someone being your lady luck",
                "completion": "You're my lady luck.\nShe's the proof God still loves me."
            }
        ]
        return quotes_data
    
    def create_hindi_poems_dataset(self) -> List[Dict[str, str]]:
        """Create dataset with Hindi poems"""
        hindi_poems = [
            {
                "prompt": "Write a Hindi poem about suffering and love",
                "completion": "Jitre dukh jheli mein teri, la mere aanchal mein dhar de.\nMein chedhu birha ke taar, tu raag ras usmein bhar de.\nBhulu na prem ko tere, iss karagaar ko hridayshala kardoon.\nTu katu se katutar kiye ja, mein har halahal ko hala kardun.\nMein tujhse sampoorn hoon, Tu mujhme poorn paripoorna.\nEk dusre ka hai, hum paraspar shringaar."
            },
            {
                "prompt": "Write a Hindi poem about memories and seasons",
                "completion": "Mujhe fursat kahan, main mausam suhana dekhoon, teri yaad se niklu toh zamaana dekhoon....\nKuch toh chahat rahi hogi inn baarish ki boondon ki bhi, warna kaun girta hai iss zameen par aasmaan tak pahunchne ke baad.\nLog apne mehboob se, mohabbat karte hain... Par mere apne mehboob ko hi mohabbat kaha hai.... Aur jab aapko mohabbat se mohabbat ho jaati hai..... Toh mohabbat ki inteha ho jaati hai."
            },
            {
                "prompt": "Write a Hindi poem about clouds and rain",
                "completion": "Wo aakash mein badal.\nWo aakash mein badal.\nWo badal mein baarish.\nWo baarish mein boondein.\nWo boondon mein paani.\nWo paani mein aansu.\nWo aansu mein namak.\nWo namak mein zakham.\nWo zakham mein hun.\nWo hun mein; Wo hun mein tun.\nHaan tun, har tun bas tum."
            },
            {
                "prompt": "Write a Hindi poem about words and feelings",
                "completion": "Lafz ki shakal mein ehsaas likha jaata hai...\nYahan paani ko bhi pyaas likha jaata hai...\nMere jazbaat se waqif hai meri kalam...\nMain pyaar likhun toh uska naam likha jaata hai."
            },
            {
                "prompt": "Write a Hindi poem about someone's face",
                "completion": "Tere chehre ko chaand batana ab bachkana lagta hai, teri gardan par sona sajana ab purana lagta hai,\nKyunk i usse kya hi tolun sone mein, jis par zindagi apni haar di hai.\nTere naam ko kehte rehna apne aap mein aarti hai."
            },
            {
                "prompt": "Write a Hindi poem about someone's beauty",
                "completion": "Husn-e-Jaana ki tareef mumkin nahi.\nUska husn mujhe kuch aise fasaa kar deta hai,\nUsko choone jaata hu haath mara kar deta hai.\nAankhein jhuk jaati hain, itna zyada chamakte hain,\nUske jhumke mujhe jaise chaand bana kar deta hai.\nAur ussey baatein karte waqt, uski baatein karni hain,\nJo baat uski na ho toh wo arsuna kar deta hoon.\nKismat badal jaati hai woh jisko bhi choo leta hai,\nChoo kar mitti ke keimat ko 10-20 guna kar deta hai."
            },
            {
                "prompt": "Write a Hindi poem about ocean and waves",
                "completion": "Samundar ki aadat hai, kinaare chhod jaane ki.\nLehron ki fitrat hai, wapas laut aane ki.\nPar ishq mera dariya nahi, lehron ka zariya nahi.\nEk adhoori si chaahat hai, tumhe fir se chhu jaane ki."
            },
            {
                "prompt": "Write a Hindi poem about moonlight in hair",
                "completion": "Chandni ugne lagi hai baalon mein..\nYe uns tun par haseen lagti hai....\nYoon bhi acha hi lagta hai.\nLekin dekh kar apni hamla shaakhein...\nGulmohar phoola phoola rehta hai..\nAb jo thodi si bhar gyi ho tum...\nYe wazan tumpe acha lagta hai."
            }
        ]
        return hindi_poems
    
    def create_image_based_prompts(self) -> List[Dict[str, str]]:
        """Create prompts based on romantic image themes"""
        image_themes = [
            "sunset beach", "rainy day hug", "holding hands", "candlelit dinner",
            "starry night", "flower garden", "coffee shop", "mountain view",
            "city lights", "countryside", "beach walk", "forest path",
            "balcony scene", "window view", "park bench", "bridge crossing"
        ]
        
        dataset = []
        for theme in image_themes:
            for tone in self.tones[:5]:  # Use first 5 tones for variety
                prompt = f"Write a {tone.lower()} poem about a romantic moment at a {theme}"
                completion = self._generate_image_completion(theme, tone)
                dataset.append({"prompt": prompt, "completion": completion})
        
        return dataset
    
    def _generate_image_completion(self, theme: str, tone: str) -> str:
        """Generate completion based on image theme and tone"""
        completions = {
            "sunset beach": [
                "Golden waves kiss the shore,\nAs the sun paints the sky with fire.\nIn your arms, I find my home,\nMy heart's one true desire.",
                "The ocean whispers sweet nothings,\nAs we walk hand in hand.\nThe sunset mirrors our love,\nPerfect, pure, and grand."
            ],
            "rainy day hug": [
                "Raindrops dance on window panes,\nAs we embrace in cozy warmth.\nYour heartbeat syncs with mine,\nIn this perfect storm of love.",
                "The rain creates our private world,\nWhere only you and I exist.\nIn your arms, I'm safe and warm,\nMy heart by your love kissed."
            ],
            "holding hands": [
                "Your hand in mine, a perfect fit,\nLike puzzle pieces meant to be.\nTogether we face life's journey,\nIn love's sweet symphony.",
                "Fingers intertwined, hearts aligned,\nWalking through life side by side.\nYour touch speaks volumes of love,\nMy soul's eternal guide."
            ]
        }
        
        # Default completion if theme not found
        default_completions = [
            f"In this {theme}, our love blooms,\nLike flowers in spring's embrace.\nYour presence makes it magical,\nA perfect romantic space.",
            f"At the {theme}, my heart sings,\nWhen I'm with you, my love.\nEvery moment becomes precious,\nA gift from heaven above."
        ]
        
        return random.choice(completions.get(theme, default_completions))
    
    def create_multilingual_dataset(self) -> List[Dict[str, str]]:
        """Create dataset with multiple languages"""
        multilingual_data = [
            {
                "prompt": "Write a romantic poem in Hindi about love",
                "completion": "Mere badalte andaaz ka iklauta raaz ho tum.\nMeri har kavita ka shirshak ho tum.\nMujhe pyaar nahi ishq chahiye."
            },
            {
                "prompt": "Write a romantic poem in Urdu about beauty",
                "completion": "Husn-e-Jaana ki tareef mumkin nahi.\nUska husn mujhe kuch aise fasaa kar deta hai."
            },
            {
                "prompt": "Write a mixed Hindi-English romantic poem",
                "completion": "Ke balat kar dekhte hain... tujhko aage badh nahi paate,\nKitabe husn padhte hain, syllabus padh nahi paate."
            }
        ]
        return multilingual_data
    
    def generate_dataset(self, output_file: str = "romantic_poems_dataset.jsonl"):
        """Generate the complete dataset"""
        print("Generating AmoraVerse romantic poetry dataset...")
        
        dataset = []
        
        # Add 7 stages of love
        dataset.extend(self.create_7_stages_dataset())
        print(f"✓ Added {len(self.create_7_stages_dataset())} entries for 7 stages of love")
        
        # Add quotes and phrases
        dataset.extend(self.create_quotes_dataset())
        print(f"✓ Added {len(self.create_quotes_dataset())} entries for quotes and phrases")
        
        # Add Hindi poems
        dataset.extend(self.create_hindi_poems_dataset())
        print(f"✓ Added {len(self.create_hindi_poems_dataset())} entries for Hindi poems")
        
        # Add image-based prompts
        dataset.extend(self.create_image_based_prompts())
        print(f"✓ Added {len(self.create_image_based_prompts())} entries for image-based prompts")
        
        # Add multilingual dataset
        dataset.extend(self.create_multilingual_dataset())
        print(f"✓ Added {len(self.create_multilingual_dataset())} entries for multilingual poems")
        
        # Add style variations
        style_variations = self.create_style_variations()
        dataset.extend(style_variations)
        print(f"✓ Added {len(style_variations)} entries for style variations")
        
        # Shuffle the dataset
        random.shuffle(dataset)
        
        # Write to JSONL file
        with open(output_file, 'w', encoding='utf-8') as f:
            for entry in dataset:
                f.write(json.dumps(entry, ensure_ascii=False) + '\n')
        
        print(f"✓ Generated {len(dataset)} total entries")
        print(f"✓ Dataset saved to {output_file}")
        
        return dataset
    
    def create_style_variations(self) -> List[Dict[str, str]]:
        """Create variations with different poetic styles"""
        variations = []
        
        base_prompts = [
            "Write a romantic poem about first love",
            "Write a romantic poem about missing someone",
            "Write a romantic poem about eternal love",
            "Write a romantic poem about a romantic evening",
            "Write a romantic poem about soulmates"
        ]
        
        for prompt in base_prompts:
            for style in self.styles:
                for tone in self.tones[:3]:  # Use first 3 tones for variety
                    variations.append({
                        "prompt": f"{prompt} in {style.lower()} style with {tone.lower()} tone",
                        "completion": self._generate_style_completion(style, tone, prompt)
                    })
        
        return variations
    
    def _generate_style_completion(self, style: str, tone: str, base_prompt: str) -> str:
        """Generate completion based on style and tone"""
        if style == "Free Verse":
            return "In the quiet moments of dawn,\nI find your love written in the stars.\nYour presence is poetry,\nEvery breath a verse of our story."
        elif style == "Ghazal":
            return "In every verse, your name I write,\nMy heart's beloved, my soul's delight.\nYour love is my religion true,\nIn every prayer, I think of you."
        elif style == "Sonnet":
            return "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate.\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date."
        else:
            return f"A {tone.lower()} poem in {style.lower()} style about love and romance."
    
    def validate_dataset(self, dataset_file: str) -> bool:
        """Validate the generated dataset"""
        try:
            with open(dataset_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            valid_entries = 0
            for line in lines:
                try:
                    entry = json.loads(line.strip())
                    if 'prompt' in entry and 'completion' in entry:
                        valid_entries += 1
                except json.JSONDecodeError:
                    continue
            
            print(f"✓ Dataset validation: {valid_entries}/{len(lines)} entries are valid")
            return valid_entries == len(lines)
        
        except FileNotFoundError:
            print("✗ Dataset file not found")
            return False

if __name__ == "__main__":
    generator = AmoraVerseDatasetGenerator()
    dataset = generator.generate_dataset()
    
    # Validate the dataset
    generator.validate_dataset("romantic_poems_dataset.jsonl")
    
    print("\n🎉 Dataset generation complete!")
    print("📊 Dataset Statistics:")
    print(f"   - Total entries: {len(dataset)}")
    print(f"   - Styles covered: {len(generator.styles)}")
    print(f"   - Tones covered: {len(generator.tones)}")
    print(f"   - Languages: {len(generator.languages)}") 