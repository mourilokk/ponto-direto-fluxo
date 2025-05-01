
import { ArrowRight, BookOpen, Clock, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { Produto } from "@/types/produto";

interface ContentCardProps {
  produto: Produto;
}

const ContentCard = ({ produto }: ContentCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 card-effect">
      <div className="h-48 bg-gray-200 relative">
        {produto.imagem ? (
          <img 
            src={`http://localhost:8000${produto.imagem}`} 
            alt={produto.titulo} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary-100 to-primary-200 text-primary-500">
            Direto No Ponto
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
            {produto.categoria_nome}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{produto.titulo}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{produto.descricao_curta || produto.descricao}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>12 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare size={14} />
            <span>10 comentários</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentCards = () => {
  const { data: produtos, isLoading, error } = useQuery({
    queryKey: ['produtos', 'destaque'],
    queryFn: async () => {
      const response = await api.get('/produtos/', {
        params: { destaque: true }
      });
      return response.data as Produto[];
    }
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <p>Carregando conteúdos em destaque...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !produtos) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-red-500">Erro ao carregar conteúdos em destaque</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4 mr-1" />
            Materiais
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Conteúdos Mais Acessados</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
            Materiais de estudo preparados por especialistas para otimizar seu tempo e maximizar seus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <Link to={`/produtos/${produto.id}`} key={produto.id}>
              <ContentCard produto={produto} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link 
            to="/materiais/resumos" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Ver todos os materiais
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
