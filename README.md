
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/aa66299d-2f6b-46f6-8454-af3595d2a492

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/aa66299d-2f6b-46f6-8454-af3595d2a492) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/aa66299d-2f6b-46f6-8454-af3595d2a492) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Backend API Requirements

### Dashboard

**Endpoint**: `/api/dashboard`
**Method**: GET
**Response Format**:
```json
{
  "metrics": [
    {
      "id": "revenue",
      "label": "Revenue",
      "value": 120000,
      "currency": "USD",
      "change": 12.5,
      "period": "month"
    },
    {
      "id": "expenses",
      "label": "Expenses",
      "value": 45000,
      "currency": "USD",
      "change": -5.2,
      "period": "month"
    },
    {
      "id": "profit",
      "label": "Profit",
      "value": 75000,
      "currency": "USD",
      "change": 22.8,
      "period": "month"
    },
    {
      "id": "invoices",
      "label": "Invoices",
      "value": 38,
      "change": 3.7,
      "period": "month"
    }
  ],
  "charts": {
    "revenueOverTime": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      "datasets": [
        {
          "label": "2023",
          "data": [65000, 70000, 75000, 90000, 95000, 120000]
        },
        {
          "label": "2022",
          "data": [50000, 55000, 60000, 65000, 70000, 75000]
        }
      ]
    },
    "expensesByCategory": {
      "labels": ["Payroll", "Office", "Software", "Marketing", "Travel"],
      "data": [24000, 6000, 5000, 7000, 3000]
    }
  }
}
```

### Invoices

**Endpoint**: `/api/invoices`
**Method**: GET
**Response Format**:
```json
{
  "invoices": [
    {
      "id": "INV123",
      "invoiceNumber": "INV-2023-001",
      "date": "2023-05-12",
      "dueDate": "2023-06-12",
      "clientName": "Acme Corp",
      "clientAddress": "123 Business Ave, City, Country",
      "items": [
        {
          "description": "Web Development Services",
          "quantity": 1,
          "unitPrice": 5000,
          "amount": 5000
        },
        {
          "description": "Hosting (Annual)",
          "quantity": 12,
          "unitPrice": 50,
          "amount": 600
        }
      ],
      "subtotal": 5600,
      "tax": 560,
      "total": 6160,
      "status": "paid",
      "fileName": "invoice-2023-001.pdf"
    }
  ]
}
```

**Endpoint**: `/api/invoices`
**Method**: POST
**Request Body**:
```json
{
  "invoiceNumber": "INV-2023-002",
  "date": "2023-06-01",
  "dueDate": "2023-07-01",
  "clientName": "Client Name",
  "clientEmail": "client@example.com",
  "clientAddress": "Client Address",
  "items": [
    {
      "description": "Service Description",
      "quantity": 1,
      "unitPrice": 100,
      "amount": 100
    }
  ],
  "subtotal": 100,
  "tax": 10,
  "total": 110
}
```
**Response**: 201 Created with the created invoice object

**Endpoint**: `/api/invoices/:id/send`
**Method**: POST
**Request Body**:
```json
{
  "email": "recipient@example.com",
  "subject": "Invoice INV-2023-002",
  "message": "Please find attached the invoice for your recent purchase."
}
```
**Response**: 200 OK with success message

### Taxes

**Endpoint**: `/api/taxes/summary`
**Method**: GET
**Response Format**:
```json
{
  "currentYear": {
    "taxLiability": 28500,
    "taxPaid": 22000,
    "remaining": 6500
  },
  "taxForms": [
    {
      "id": "form1",
      "name": "W-2",
      "dueDate": "2023-04-15",
      "status": "submitted"
    },
    {
      "id": "form2",
      "name": "1099-MISC",
      "dueDate": "2023-04-15",
      "status": "pending"
    }
  ],
  "taxRates": {
    "federal": 22,
    "state": 5,
    "local": 2
  }
}
```

### AI Features

**Endpoint**: `/api/ai/advice`
**Method**: POST
**Request Body**:
```json
{
  "context": "invoices",
  "data": {
    "invoiceCount": 5,
    "totalAmount": 15000,
    "overdueCount": 2
  }
}
```
**Response**:
```json
{
  "advice": "You have 2 overdue invoices totaling $8,000. Consider sending reminder emails to improve your cash flow.",
  "suggestions": [
    {
      "id": "suggestion1",
      "text": "Enable automatic payment reminders",
      "action": "enable_reminders"
    },
    {
      "id": "suggestion2",
      "text": "Offer early payment discounts",
      "action": "setup_discounts"
    }
  ]
}
```

**Endpoint**: `/api/ai/chat`
**Method**: POST
**Request Body**:
```json
{
  "message": "How do I create a new invoice?",
  "conversation_id": "conv123" // Optional
}
```
**Response**:
```json
{
  "response": "To create a new invoice, navigate to the Invoices page and click the 'Create Invoice' button. You can then fill out the form with client details and line items.",
  "conversation_id": "conv123",
  "suggestions": [
    "How do I send an invoice?",
    "Can I download invoices?"
  ]
}
```

### User Settings

**Endpoint**: `/api/settings`
**Method**: GET
**Response Format**:
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "preferences": {
    "aiFeatures": {
      "aiAdviceEnabled": true,
      "aiChatbotEnabled": true
    },
    "notifications": {
      "email": true,
      "inApp": true
    },
    "theme": "light"
  }
}
```

**Endpoint**: `/api/settings`
**Method**: PUT
**Request Body**:
```json
{
  "preferences": {
    "aiFeatures": {
      "aiAdviceEnabled": false,
      "aiChatbotEnabled": true
    },
    "notifications": {
      "email": true,
      "inApp": false
    },
    "theme": "dark"
  }
}
```
**Response**: 200 OK with updated settings object
