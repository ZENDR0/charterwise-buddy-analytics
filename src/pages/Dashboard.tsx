
import React from 'react';
import { ChartBar, FileText, FileSearch, Users, Calculator, CalendarClock } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import ChartMetric from '@/components/ChartMetric';
import MultiChartMetric from '@/components/MultiChartMetric';
import DonutChart from '@/components/DonutChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  // Sample data for the dashboard
  const revenueData = [
    { name: 'Jan', value: 44000 },
    { name: 'Feb', value: 55000 },
    { name: 'Mar', value: 57000 },
    { name: 'Apr', value: 56000 },
    { name: 'May', value: 61000 },
    { name: 'Jun', value: 58000 },
    { name: 'Jul', value: 65000 },
    { name: 'Aug', value: 60000 },
  ];

  const clientsData = [
    { name: 'Q1', new: 10, returning: 25 },
    { name: 'Q2', new: 15, returning: 30 },
    { name: 'Q3', new: 20, returning: 33 },
    { name: 'Q4', new: 25, returning: 40 },
  ];

  const expensesData = [
    { name: 'Jan', value: 28000 },
    { name: 'Feb', value: 29000 },
    { name: 'Mar', value: 33000 },
    { name: 'Apr', value: 30000 },
    { name: 'May', value: 32000 },
    { name: 'Jun', value: 35000 },
    { name: 'Jul', value: 34000 },
    { name: 'Aug', value: 38000 },
  ];

  const serviceDistribution = [
    { name: 'Tax Planning', value: 35 },
    { name: 'Audit', value: 25 },
    { name: 'Compliance', value: 20 },
    { name: 'Costing', value: 10 },
    { name: 'Budgeting', value: 10 },
  ];

  const revenueExpenseData = [
    { name: 'Jan', revenue: 44000, expenses: 28000, profit: 16000 },
    { name: 'Feb', revenue: 55000, expenses: 29000, profit: 26000 },
    { name: 'Mar', revenue: 57000, expenses: 33000, profit: 24000 },
    { name: 'Apr', revenue: 56000, expenses: 30000, profit: 26000 },
    { name: 'May', revenue: 61000, expenses: 32000, profit: 29000 },
    { name: 'Jun', revenue: 58000, expenses: 35000, profit: 23000 },
    { name: 'Jul', revenue: 65000, expenses: 34000, profit: 31000 },
    { name: 'Aug', revenue: 60000, expenses: 38000, profit: 22000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Financial overview and key metrics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Revenue" 
          value="$465,000" 
          trend={8.2} 
          description="vs. last year" 
          icon={<ChartBar className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Tax Returns" 
          value="245" 
          trend={5.4} 
          description="vs. last year" 
          icon={<FileText className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Audit Services" 
          value="56" 
          trend={-2.1} 
          description="vs. last year" 
          icon={<FileSearch className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Active Clients" 
          value="128" 
          trend={12.5} 
          description="vs. last year" 
          icon={<Users className="h-4 w-4" />} 
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <MultiChartMetric 
          title="Revenue vs. Expenses" 
          subtitle="Monthly comparison for current year"
          data={revenueExpenseData}
          series={[
            { dataKey: 'revenue', name: 'Revenue', color: '#10b981', type: 'line' },
            { dataKey: 'expenses', name: 'Expenses', color: '#ef4444', type: 'line' },
            { dataKey: 'profit', name: 'Profit', color: '#3b82f6', type: 'bar' }
          ]}
        />
        <DonutChart 
          title="Service Distribution" 
          subtitle="By revenue percentage"
          data={serviceDistribution.map(item => ({
            name: item.name,
            value: item.value,
          }))}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartMetric 
          title="Monthly Revenue" 
          subtitle="Last 8 months"
          data={revenueData} 
          dataKey="value" 
          type="area" 
          colors={['#10b981']}
        />
        <ChartMetric 
          title="Monthly Expenses" 
          subtitle="Last 8 months"
          data={expensesData} 
          dataKey="value" 
          type="bar" 
          colors={['#ef4444']}
        />
        <MultiChartMetric 
          title="Client Growth" 
          subtitle="By quarter"
          data={clientsData}
          series={[
            { dataKey: 'new', name: 'New Clients', color: '#3b82f6', type: 'bar' },
            { dataKey: 'returning', name: 'Returning Clients', color: '#8b5cf6', type: 'bar' }
          ]}
          stacked={true}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important tax and compliance dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Quarterly Tax Filings</p>
                  <p className="text-sm text-muted-foreground">Corporate clients</p>
                </div>
                <div className="text-sm font-medium">15 Oct 2023</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Annual Compliance Reports</p>
                  <p className="text-sm text-muted-foreground">Financial sector clients</p>
                </div>
                <div className="text-sm font-medium">30 Oct 2023</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">VAT Returns</p>
                  <p className="text-sm text-muted-foreground">All applicable clients</p>
                </div>
                <div className="text-sm font-medium">7 Nov 2023</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest client interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Tax consultation completed</p>
                  <p className="text-xs text-muted-foreground">ABC Corporation • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FileSearch className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Audit report finalized</p>
                  <p className="text-xs text-muted-foreground">XYZ Ltd • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <CalendarClock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Budget planning session</p>
                  <p className="text-xs text-muted-foreground">Omega Enterprises • 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
