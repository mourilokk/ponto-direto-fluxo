
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from produtos.models import Categoria, Produto, DetalhesProduto
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import EmailMessage
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from .tokens import account_activation_token
from pedidos.models import Pedido, ItemPedido
from produtos.models import Produto, Cupom
from aprovados.models import Aprovado
from django.conf import settings
from decouple import config
from produtos.models import Produto, Categoria, DetalhesProduto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class DetalhesProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalhesProduto
        exclude = ('produto',)

class ProdutoListSerializer(serializers.ModelSerializer, TaggitSerializer):
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    categorias = CategoriaSerializer(many=True, read_only=True)
    tags = TagListSerializerField()
    amostra_url = serializers.SerializerMethodField()

    class Meta:
        model = Produto
        fields = ('id', 'titulo', 'slug', 'descricao', 'descricao_curta', 'preco', 
                  'parcelas', 'preco_parcelado', 'preco_antigo', 'imagem', 'categorias', 
                  'tag', 'tags', 'detalhes', 'tipo', 
                  'amostra', 'amostra_url')
        
    def get_amostra_url(self, obj):
        request = self.context.get('request')
        if obj.amostra:
            return request.build_absolute_uri(obj.amostra.url)
        return None

class ProdutoDetailSerializer(serializers.ModelSerializer, TaggitSerializer):
    categorias = CategoriaSerializer(many=True, read_only=True)
    detalhes = DetalhesProdutoSerializer(read_only=True)
    preco_parcelado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    tags = TagListSerializerField()
    amostra_url = serializers.SerializerMethodField()
    produtos_relacionados = serializers.SerializerMethodField()

    class Meta:
        model = Produto
        fields = '__all__'
    
    def get_amostra_url(self, obj):
        request = self.context.get('request')
        if obj.amostra:
            return request.build_absolute_uri(obj.amostra.url)
        return None
    
    def get_produtos_relacionados(self, obj):
        categorias_do_produto = obj.categorias.all()

        if not categorias_do_produto.exists():
            return []
        
        produtos_relacionados = Produto.objects.filter(
            categorias__in=categorias_do_produto, ativo=True
        ).exclude(
            id=obj.id
        ).distinct().order_by('-data_criacao')[:4]

        return ProdutoListSerializer(produtos_relacionados, many=True, context=self.context).data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este e-mail já está em uso.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        user.is_active = False
        user.save()

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        frontend_url = config('FRONTEND_URL', default='http://localhost:8080')
        activation_link = f"{frontend_url}/ativacao/{uid}/{token}/"

        email_subject = "Ative sua conta no Direto no Ponto"
        email_body = f"Olá {user.username}, \n\nClique no link abaixo para ativar sua conta:\n{activation_link}"

        email = EmailMessage(subject=email_subject, body=email_body, to=[user.email])
        email.send()

        return user
    
class ProdutoMaterialSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()
    is_combo = serializers.BooleanField(read_only=True)

    class Meta:
        model = Produto
        fields = ('id', 'titulo', 'descricao_curta', 'imagem', 'is_combo', 'download_url')

    def get_download_url(self, obj):
        request = self.context['request']
        if obj.is_combo:
            return request.build_absolute_uri(
                reverse('servir_combo_zip', kwargs={'produto_id': obj.id})
            )
        
        else:
            return request.build_absolute_uri(
                reverse('servir_arquivo_completo', kwargs={'produto_id': obj.id})
            )
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        login_input = attrs.get("username")
        password = attrs.get("password")

        try:
            user_obj = User.objects.get(email=login_input)
            username = user_obj.username
        except User.DoesNotExist:
            username = login_input

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuário ou senha inválidos.")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Usuário ou senha inválidos.")
        
        if not user.is_active:
            raise serializers.ValidationError("Conta inativa. Verifique seu e-mail para ativar.")
        
        data = super().validate({"username": username, "password": password})
        return data

class ItemPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPedido
        fields = ['produto', 'quantidade']

class PedidoSerializer(serializers.ModelSerializer):
    itens = ItemPedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'itens', 
                  'subtotal', 'desconto', 'total', 
                  'cupom', 'status', 'criado_em']
    
    def create(self, validated_data):
        request = self.context.get('request')
        usuario = request.user

        itens_data = validated_data.pop('itens')
        pedido = Pedido.objects.create(usuario=usuario, **validated_data)

        for item_data in itens_data:
            item = ItemPedido.objects.create(**item_data)
            pedido.itens.add(item)

        return pedido
    
class AprovadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aprovado
        fields = ["id", "nome", "cargo", "foto", "link_externo"]

class ProdutoCreateSerializer(serializers.ModelSerializer):
    categorias = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        many=True
    )

    class Meta:
        model = Produto
        fields = [
            'titulo',
            'descricao',
            'descricao_curta',
            'preco',
            'parcelas',
            'ncm',
            'tipo',
            'concurso',
            'tag',
            'categorias',
        ]
