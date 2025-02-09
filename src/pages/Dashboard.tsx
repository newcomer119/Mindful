import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Music, Calendar, AlertCircle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnxietyAssessment from '../components/AnxietyAssessment';


interface AnxietyData {
  date: string;
  score: number;
}

interface ActivityLog {
  date: string;
  type: string;
  description: string;
}

interface MoodEntry {
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'stressed' | 'energetic';
  notes?: string;
}

interface SleepData {
  date: string;
  hours: number;
  quality: number;
}

const Dashboard = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [anxietyData, setAnxietyData] = useState<AnxietyData[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood']>('neutral');
  const [moodNote, setMoodNote] = useState('');
  const [sleepHours, setSleepHours] = useState<number | ''>(7.5);
  const [sleepQuality, setSleepQuality] = useState<number | ''>(8);
  const [sleepDate, setSleepDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Mock data initialization
    const mockData = [
      { date: '2024-03-01', score: 65 },
      { date: '2024-03-02', score: 58 },
      { date: '2024-03-03', score: 72 },
    ];
    setAnxietyData(mockData);

    const mockMoods = [
      { date: '2024-03-03', mood: 'happy', notes: 'Had a great day!' },
      { date: '2024-03-02', mood: 'stressed', notes: 'Busy workday' },
      { date: '2024-03-01', mood: 'neutral', notes: 'Regular day' },
    ] as MoodEntry[];
    setMoodEntries(mockMoods);

    const mockSleep = [
      { date: '2024-03-03', hours: 7.5, quality: 8 },
      { date: '2024-03-02', hours: 6, quality: 6 },
      { date: '2024-03-01', hours: 8, quality: 9 },
    ];
    setSleepData(mockSleep);

    const mockLogs = [
      { date: '2024-03-03', type: 'Assessment', description: 'Completed anxiety assessment' },
      { date: '2024-03-02', type: 'Exercise', description: 'Morning yoga session' },
      { date: '2024-03-01', type: 'Meditation', description: 'Completed 15-minute meditation' },
    ];
    setActivityLogs(mockLogs);
  }, []);

  const handleAssessmentComplete = async (score: number) => {
    const newData = {
      date: new Date().toISOString().split('T')[0],
      score
    };
    setAnxietyData([...anxietyData, newData]);
    
    // Add activity log for assessment
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      type: 'Assessment',
      description: `Completed anxiety assessment (Score: ${score})`
    };
    setActivityLogs([newLog, ...activityLogs]);
    
    setShowAssessment(false);

    // Get music recommendations based on anxiety level
    const mood = score > 70 ? 'anxious' : score > 40 ? 'calm' : 'happy';
    await fetchRecommendations(mood);
  };

  const fetchRecommendations = async (mood: string) => {
    // setLoading(true); // Removed loading state management
    try {
      // const tracks = await SpotifyService.getRecommendations(mood); // Removed Spotify service call
      // setRecommendations(tracks); // Removed setting recommendations
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    // setLoading(false); // Removed loading state management
  };

  const handleMoodSubmit = () => {
    const newMoodEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      notes: moodNote
    };
    setMoodEntries([newMoodEntry, ...moodEntries]);
    setMoodNote('');
    
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      type: 'Mood',
      description: `Recorded mood: ${selectedMood}`
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleSleepSubmit = () => {
    const newSleepEntry: SleepData = {
      date: sleepDate,
      hours: Number(sleepHours),
      quality: Number(sleepQuality),
    };
    setSleepData([newSleepEntry, ...sleepData]);
    setSleepHours(7.5);
    setSleepQuality(8);
    setSleepDate(new Date().toISOString().split('T')[0]);
  };

  if (showAssessment) {
    return <AnxietyAssessment onComplete={handleAssessmentComplete} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wellness Dashboard</h1>
        <button
          onClick={() => setShowAssessment(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Take Anxiety Assessment
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg col-span-2"
        >
          <div className="flex items-center space-x-2 mb-4">
            <BarChart2 className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Anxiety Trends</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={anxietyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-6 w-6 text-yellow-600" />
            <h2 className="text-xl font-semibold">Daily Mood Tracker</h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              {['happy', 'neutral', 'sad', 'stressed', 'energetic'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood as MoodEntry['mood'])}
                  className={`p-2 rounded ${
                    selectedMood === mood ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Add a note about your mood..."
              className="w-full p-2 border rounded"
              rows={2}
            />
            <button
              onClick={handleMoodSubmit}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Record Mood
            </button>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Activity Log</h2>
          </div>
          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 border-b last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{log.type}</p>
                    <span className="text-sm text-gray-500">{log.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Sleep Tracker</h2>
          </div>
          <div className="space-y-4">
            {sleepData.map((sleep, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b">
                <div>
                  <p className="font-medium">{sleep.date}</p>
                  <p className="text-sm text-gray-600">{sleep.hours} hours</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Quality:</span>
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-blue-600 rounded"
                      style={{ width: `${sleep.quality * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col space-y-2">
              <input
                type="date"
                value={sleepDate}
                onChange={(e) => setSleepDate(e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                placeholder="Hours"
                className="border rounded p-2"
              />
              <input
                type="number"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(Number(e.target.value))}
                placeholder="Quality (1-10)"
                className="border rounded p-2"
              />
              <button
                onClick={handleSleepSubmit}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Update Sleep Data
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;