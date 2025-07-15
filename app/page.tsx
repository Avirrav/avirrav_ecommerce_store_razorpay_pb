"use client"
import React, { useState } from 'react';
import Sidebar from '../components/landingComponents/Sidebar';
import MainContent from '../components/landingComponents/MainContent';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-seasalt">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <MainContent activeSection={activeSection} />
    </div>
  );
}

export default App;