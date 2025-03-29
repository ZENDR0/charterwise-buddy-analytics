
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, X } from 'lucide-react';
import { Button } from './ui/button';

interface AIFeatureAdviceProps {
  feature: 'taxes' | 'audit' | 'compliance' | 'costing' | 'budgeting' | 'invoices' | 'reports';
}

const AIFeatureAdvice: React.FC<AIFeatureAdviceProps> = ({ feature }) => {
  const [isVisible, setIsVisible] = useState(true);

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
      default:
        return "Our AI has analyzed your data and has some suggestions to optimize your work.";
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-primary/5 border-primary/20 mb-4">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">AI Suggestion</p>
            <p className="text-sm text-muted-foreground">{getAdvice()}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 flex-shrink-0" 
            onClick={() => setIsVisible(false)}
          >
            <X size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFeatureAdvice;
