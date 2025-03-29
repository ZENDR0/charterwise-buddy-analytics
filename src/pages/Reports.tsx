
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartBar, BarChart3, LineChart, PieChart } from 'lucide-react';

const Reports = () => {
  const financialReports = [
    { name: 'Annual Financial Statement', type: 'PDF', date: 'September 15, 2023', size: '2.4 MB' },
    { name: 'Quarterly Performance Report', type: 'PDF', date: 'August 10, 2023', size: '1.8 MB' },
    { name: 'Cash Flow Analysis', type: 'Excel', date: 'August 5, 2023', size: '3.2 MB' },
    { name: 'Budget Variance Report', type: 'PDF', date: 'July 28, 2023', size: '1.5 MB' },
    { name: 'Income Statement', type: 'Excel', date: 'July 15, 2023', size: '1.2 MB' },
  ];

  const taxReports = [
    { name: 'Corporate Tax Return', type: 'PDF', date: 'September 10, 2023', size: '4.2 MB' },
    { name: 'VAT/GST Return', type: 'PDF', date: 'August 25, 2023', size: '1.3 MB' },
    { name: 'Tax Planning Strategy', type: 'PDF', date: 'August 12, 2023', size: '2.6 MB' },
    { name: 'Property Tax Assessment', type: 'PDF', date: 'July 30, 2023', size: '1.1 MB' },
    { name: 'International Tax Compliance', type: 'Excel', date: 'July 18, 2023', size: '3.5 MB' },
  ];

  const auditReports = [
    { name: 'Annual Audit Report', type: 'PDF', date: 'September 20, 2023', size: '5.1 MB' },
    { name: 'Internal Controls Assessment', type: 'PDF', date: 'August 30, 2023', size: '2.2 MB' },
    { name: 'Regulatory Compliance Audit', type: 'PDF', date: 'August 22, 2023', size: '3.8 MB' },
    { name: 'Risk Assessment Report', type: 'Excel', date: 'August 15, 2023', size: '1.9 MB' },
    { name: 'IT Systems Audit', type: 'PDF', date: 'July 25, 2023', size: '2.7 MB' },
  ];

  const customReports = [
    { name: 'Executive Dashboard', type: 'Interactive', date: 'September 25, 2023', size: '-' },
    { name: 'Cost Optimization Analysis', type: 'Excel', date: 'September 18, 2023', size: '2.8 MB' },
    { name: 'Market Trend Analysis', type: 'PDF', date: 'September 5, 2023', size: '3.6 MB' },
    { name: 'Operational Efficiency', type: 'Interactive', date: 'August 28, 2023', size: '-' },
    { name: 'Strategic Planning Report', type: 'PDF', date: 'August 20, 2023', size: '4.3 MB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">View and export financial reports and analytics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChartBar className="h-4 w-4 mr-2 text-blue-500" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialReports.length}</div>
            <p className="text-xs text-muted-foreground">Available reports</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
              Tax Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxReports.length}</div>
            <p className="text-xs text-muted-foreground">Available reports</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <LineChart className="h-4 w-4 mr-2 text-green-500" />
              Audit Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditReports.length}</div>
            <p className="text-xs text-muted-foreground">Available reports</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-amber-500" />
              Custom Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customReports.length}</div>
            <p className="text-xs text-muted-foreground">Available reports</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="financial">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Performance statements and financial analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Report Name</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Size</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialReports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{report.name}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            report.type === 'PDF' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.size}</td>
                        <td className="py-3 px-2 space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>Tax filings, returns and planning documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Report Name</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Size</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxReports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{report.name}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            report.type === 'PDF' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.size}</td>
                        <td className="py-3 px-2 space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>Audit findings and compliance documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Report Name</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Size</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditReports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{report.name}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            report.type === 'PDF' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.size}</td>
                        <td className="py-3 px-2 space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Specialized reports and interactive dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Report Name</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Size</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customReports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{report.name}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            report.type === 'PDF' ? 'bg-blue-100 text-blue-800' : 
                            report.type === 'Excel' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{report.size}</td>
                        <td className="py-3 px-2 space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          {report.type !== 'Interactive' && (
                            <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
