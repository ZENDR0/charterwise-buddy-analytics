
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import ChartMetric from '@/components/ChartMetric';
import MultiChartMetric from '@/components/MultiChartMetric';
import DonutChart from '@/components/DonutChart';

const Budgeting = () => {
  // Sample data for charts
  const budgetVsActualData = [
    { month: 'Jan', budget: 75000, actual: 72000 },
    { month: 'Feb', budget: 70000, actual: 68000 },
    { month: 'Mar', budget: 80000, actual: 82000 },
    { month: 'Apr', budget: 82000, actual: 79000 },
    { month: 'May', budget: 78000, actual: 81000 },
    { month: 'Jun', budget: 85000, actual: 83000 },
    { month: 'Jul', budget: 88000, actual: 90000 },
    { month: 'Aug', budget: 85000, actual: 87000 },
  ];
  
  const budgetAllocationData = [
    { name: 'Operations', value: 40 },
    { name: 'Marketing', value: 20 },
    { name: 'R&D', value: 15 },
    { name: 'Admin', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  const cashFlowData = [
    { month: 'Jan', inflow: 95000, outflow: 72000 },
    { month: 'Feb', inflow: 90000, outflow: 68000 },
    { month: 'Mar', inflow: 105000, outflow: 82000 },
    { month: 'Apr', inflow: 100000, outflow: 79000 },
    { month: 'May', inflow: 110000, outflow: 81000 },
    { month: 'Jun', inflow: 115000, outflow: 83000 },
    { month: 'Jul', inflow: 120000, outflow: 90000 },
    { month: 'Aug', inflow: 115000, outflow: 87000 },
  ];
  
  const varianceData = [
    { category: 'Operations', budget: 40000, actual: 38500, variance: -1500 },
    { category: 'Marketing', budget: 20000, actual: 22000, variance: 2000 },
    { category: 'R&D', budget: 15000, actual: 14000, variance: -1000 },
    { category: 'Admin', budget: 15000, actual: 16500, variance: 1500 },
    { category: 'Other', budget: 10000, actual: 9000, variance: -1000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budgeting & Forecasting</h1>
        <p className="text-muted-foreground">Plan, track and optimize financial resources</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Annual Budget" 
          value="$965,000" 
          description="Current fiscal year" 
          icon={<CalendarClock className="h-4 w-4" />} 
        />
        <MetricCard 
          title="YTD Spending" 
          value="$642,000" 
          trend={-2.3} 
          description="vs. budget" 
          icon={<TrendingDown className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Budget Variance" 
          value="-$15,600" 
          description="Favorable" 
          icon={<TrendingDown className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Forecast Growth" 
          value="8.2%" 
          trend={1.5} 
          description="vs. last year" 
          icon={<TrendingUp className="h-4 w-4" />} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <MultiChartMetric 
              title="Budget vs. Actual" 
              subtitle="Monthly comparison"
              data={budgetVsActualData}
              series={[
                { dataKey: 'budget', name: 'Budget', color: '#3b82f6', type: 'line' },
                { dataKey: 'actual', name: 'Actual', color: '#10b981', type: 'bar' }
              ]}
              xAxisKey="month"
            />
            <MultiChartMetric 
              title="Cash Flow" 
              subtitle="Inflows and outflows"
              data={cashFlowData}
              series={[
                { dataKey: 'inflow', name: 'Cash In', color: '#10b981', type: 'area' },
                { dataKey: 'outflow', name: 'Cash Out', color: '#ef4444', type: 'area' }
              ]}
              xAxisKey="month"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Budget Variance Analysis</CardTitle>
              <CardDescription>By department/category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {varianceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <div className="flex space-x-2 text-sm">
                        <span>Budget: ${item.budget.toLocaleString()}</span>
                        <span>Actual: ${item.actual.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${item.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variance < 0 ? '-' : '+'}${Math.abs(item.variance).toLocaleString()}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between pt-2 font-medium">
                  <div>
                    <p>Total Variance</p>
                  </div>
                  <div className="text-green-600">
                    -${Math.abs(varianceData.reduce((sum, item) => sum + item.variance, 0)).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DonutChart 
              title="Budget Allocation" 
              subtitle="By department/category"
              data={budgetAllocationData}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Details</CardTitle>
                <CardDescription>Breakdown by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Operations</h3>
                      <span className="text-sm font-medium">$386,000 (40%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Marketing</h3>
                      <span className="text-sm font-medium">$193,000 (20%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">R&D</h3>
                      <span className="text-sm font-medium">$144,750 (15%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Admin</h3>
                      <span className="text-sm font-medium">$144,750 (15%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Other</h3>
                      <span className="text-sm font-medium">$96,500 (10%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Budget Optimization Recommendations</CardTitle>
              <CardDescription>Opportunities for reallocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Reallocate Marketing Budget</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Shift 5% from traditional marketing to digital channels for better ROI
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Potential Benefit:</span> 12% increase in marketing effectiveness
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Consolidate Admin Expenses</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce redundancies in administrative spending across departments
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Potential Benefit:</span> $12,500 cost reduction
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Increase R&D Investment</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add 3% to R&D budget from operational efficiency savings
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Potential Benefit:</span> Accelerated product development timeline
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecasting" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartMetric 
              title="Revenue Forecast" 
              subtitle="12-month projection"
              data={[
                { month: 'Sep', value: 120000 },
                { month: 'Oct', value: 125000 },
                { month: 'Nov', value: 130000 },
                { month: 'Dec', value: 145000 },
                { month: 'Jan', value: 135000 },
                { month: 'Feb', value: 140000 },
                { month: 'Mar', value: 150000 },
                { month: 'Apr', value: 155000 },
                { month: 'May', value: 160000 },
                { month: 'Jun', value: 165000 },
                { month: 'Jul', value: 170000 },
                { month: 'Aug', value: 175000 },
              ]} 
              dataKey="value" 
              xAxisKey="month"
              type="line" 
              colors={['#3b82f6']}
            />
            
            <ChartMetric 
              title="Expense Forecast" 
              subtitle="12-month projection"
              data={[
                { month: 'Sep', value: 90000 },
                { month: 'Oct', value: 92000 },
                { month: 'Nov', value: 95000 },
                { month: 'Dec', value: 105000 },
                { month: 'Jan', value: 98000 },
                { month: 'Feb', value: 100000 },
                { month: 'Mar', value: 105000 },
                { month: 'Apr', value: 108000 },
                { month: 'May', value: 110000 },
                { month: 'Jun', value: 112000 },
                { month: 'Jul', value: 115000 },
                { month: 'Aug', value: 118000 },
              ]} 
              dataKey="value" 
              xAxisKey="month"
              type="area" 
              colors={['#ef4444']}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Forecast Assumptions</CardTitle>
              <CardDescription>Key factors influencing projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Revenue Growth Rate</h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">8.2%</div>
                    <div className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      Moderate confidence
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Based on current client acquisition rate and market conditions
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Expense Growth Rate</h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">5.5%</div>
                    <div className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      High confidence
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Accounting for inflation and planned strategic investments
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Seasonal Factors</h3>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">Q4 Peak</div>
                    <div className="ml-2 text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                      Historical pattern
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Traditional year-end increase in financial services demand
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
              <CardDescription>Impact of changing key assumptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Optimistic Scenario</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Revenue Growth</p>
                      <p className="text-lg">10.5%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Projected Profit</p>
                      <p className="text-lg text-green-600">$725,000</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Base Scenario</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Revenue Growth</p>
                      <p className="text-lg">8.2%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Projected Profit</p>
                      <p className="text-lg text-blue-600">$650,000</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Conservative Scenario</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Revenue Growth</p>
                      <p className="text-lg">5.8%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Projected Profit</p>
                      <p className="text-lg text-amber-600">$545,000</p>
                    </div>
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

export default Budgeting;
