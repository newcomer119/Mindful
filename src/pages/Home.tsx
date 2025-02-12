import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  BarChart2, 
  Music, 
  Lock, 
  Globe,
  Star,
  CheckCircle2,
  ArrowRight,
  Mail,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "College Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      content: "This platform has been a game-changer for managing my anxiety during exams. The AI assistant feels like talking to a friend who really understands.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Graduate Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      content: "The personalized music recommendations have helped me stay focused during long study sessions. It's like having a personal wellness coach.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "High School Senior",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      content: "I love how the app tracks my anxiety levels and suggests coping strategies. It's made a real difference in my daily life.",
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Mental Wellness Journey <br />
            <span className="text-indigo-600">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience personalized mental health support with our AI assistant, helping you understand and improve your emotional well-being.
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isSignedIn ? '/chat' : '/sign-up')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Try AI Assistant Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl"
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>

        {/* AI Chat Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="border-b p-4 bg-gray-50">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-indigo-600" />
              <h2 className="text-lg font-semibold">AI Wellness Assistant</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-600 p-2 rounded-full">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                <p>Hi there! I'm your mental wellness assistant. I'm here to listen and support you. How are you feeling today?</p>
              </div>
            </div>
            <div className="flex items-start justify-end space-x-3">
              <div className="bg-indigo-50 rounded-2xl p-4 max-w-[80%]">
                <p>I've been feeling a bit overwhelmed with my studies lately.</p>
              </div>
              <div className="bg-gray-200 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-600 p-2 rounded-full">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                <p>I understand how challenging that can be. Let's talk about what's causing your stress and explore some coping strategies together. Would you like to try some relaxation techniques?</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Wellness Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to support your mental well-being
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MindfulAI?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best mental wellness support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">24/7 AI Support</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Always available to listen and support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Crisis support and resources</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Data-Driven Insights</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Track your progress over time</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Identify patterns and triggers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Customized wellness plans</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of students improving their mental well-being
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options for every need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Unlimited AI chat sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Personalized wellness plan</span>
                </li>
              </ul>
              <button
                disabled
                className="w-full bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Local Version</h3>
                  <p className="text-gray-600">Free</p>
                </div>
                <Globe className="h-6 w-6 text-gray-600" />
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Basic AI chat support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Anxiety tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Music recommendations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(isSignedIn ? '/chat' : '/sign-up')}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold">MindfulAI</span>
              </div>
              <p className="text-gray-400">
                Supporting student mental wellness through AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MindfulAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

