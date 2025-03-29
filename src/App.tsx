
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Taxes from "./pages/Taxes";
import Audit from "./pages/Audit";
import Compliance from "./pages/Compliance";
import Costing from "./pages/Costing";
import Budgeting from "./pages/Budgeting";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/taxes" element={<Layout><Taxes /></Layout>} />
          <Route path="/audit" element={<Layout><Audit /></Layout>} />
          <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
          <Route path="/costing" element={<Layout><Costing /></Layout>} />
          <Route path="/budgeting" element={<Layout><Budgeting /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
