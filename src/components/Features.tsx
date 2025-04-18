
import { CheckCircle2, Clock, BookOpen, Lightbulb, Sparkles } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary-500" />,
      title: 'Conteúdo Direto ao Ponto',
      description: 'Materiais objetivos que vão direto à essência do que você precisa aprender, sem rodeios.'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: 'Economia de Tempo',
      description: 'Otimize seu tempo de estudo com resumos concisos e esquemas visuais de fácil assimilação.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary-500" />,
      title: 'Diversidade de Materiais',
      description: 'Acesse resumos, mapas mentais, flashcards e esquemas para diferentes formas de aprendizado.'
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary-500" />,
      title: 'Preparado por Especialistas',
      description: 'Conteúdo desenvolvido por professores e especialistas com experiência nas respectivas áreas.'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Por que escolher o Direto No Ponto?</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
            Metodologia focada em maximizar seu aprendizado com menos tempo e mais eficiência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-primary-50 rounded-xl border border-primary-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-4">Comece a estudar com mais eficiência hoje mesmo</h3>
              <p className="text-gray-600 mb-6">
                Junte-se a milhares de estudantes que já otimizaram seu tempo de estudo e melhoraram seu desempenho usando nossos materiais.
              </p>
              <ul className="space-y-3">
                {[
                  'Acesso a centenas de resumos e materiais',
                  'Conteúdo atualizado semanalmente',
                  'Compatível com os principais vestibulares e concursos',
                  'Disponível em qualquer dispositivo, a qualquer hora'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-primary-500">Faça um teste</span>
                <p className="text-sm text-gray-500 mt-1">para conteúdos básicos</p>
              </div>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
