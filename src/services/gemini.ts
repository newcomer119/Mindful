import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-pro";

// Crisis keywords that should trigger immediate help resources
const CRISIS_KEYWORDS = [
  "suicide",
  "suicidal",
  "kill myself",
  "end my life",
  "want to die",
  "self-harm",
  "cutting",
  "hurt myself",
  "don't want to live",
];

const MENTAL_HEALTH_KEYWORDS = [
  "sad",
  "depressed",
  "anxiety",
  "anxious",
  "stress",
  "stressed",
  "lonely",
  "alone",
  "worried",
  "fear",
  "scared",
  "panic",
  "overwhelmed",
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
];

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chat: any;
  private context: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: MODEL_NAME });
    this.chat = this.model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    this.context = `You are an empathetic and supportive mental health AI assistant. Your role is to:
    1. Provide emotional support and understanding
    2. Offer practical coping strategies
    3. Share culturally relevant (especially Indian) mood-lifting content when appropriate
    4. Recognize signs of distress and respond appropriately
    5. Maintain a warm, friendly tone while being professional
    6. Include appropriate emojis to make the conversation more engaging
    7. Share Indian wisdom and mindfulness practices when relevant
    
    Important guidelines:
    - Always prioritize user safety
    - Be empathetic but maintain professional boundaries
    - Encourage professional help when needed
    - Use culturally sensitive examples and metaphors
    - Include occasional gentle humor when appropriate
    - Validate emotions while offering hope and practical support`;
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private checkForCrisisKeywords(input: string): boolean {
    const lowercaseInput = input.toLowerCase();
    return CRISIS_KEYWORDS.some((keyword) => lowercaseInput.includes(keyword));
  }

  private checkForMentalHealthKeywords(input: string): boolean {
    const lowercaseInput = input.toLowerCase();
    return MENTAL_HEALTH_KEYWORDS.some((keyword) =>
      lowercaseInput.includes(keyword)
    );
  }

  async generateResponse(input: string): Promise<string> {
    if (this.checkForCrisisKeywords(input)) {
      return CRISIS_RESPONSE;
    }

    try {
      const needsEmotionalSupport = this.checkForMentalHealthKeywords(input);
      let prompt = input;

      if (needsEmotionalSupport) {
        prompt = `${input}\n\nNote: The user might need emotional support. Consider including:
        1. Validation of their feelings
        2. A gentle mood-lifting Indian joke or metaphor
        3. Practical coping strategies
        4. Encouragement to seek support if needed`;
      }

      const result = await this.chat.sendMessage(prompt);
      const response = result.response.text();

      if (needsEmotionalSupport && !response.includes("🙂")) {
        const joke = this.getRandomElement(MOOD_LIFTING_RESPONSES);
        return `${response}\n\nHere's something to brighten your mood:\n${joke}`;
      }

      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm here to chat and support you! How can I help you today? 🌟";
    }
  }

  async analyzeSentiment(
    input: string
  ): Promise<{ label: string; score: number }> {
    try {
      const prompt = `Analyze the sentiment of this text and respond with ONLY "POSITIVE", "NEGATIVE", or "NEUTRAL" and a confidence score between 0 and 1: "${input}"`;
      const result = await this.model.generateContent(prompt);
      const response = result.response.text().toUpperCase();

      let label = "NEUTRAL";
      let score = 0.5;

      if (response.includes("POSITIVE")) {
        label = "POSITIVE";
        score = 0.8;
      } else if (response.includes("NEGATIVE")) {
        label = "NEGATIVE";
        score = 0.2;
      }

      return { label, score };
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      return { label: "NEUTRAL", score: 0.5 };
    }
  }
}

export default new GeminiService();
