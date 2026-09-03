import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import NewsletterPage from "./pages/NewsletterPage";
import InvestmentPage from "./pages/InvestmentPage";
import ConsultPage from "./pages/ConsultPage";
import PropertyBuyersGuidePage from "./pages/PropertyBuyersGuidePage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LangProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/linktree-real-estate" element={<Index />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/consult-with-isa" element={<ConsultPage />} />
            <Route
              path="/property-buyers-guide"
              element={<PropertyBuyersGuidePage />}
            />
            <Route path="/thank-you" element={<ThankYouPage />} />
            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LangProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
