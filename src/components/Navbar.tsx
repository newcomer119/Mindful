import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { Brain, BarChart2, MessageCircle, BookOpen, Users, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItemVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } }
  };

  const NavItems = () => (
    <>
      <motion.div variants={navItemVariants} whileHover="hover">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            isActive('/dashboard')
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <BarChart2 className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
      </motion.div>

      <motion.div
        variants={navItemVariants}
        whileHover="hover"
      >
        <Link
          to="/chat"
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            isActive('/chat')
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat</span>
        </Link>
      </motion.div>

      <motion.div
        variants={navItemVariants}
        whileHover="hover"
      >
        <Link
          to="/blog"
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            isActive('/blog')
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <BookOpen className="h-5 w-5" />
          <span>Blog</span>
        </Link>
      </motion.div>

      <motion.div
        variants={navItemVariants}
        whileHover="hover"
      >
        <Link
          to="/about"
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            isActive('/about')
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Users className="h-5 w-5" />
          <span>About Us</span>
        </Link>
      </motion.div>
    </>
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">MindfulAI</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {isSignedIn ? (
              <>
                <NavItems />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </motion.button>
              </SignInButton>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {isSignedIn && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-indigo-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
            <div className="ml-4">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <NavItems />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;