from django.contrib import admin
from .models import Producto
from .models import TipoArticulo
from .models import Envio

# Register your models here.
class EnvioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "monto")

class TipoArticuloAdmin(admin.ModelAdmin):
    list_display = ["nombre"]

class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion", "precio", "costo", "alicuota", "cantidad", "imagen", "id_tipo")

admin.site.register(Envio, EnvioAdmin)
admin.site.register(TipoArticulo, TipoArticuloAdmin)
admin.site.register(Producto, ProductoAdmin)
