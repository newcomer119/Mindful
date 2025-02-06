import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "How often do you feel nervous or anxious?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  },
  {
    id: 2,
    text: "Do you experience physical symptoms like rapid heartbeat or sweating?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  },
  {
    id: 3,
    text: "How often do you have trouble sleeping due to anxiety?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  },
  {
    id: 4,
    text: "Do you find it difficult to concentrate due to worrying thoughts?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  },
  {
    id: 5,
    text: "How often do you feel overwhelmed by daily tasks?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  }
];

interface Props {
  onComplete: (score: number) => void;
}

const AnxietyAssessment: React.FC<Props> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(newAnswers);
      onComplete(score);
    }
  };

  const calculateScore = (responses: number[]): number => {
    const sum = responses.reduce((acc, curr) => acc + curr, 0);
    return (sum / (questions.length * 3)) * 100; // Normalize to 0-100
  };

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-6">
        <AlertCircle className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Anxiety Assessment</h2>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <motion.div
        key={question.id}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-medium text-gray-900 mb-4">{question.text}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnxietyAssessment;