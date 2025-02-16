import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Loader2, RefreshCw, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import GeminiService from '../services/gemini';

interface Message {
  type: 'user' | 'bot' | 'crisis';
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
      content: `Namaste ${user?.firstName || 'there'}! 🙏 I'm your mental wellness assistant. I'm here to listen and support you. How are you feeling today?`,
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
      const sentiment = await GeminiService.analyzeSentiment(userMessage.content);
      userMessage.sentiment = sentiment;

      // Generate AI response
      const response = await GeminiService.generateResponse(userMessage.content);
      
      const botResponse: Message = {
        type: response.includes('IMMEDIATE HELP AVAILABLE') ? 'crisis' : 'bot',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        type: 'bot',
        content: 'I sense that you might be going through something difficult. Would you like to tell me more about what\'s troubling you?',
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
      const response = await GeminiService.generateResponse(userMessage.content);
      
      const newMessages = [...messages];
      newMessages[index] = {
        type: response.includes('IMMEDIATE HELP AVAILABLE') ? 'crisis' : 'bot',
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
          <p className="text-sm text-gray-600 mt-1">
            I'm here to support you. If you're in crisis, please know that help is available 24/7.
          </p>
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
                    : message.type === 'crisis'
                    ? 'bg-red-50 border-2 border-red-200 text-gray-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {message.type === 'bot' && <Bot className="h-5 w-5 text-indigo-600" />}
                  {message.type === 'crisis' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  <span className="text-sm opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
                {message.sentiment && message.sentiment.label === 'NEGATIVE' && message.sentiment.score > 0.8 && (
                  <div className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block">
                    High distress detected
                  </div>
                )}
                {(message.type === 'bot' || message.type === 'crisis') && (
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
              <span>Assistant is typing...</span>
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