import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  [key: string]: string | number;
}

interface SeriesConfig {
  dataKey: string;
  name?: string;
  color: string;
  type?: 'line' | 'bar' | 'area';
}

interface MultiChartMetricProps {
  title: string;
  subtitle?: string;
  data: DataItem[];
  series: SeriesConfig[];
  xAxisKey?: string;
  stacked?: boolean;
}

const MultiChartMetric = ({ 
  title, 
  subtitle, 
  data, 
  series,
  xAxisKey = 'name',
  stacked = false
}: MultiChartMetricProps) => {
  
  // Check if we're using multiple chart types
  const hasMultipleTypes = series.some(s => s.type && s.type !== series[0].type);
  
  const renderChart = () => {
    // If we have multiple chart types, use ComposedChart
    if (hasMultipleTypes) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            {series.map((s, idx) => {
              if (s.type === 'bar') {
                return (
                  <Bar 
                    key={idx} 
                    dataKey={s.dataKey} 
                    name={s.name || s.dataKey} 
                    fill={s.color} 
                    stackId={stacked ? "stack" : undefined}
                    radius={[4, 4, 0, 0]}
                  />
                );
              } else if (s.type === 'area') {
                return (
                  <Area 
                    key={idx} 
                    type="monotone" 
                    dataKey={s.dataKey} 
                    name={s.name || s.dataKey} 
                    stroke={s.color} 
                    fill={s.color} 
                    fillOpacity={0.2} 
                  />
                );
              } else {
                return (
                  <Line 
                    key={idx} 
                    type="monotone" 
                    dataKey={s.dataKey} 
                    name={s.name || s.dataKey} 
                    stroke={s.color} 
                    strokeWidth={2} 
                    dot={{ stroke: s.color, fill: s.color, r: 4 }}
                  />
                );
              }
            })}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
    
    // Otherwise use the specific chart type
    const chartType = series[0].type || 'line';
    
    switch(chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              {series.map((s, idx) => (
                <Bar 
                  key={idx} 
                  dataKey={s.dataKey} 
                  name={s.name || s.dataKey} 
                  fill={s.color} 
                  stackId={stacked ? "stack" : undefined}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              {series.map((s, idx) => (
                <Area 
                  key={idx} 
                  type="monotone" 
                  dataKey={s.dataKey} 
                  name={s.name || s.dataKey} 
                  stroke={s.color} 
                  fill={s.color} 
                  fillOpacity={0.2} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              {series.map((s, idx) => (
                <Line 
                  key={idx} 
                  type="monotone" 
                  dataKey={s.dataKey} 
                  name={s.name || s.dataKey} 
                  stroke={s.color} 
                  strokeWidth={2} 
                  dot={{ stroke: s.color, fill: s.color, r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="p-0">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default MultiChartMetric;
