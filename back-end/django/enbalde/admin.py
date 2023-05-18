from django.contrib import admin
from .models import Producto
from .models import TipoArticulo
from .models import Envio
from .models import Oferta
from .models import OfertaArticulo
from .models import Usuario
from .models import Venta
from .models import Seleccion
from .models import Carrito

# Register your models here.
class EnvioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "monto")

class TipoArticuloAdmin(admin.ModelAdmin):
    list_display = ["nombre"]

class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion", "precio", "costo", "alicuota", "cantidad", "imagen", "id_tipo")

class OfertaAdmin(admin.ModelAdmin):
    list_display = ("id_oferta", "porcentaje", "fecha_vencimiento")

class OfertaArticuloAdmin(admin.ModelAdmin):
    list_display = ("id_ofertaarticulos", "id_articulos", "id_ofertas")

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "nombre", "apellido", "direccion", "email","observaciones")

class VentaAdmin(admin.ModelAdmin):
    list_display = ("numero", "comprobante", "fecha", "id_usuarios", "neto", "monto_iva", "no_gravado", "total", "id_envio")

class SeleccionAdmin(admin.ModelAdmin):
    list_display = ("id_seleccion", "cantidad", "id_articulos")

class CarritoAdmin(admin.ModelAdmin):
    list_display= ("id_carrito", "descripcion", "id_selecciones",  )

admin.site.register(Envio, EnvioAdmin)
admin.site.register(TipoArticulo, TipoArticuloAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Oferta, OfertaAdmin)
admin.site.register(OfertaArticulo, OfertaArticuloAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Venta,VentaAdmin)
admin.site.register(Seleccion, SeleccionAdmin)
admin.site.register(Carrito, CarritoAdmin)