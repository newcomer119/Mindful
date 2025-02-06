import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Radio, ArrowLeft } from 'lucide-react';

interface Genre {
  id: string;
  name: string;
  color: string;
}

interface Props {
  onComplete: (preferences: string[]) => void;
}

const MusicPreferences: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState<string>('');
  
  const genres: Genre[] = [
    { id: 'classical', name: 'Classical', color: 'bg-blue-100 text-blue-700' },
    { id: 'jazz', name: 'Jazz', color: 'bg-purple-100 text-purple-700' },
    { id: 'ambient', name: 'Ambient', color: 'bg-green-100 text-green-700' },
    { id: 'electronic', name: 'Electronic', color: 'bg-pink-100 text-pink-700' },
    { id: 'rock', name: 'Rock', color: 'bg-red-100 text-red-700' },
    { id: 'pop', name: 'Pop', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'indie', name: 'Indie', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'piano', name: 'Piano', color: 'bg-teal-100 text-teal-700' },
    { id: 'meditation', name: 'Meditation', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'nature', name: 'Nature Sounds', color: 'bg-emerald-100 text-emerald-700' }
  ];

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedGenres.length > 0) {
      setStep(2);
    } else if (step === 2) {
      onComplete([...selectedGenres, ...favoriteArtists.split(',').map(a => a.trim())]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Music className="h-6 w-6 text-pink-600" />
          <h2 className="text-2xl font-semibold">Music Preferences</h2>
        </div>
        <button
          onClick={() => onComplete([])}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">Step {step} of 2</p>
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            Select your favorite music genres
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {genres.map((genre) => (
              <motion.button
                key={genre.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenreToggle(genre.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedGenres.includes(genre.id)
                    ? genre.color
                    : 'border-gray-200 hover:border-pink-500 hover:bg-pink-50'
                }`}
              >
                <Heart className={`h-4 w-4 ${
                  selectedGenres.includes(genre.id) ? 'fill-current' : ''
                }`} />
                <span>{genre.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            Enter your favorite artists
          </h3>
          <textarea
            value={favoriteArtists}
            onChange={(e) => setFavoriteArtists(e.target.value)}
            placeholder="Enter artist names, separated by commas"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            rows={4}
          />
        </motion.div>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={step === 1 ? selectedGenres.length === 0 : false}
          className={`px-6 py-2 rounded-lg ${
            (step === 1 ? selectedGenres.length > 0 : true)
              ? 'bg-pink-600 hover:bg-pink-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {step === 1 ? 'Next' : 'Complete'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MusicPreferences;