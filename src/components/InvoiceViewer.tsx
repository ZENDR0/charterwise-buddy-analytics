
import React from 'react';
import { FileText, X, Printer, Download, ExternalLink, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InvoiceData } from '@/pages/Invoices';

interface InvoiceViewerProps {
  invoice: InvoiceData;
  onClose: () => void;
}

const InvoiceViewer = ({ invoice, onClose }: InvoiceViewerProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> 
            Invoice #{invoice.invoiceNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Client</h3>
              <p className="text-sm">{invoice.clientName}</p>
              {invoice.clientAddress && (
                <p className="text-sm text-muted-foreground">{invoice.clientAddress}</p>
              )}
            </div>
            
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-end">
                  <h4 className="text-sm font-medium">Issue Date:</h4>
                  <p className="text-sm">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <h4 className="text-sm font-medium">Due Date:</h4>
                  <p className="text-sm">{invoice.dueDate}</p>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <h4 className="text-sm font-medium">Status:</h4>
                  <p className="text-sm capitalize">{invoice.status}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Description</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end">
            <div className="w-[300px] space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              File: {invoice.fileName}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" /> Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceViewer;
