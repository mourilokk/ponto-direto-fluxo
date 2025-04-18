
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className="relative flex-1 max-w-md mx-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Qual material você está procurando?"
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
    </div>
  );
};

export default SearchBar;
