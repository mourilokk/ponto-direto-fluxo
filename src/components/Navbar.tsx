
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e nome */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="h-9 w-auto bg-primary-500 rounded-md flex items-center justify-center px-3 text-white font-bold">
                D<span className="text-xs">No</span>P
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Direto no Ponto</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 flex-1">
            <SearchBar />
            
            <Link to="/area-do-aluno" className="text-gray-600 hover:text-primary-600 flex items-center">
              <User className="h-5 w-5 mr-1" />
              <span>Área de Alunos</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary-600">
                    Materiais
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-48 p-2">
                      <li>
                        <Link
                          to="/materiais/resumos"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          Resumos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/materiais/combos"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          Combos
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/carrinho" className="text-gray-600 hover:text-primary-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
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
            <div className="px-3 py-2">
              <SearchBar />
            </div>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              Área de Alunos
            </Link>
            <div className="relative">
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
              >
                Materiais
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pl-4">
                <Link
                  to="/materiais/resumos"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
                >
                  Resumos
                </Link>
                <Link
                  to="/materiais/combos"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
                >
                  Combos
                </Link>
              </div>
            </div>
            <Link 
              to="/carrinho" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho (0)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
