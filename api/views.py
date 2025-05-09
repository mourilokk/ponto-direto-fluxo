
from rest_framework import viewsets, permissions, status
from produtos.models import Categoria, Produto
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import CategoriaSerializer, ProdutoListSerializer, ProdutoDetailSerializer
from .serializers import RegisterSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class ProdutoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produto.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'  # Usar slug em vez de ID
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProdutoDetailSerializer
        return ProdutoListSerializer
    
    def get_queryset(self):
        queryset = Produto.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        tag = self.request.query_params.get('tag', None)
        destaque = self.request.query_params.get('destaque', None)
        
        if categoria:
            queryset = queryset.filter(categoria__slug=categoria)
        if tag:
            queryset = queryset.filter(tag=tag)
        if destaque:
            # Converte string 'true' para booleano
            destaque_bool = destaque.lower() == 'true'
            queryset = queryset.filter(destaque=destaque_bool)
            
        return queryset

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MinhaContaView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
        })   