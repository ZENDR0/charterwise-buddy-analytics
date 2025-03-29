
import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAI } from '@/contexts/AIContext';
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';

interface AIAdviceButtonProps {
  feature: 'taxes' | 'audit' | 'compliance' | 'costing' | 'budgeting' | 'invoices' | 'reports' | 'dashboard';
  className?: string;
}

const AIAdviceButton: React.FC<AIAdviceButtonProps> = ({ feature, className }) => {
  const [showAdvice, setShowAdvice] = useState(false);
  const { aiAdviceEnabled } = useAI();

  if (!aiAdviceEnabled) return null;

  const getAdvice = (): string => {
    switch (feature) {
      case 'taxes':
        return "Consider reviewing recent tax code changes that might affect your client's deductions. Our analysis suggests potential savings in the R&D category.";
      case 'audit':
        return "Based on the transaction patterns, you might want to examine the accounts receivable aging report more closely, as there are unusual patterns compared to previous quarters.";
      case 'compliance':
        return "Your client's industry has new regulatory requirements effective next month. Consider preparing a compliance checklist to ensure all new requirements are met.";
      case 'costing':
        return "Your cost allocation approach could be optimized. Consider activity-based costing for manufacturing clients to get more accurate insights.";
      case 'budgeting':
        return "Based on historical data, your client's Q3 forecast may be optimistic. Consider creating alternative scenarios with different growth assumptions.";
      case 'invoices':
        return "Some of your uploaded invoices have inconsistent payment terms. Consider standardizing terms to improve cash flow predictability.";
      case 'reports':
        return "Your clients might benefit from custom KPI dashboards tailored to their industry. Consider setting up industry benchmarks for comparison.";
      case 'dashboard':
        return "Your dashboard shows revenue growth is outpacing profitability. Consider analyzing expense categories to identify areas for potential cost optimization.";
      default:
        return "Our AI has analyzed your data and has some suggestions to optimize your work.";
    }
  };

  const toggleAdvice = () => {
    setShowAdvice(!showAdvice);
  };

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
        onClick={toggleAdvice}
      >
        <Lightbulb className="h-4 w-4" />
      </Button>
      
      {showAdvice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={toggleAdvice}>
          <Card className="max-w-md w-full bg-white" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI Suggestion</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={toggleAdvice}
                >
                  <X size={16} />
                </Button>
              </div>
              <p className="text-sm">{getAdvice()}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAdviceButton;
