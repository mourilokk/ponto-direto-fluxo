
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (CategoriaViewSet, ProdutoViewSet, RegisterView, 
                    MinhaContaView, CustomTokenObtainPairView, ActivationAccountView,
                    verificar_cupom, CriarPedidoView, reenviar_confirmacao, 
                    google_login_view, nfeio_webhook_view)
from aprovados.views import AprovadoViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from pedidos.views import checkout_link, pagarme_webhook, MeusMateriaisView, VerificarStatusPedidoView
from produtos.views import servir_amostra_pdf, servir_arquivo_completo, servir_combo_zip
from django.conf.urls.static import static
from django.conf import settings
import os
from accounts.views import UserProfileView, AreaInteresseViewSet, EnderecoViewSet
from configuracoes.views import ConfiguracaoGlobalViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'aprovados', AprovadoViewSet)
router.register(r'accounts/areas-interesse', AreaInteresseViewSet, basename='area-interesse')
router.register(r'configuracoes', ConfiguracaoGlobalViewSet, basename='configuracoes')
router.register(r'enderecos', EnderecoViewSet, basename='enderecos')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MinhaContaView.as_view(), name='me'),
    path('activate/<uidb64>/<token>/', ActivationAccountView.as_view(), name='account_activate'),
    path('verificar-cupom/', verificar_cupom, name='verificar_cupom'),
    path('pedidos/', CriarPedidoView.as_view(), name='criar-pedido'),
    path('reenviar-confirmacao/', reenviar_confirmacao),
    path('checkout-link/', checkout_link, name='checkout_link'),
    path('produtos/amostras/<str:nome_arquivo>/', servir_amostra_pdf, name='servir_amostra'),
    path('webhook/pagarme/', pagarme_webhook, name='pagarme_webhook'),
    path('meus-materiais/', MeusMateriaisView.as_view(), name='meus-materiais'),
    path('produtos/<int:produto_id>/download/', servir_arquivo_completo, name='servir_arquivo_completo'),
    path('combos/<int:produto_id>/download/', servir_combo_zip, name='servir_combo_zip'),
    path('pedidos/<int:pedido_id>/status/', VerificarStatusPedidoView.as_view(), name='verificar_status_pedido'),
    path('auth/google/', google_login_view, name='google_login_view'),
    path('accounts/profile/', UserProfileView.as_view(), name='user_profile'),
    path('webhook/nfeio/', nfeio_webhook_view, name='webhook-nfeio'),
]

urlpatterns += static('/amostra/', document_root=os.path.join(settings.MEDIA_ROOT, 'amostras'))
