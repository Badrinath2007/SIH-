import React, { createContext, useContext, useState } from 'react';
import { GLOSSARY } from '../data/glossary';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // isEasyMode true means "Simple English Mode", false means "Technical Mode"
  const [isEasyMode, setIsEasyMode] = useState(true);

  const toggleLanguage = () => {
    setIsEasyMode((prev) => !prev);
  };

  // Helper method to get localized text from GLOSSARY or fallback
  const getTerm = (key) => {
    const item = GLOSSARY[key];
    if (!item) return { title: key, desc: '' };
    return {
      title: isEasyMode ? item.simpleKey : item.techKey,
      desc: isEasyMode ? item.descSimple : item.descTech
    };
  };

  return (
    <LanguageContext.Provider value={{ isEasyMode, toggleLanguage, getTerm }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
