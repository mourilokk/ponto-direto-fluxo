
from rest_framework import serializers
from produtos.models import Categoria, Produto, DetalhesProduto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class DetalhesProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalhesProduto
        exclude = ('produto',)

class ProdutoListSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Produto
        fields = ('id', 'titulo', 'slug', 'descricao_curta', 'preco', 'parcelas', 
                  'preco_parcelado', 'imagem', 'categoria', 'categoria_nome', 'tag')

class ProdutoDetailSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    detalhes = DetalhesProdutoSerializer(read_only=True)
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Produto
        fields = '__all__'
