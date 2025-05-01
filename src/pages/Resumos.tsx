
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from 'lucide-react';
import { toast } from "sonner";

interface ResumoProduct {
  id: number;
  title: string;
  price: number;
  installments: number;
  installmentPrice: number;
  image: string;
  category: string;
  tag: string;
}

const Resumos = () => {
  const [resumos, setResumos] = useState<ResumoProduct[]>([
    {
      id: 1,
      title: "Resumo Isoladas Administração Financeira e Orçamentária – AFO",
      price: 97.00,
      installments: 12,
      installmentPrice: 9.69,
      image: "",
      category: "Administração Financeira",
      tag: "Regular"
    },
    {
      id: 2,
      title: "Resumo Legislação Tributária SEFAZ Rio de Janeiro Pós-Edital",
      price: 157.00,
      installments: 12,
      installmentPrice: 15.69,
      image: "",
      category: "Legislação Tributária",
      tag: "Pós-Edital"
    },
    {
      id: 3,
      title: "Vade Mecum Legislação Tributária SEFAZ Rio de Janeiro Pós-Edital",
      price: 27.00,
      installments: 12,
      installmentPrice: 2.70,
      image: "",
      category: "Legislação Tributária",
      tag: "Pós-Edital"
    },
    {
      id: 4,
      title: "Resumo de Direito do Trabalho – Reta Final AFT",
      price: 107.00,
      installments: 12,
      installmentPrice: 10.69,
      image: "",
      category: "Direito do Trabalho",
      tag: "Pós-Edital"
    }
  ]);

  const addToCart = (product: ResumoProduct) => {
    toast.success(`${product.title} adicionado ao carrinho`);
    // Aqui você implementaria a lógica para adicionar ao carrinho
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Resumos para Concurso Público</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Materiais elaborados por especialistas para otimizar seu tempo de estudo e maximizar seus resultados.
            </p>
          </div>

          {/* Banner promocional */}
          <div className="bg-gray-100 p-6 rounded-lg mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Monte o seu combo com até 30% de desconto!</h2>
          </div>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumos.map((resumo) => (
              <Card key={resumo.id} className="overflow-hidden flex flex-col h-full border-gray-200">
                <div className="relative aspect-[4/5] bg-gray-100">
                  {resumo.image ? (
                    <img 
                      src={resumo.image} 
                      alt={resumo.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-800 text-white">
                      <div className="font-bold text-xl text-center mb-4">RESUMO</div>
                      <div className="text-center text-sm">
                        {resumo.title.split(' – ')[0].split(' ').slice(-3).join(' ')}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs py-1 px-2 rounded">
                        {resumo.tag}
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-base mb-2 line-clamp-2">{resumo.title}</h3>
                  <div className="mt-auto pt-4">
                    <div className="text-primary-600 font-bold text-xl mb-1">R${resumo.price.toFixed(2).replace('.', ',')}</div>
                    <div className="text-gray-500 text-sm mb-4">
                      Em até {resumo.installments}x de R$ {resumo.installmentPrice.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        onClick={() => addToCart(resumo)} 
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Adicionar ao carrinho
                      </Button>
                      <Link to={`/produtos/${resumo.id}`} className="w-full">
                        <Button 
                          variant="outline" 
                          className="w-full border-gray-300"
                        >
                          <Eye size={18} className="mr-2" />
                          Ver detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resumos;
