import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Anxiety in College Students",
    excerpt: "Learn about the common triggers of anxiety in academic settings and effective coping strategies.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
    tags: ["Anxiety", "Student Life", "Mental Health"]
  },
  {
    id: 2,
    title: "The Impact of Social Media on Mental Health",
    excerpt: "Exploring the relationship between social media usage and mental well-being in young adults.",
    date: "2024-03-12",
    readTime: "7 min read",
    category: "Digital Wellness",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    tags: ["Social Media", "Digital Health", "Wellness"]
  },
  {
    id: 3,
    title: "Mindfulness Techniques for Academic Success",
    excerpt: "Discover how mindfulness can improve focus, reduce stress, and enhance academic performance.",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    tags: ["Mindfulness", "Academic Success", "Study Tips"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mental Health & Wellness Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore articles about mental health, wellness, and personal growth for students.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <div key={index} className="flex items-center text-sm text-indigo-600">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-indigo-600 font-medium"
              >
                Read More
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default Blog;