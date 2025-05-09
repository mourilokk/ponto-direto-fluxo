
from rest_framework import serializers
from produtos.models import Categoria, Produto, DetalhesProduto
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from django.contrib.auth.models import User


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class DetalhesProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalhesProduto
        exclude = ('produto',)

class ProdutoListSerializer(serializers.ModelSerializer, TaggitSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    categoria_slug = serializers.ReadOnlyField(source='categoria.slug')
    tags = TagListSerializerField()

    class Meta:
        model = Produto
        fields = ('id', 'titulo', 'slug', 'descricao', 'descricao_curta', 'preco', 
                  'parcelas', 'preco_parcelado', 'preco_antigo', 'imagem', 'categoria', 
                  'categoria_nome', 'tag', 'categoria_slug', 'tags', 'detalhes')

class ProdutoDetailSerializer(serializers.ModelSerializer, TaggitSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    detalhes = DetalhesProdutoSerializer(read_only=True)
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    tags = TagListSerializerField()

    class Meta:
        model = Produto
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )

        return user
