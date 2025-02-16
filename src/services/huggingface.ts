import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/';
// Using more reliable and accessible models
const GENERAL_CHAT_MODEL = 'facebook/blenderbot-400M-distill';
const MENTAL_HEALTH_MODEL = 'microsoft/DialoGPT-medium';
const SENTIMENT_MODEL = 'nlptown/bert-base-multilingual-uncased-sentiment';

// Crisis keywords that should trigger immediate help resources
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'cutting', 'hurt myself', 'don\'t want to live'
];

const MENTAL_HEALTH_KEYWORDS = [
  'sad', 'depressed', 'anxiety', 'anxious', 'stress', 'stressed',
  'lonely', 'alone', 'worried', 'fear', 'scared', 'panic', 'overwhelmed'
];

const CRISIS_RESPONSE = `I'm very concerned about what you're telling me. Your life has value and there are people who want to help:

IMMEDIATE HELP AVAILABLE 24/7:
• National Suicide Prevention Lifeline (US): 988 or 1-800-273-8255
• Vandrevala Foundation Helpline (India): 1860 266 2345 or 1800 233 3330
• Crisis Text Line: Text HOME to 741741
• AASRA (India): +91-9820466726
• Emergency Services: 911 (US) or 112 (EU)
• Emergency Services (India): 112

Would you like to:
1. Talk to a crisis counselor right now?
2. Get connected to mental health resources in your area?
3. Continue talking with me while you consider reaching out?

Remember: You're not alone, and this feeling won't last forever. Professional help is available and confidential.`;

const MOOD_LIFTING_RESPONSES = [
  "Why did the Indian chef go to therapy? Because he had too many issues... tissue issues! 🧻",
  "What did the samosa say to the chutney? 'You're mint to be with me!' 🥟",
  "Why don't Indian aunties ever fight? Because they're too busy making peace-ani! 😄",
  "What did the chai say to the coffee? 'You're brew-tiful, but I'm tea-rrific!' ☕",
  "Why did the dosa go to the gym? To get crispy abs! 🏋️‍♂️",
  "What did the naan say when it was stressed? 'I knead a break!' 🫓",
  "You know what's amazing about you? Like biryani, you have so many wonderful layers! 🍚",
  "Even on your worst days, you're still as refreshing as nimbu paani on a hot summer day! 🍋",
  "Remember: Life is like a thali - it has a bit of everything, and that's what makes it special! 🍱",
  "You're stronger than you think - like a tea bag, you don't know your strength until you're in hot water! 🫖"
];

const MOOD_IMPROVEMENT_SUGGESTIONS = [
  {
    category: "Quick Mood Boosters",
    activities: [
      "Dance to your favorite Bollywood song - let's have a mini garba! 💃",
      "Make yourself a cup of masala chai and enjoy it mindfully ☕",
      "Call your favorite cousin or friend for a quick chat 📱",
      "Watch some funny Indian comedy clips 😄",
      "Do some simple yoga asanas or stretches 🧘‍♀️"
    ]
  },
  {
    category: "Mindfulness Activities",
    activities: [
      "Try pranayama breathing: inhale for 4, hold for 4, exhale for 4 🫁",
      "Practice the grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste 🌟",
      "Write down three things you're grateful for in your life 📝",
      "Close your eyes and imagine sitting peacefully by the Ganges 🏞️",
      "Take a mindful walk in your garden or balcony, focusing on each step 🚶‍♀️"
    ]
  }
];

class HuggingFaceService {
  private apiKey: string;
  private conversationHistory: string[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeApiRequest(model: string, data: any) {
    try {
      const response = await axios.post(
        `${HUGGING_FACE_API_URL}${model}`,
        { inputs: data },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  private checkForCrisisKeywords(input: string): boolean {
    const lowercaseInput = input.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  }

  private checkForMentalHealthKeywords(input: string): boolean {
    const lowercaseInput = input.toLowerCase();
    return MENTAL_HEALTH_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generateMoodImprovementResponse(): string {
    const category = this.getRandomElement(MOOD_IMPROVEMENT_SUGGESTIONS);
    const activity = this.getRandomElement(category.activities);
    const joke = this.getRandomElement(MOOD_LIFTING_RESPONSES);

    return `I hear that you're feeling down, and that's completely valid. Sometimes life can be tough, but I'm here to support you! 

Here's something that might bring a smile to your face:
${joke}

Would you like to try this mood-boosting activity?
${activity}

Remember, it's okay to not be okay. Would you like to:
1. Talk more about what's bothering you?
2. Try another mood-lifting activity?
3. Learn some simple mindfulness techniques?
4. Just chat about something else to take your mind off things?

I'm here to listen and support you in whatever way feels right for you. 💙`;
  }

  async generateResponse(input: string): Promise<string> {
    if (this.checkForCrisisKeywords(input)) {
      return CRISIS_RESPONSE;
    }

    this.conversationHistory.push(input);
    if (this.conversationHistory.length > 5) {
      this.conversationHistory.shift();
    }

    try {
      const usesMentalHealthModel = this.checkForMentalHealthKeywords(input);
      const modelToUse = usesMentalHealthModel ? MENTAL_HEALTH_MODEL : GENERAL_CHAT_MODEL;

      const response = await this.makeApiRequest(modelToUse, input);
      
      if (!response) {
        return this.generateMoodImprovementResponse();
      }

      let generatedText = '';
      if (Array.isArray(response)) {
        generatedText = response[0]?.generated_text || '';
      } else if (response?.generated_text) {
        generatedText = response.generated_text;
      } else if (typeof response === 'string') {
        generatedText = response;
      }

      if (usesMentalHealthModel) {
        if (input.toLowerCase().includes('sad') || input.toLowerCase().includes('depressed')) {
          return this.generateMoodImprovementResponse();
        }

        if (generatedText.toLowerCase().includes('anxiety') || generatedText.toLowerCase().includes('stress')) {
          generatedText += `\n\nWould you like to try a quick calming exercise together? I know a simple pranayama breathing technique that can help reduce anxiety in just a few minutes! 

Or we could:
1. Talk about what's causing your anxiety
2. Try some grounding exercises
3. Learn about stress management techniques
4. Just chat and take your mind off things

What feels right for you? 🌸`;
        }
      }

      this.conversationHistory.push(generatedText);
      if (this.conversationHistory.length > 5) {
        this.conversationHistory.shift();
      }

      return generatedText || "I'm here to chat! How can I support you today? 😊";
    } catch (error) {
      console.error('Error generating response:', error);
      return this.generateMoodImprovementResponse();
    }
  }

  async analyzeSentiment(input: string): Promise<{
    label: string;
    score: number;
  }> {
    try {
      const response = await this.makeApiRequest(SENTIMENT_MODEL, { inputs: input });

      if (Array.isArray(response)) {
        if (response[0] && typeof response[0] === 'object') {
          return {
            label: response[0].label || '1',
            score: response[0].score || 0
          };
        }
        if (Array.isArray(response[0]) && response[0][0]) {
          return {
            label: response[0][0].label || '1',
            score: response[0][0].score || 0
          };
        }
      }

      throw new Error('Invalid response format from sentiment analysis');
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return {
        label: '3',
        score: 0.5
      };
    }
  }
}

export default HuggingFaceService;