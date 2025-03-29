
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSearch, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import ChartMetric from '@/components/ChartMetric';
import MultiChartMetric from '@/components/MultiChartMetric';

const Audit = () => {
  // Sample data for the charts
  const auditStatusData = [
    { name: 'Completed', value: 65 },
    { name: 'In Progress', value: 25 },
    { name: 'Pending', value: 10 },
  ];
  
  const auditFindingsData = [
    { category: 'Financial Reporting', compliant: 85, issues: 15 },
    { category: 'Internal Controls', compliant: 70, issues: 30 },
    { category: 'Regulatory', compliant: 92, issues: 8 },
    { category: 'Operations', compliant: 78, issues: 22 },
    { category: 'IT Systems', compliant: 65, issues: 35 },
  ];
  
  const severityData = [
    { name: 'Jan', low: 10, medium: 5, high: 2 },
    { name: 'Feb', low: 12, medium: 7, high: 1 },
    { name: 'Mar', low: 8, medium: 4, high: 3 },
    { name: 'Apr', low: 15, medium: 8, high: 2 },
    { name: 'May', low: 11, medium: 6, high: 0 },
    { name: 'Jun', low: 9, medium: 5, high: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit & Assurance</h1>
        <p className="text-muted-foreground">Manage and track audit processes and findings</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Audits" 
          value="56" 
          trend={4.5} 
          description="vs. last year" 
          icon={<FileSearch className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Completed" 
          value="36" 
          trend={7.2} 
          description="vs. last year" 
          icon={<CheckCircle className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Critical Findings" 
          value="9" 
          trend={-12.3} 
          description="vs. last year" 
          icon={<AlertCircle className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Unresolved Issues" 
          value="14" 
          trend={-5.4} 
          description="vs. last year" 
          icon={<XCircle className="h-4 w-4" />} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartMetric 
              title="Audit Status" 
              subtitle="Current period"
              data={auditStatusData} 
              dataKey="value" 
              type="bar" 
              xAxisKey="name"
            />
            <MultiChartMetric 
              title="Audit Findings by Severity" 
              subtitle="Monthly trend"
              data={severityData}
              series={[
                { dataKey: 'low', name: 'Low Risk', color: '#10b981', type: 'bar' },
                { dataKey: 'medium', name: 'Medium Risk', color: '#f59e0b', type: 'bar' },
                { dataKey: 'high', name: 'High Risk', color: '#ef4444', type: 'bar' }
              ]}
              stacked={true}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Audits</CardTitle>
              <CardDescription>Status of ongoing audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Financial Audit - ABC Corp</p>
                    <p className="text-sm text-muted-foreground">Annual review</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">In Progress</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Compliance Audit - XYZ Ltd</p>
                    <p className="text-sm text-muted-foreground">Regulatory requirement</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Internal Controls - Acme Inc</p>
                    <p className="text-sm text-muted-foreground">Quarterly check</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">In Progress</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Operational Audit - Global Ltd</p>
                    <p className="text-sm text-muted-foreground">Process review</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Planning</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="findings" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Audit Findings by Category</CardTitle>
                <CardDescription>Compliance status in major categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditFindingsData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm">{item.compliant}% Compliant</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div 
                          className="h-2 rounded-full bg-green-500" 
                          style={{ width: `${item.compliant}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Critical Findings</CardTitle>
                <CardDescription>High-priority issues identified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <h3 className="font-medium text-red-800">Financial Reporting Discrepancy</h3>
                    </div>
                    <p className="text-sm text-red-700 mt-1">Revenue recognition inconsistencies found in Q2 financial statements</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-red-700">ABC Corporation</span>
                      <span className="text-xs text-red-700">Identified: Aug 15, 2023</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <h3 className="font-medium text-red-800">Internal Control Weakness</h3>
                    </div>
                    <p className="text-sm text-red-700 mt-1">Inadequate segregation of duties in payment processing</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-red-700">XYZ Limited</span>
                      <span className="text-xs text-red-700">Identified: Sep 2, 2023</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium text-amber-800">Compliance Gap</h3>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">Incomplete documentation for regulatory reporting requirements</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-amber-700">Acme Enterprises</span>
                      <span className="text-xs text-amber-700">Identified: Sep 10, 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>Recently finalized audit reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Annual Financial Audit</p>
                      <p className="text-sm text-muted-foreground">ABC Corporation</p>
                    </div>
                  </div>
                  <div className="text-sm">Sept 15, 2023</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Regulatory Compliance Audit</p>
                      <p className="text-sm text-muted-foreground">XYZ Financial Services</p>
                    </div>
                  </div>
                  <div className="text-sm">Aug 28, 2023</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Internal Controls Assessment</p>
                      <p className="text-sm text-muted-foreground">Global Manufacturing Inc</p>
                    </div>
                  </div>
                  <div className="text-sm">Aug 15, 2023</div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">IT Systems Audit</p>
                      <p className="text-sm text-muted-foreground">Tech Innovations Ltd</p>
                    </div>
                  </div>
                  <div className="text-sm">July 30, 2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Audit;
