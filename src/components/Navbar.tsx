import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { Brain, BarChart2, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (!isSignedIn) {
      
      return;
    } else {
      navigate('/chat');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">MindfulAI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleChatClick}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat</span>
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <button
                  onClick={handleChatClick}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar