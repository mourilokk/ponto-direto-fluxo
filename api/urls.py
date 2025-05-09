
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProdutoViewSet, RegisterView, MinhaContaView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'produtos', ProdutoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MinhaContaView.as_view(), name='me'),
]
