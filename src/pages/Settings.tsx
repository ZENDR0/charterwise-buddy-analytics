
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAI } from '@/contexts/AIContext';

const Settings = () => {
  const { aiAdviceEnabled, aiChatbotEnabled, setAIAdviceEnabled, setAIChatbotEnabled } = useAI();

  const handleAIAdviceToggle = (checked: boolean) => {
    setAIAdviceEnabled(checked);
    toast(checked ? "AI Advice enabled" : "AI Advice disabled");
  };

  const handleAIChatbotToggle = (checked: boolean) => {
    setAIChatbotEnabled(checked);
    toast(checked ? "AI Chat Widget enabled" : "AI Chat Widget disabled");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant Settings</CardTitle>
          <CardDescription>Configure how the AI assistant works throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="aiAdvice">AI Feature Advice</Label>
              <p className="text-sm text-muted-foreground">Show AI suggestions and advice for each feature</p>
            </div>
            <Switch 
              id="aiAdvice" 
              checked={aiAdviceEnabled}
              onCheckedChange={handleAIAdviceToggle}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="aiChatbot">AI Chat Widget</Label>
              <p className="text-sm text-muted-foreground">Enable the AI chat assistant in the corner</p>
            </div>
            <Switch 
              id="aiChatbot" 
              checked={aiChatbotEnabled}
              onCheckedChange={handleAIChatbotToggle}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive emails for important updates</p>
            </div>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications in the app</p>
            </div>
            <Switch id="pushNotifications" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
