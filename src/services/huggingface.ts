import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/';
// Using BlenderBot for general chat and DialoGPT for mental health
const GENERAL_CHAT_MODEL = 'facebook/blenderbot-400M-distill';
const MENTAL_HEALTH_MODEL = 'microsoft/DialoGPT-medium-mental-health';
const SENTIMENT_MODEL = 'distilbert-base-uncased-finetuned-sst-2-english';

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

// Mood-lifting responses for when someone is feeling sad
const MOOD_LIFTING_RESPONSES = [
  "You know what always makes me smile? Thinking about how penguins propose... they give their loved one a pebble! 🐧",
  "Hey, even on cloudy days, you're still outshining the sun! ☀️",
  "Did you hear about the claustrophobic astronaut? He just needed a little space! 🚀",
  "Remember: Every cloud has a silver lining... and probably some confused birds wondering how they got so high up! ☁️",
  "You're stronger than you think - like a tea bag, you don't know your strength until you're in hot water! 🫖"
];

// Practical suggestions for improving mood
const MOOD_IMPROVEMENT_SUGGESTIONS = [
  {
    category: "Quick Mood Boosters",
    activities: [
      "Take a 5-minute dance break to your favorite upbeat song 🎵",
      "Step outside for some fresh air and sunshine ☀️",
      "Call or text a friend who makes you laugh 📱",
      "Watch cute animal videos for a few minutes 🐱",
      "Do some gentle stretching or yoga poses 🧘‍♀️"
    ]
  },
  {
    category: "Mindfulness Activities",
    activities: [
      "Try this simple breathing exercise: breathe in for 4, hold for 4, out for 4 🫁",
      "Focus on naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste 🌟",
      "Write down three things you're grateful for, no matter how small 📝",
      "Close your eyes and imagine your favorite peaceful place 🏖️",
      "Take a mindful walk, focusing on each step and your surroundings 🚶‍♀️"
    ]
  }
];

class HuggingFaceService {
  private apiKey: string;
  private conversationHistory: string[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
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

Here's something that might help lift your spirits:
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
    // First check for crisis keywords
    if (this.checkForCrisisKeywords(input)) {
      return CRISIS_RESPONSE;
    }

    // Update conversation history
    this.conversationHistory.push(input);
    if (this.conversationHistory.length > 5) {
      this.conversationHistory.shift();
    }

    // Choose which model to use based on content
    const usesMentalHealthModel = this.checkForMentalHealthKeywords(input);
    const modelToUse = usesMentalHealthModel ? MENTAL_HEALTH_MODEL : GENERAL_CHAT_MODEL;

    try {
      const response = await axios.post(
        `${HUGGING_FACE_API_URL}${modelToUse}`,
        { 
          inputs: {
            text: usesMentalHealthModel ? input : this.conversationHistory.join('\n'),
            max_length: 150,
            temperature: usesMentalHealthModel ? 0.7 : 0.9,
            top_p: 0.9,
            repetition_penalty: 1.2
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      let generatedText = '';
      if (response.data && response.data.generated_text) {
        generatedText = response.data.generated_text;
      } else if (Array.isArray(response.data)) {
        generatedText = response.data[0].generated_text;
      }

      // For mental health related responses, add supportive context
      if (usesMentalHealthModel) {
        if (input.toLowerCase().includes('sad') || input.toLowerCase().includes('depressed')) {
          return this.generateMoodImprovementResponse();
        }

        if (generatedText.toLowerCase().includes('anxiety') || generatedText.toLowerCase().includes('stress')) {
          generatedText += `\n\nWould you like to try a quick calming exercise together? I know a simple breathing technique that can help reduce anxiety in just a few minutes! 

Or we could:
1. Talk about what's causing your anxiety
2. Try some grounding exercises
3. Learn about stress management techniques
4. Just chat and take your mind off things

What feels right for you? 🌸`;
        }

        if (generatedText.toLowerCase().includes('depress')) {
          generatedText += `\n\nI want you to know that you're not alone in this. Depression can make everything feel overwhelming, but there are ways to cope and people who want to help.

Would you like to:
1. Talk more about how you're feeling?
2. Try a simple mood-lifting activity?
3. Learn about professional support options?
4. Just chat about something else for a while?

Remember, even small steps forward are progress. 💙`;
        }
      }

      // Update conversation history with response
      this.conversationHistory.push(generatedText);
      if (this.conversationHistory.length > 5) {
        this.conversationHistory.shift();
      }

      return generatedText || `I'm here to chat! We can talk about anything you'd like. 
What's on your mind? 😊`;
    } catch (error) {
      console.error('Error generating response:', error);
      return usesMentalHealthModel ? 
        this.generateMoodImprovementResponse() : 
        "I'd love to continue our conversation! What would you like to talk about? 😊";
    }
  }

  async analyzeSentiment(input: string): Promise<{
    label: string;
    score: number;
  }> {
    try {
      const response = await axios.post(
        `${HUGGING_FACE_API_URL}${SENTIMENT_MODEL}`,
        { inputs: input },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data[0][0];
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw new Error('Failed to analyze sentiment');
    }
  }
}

export default HuggingFaceService;