
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import InvoiceUploader from '@/components/InvoiceUploader';
import InvoiceViewer from '@/components/InvoiceViewer';
import InvoiceCreator from '@/components/InvoiceCreator';
import { AIFeatureAdvice } from '@/components/AIFeatureAdvice';

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientAddress?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'processed' | 'verified';
  fileName: string;
}

const Invoices = () => {
  const { toast } = useToast();
  const [uploadedInvoices, setUploadedInvoices] = useState<InvoiceData[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  const handleInvoiceProcessed = (invoiceData: InvoiceData) => {
    setUploadedInvoices(prev => [...prev, invoiceData]);
    toast({
      title: "Invoice Processed",
      description: `Invoice #${invoiceData.invoiceNumber} has been processed successfully.`,
    });
  };

  const handleInvoiceCreated = (invoiceData: InvoiceData) => {
    setUploadedInvoices(prev => [...prev, invoiceData]);
  };

  const handleVerifyInvoice = (id: string) => {
    setUploadedInvoices(prev => 
      prev.map(invoice => 
        invoice.id === id ? { ...invoice, status: 'verified' } : invoice
      )
    );
    toast({
      title: "Invoice Verified",
      description: "The invoice data has been verified and saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold tracking-tight">Invoice Manager</h2>
          <AIFeatureAdvice
            title="Invoice Management Tips"
            description="Use our AI-powered invoice system to automate your billing process. Upload existing invoices or create new ones."
            suggestions={[
              "Set up recurring invoices for regular clients",
              "Enable automatic payment reminders for overdue invoices",
              "Create invoice templates for faster billing"
            ]}
          />
        </div>
        <div className="flex space-x-2">
          <InvoiceCreator onInvoiceCreated={handleInvoiceCreated} />
          <Button variant="outline">
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <InvoiceUploader onInvoiceProcessed={handleInvoiceProcessed} />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>All your invoices appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedInvoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                          No invoices yet. Upload or create an invoice to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      uploadedInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedInvoice(invoice)}>
                          <TableCell>{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.clientName}</TableCell>
                          <TableCell>${invoice.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {invoice.status === 'verified' ? (
                                <><CheckCircle className="h-4 w-4 text-green-500" /> Verified</>
                              ) : invoice.status === 'processed' ? (
                                <><FileText className="h-4 w-4 text-yellow-500" /> Processed</>
                              ) : (
                                <><AlertCircle className="h-4 w-4 text-orange-500" /> Pending</>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              disabled={invoice.status === 'verified'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVerifyInvoice(invoice.id);
                              }}
                            >
                              Verify
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedInvoice && (
        <InvoiceViewer 
          invoice={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default Invoices;
