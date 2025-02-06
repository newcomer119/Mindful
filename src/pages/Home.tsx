import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced anxiety assessment using state-of-the-art AI models'
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      title: 'Mood Tracking',
      description: 'Track and visualize your emotional patterns over time'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      title: 'Personalized Music',
      description: 'Get mood-based music recommendations tailored to you'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Your Mental Wellness Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience personalized mental health support powered by AI, helping you understand and improve your emotional well-being.
        </p>
        
        <button
          onClick={() => navigate(isSignedIn ? '/chat' : '/sign-up')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          Chat with AI Assistant
        </button>
      </motion.div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
          alt="Peaceful meditation scene"
          className="rounded-xl shadow-2xl mx-auto max-w-4xl"
        />
      </div>
    </div>
  );
};

export default Home;