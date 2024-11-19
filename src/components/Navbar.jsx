import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SignInModal from './auth/SignInModal';

const Navbar = ({ onSignIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'detailed-features', 'tools', 'community'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInSuccess = () => {
    setShowSignInModal(false);
    onSignIn();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-secondary/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span 
                className="text-2xl font-bold text-primary cursor-pointer"
                onClick={() => scrollToSection('hero')}
              >
                MetalHub
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <span 
                onClick={() => scrollToSection('features')}
                className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
              >
                Features
              </span>
              <span 
                onClick={() => scrollToSection('tools')}
                className={`nav-link ${activeSection === 'tools' ? 'active' : ''}`}
              >
                Tools
              </span>
              <span 
                onClick={() => scrollToSection('community')}
                className={`nav-link ${activeSection === 'community' ? 'active' : ''}`}
              >
                Community
              </span>
              <button 
                className="btn btn-primary"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <span 
                onClick={() => scrollToSection('features')}
                className={`nav-link block px-3 py-2 ${activeSection === 'features' ? 'active' : ''}`}
              >
                Features
              </span>
              <span 
                onClick={() => scrollToSection('tools')}
                className={`nav-link block px-3 py-2 ${activeSection === 'tools' ? 'active' : ''}`}
              >
                Tools
              </span>
              <span 
                onClick={() => scrollToSection('community')}
                className={`nav-link block px-3 py-2 ${activeSection === 'community' ? 'active' : ''}`}
              >
                Community
              </span>
              <button 
                className="btn btn-primary w-full mt-4"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)}
        onSignInSuccess={handleSignInSuccess}
      />
    </>
  );
};

export default Navbar;