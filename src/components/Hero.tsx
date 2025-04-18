
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Direto No <span className="text-primary-500">Ponto</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Resumos e materiais de estudo direto ao ponto para você otimizar seu aprendizado 
            e conquistar seus objetivos acadêmicos.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-primary-500 hover:bg-primary-600 h-11 px-8 text-base">
              Explorar Materiais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-11 px-8 text-base">
              Conhecer Mais
            </Button>
          </div>
          
          <div className="w-full max-w-5xl mt-8 md:mt-16 bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-xl p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold">Estudos simplificados e objetivos</h2>
              <p className="text-gray-600">
                Nossos materiais vão direto ao essencial, poupando seu tempo e otimizando sua absorção de conteúdo.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">Resumos</span>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">Esquemas</span>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">Mapas Mentais</span>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">Flashcards</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full">
                <div className="h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Imagem Ilustrativa</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
