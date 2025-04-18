
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              {/* Placeholder for logo */}
              <div className="h-9 w-auto bg-primary-500 rounded-md flex items-center justify-center px-3 text-white font-bold">
                D<span className="text-xs">No</span>P
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-800 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Conteúdos
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Materiais
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Blog
                </Link>
                <Link to="#" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Sobre
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="bg-primary-500 hover:bg-primary-600">
              Começar agora
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-primary-500 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link 
              to="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              Conteúdos
            </Link>
            <Link 
              to="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              Materiais
            </Link>
            <Link 
              to="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              Blog
            </Link>
            <Link 
              to="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              Sobre
            </Link>
            <div className="mt-4 px-3">
              <Button className="w-full bg-primary-500 hover:bg-primary-600">
                Começar agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
