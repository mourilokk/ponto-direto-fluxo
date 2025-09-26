import uuid
from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

def gerar_codigo_produto(categoria_sigla, concurso_sigla):
    sufixo = uuid.uuid4().hex[:6].upper()
    return f"PROD-{categoria_sigla}-{concurso_sigla}-{sufixo}"

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    sigla = models.CharField(max_length=10)
    slug = models.SlugField(unique=True, blank=True)
    destaque_rodape = models.BooleanField(default=False, verbose_name="Destacar no Rodapé?")
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['nome']

class Produto(models.Model):
    TAGS_CHOICES = [('Regular', 'Regular'), ('Pós-Edital', 'Pós-Edital'), ('Pré-Edital', 'Pré-Edital'), ('Curso', 'Curso'), ('Destaque', 'Destaque'), ('Novidade', 'Novidade')]
    TIPOS = [('resumo', 'Resumo'), ('combo', 'Combo'), ('flashcard', 'Flashcard'), ('mapas', 'Mapas'), ('recurso', 'Recurso')]
    
    titulo = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    codigo = models.CharField(max_length=30, unique=True, blank=True, null=True, editable=False)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    preco_antigo = models.DecimalField(max_digits=10, decimal_places= 2, null=True, blank=True)
    parcelas = models.IntegerField(default=12)
    descricao = models.TextField()
    descricao_curta = models.TextField(blank=True, null=True)
    imagem = models.ImageField(upload_to='produtos/capas/', blank=True, null=True)
    amostra = models.FileField(upload_to="produtos/amostras/", null=True, blank=True)
    arquivo_produto = models.FileField(upload_to='produtos/completos/', null=True, blank=True, verbose_name="Arquivo do Produto Completo")
    categorias = models.ManyToManyField(Categoria, related_name='produtos', blank=True)
    tipo = models.CharField(max_length=20, choices=TIPOS, default='resumo')
    concurso = models.CharField(max_length=20)
    tag = models.CharField(max_length=20, choices=TAGS_CHOICES, default='Regular')
    tags = TaggableManager(blank=True)
    ncm = models.CharField(max_length=8, blank=True, null=True, verbose_name="Código NCM", help_text="Ex: 49019900 para livros/e-books. Consulte sua contabilidade.")
    ativo = models.BooleanField(default=True, verbose_name="Produto Ativo?")
    destaque = models.BooleanField(default=False)
    is_combo = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    produtos_inclusos = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="incluindo_em")
    
    def preco_parcelado(self):
        return self.preco / self.parcelas
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)
        if not self.codigo and self.categorias.exists():
            primeira_categoria = self.categorias.first()
            if primeira_categoria:
                self.codigo = gerar_codigo_produto(primeira_categoria.sigla, self.concurso)
                super().save(update_fields=['codigo'])
    
    def __str__(self):
        return f"{self.titulo} ({self.codigo or 'Sem código'})"
    
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        ordering = ['-data_atualizacao']
    
class DetalhesProduto(models.Model):
    produto = models.OneToOneField(Produto, on_delete=models.CASCADE, related_name='detalhes')
    conteudo = models.TextField()
    materiais_inclusos = models.TextField(blank=True, null=True)
    objetivos = models.TextField(blank=True, null=True)
    publico_alvo = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Detalhes de {self.produto.titulo}"
    
    class Meta:
        verbose_name = 'Detalhes do Produto'
        verbose_name_plural = 'Detalhes dos Produtos'

class Cupom(models.Model):
    TIPO_CHOICES = [
        ('percentual', 'Percentual (%)'),
        ('fixo', 'Valor Fixo (R$)'),
    ]

    class Meta:
        verbose_name = "Cupom"
        verbose_name_plural = "Cupons"

    codigo = models.CharField(max_length=50, unique=True)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    ativo = models.BooleanField(default=True)
    validade = models.DateTimeField()
    uso_minimo = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True,
        help_text="Valor mínimo do pedido para uso do cupom (opcional)"
    )
    uso_maximo = models.PositiveIntegerField(null=True, blank=True, help_text="Máximo de usos globais (opcional)")
    produtos_elegiveis = models.ManyToManyField(
        'Produto',
        blank=True,
        verbose_name="Produtos Elegíveis",
        help_text="Deixe em branco para que o cupom seja aplicável a qualquer produto. Selecione um ou mais produtos para restringir o uso do cupom apenas a eles."
    )
    
    def __str__(self):
        return f"{self.codigo} ({self.tipo})"

    def is_valido(self):
        return self.ativo and timezone.now() <= self.validade
    
    def total_usos(self):
        return self.cupomusado_set.count()
    
class CupomUsado(models.Model):
    cupom = models.ForeignKey(Cupom, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cupom', 'usuario')
        verbose_name = 'Cupom Usado'
        verbose_name_plural = 'Cupons Usados'

        def __str__(self):
            return f"{self.usuario.username} usou {self.cupom.codigo}"