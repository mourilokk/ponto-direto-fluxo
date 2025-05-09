import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, CreditCard, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { ProdutoDetalhado } from "@/types/produto";

const ProdutoDetalhe = () => {
  const { slug } = useParams();

  const { data: produto, isLoading, error } = useQuery({
    queryKey: ["produto", slug],
    queryFn: async () => {
      const res = await api.get(`/produtos/${slug}/`);
      return res.data as ProdutoDetalhado;
    }
  });

  const { data: relacionados } = useQuery({
    queryKey: ["relacionados", produto?.tags],
    enabled: !!produto?.tags?.length,
    queryFn: async () => {
      const res = await api.get("/produtos/", {
        params: { categoria: produto.tags.join(",") }
      });
      return res.data.filter((p: any) => p.slug !== produto.slug);
    }
  });

  if (isLoading) return <p className="text-center mt-20">Carregando...</p>;
  if (error || !produto) return <p className="text-center mt-20 text-red-500">Erro ao carregar produto.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="pt-24 px-4 md:px-8 max-w-6xl mx-auto">

        {/* Banner CTA */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center mb-10">
          <span className="text-blue-800 font-semibold text-base text-center sm:text-left">
            Aproveite o preço com desconto!
          </span>
          <Button className="mt-3 sm:mt-0 bg-blue-600 text-white hover:bg-blue-700 font-semibold">
            Comprar agora
          </Button>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold mb-8 text-slate-900 text-center sm:text-left">
          {produto.titulo}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Coluna 1: imagem/categoria */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 flex items-center justify-center h-[320px]">
            <div className="text-center">
              <p className="text-blue-600 text-sm font-medium mb-2 uppercase">{produto.categoria_nome}</p>
              <p className="text-xl font-bold text-slate-800">{produto.titulo}</p>
            </div>
          </div>

          {/* Coluna 2: benefícios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Benefícios do Material</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="text-green-500 w-5 h-5" />
                Atualizado com jurisprudência e conteúdo exigido.
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 w-5 h-5" />
                Digital, acessível em qualquer dispositivo.
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 w-5 h-5" />
                Atualizações garantidas por 12 meses.
              </li>
            </ul>
          </div>

          {/* Coluna 3: preço + botões */}
          <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
            <div className="text-3xl font-bold text-slate-900">
              R${Number(produto.preco).toFixed(2).replace('.', ',')}
            </div>

            <div className="text-sm text-slate-600 space-y-1">
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Cartão de crédito</span>
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Cartão de débito</span>
              <span className="flex items-center gap-2"><img src="/pix.png" className="w-4 h-4" /> Pix</span>
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3">
              Comprar agora
            </Button>
            <Button variant="outline" className="w-full border-blue-300 text-blue-600 py-3">
              Ver amostra
            </Button>
            <Button variant="outline" className="w-full py-3">
              <ShoppingCart className="mr-2" /> Adicionar ao carrinho
            </Button>
          </div>
        </div>

        {/* Descrição */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2">Sobre o material</h2>
          <p className="text-slate-700">{produto.descricao}</p>
        </section>

        {/* Detalhes */}
        {produto.detalhes?.conteudo && (
          <section className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Conteúdo abordado</h3>
            <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: produto.detalhes.conteudo }} />
          </section>
        )}

        {produto.detalhes?.materiais_inclusos && (
          <section className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Materiais Inclusos</h3>
            <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: produto.detalhes.materiais_inclusos }} />
          </section>
        )}

        {produto.detalhes?.objetivos && (
          <section className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Objetivos</h3>
            <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: produto.detalhes.objetivos }} />
          </section>
        )}

        {/* Benefícios visuais em 3 colunas */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-bold mb-2 text-slate-800">Economia de tempo:</p>
              <p className="text-sm text-slate-600">Foco nos temas mais cobrados e diretos.</p>
            </div>
            <div>
              <p className="font-bold mb-2 text-slate-800">Profundidade Necessária:</p>
              <p className="text-sm text-slate-600">Para você acertar com segurança.</p>
            </div>
            <div>
              <p className="font-bold mb-2 text-slate-800">Conteúdo Organizado:</p>
              <p className="text-sm text-slate-600">Facilita a memorização e revisão.</p>
            </div>
          </div>
        </section>

        {/* Compre também */}
        {relacionados?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Compre também:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relacionados.map((rel) => (
                <Link to={`/produtos/${rel.slug}`} key={rel.id} className="border rounded-md p-4 hover:shadow-sm">
                  <p className="font-semibold text-sm line-clamp-2">{rel.titulo}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">
                    R${Number(rel.preco).toFixed(2).replace('.', ',')}
                  </p>
                </Link>
              ))}
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 mt-6 mx-auto block">
              Adicionar todas as ofertas em minha compra
            </Button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProdutoDetalhe;
