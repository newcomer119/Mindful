import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Loader2, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import HuggingFaceService from '../services/huggingface';

// Initialize HuggingFace service with the API key from environment variables
const huggingFaceService = new HuggingFaceService(import.meta.env.VITE_HUGGINGFACE_API_KEY);

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  sentiment?: {
    label: string;
    score: number;
  };
}

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `Hi ${user?.firstName || 'there'}! I'm your mental wellness assistant. How are you feeling today?`,
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Analyze sentiment of user message
      const sentiment = await huggingFaceService.analyzeSentiment(userMessage.content);
      userMessage.sentiment = sentiment;

      // Generate AI response
      const response = await huggingFaceService.generateResponse(userMessage.content);
      
      const botResponse: Message = {
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const regenerateResponse = async (index: number) => {
    if (index <= 0 || messages[index - 1].type !== 'user') return;

    setIsTyping(true);
    try {
      const userMessage = messages[index - 1];
      const response = await huggingFaceService.generateResponse(userMessage.content);
      
      const newMessages = [...messages];
      newMessages[index] = {
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(newMessages);
    } catch (error) {
      console.error('Error regenerating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="border-b p-4 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-800">Mental Wellness Assistant</h2>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {message.type === 'bot' && <Bot className="h-5 w-5 text-indigo-600" />}
                  <span className="text-sm opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.sentiment && (
                  <div className="mt-1 text-sm opacity-70">
                    Sentiment: {message.sentiment.label} ({Math.round(message.sentiment.score * 100)}%)
                  </div>
                )}
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mt-2 text-gray-500">
                    <button className="hover:text-indigo-600 p-1 rounded">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="hover:text-indigo-600 p-1 rounded">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                    <button 
                      className="hover:text-indigo-600 p-1 rounded"
                      onClick={() => regenerateResponse(index)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="border-t p-4 bg-gray-50">
          <div className="flex space-x-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send)"
              className="flex-1 min-h-[50px] max-h-[200px] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`${
                input.trim() && !isTyping
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white p-3 rounded-lg transition-colors flex items-center justify-center min-w-[50px]`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;