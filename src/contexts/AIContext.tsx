
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AIContextType {
  aiAdviceEnabled: boolean;
  aiChatbotEnabled: boolean;
  setAIAdviceEnabled: (enabled: boolean) => void;
  setAIChatbotEnabled: (enabled: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiAdviceEnabled, setAIAdviceEnabled] = useState(true);
  const [aiChatbotEnabled, setAIChatbotEnabled] = useState(true);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedAdvice = localStorage.getItem('aiAdviceEnabled');
    const savedChatbot = localStorage.getItem('aiChatbotEnabled');
    
    if (savedAdvice !== null) {
      setAIAdviceEnabled(savedAdvice === 'true');
    }
    
    if (savedChatbot !== null) {
      setAIChatbotEnabled(savedChatbot === 'true');
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('aiAdviceEnabled', aiAdviceEnabled.toString());
  }, [aiAdviceEnabled]);

  useEffect(() => {
    localStorage.setItem('aiChatbotEnabled', aiChatbotEnabled.toString());
  }, [aiChatbotEnabled]);

  return (
    <AIContext.Provider 
      value={{ 
        aiAdviceEnabled, 
        aiChatbotEnabled, 
        setAIAdviceEnabled, 
        setAIChatbotEnabled 
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
