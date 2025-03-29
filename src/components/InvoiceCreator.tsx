
import React, { useState } from 'react';
import { Printer, Download, Send, Plus, Trash, Save } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { InvoiceData } from '@/pages/Invoices';

// Invoice form schema with Zod validation
const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  clientAddress: z.string().optional(),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
      unitPrice: z.number().min(0, 'Unit price cannot be negative'),
      amount: z.number()
    })
  ).min(1, 'At least one item is required'),
  subtotal: z.number(),
  taxRate: z.number().min(0, 'Tax rate cannot be negative').max(100, 'Tax rate cannot exceed 100%'),
  tax: z.number(),
  total: z.number()
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface InvoiceCreatorProps {
  onInvoiceCreated: (invoice: InvoiceData) => void;
}

const InvoiceCreator = ({ onInvoiceCreated }: InvoiceCreatorProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendDialogOpen, setSendDialogOpen] = useState(false);

  // Set up form with default values
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      items: [
        {
          description: '',
          quantity: 1,
          unitPrice: 0,
          amount: 0
        }
      ],
      subtotal: 0,
      taxRate: 10,
      tax: 0,
      total: 0
    }
  });

  const { watch, setValue, control } = form;
  const items = watch('items');
  const taxRate = watch('taxRate');

  // Calculate totals whenever items or tax rate changes
  React.useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax;

    setValue('subtotal', subtotal);
    setValue('tax', tax);
    setValue('total', total);
  }, [items, taxRate, setValue]);

  // Update item amount when quantity or unitPrice changes
  const updateItemAmount = (index: number, quantity: number, unitPrice: number) => {
    const amount = quantity * unitPrice;
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity,
      unitPrice,
      amount
    };
    setValue('items', updatedItems);
  };

  // Add new item to the list
  const addItem = () => {
    setValue('items', [
      ...items,
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        amount: 0
      }
    ]);
  };

  // Remove item from the list
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setValue('items', updatedItems);
    } else {
      toast({
        title: "Cannot Remove Item",
        description: "An invoice must have at least one item.",
        variant: "destructive"
      });
    }
  };

  // Handle form submission
  const onSubmit = (data: InvoiceFormValues) => {
    console.log('Invoice data:', data);
    
    // Create the invoice object
    const newInvoice: InvoiceData = {
      id: `INV-${Math.floor(Math.random() * 10000)}`,
      invoiceNumber: data.invoiceNumber,
      date: data.date,
      dueDate: data.dueDate,
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      items: data.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        amount: item.amount
      })),
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      status: 'pending',
      fileName: `invoice-${data.invoiceNumber}.pdf`
    };

    // Call the callback function
    onInvoiceCreated(newInvoice);
    
    // Success toast
    toast({
      title: "Invoice Created",
      description: `Invoice #${data.invoiceNumber} has been created successfully.`,
    });

    // Close the dialog
    setIsOpen(false);
  };

  // Handle sending invoice by email
  const sendInvoice = () => {
    setSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setSending(false);
      setSendDialogOpen(false);
      
      toast({
        title: "Invoice Sent",
        description: `Invoice has been sent to ${recipientEmail}.`,
      });
    }, 2000);
  };

  // Handle downloading invoice
  const downloadInvoice = () => {
    // In a real application, we would generate a PDF and download it
    toast({
      title: "Invoice Downloaded",
      description: "The invoice has been downloaded as a PDF.",
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Create Invoice
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Fill out the form to create a new invoice. You can add multiple line items.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Client Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="clientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Line Items</h3>
                  <Button type="button" onClick={addItem} variant="outline" size="sm">
                    <Plus className="mr-1 h-4 w-4" /> Add Item
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Description</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={item.description}
                              onChange={(e) => {
                                const updatedItems = [...items];
                                updatedItems[index].description = e.target.value;
                                setValue('items', updatedItems);
                              }}
                              placeholder="Item description"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const quantity = parseFloat(e.target.value) || 0;
                                updateItemAmount(index, quantity, item.unitPrice);
                              }}
                              className="w-20 text-right"
                              min="0"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => {
                                const unitPrice = parseFloat(e.target.value) || 0;
                                updateItemAmount(index, item.quantity, unitPrice);
                              }}
                              className="w-24 text-right"
                              min="0"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(index)}
                            >
                              <Trash className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2 text-right">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Subtotal:</span>
                    <span>${watch('subtotal').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Tax ({taxRate}%):</span>
                    <span>${watch('tax').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-lg font-bold">
                    <span>Total:</span>
                    <span>${watch('total').toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Invoice
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Send Invoice Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invoice</DialogTitle>
            <DialogDescription>
              Send this invoice directly to your client via email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <FormLabel htmlFor="recipient">Recipient Email</FormLabel>
              <Input
                id="recipient"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="client@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Please find attached your invoice..."
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendInvoice} disabled={!recipientEmail || sending}>
              {sending ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Invoice
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Actions dialog for the created invoice */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="hidden">
            Invoice Actions
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Actions</DialogTitle>
            <DialogDescription>
              Choose an action for your invoice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button onClick={() => setSendDialogOpen(true)} className="justify-start">
              <Send className="mr-2 h-4 w-4" /> Send Invoice
            </Button>
            <Button onClick={downloadInvoice} className="justify-start">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="justify-start">
              <Printer className="mr-2 h-4 w-4" /> Print Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoiceCreator;
