
from django.db import models
from django.utils.text import slugify
from taggit.managers import TaggableManager

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    
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
    TAGS_CHOICES = [
        ('Regular', 'Regular'),
        ('Pós-Edital', 'Pós-Edital'),
        ('Pré-Edital', 'Pré-Edital'),
        ('Curso', 'Curso'),
        ('Destaque', 'Destaque'),
        ('Novidade', 'Novidade'),
    ]
    
    titulo = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    descricao = models.TextField()
    descricao_curta = models.TextField(blank=True, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    parcelas = models.IntegerField(default=12)
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='produtos')
    tag = models.CharField(max_length=20, choices=TAGS_CHOICES, default='Regular')
    tags = TaggableManager(blank=True)
    destaque = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def preco_parcelado(self):
        return self.preco / self.parcelas
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        ordering = ['-data_criacao']

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
