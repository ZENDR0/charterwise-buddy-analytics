
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import ChartMetric from '@/components/ChartMetric';
import StackedBarChart from '@/components/StackedBarChart';
import MultiChartMetric from '@/components/MultiChartMetric';

const Costing = () => {
  // Sample data for charts
  const costTrendData = [
    { month: 'Jan', value: 84000 },
    { month: 'Feb', value: 82000 },
    { month: 'Mar', value: 86000 },
    { month: 'Apr', value: 88000 },
    { month: 'May', value: 85000 },
    { month: 'Jun', value: 90000 },
    { month: 'Jul', value: 92000 },
    { month: 'Aug', value: 89000 },
  ];
  
  const costBreakdownData = [
    { name: 'Q1', labor: 45000, materials: 25000, overhead: 15000 },
    { name: 'Q2', labor: 48000, materials: 28000, overhead: 16000 },
    { name: 'Q3', labor: 52000, materials: 30000, overhead: 18000 },
    { name: 'Q4', labor: 55000, materials: 32000, overhead: 20000 },
  ];
  
  const marginTrendData = [
    { month: 'Jan', gross: 32, operating: 18, net: 12 },
    { month: 'Feb', gross: 34, operating: 20, net: 13 },
    { month: 'Mar', gross: 33, operating: 19, net: 14 },
    { month: 'Apr', gross: 36, operating: 22, net: 15 },
    { month: 'May', gross: 35, operating: 21, net: 14 },
    { month: 'Jun', gross: 38, operating: 24, net: 16 },
    { month: 'Jul', gross: 37, operating: 23, net: 15 },
    { month: 'Aug', gross: 39, operating: 25, net: 17 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cost Accounting</h1>
        <p className="text-muted-foreground">Track, analyze and optimize costs</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Cost" 
          value="$696,000" 
          trend={4.2} 
          description="vs. last year" 
          icon={<Calculator className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Gross Margin" 
          value="36.2%" 
          trend={2.1} 
          description="vs. last year" 
          icon={<TrendingUp className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Cost Variance" 
          value="$18,500" 
          trend={-3.4} 
          description="vs. budget" 
          icon={<TrendingDown className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Cost Per Unit" 
          value="$215" 
          trend={-1.8} 
          description="vs. last quarter" 
          icon={<DollarSign className="h-4 w-4" />} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartMetric 
              title="Cost Trend" 
              subtitle="Monthly costs for current year"
              data={costTrendData} 
              dataKey="value" 
              xAxisKey="month"
              type="line" 
            />
            <MultiChartMetric 
              title="Profit Margins" 
              subtitle="Monthly margin percentages"
              data={marginTrendData}
              series={[
                { dataKey: 'gross', name: 'Gross Margin', color: '#10b981' },
                { dataKey: 'operating', name: 'Operating Margin', color: '#3b82f6' },
                { dataKey: 'net', name: 'Net Margin', color: '#8b5cf6' }
              ]}
              xAxisKey="month"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Opportunities</CardTitle>
              <CardDescription>Identified areas for cost reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Procurement Consolidation</p>
                    <p className="text-sm text-muted-foreground">Consolidate vendors for bulk discounts</p>
                  </div>
                  <div className="text-sm font-medium text-green-600">Est. Savings: $25,000</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Process Automation</p>
                    <p className="text-sm text-muted-foreground">Automate manual accounting tasks</p>
                  </div>
                  <div className="text-sm font-medium text-green-600">Est. Savings: $18,500</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Inventory Management</p>
                    <p className="text-sm text-muted-foreground">Optimize inventory levels and turnover</p>
                  </div>
                  <div className="text-sm font-medium text-green-600">Est. Savings: $12,000</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Energy Efficiency</p>
                    <p className="text-sm text-muted-foreground">Implement energy-saving measures</p>
                  </div>
                  <div className="text-sm font-medium text-green-600">Est. Savings: $8,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="breakdown" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-1">
            <StackedBarChart 
              title="Cost Breakdown by Category" 
              subtitle="Quarterly distribution"
              data={costBreakdownData} 
              keys={[
                { key: 'labor', name: 'Labor', color: '#3b82f6' },
                { key: 'materials', name: 'Materials', color: '#8b5cf6' },
                { key: 'overhead', name: 'Overhead', color: '#f59e0b' },
              ]}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Cost Structure Analysis</CardTitle>
                <CardDescription>Current cost distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Labor Costs</h3>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '58%' }}></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Includes direct labor, salaries, benefits, and contractor payments
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Materials & Supplies</h3>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: '28%' }}></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Raw materials, supplies, and component parts
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Overhead Costs</h3>
                      <span className="text-sm font-medium">14%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: '14%' }}></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Rent, utilities, insurance, and other indirect expenses
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost-Volume-Profit Analysis</CardTitle>
                <CardDescription>Break-even analysis and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-1">Break-even Point</h3>
                    <div className="text-2xl font-bold">$425,000</div>
                    <div className="text-sm text-muted-foreground">
                      Sales volume needed to cover all costs
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Contribution Margin</h3>
                    <div className="text-2xl font-bold">42%</div>
                    <div className="text-sm text-muted-foreground">
                      Revenue remaining after variable costs
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Fixed Costs</h3>
                    <div className="text-2xl font-bold">$178,500</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly costs regardless of production volume
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Variance Analysis</CardTitle>
                <CardDescription>Actual vs. budgeted costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Labor Variance</p>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                      <div className="text-sm font-medium text-red-600">+$12,500 (4.8%)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Materials Variance</p>
                    </div>
                    <div className="flex items-center">
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                      <div className="text-sm font-medium text-green-600">-$8,200 (3.2%)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Overhead Variance</p>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                      <div className="text-sm font-medium text-red-600">+$4,300 (2.1%)</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Total Variance</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        <div className="text-sm font-medium text-red-600">+$8,600 (2.7%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Operational efficiency indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Cost per Employee</h3>
                  <div className="text-2xl font-bold">$4,250</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-600">2.1% improvement</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Asset Utilization</h3>
                  <div className="text-2xl font-bold">82%</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-600">3.5% improvement</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Cost per Transaction</h3>
                  <div className="text-2xl font-bold">$12.85</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-600">4.2% improvement</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Costing;
