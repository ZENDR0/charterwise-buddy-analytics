
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calculator, ArrowDown, ArrowUp } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import DonutChart from '@/components/DonutChart';
import ChartMetric from '@/components/ChartMetric';

const Taxes = () => {
  // Sample data for the charts
  const taxDistribution = [
    { name: 'Income Tax', value: 45 },
    { name: 'GST/VAT', value: 25 },
    { name: 'Corporate Tax', value: 20 },
    { name: 'Capital Gains', value: 10 },
  ];
  
  const taxTrendsData = [
    { name: 'Jan', amount: 35000 },
    { name: 'Feb', amount: 28000 },
    { name: 'Mar', amount: 42000 },
    { name: 'Apr', amount: 33000 },
    { name: 'May', amount: 39000 },
    { name: 'Jun', amount: 45000 },
    { name: 'Jul', amount: 41000 },
    { name: 'Aug', amount: 49000 },
  ];
  
  const savingsData = [
    { name: 'Q1', amount: 12000 },
    { name: 'Q2', amount: 15000 },
    { name: 'Q3', amount: 14000 },
    { name: 'Q4', amount: 18000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tax Management</h1>
        <p className="text-muted-foreground">Tax planning, filing, and optimization</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Tax Returns Filed" 
          value="245" 
          trend={8.2} 
          description="vs. last year" 
          icon={<FileText className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Average Tax Rate" 
          value="24.5%" 
          trend={-1.2} 
          description="vs. last year" 
          icon={<Calculator className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Tax Savings" 
          value="$59,000" 
          trend={12.3} 
          description="vs. last year" 
          icon={<ArrowDown className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Tax Due This Month" 
          value="$78,500" 
          trend={5.4} 
          description="vs. last month" 
          icon={<ArrowUp className="h-4 w-4" />} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DonutChart 
              title="Tax Distribution" 
              subtitle="By tax type"
              data={taxDistribution.map(item => ({
                name: item.name,
                value: item.value,
              }))}
            />
            <ChartMetric 
              title="Monthly Tax Payments" 
              subtitle="Current Year"
              data={taxTrendsData} 
              dataKey="amount" 
              type="bar" 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tax Deadlines</CardTitle>
              <CardDescription>Important filing and payment dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Quarterly Tax Payments</p>
                    <p className="text-sm text-muted-foreground">Corporate clients</p>
                  </div>
                  <div className="text-sm font-medium">15 Oct 2023</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">VAT Returns</p>
                    <p className="text-sm text-muted-foreground">Taxable businesses</p>
                  </div>
                  <div className="text-sm font-medium">7 Nov 2023</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Annual Tax Returns</p>
                    <p className="text-sm text-muted-foreground">Individual clients</p>
                  </div>
                  <div className="text-sm font-medium">31 Dec 2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="planning" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartMetric 
              title="Tax Savings" 
              subtitle="By quarter"
              data={savingsData} 
              dataKey="amount" 
              type="area" 
              colors={['#10b981']}
            />
            <Card>
              <CardHeader>
                <CardTitle>Tax Planning Strategies</CardTitle>
                <CardDescription>Recommended approaches for clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Income Splitting</h3>
                    <p className="text-sm text-muted-foreground">Distribute income among family members to reduce overall tax burden</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Retirement Contributions</h3>
                    <p className="text-sm text-muted-foreground">Maximize tax-advantaged retirement account contributions</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Business Structure Optimization</h3>
                    <p className="text-sm text-muted-foreground">Review and adjust business structures for tax efficiency</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Deduction Timing</h3>
                    <p className="text-sm text-muted-foreground">Strategically time income and deductions between tax years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance Status</CardTitle>
              <CardDescription>Client filing status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="font-medium">Filed & Compliant</p>
                  </div>
                  <div className="text-sm font-medium">178 clients</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <p className="font-medium">In Progress</p>
                  </div>
                  <div className="text-sm font-medium">45 clients</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <p className="font-medium">Pending Action</p>
                  </div>
                  <div className="text-sm font-medium">22 clients</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Taxes;
