import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer'; 
import './styles/main.css';

// Default component imports
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CharacterCreator from './pages/CharacterCreator';
import CampaignManager from './components/CampaignManager';
import BattleGrid from './pages/BattleGrid';
import NotFoundPage from './pages/NotFoundPage'; 

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/character-creator" element={<CharacterCreator />} />
            <Route path="/campaign" element={<CampaignManager />} />
            <Route path="/battle" element={<BattleGrid />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
}