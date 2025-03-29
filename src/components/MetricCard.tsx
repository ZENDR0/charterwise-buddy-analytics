
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  icon?: React.ReactNode;
}

const MetricCard = ({ title, value, description, trend, icon }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend !== undefined) && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend !== undefined && (
              trend > 0 ? (
                <span className="flex items-center text-green-500 mr-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {Math.abs(trend)}%
                </span>
              ) : (
                <span className="flex items-center text-red-500 mr-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  {Math.abs(trend)}%
                </span>
              )
            )}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
