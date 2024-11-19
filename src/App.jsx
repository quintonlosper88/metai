import React, { useState } from 'react';
import TopNav from './components/navigation/TopNav';
import Dashboard from './components/dashboard/Dashboard';
import CalculatorSuite from './components/calculators/CalculatorSuite';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'tools':
        return <CalculatorSuite />;
      case 'home':
      default:
        return <Dashboard onSignOut={handleSignOut} onCalculator={() => setCurrentPage('tools')} />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <TopNav 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
      />
      <div className="pt-16">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;