
import { ArrowRight, BookOpen, Clock, MessageSquare } from "lucide-react";

interface ContentCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  commentsCount: number;
}

const ContentCard = ({ title, description, image, category, readTime, commentsCount }: ContentCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 card-effect">
      <div className="h-48 bg-gray-200 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary-100 to-primary-200 text-primary-500">
            Direto No Ponto
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare size={14} />
            <span>{commentsCount} comentários</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentCards = () => {
  const contents = [
    {
      title: "Introdução à Biologia Celular",
      description: "Um resumo completo sobre os fundamentos da biologia celular, estruturas e funções dos componentes celulares.",
      image: "",
      category: "Biologia",
      readTime: "5 min",
      commentsCount: 12
    },
    {
      title: "Principais Eventos da Segunda Guerra Mundial",
      description: "Cronologia e análise dos eventos mais importantes que marcaram a Segunda Guerra Mundial, suas causas e consequências.",
      image: "",
      category: "História",
      readTime: "8 min",
      commentsCount: 7
    },
    {
      title: "Equações de Segundo Grau Simplificadas",
      description: "Método prático para resolver equações de segundo grau de forma simplificada com exemplos passo a passo.",
      image: "",
      category: "Matemática",
      readTime: "6 min",
      commentsCount: 15
    },
    {
      title: "Redação para ENEM: Estrutura e Dicas",
      description: "Guia completo para estruturar sua redação do ENEM e conseguir uma pontuação máxima com dicas dos corretores.",
      image: "",
      category: "Português",
      readTime: "7 min",
      commentsCount: 23
    },
    {
      title: "Termodinâmica: Leis e Aplicações",
      description: "Estudo das leis da termodinâmica e suas aplicações práticas em sistemas físicos e no cotidiano.",
      image: "",
      category: "Física",
      readTime: "9 min",
      commentsCount: 5
    },
    {
      title: "Mapa Mental: Química Orgânica",
      description: "Mapa mental completo sobre os principais grupos funcionais e reações da química orgânica para facilitar a memorização.",
      image: "",
      category: "Química",
      readTime: "4 min",
      commentsCount: 19
    }
  ];

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
          {contents.map((content, index) => (
            <ContentCard key={index} {...content} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a 
            href="#" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Ver todos os materiais
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
