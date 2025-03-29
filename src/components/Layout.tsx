
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AIChatWidget from './AIChatWidget';
import { useAI } from '@/contexts/AIContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { aiChatbotEnabled } = useAI();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
      {aiChatbotEnabled && <AIChatWidget />}
    </div>
  );
};

export default Layout;
