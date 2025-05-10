
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AreaDoAluno from "./pages/AreaDoAluno";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Resumos from "./pages/Resumos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>  
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/materiais/resumos" element={<Resumos />} />
              <Route path="/produtos/:slug" element={<ProdutoDetalhe />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/area-do-aluno"
                element={
                  <PrivateRoute>
                    <AreaDoAluno />
                  </PrivateRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
</AuthProvider>
);

export default App;
