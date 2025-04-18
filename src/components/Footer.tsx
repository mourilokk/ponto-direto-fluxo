
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Placeholder for logo */}
              <div className="h-9 w-auto bg-primary-500 rounded-md flex items-center justify-center px-3 mr-2">
                D<span className="text-xs">No</span>P
              </div>
              <span className="font-bold text-lg">Direto No Ponto</span>
            </div>
            <p className="text-gray-400 text-sm">
              Resumos e materiais de estudo direto ao ponto para otimizar seu aprendizado 
              e conquistar seus objetivos acadêmicos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Home', 'Conteúdos', 'Materiais', 'Blog', 'Sobre', 'Contato'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              {['Português', 'Direito Administrativo', 'Direito Constitucional', 'Direito do Trabalho', 'Direito Civil', 'Informática', 'Raciocínio Lógico'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Av. Exemplo, 1000 - São Paulo, SP</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">(11) 9999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contato@diretonoponto.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Assine nossa newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Direto No Ponto. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
