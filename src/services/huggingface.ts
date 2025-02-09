import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/';
// Using Microsoft's mental health dialogue model
const CHAT_MODEL = 'microsoft/DialoGPT-medium-mental-health';
const SENTIMENT_MODEL = 'distilbert-base-uncased-finetuned-sst-2-english';

// Crisis keywords that should trigger immediate help resources
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'cutting', 'hurt myself', 'don\'t want to live'
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

class HuggingFaceService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private checkForCrisisKeywords(input: string): boolean {
    const lowercaseInput = input.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  }

  async generateResponse(input: string): Promise<string> {
    // First check for crisis keywords
    if (this.checkForCrisisKeywords(input)) {
      return CRISIS_RESPONSE;
    }

    try {
      const response = await axios.post(
        `${HUGGING_FACE_API_URL}${CHAT_MODEL}`,
        { 
          inputs: {
            text: input,
            max_length: 150,
            temperature: 0.7,
            top_p: 0.9
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

      // Add supportive context to responses
      if (generatedText.toLowerCase().includes('anxiety') || generatedText.toLowerCase().includes('stress')) {
        generatedText += '\n\nRemember: Anxiety and stress are common experiences. Would you like to try some breathing exercises or learn about coping strategies?';
      }

      if (generatedText.toLowerCase().includes('depress')) {
        generatedText += '\n\nIt\'s important to know that depression is treatable and help is available. Would you like information about professional mental health resources?';
      }

      return generatedText || 'I understand you\'re going through something difficult. Would you like to tell me more about what\'s on your mind?';
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I\'m here to listen and support you. Would you like to tell me more about what you\'re experiencing?';
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