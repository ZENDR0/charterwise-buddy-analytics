
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StackedBarChartProps {
  title: string;
  subtitle?: string;
  data: any[];
  keys: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  xAxisKey?: string;
}

const StackedBarChart = ({ 
  title, 
  subtitle, 
  data, 
  keys, 
  xAxisKey = 'name' 
}: StackedBarChartProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            {keys.map((item, index) => (
              <Bar 
                key={index} 
                dataKey={item.key} 
                name={item.name}
                stackId="a" 
                fill={item.color} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StackedBarChart;
