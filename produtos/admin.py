from django.contrib import admin
from .models import Categoria, Produto, DetalhesProduto, Cupom, CupomUsado
from django.utils.html import format_html
from taggit.models import Tag
from .models import gerar_codigo_produto

class DetalhesProdutoInline(admin.StackedInline):
    model = DetalhesProduto
    can_delete = False

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'slug', 'destaque_rodape')
    list_editable = ('destaque_rodape',)
    prepopulated_fields = {'slug': ('nome',)}
    search_fields = ('nome',)

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    inlines=[DetalhesProdutoInline]
    list_display = ('titulo', 'display_categorias', 'tipo', 'concurso', 
                    'codigo', 'preco', 'tag', 'destaque', 
                    'exibir_imagem', 'data_atualizacao', 'ativo')
    list_filter = ('categorias', 'tipo', 'concurso', 
                   'tag', 'destaque', 'data_criacao')
    search_fields = ('titulo', 'codigo', 'descricao', 'concurso', 
                     'tags__name', 'categorias__nome')
    prepopulated_fields = {'slug': ('titulo',)}
    list_editable = ('destaque', 'tag', 'tipo')
    filter_horizontal = ('categorias', 'produtos_inclusos',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.prefetch_related('categorias', 'tags')

    @admin.display(description='Categorias')
    def display_categorias(self, obj):
        return ", ".join([cat.nome for cat in obj.categorias.all()])
    
    def exibir_imagem(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" width="50" height="50" />', obj.imagem.url)
        return "Sem imagem"
    exibir_imagem.short_description = "Imagem"

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('titulo', 'slug', 'categorias', 'concurso', 'tag', 'destaque', 'tags', 'tipo', 'ncm')
        }),
        ('Descrição', {
            'fields': ('descricao_curta', 'descricao')
        }),
        ('Preço', {
            'fields': ('preco', 'parcelas')
        }),
        ('Imagem', {
            'fields': ('imagem',)
        }),
        ('Amostra', {
            'fields': ('amostra',)
        }),
        ('Arquivo do Produto', {
            'fields': ('arquivo_produto',)
        }),
        ('Combos', {
            'fields': ('is_combo', 'produtos_inclusos'),
            'classes': ('collapse',)
        }),
    )

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        produto = form.instance

        if not produto.codigo and produto.categorias.exists():
            primeira_categoria = produto.categorias.first()
            if primeira_categoria:
                produto.codigo = gerar_codigo_produto(primeira_categoria.sigla, produto.concurso)
                produto.save(update_fields=['codigo'])
                
@admin.register(Cupom)
class CupomAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'tipo', 'valor', 'ativo', 'validade')
    list_filter = ('ativo', 'tipo', 'validade')
    search_fields = ('codigo',)
    filter_horizontal = ('produtos_elegiveis',)

@admin.register(CupomUsado)
class CupomUsadoAdmin(admin.ModelAdmin):
    list_display = ('cupom', 'usuario', 'usado_em')
    list_filter = ('cupom', 'usuario')
    search_fields = ('cupom__codigo', 'usuario__username')