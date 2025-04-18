
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  rating: number;
  image?: string;
}

const Testimonial = ({ content, author, role, rating, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
      </div>
      <p className="text-gray-600 mb-6 flex-grow">{content}</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
          {image ? (
            <img src={image} alt={author} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary-200 text-primary-600 font-bold">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content:
        "Os resumos do Direto No Ponto foram fundamentais para minha aprovação no vestibular de medicina. Economizei muito tempo de estudo e consegui focar no essencial.",
      author: "Mariana Silva",
      role: "Estudante de Medicina",
      rating: 5
    },
    {
      content:
        "Material excepcional! Os mapas mentais me ajudaram a conectar conceitos de forma visual e prática. Recomendo para quem precisa otimizar o tempo de estudo.",
      author: "Rafael Mendes",
      role: "Aprovado em Concurso Público",
      rating: 5
    },
    {
      content:
        "Consegui melhorar significativamente minhas notas usando os resumos e esquemas do Direto No Ponto. O conteúdo é realmente direto ao ponto e facilita muito o entendimento.",
      author: "Camila Rocha",
      role: "Estudante de Ensino Médio",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
            Depoimentos
          </span>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">O que nossos usuários dizem</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
            Milhares de estudantes já transformaram sua forma de estudar com nossos materiais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-xl font-medium">
              Junte-se a <span className="text-primary-600 font-bold">+15.000</span> estudantes que já usam o <span className="font-bold">Direto No Ponto</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
