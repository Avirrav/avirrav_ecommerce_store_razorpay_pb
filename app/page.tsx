"use client"
import React, { useState } from 'react';
import Sidebar from '../components/landingComponents/Sidebar';
import MainContent from '../components/landingComponents/MainContent';
import BottomNavigation from '../components/landingComponents/BottomNavigation';
import MobileHeader from '../components/landingComponents/MobileHeader';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-seasalt">
      <MobileHeader />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <MainContent activeSection={activeSection} />
      <BottomNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  );
}

export default App;