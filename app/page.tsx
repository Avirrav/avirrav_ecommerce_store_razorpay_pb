import React from 'react';
import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';
import StorySection from '../components/landingComponents/StorySection';
import AudienceSection from '../components/landingComponents/AudienceSection';
import PricingSection from '../components/landingComponents/PricingSection';
import SocialProofSection from '../components/landingComponents/SocialProofSection';
import FinalCTA from '../components/landingComponents/FinalCTA';
import FAQ from '../components/landingComponents/FAQ';
import Footer from '../components/landingComponents/Footer';

function App() {
  return (
    <div className="min-h-screen bg-seasalt">
      <Header />
      <Hero />
      <StorySection />
      <AudienceSection />
      <PricingSection />
      <SocialProofSection />
      <FinalCTA />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;