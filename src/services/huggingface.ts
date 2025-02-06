import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/';
const CHAT_MODEL = 'facebook/blenderbot-400M-distill';
const SENTIMENT_MODEL = 'distilbert-base-uncased-finetuned-sst-2-english';

class HuggingFaceService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(input: string): Promise<string> {
    try {
      const response = await axios.post(
        `${HUGGING_FACE_API_URL}${CHAT_MODEL}`,
        { inputs: input },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // BlenderBot returns a different response format
      if (response.data && response.data.generated_text) {
        return response.data.generated_text;
      } else if (Array.isArray(response.data)) {
        return response.data[0].generated_text;
      }

      return 'I apologize, but I am having trouble understanding. Could you please rephrase that?';
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate response');
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