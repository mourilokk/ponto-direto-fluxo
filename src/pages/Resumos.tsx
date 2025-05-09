
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from 'lucide-react';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Produto } from "@/types/produto";

const Resumos = () => {
  const { data: produtos, isLoading, error } = useQuery({
    queryKey: ['produtos', 'categoria=resumos'],
    queryFn: async () => {
      const response = await api.get('/produtos/', {
        params: { categoria: 'resumos' }
      });
      return response.data as Produto[];
    }
  });

  const addToCart = (produto: Produto) => {
    toast.success(`${produto.titulo} adicionado ao carrinho`);
    // Aqui você implementaria a lógica para adicionar ao carrinho
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl">Carregando produtos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-500">Erro ao carregar produtos.</p>
            <p className="mt-2">Verifique se o servidor está rodando.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            {produtos && produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden flex flex-col h-full border-gray-200">
                <div className="relative bg-white-100 aspect-[2/3] w-full max-h-[340px]">
                  {produto.imagem ? (
                    <img 
                      src={produto.imagem.startsWith('http') ? produto.imagem : `http://localhost:8000${produto.imagem}`} 
                      alt={produto.titulo}
                      className="w-full h-full object-contain p-0"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white">
                      <div className="font-bold text-xl text-center mb-4">RESUMO</div>
                      <div className="text-center text-sm">
                        {produto.titulo.split(' – ')[0].split(' ').slice(-3).join(' ')}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs py-1 px-2 rounded">
                        {produto.tag}
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm mb-2 leading-tight line-clamp-2">{produto.titulo}</h3>
                  <div className="mt-auto pt-4">
                    <div className="text-primary-600 font-bold text-xl mb-1">
                      R${Number(produto.preco).toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-gray-500 text-sm mb-4">
                      Em até {produto.parcelas}x de R$ {Number(produto.preco_parcelado).toFixed(2).replace('.', ',')}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        onClick={() => addToCart(produto)} 
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Adicionar ao carrinho
                      </Button>
                      <Link to={`/produtos/${produto.slug}`} className="w-full">
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
