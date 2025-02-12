import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Award, Users, Heart, Globe, Sparkles } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Mitarth',
      role: 'Team Member',
      description: 'Description for Mitarth.'
    },
    {
      name: 'Sparsh Kapoor',
      role: 'Team Member',
      description: 'Description for Sparsh Kapoor.'
    },
    {
      name: 'Devansh Lalwani',
      role: 'Team Member',
      description: 'Description for Devansh Lalwani.'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      title: 'Empathy First',
      description: 'We believe in understanding and supporting each individuals unique journey.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Accessibility',
      description: 'Making mental health support available to students everywhere, anytime.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI technology to provide personalized support.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing Student Mental Health
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MindfulAI combines artificial intelligence with mental health expertise to provide 
              24/7 support for students worldwide. Our mission is to make mental health support 
              accessible, personalized, and effective.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600">
                To transform student mental health support through innovative AI technology, 
                making professional-grade mental wellness accessible to every student, 
                anywhere, anytime.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600">
                A world where every student has immediate access to mental health support, 
                leading to improved academic performance, better well-being, and stronger 
                communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {value.icon}
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Meet the experts behind MindfulAI</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;