
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  image: string;
  tag: string;
  description: string;
  features: string[];
}

const ProdutoDetalhe = () => {
  const { id } = useParams();
  
  // Mock de dados do produto que seria carregado da API
  // Na implementação real, você buscaria esses dados do backend Django
  const [produto, setProduto] = useState<ProductDetail>({
    id: parseInt(id || "1"),
    title: "Resumo Isoladas Administração Financeira e Orçamentária – AFO",
    price: 97.00,
    image: "",
    tag: "Regular",
    description: "O Resumo da Matéria Isolada de Administração Financeira e Orçamentária aborda de forma direta e estratégica todos os pontos relevantes para concursos públicos. Material atualizado com as últimas legislações e questões comentadas.",
    features: [
      "Material Assertivo: Elaborado com as últimas novidades legislativas, jurisprudências e assuntos exigidos em provas.",
      "Material Digital: Não se limite a sua mesa de estudos! Estude do seu jeito, em qualquer lugar e a qualquer hora.",
      "Atualização por 12 meses: Durante 12 meses você terá acesso às atualizações sem gastar mais nenhum real."
    ]
  });

  const comprarAgora = () => {
    toast.success("Produto adicionado ao carrinho! Redirecionando para o checkout...");
    // Implementação da lógica de compra imediata
  };

  const adicionarAoCarrinho = () => {
    toast.success(`${produto.title} adicionado ao carrinho`);
    // Implementação da lógica de adicionar ao carrinho
  };

  const verAmostra = () => {
    toast("Carregando amostra do material...");
    // Implementação da lógica de visualização da amostra
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <h1 className="text-3xl font-bold mb-8">{produto.title}</h1>
          
          {/* Banner promocional */}
          <div className="bg-green-400 p-6 rounded-lg mb-8 flex justify-between items-center">
            <div className="text-white font-bold text-xl">Aproveite o preço com desconto!</div>
            <Button 
              onClick={comprarAgora}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Comprar agora
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna da esquerda com imagem */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-gray-800 text-white flex flex-col items-center justify-center p-6">
                  <div className="font-bold text-2xl mb-8">RESUMO</div>
                  <div className="text-center text-lg">
                    ADMINISTRAÇÃO FINANCEIRA E ORÇAMENTÁRIA (AFO)
                  </div>
                  <div className="absolute bottom-4 left-4 bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
                    {produto.tag}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Coluna do meio com detalhes */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-6">Material Assertivo</h3>
                  <ul className="space-y-4">
                    {produto.features.map((feature, index) => (
                      <li key={index} className="flex">
                        <Check className="h-6 w-6 text-green-500 shrink-0 mr-2" />
                        <span className="text-gray-700">{feature.split(": ")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Coluna da direita com preço e botões */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-3xl font-bold mb-4">
                    R${produto.price.toFixed(2).replace('.', ',')}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <CreditCard className="h-4 w-4 mr-1" />
                      <span>Cartão de crédito</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pix_logo.svg/1200px-Pix_logo.svg.png" alt="Pix" className="h-4 w-4 mr-1" />
                      <span>Pagamento via Pix</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <Button 
                      onClick={comprarAgora}
                      className="w-full bg-green-500 hover:bg-green-600 py-6 text-lg"
                    >
                      Comprar agora
                    </Button>
                    
                    <Button 
                      onClick={verAmostra}
                      variant="outline" 
                      className="w-full border-blue-300 text-blue-500 hover:bg-blue-50 py-6"
                    >
                      Ver amostra
                    </Button>
                    
                    <Button 
                      onClick={adicionarAoCarrinho}
                      variant="outline" 
                      className="w-full border-gray-300 py-6"
                    >
                      <ShoppingCart className="mr-2" />
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Seção de descrição do produto */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Sobre o material</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">{produto.description}</p>
            </div>
          </div>
          
          {/* Seção de produtos relacionados */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Compre também:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-2 flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-3" />
                  <span className="text-sm truncate">Produto Relacionado {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProdutoDetalhe;
