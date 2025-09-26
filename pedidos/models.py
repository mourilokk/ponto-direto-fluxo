from django.db import models
from django.contrib.auth.models import User
from produtos.models import Produto, Cupom

class ItemPedido(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)

    def subtotal(self):
        return self.produto.preco * self.quantidade

    def __str__(self):
        return f"{self.quantidade}x {self.produto.titulo}"
    
class Pedido(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('pago', 'Pago'),
        ('cancelado', 'Cancelado'),
        ('falhou', 'Falhou'),
        ('reembolso', 'Reembolso'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    itens = models.ManyToManyField(ItemPedido)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    desconto = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    cupom = models.ForeignKey(Cupom, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    criado_em = models.DateTimeField(auto_now_add=True)
    codigo = models.CharField(max_length=100, unique=True, blank=True, null=True)
    nfe_id = models.CharField(max_length=255, blank=True, null=True, verbose_name="ID da NF-e na NFE.io")
    nfe_status = models.CharField(max_length=20, blank=True, null=True, verbose_name="Status da NF-e")
    nfe_pdf_url = models.URLField(blank=True, null=True, verbose_name="Link para o PDF da NF-e")
    nfe_xml_url = models.URLField(blank=True, null=True, verbose_name="Link para o XML da NF-e")

    def __str__(self):
        return f"Pedido #{self.id} - {self.usuario.username} - R$ {self.total:.2f}"