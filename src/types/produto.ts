
export interface Categoria {
  id: number;
  nome: string;
  slug: string;
}

export interface Produto {
  id: number;
  titulo: string;
  slug: string;
  descricao_curta?: string;
  descricao: string;
  preco: number;
  preco_antigo?: number;
  detalhes?: {
    conteudo?: string;
    materiais_inclusos?: string;
    objetivos?: string;
    publico_alvo?: string;
  }
  parcelas?: number;
  preco_parcelado?: number;
  imagem?: string | null;
  categoria: number;
  categoria_nome: string;
  categoria_slug: string;
  tags: string[];
  tag: string;
  destaque: boolean;
}

export interface DetalhesProduto {
  conteudo: string;
  materiais_inclusos: string | null;
  objetivos: string | null;
  publico_alvo: string | null;
}

export interface ProdutoDetalhado extends Produto {
  detalhes: DetalhesProduto;
}
