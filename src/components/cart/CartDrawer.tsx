import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: Props) => {
  const { items, removeFromCart } = useCart();
  const subtotal = items.reduce((acc, item) => acc + Number(item.preco), 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Carrinho</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-160px)]">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.imagem} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.titulo}</p>
                <p className="text-sm text-gray-600">R$ {Number(item.preco).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                <X />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between font-semibold">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <Link to="/carrinho">
          <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded">Ver carrinho</button>
        </Link>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Finalizar compra
        </button>
      </div>
    </div>
  );
};
