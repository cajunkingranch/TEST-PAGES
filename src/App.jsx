import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPageAtmospheric from './pages/LandingPageAtmospheric';
import CompanionSelect from './pages/CompanionSelect';
import CompanionProfile from './pages/CompanionProfile';
import ChatInterface from './pages/ChatInterface';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPageAtmospheric />} />
        <Route path="/landing" element={<LandingPageAtmospheric />} />
        <Route path="/select" element={<CompanionSelect />} />
        <Route path="/profile" element={<CompanionProfile />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<CompanionSelect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
