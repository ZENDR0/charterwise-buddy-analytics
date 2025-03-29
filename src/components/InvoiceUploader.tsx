
import React, { useState, useRef } from 'react';
import { Upload, File, FileText, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { InvoiceData } from '@/pages/Invoices';

interface InvoiceUploaderProps {
  onInvoiceProcessed: (invoice: InvoiceData) => void;
}

const InvoiceUploader = ({ onInvoiceProcessed }: InvoiceUploaderProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Supported file types
  const acceptedFileTypes = [
    'application/pdf', 
    'image/jpeg', 
    'image/jpg', 
    'image/png'
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file (JPEG, PNG).",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processInvoice = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate invoice processing - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data for this example
      const mockInvoiceData: InvoiceData = {
        id: `INV-${Math.floor(Math.random() * 1000)}`,
        invoiceNumber: `INV${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clientName: "Example Client Ltd.",
        clientAddress: "123 Business Street, City, Country",
        items: [
          {
            description: "Accounting Services",
            quantity: 1,
            unitPrice: 500,
            amount: 500
          },
          {
            description: "Tax Consultation",
            quantity: 2,
            unitPrice: 250,
            amount: 500
          }
        ],
        subtotal: 1000,
        tax: 200,
        total: 1200,
        status: 'processed',
        fileName: selectedFile.name
      };
      
      onInvoiceProcessed(mockInvoiceData);
      clearSelectedFile();
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "There was an error processing your invoice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Invoice</CardTitle>
        <CardDescription>Upload invoices to extract and process data</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">Drag & Drop</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drop your invoice PDF or image here, or click to browse
              </p>
              <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                Browse Files
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept={acceptedFileTypes.join(',')}
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: PDF, JPEG, PNG
              </p>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {selectedFile.type === 'application/pdf' ? (
                    <FileText className="h-8 w-8 text-primary" />
                  ) : (
                    <File className="h-8 w-8 text-primary" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearSelectedFile}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={!selectedFile || isProcessing} onClick={clearSelectedFile}>
          Clear
        </Button>
        <Button onClick={processInvoice} disabled={!selectedFile || isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : "Process Invoice"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceUploader;
