import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Music, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wellness Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <BarChart2 className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Mood Trends</h2>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mood visualization coming soon</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Music className="h-6 w-6 text-pink-600" />
            <h2 className="text-xl font-semibold">Music Recommendations</h2>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Music recommendations coming soon</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Activity Log</h2>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Activity tracking coming soon</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Insights</h2>
        <div className="space-y-4">
          <p className="text-gray-600">Your insights will appear here as you continue to use the platform.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;