import React, { useState } from "react";
import { ProdutoRelacionadoCard } from "./ProdutoRelacionadoCard";
import { Button } from "../ui/button";

interface Produto {
  id: number;
  titulo: string;
  imagem: string;
  preco: number;
  preco_antigo?: number;
  descricao?: string;
}

interface Props {
  produto: Produto;
  relacionados: Produto[];
}

export const BoxRelacionados: React.FC<Props> = ({ produto, relacionados }) => {
  const [selecionados, setSelecionados] = useState<Produto[]>([]);

  const toggleProduto = (produto: Produto) => {
    setSelecionados((prev) =>
      prev.find((p) => p.id === produto.id)
        ? prev.filter((p) => p.id !== produto.id)
        : [...prev, produto]
    );
  };

  const somaPrecoAntigo = selecionados.reduce((acc, cur) => acc + (cur.preco_antigo || cur.preco), 0);
  const somaPrecoAtual = selecionados.reduce((acc, cur) => acc + cur.preco, 0);
  const totalOriginal = (produto.preco_antigo || produto.preco) + somaPrecoAntigo;
  const totalComDesconto = produto.preco + somaPrecoAtual;

  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12">
      {/* Coluna 1 - Sobre o material */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-bold mb-2">Sobre o material</h2>
        <p className="text-slate-700">{produto.descricao}</p>
      </div>

      {/* Coluna 2 - Compre também */}
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Compre também:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {relacionados.map((relacionado) => (
                    <ProdutoRelacionadoCard key={relacionado.id} produto={relacionado} />
                ))}
            </div>

            <div className="mt-4 text-sm text-gray-700">
                <p>
                    Preço adicional: <s>R${Number(produto.preco_antigo).toFixed(2)}</s>{" "}
                    <strong className="text-red-600">R${Number(produto.preco).toFixed(2)}</strong>
                </p>
                <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white w-full font-semibold">
                    Adicionar todas as ofertas em minha compra
                </Button>
            </div>
        </div>

        {selecionados.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Preço adicional: <span className="line-through">R${somaPrecoAntigo.toFixed(2)}</span> R${somaPrecoAtual.toFixed(2)}
            </p>
            <p className="text-base font-semibold">
              Valor total: <span className="line-through">R${totalOriginal.toFixed(2)}</span> R${totalComDesconto.toFixed(2)}
            </p>
            <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded mt-2">
              Adicionar todas as ofertas em minha compra ({selecionados.length})
            </button>
          </div>
        )}
    </div>
  );
};
