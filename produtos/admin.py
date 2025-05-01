
from django.contrib import admin
from .models import Categoria, Produto, DetalhesProduto
from django.utils.html import format_html

class DetalhesProdutoInline(admin.StackedInline):
    model = DetalhesProduto
    extra = 1

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'slug')
    prepopulated_fields = {'slug': ('nome',)}
    search_fields = ('nome',)

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'preco', 'tag', 'destaque', 'exibir_imagem', 'data_atualizacao')
    list_filter = ('categoria', 'tag', 'destaque', 'data_criacao')
    search_fields = ('titulo', 'descricao')
    prepopulated_fields = {'slug': ('titulo',)}
    inlines = [DetalhesProdutoInline]
    list_editable = ('destaque', 'tag')
    
    def exibir_imagem(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" width="50" height="50" />', obj.imagem.url)
        return "Sem imagem"
    exibir_imagem.short_description = "Imagem"

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('titulo', 'slug', 'categoria', 'tag', 'destaque')
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
    )
