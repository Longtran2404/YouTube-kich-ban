import React from 'react';
import StarBackground from './components/StarBackground/StarBackground';
import FloatingOrbs from './components/FloatingOrbs/FloatingOrbs';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import MainTabs from './components/MainTabs/MainTabs';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <StarBackground />
      <FloatingOrbs />
      
      <main className="main-content">
        <Header />
        <HeroSection />
        <MainTabs />
      </main>
      
      <Chatbot />
    </div>
  );
}

export default App;
