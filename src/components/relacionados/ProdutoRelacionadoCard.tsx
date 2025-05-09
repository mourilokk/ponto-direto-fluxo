import React from "react";

interface Produto {
    id: number;
    titulo: string;
    imagem: string;
    preco: number;
    preco_antigo?: number;
    onToggle: () => void;
    selecionado: boolean;
}

export const ProdutoRelacionadoCard: React.FC<Produto> = ({
    titulo,
    imagem,
    preco,
    preco_antigo,
    onToggle,
    selecionado,
}) => {
    return (
        <div className="border rounded p-2 relative">
            <input
                type="checkbox"
                className="absolute top-2 right-2"
                checked={selecionado}
                onChange={onToggle}
            />
            <img src={imagem} alt={titulo} className="h-36 object-contain mx-auto mb-2" />
            <p className="text-sm text-center">{titulo}</p>
            <div className="text-center mt-1">
                {preco_antigo && (
                    <p className="line-through text-sm text-gray-500">
                        R${Number(preco_antigo).toFixed(2)}
                    </p>
                )}
                <p className="text-orange-600 font-semibold">R${Number(preco).toFixed(2)}</p>
            </div>
        </div>
    );
};