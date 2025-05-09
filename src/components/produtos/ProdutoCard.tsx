import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Produto } from "@/types/produto";

interface ProdutoCardProps {
  produto: Produto;
  onAddToCart?: (produto: Produto) => void;
}

export const ProdutoCard = ({ produto, onAddToCart }: ProdutoCardProps) => {
  return (
    <div className="overflow-hidden flex flex-col h-full border border-gray-200 rounded-lg bg-white">
      <div className="relative bg-white aspect-[2/3] w-full max-h-[340px]">
        {produto.imagem ? (
          <img
            src={produto.imagem.startsWith("http") ? produto.imagem : `http://localhost:8000${produto.imagem}`}
            alt={produto.titulo}
            className="w-full h-full object-contain p-0"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white">
            <div className="font-bold text-xl text-center mb-4">RESUMO</div>
            <div className="text-center text-sm">
              {produto.titulo.split(" – ")[0].split(" ").slice(-3).join(" ")}
            </div>
            <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs py-1 px-2 rounded">
              {produto.tag}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm mb-2 leading-tight line-clamp-2">{produto.titulo}</h3>
        <div className="mt-auto pt-4">
          <div className="text-primary-600 font-bold text-xl mb-1">
            R${Number(produto.preco).toFixed(2).replace(".", ",")}
          </div>
          <div className="text-gray-500 text-sm mb-4">
            Em até {produto.parcelas}x de R$ {Number(produto.preco_parcelado).toFixed(2).replace(".", ",")}
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onAddToCart?.(produto)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              <ShoppingCart size={18} className="mr-2 inline" />
              Adicionar ao carrinho
            </button>
            <Link to={`/produtos/${produto.slug}`} className="w-full">
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100">
                <Eye size={18} className="mr-2 inline" />
                Ver detalhes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
