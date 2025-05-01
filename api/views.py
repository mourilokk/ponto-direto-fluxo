
from rest_framework import viewsets, permissions
from produtos.models import Categoria, Produto
from .serializers import CategoriaSerializer, ProdutoListSerializer, ProdutoDetailSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class ProdutoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produto.objects.all()
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProdutoDetailSerializer
        return ProdutoListSerializer
    
    def get_queryset(self):
        queryset = Produto.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        tag = self.request.query_params.get('tag', None)
        
        if categoria:
            queryset = queryset.filter(categoria__slug=categoria)
        if tag:
            queryset = queryset.filter(tag=tag)
            
        return queryset
