
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import ChartMetric from '@/components/ChartMetric';
import DonutChart from '@/components/DonutChart';

const Compliance = () => {
  // Sample data for charts
  const complianceRateData = [
    { month: 'Jan', rate: 88 },
    { month: 'Feb', rate: 85 },
    { month: 'Mar', rate: 90 },
    { month: 'Apr', rate: 92 },
    { month: 'May', rate: 89 },
    { month: 'Jun', rate: 94 },
    { month: 'Jul', rate: 93 },
    { month: 'Aug', rate: 95 },
  ];
  
  const complianceTypeData = [
    { name: 'Regulatory', value: 40 },
    { name: 'Financial', value: 25 },
    { name: 'Tax', value: 20 },
    { name: 'Corporate', value: 15 },
  ];
  
  const issuesByRiskData = [
    { name: 'High', value: 12 },
    { name: 'Medium', value: 28 },
    { name: 'Low', value: 45 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Management</h1>
        <p className="text-muted-foreground">Track and manage regulatory compliance</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Compliance Rate" 
          value="92%" 
          trend={3.5} 
          description="vs. last year" 
          icon={<CheckCircle className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Active Requirements" 
          value="156" 
          description="Across all clients" 
          icon={<FileText className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Open Issues" 
          value="14" 
          trend={-8.3} 
          description="vs. last quarter" 
          icon={<AlertCircle className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Clients Monitored" 
          value="85" 
          trend={12.4} 
          description="vs. last year" 
          icon={<Users className="h-4 w-4" />} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartMetric 
              title="Compliance Rate Trend" 
              subtitle="Last 8 months"
              data={complianceRateData} 
              dataKey="rate" 
              xAxisKey="month"
              type="line" 
              colors={['#10b981']}
            />
            <DonutChart 
              title="Compliance by Type" 
              subtitle="Distribution of compliance requirements"
              data={complianceTypeData}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Compliance Deadlines</CardTitle>
              <CardDescription>Next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Financial Services Regulatory Report</p>
                    <p className="text-sm text-muted-foreground">XYZ Financial</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">High Priority</div>
                    <div className="text-sm">Oct 15, 2023</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Annual Corporate Governance Certification</p>
                    <p className="text-sm text-muted-foreground">ABC Corporation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium Priority</div>
                    <div className="text-sm">Oct 22, 2023</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Environmental Compliance Report</p>
                    <p className="text-sm text-muted-foreground">Green Industries Ltd</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium Priority</div>
                    <div className="text-sm">Oct 28, 2023</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Data Protection Audit</p>
                    <p className="text-sm text-muted-foreground">Tech Solutions Inc</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Low Priority</div>
                    <div className="text-sm">Nov 5, 2023</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requirements" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>By category and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Regulatory Compliance</h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Financial Services Regulations</p>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Compliant</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Data Protection Laws</p>
                        <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">In Progress</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Financial Compliance</h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Accounting Standards</p>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Compliant</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Financial Reporting</p>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Compliant</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Tax Compliance</h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Corporate Tax</p>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Compliant</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">VAT/GST</p>
                        <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">In Progress</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DonutChart 
              title="Issues by Risk Level" 
              subtitle="Current distribution"
              data={issuesByRiskData}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance Issue Summary</CardTitle>
                <CardDescription>Status overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <p className="font-medium">High Risk Issues</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">12</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <p className="font-medium">Medium Risk Issues</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">28</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <p className="font-medium">Low Risk Issues</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">45</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Compliance Issues</CardTitle>
              <CardDescription>Issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <h3 className="font-medium text-red-800">Missing Regulatory Documentation</h3>
                  </div>
                  <p className="text-sm text-red-700 mt-1">Required regulatory filings incomplete for financial period Q3</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-red-700">XYZ Financial Services</span>
                    <span className="text-xs text-red-700">Due: Oct 15, 2023</span>
                  </div>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium text-amber-800">Outdated Privacy Policy</h3>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">Current policy does not reflect recent data protection regulation changes</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-amber-700">Tech Solutions Inc</span>
                    <span className="text-xs text-amber-700">Due: Oct 30, 2023</span>
                  </div>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium text-amber-800">Incomplete Tax Documentation</h3>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">Supporting documents for international transactions missing</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-amber-700">Global Trading Ltd</span>
                    <span className="text-xs text-amber-700">Due: Nov 15, 2023</span>
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

export default Compliance;
