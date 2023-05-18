from django.contrib import admin
from .models import Producto
from .models import TipoArticulo
from .models import Envio
from .models import Oferta
from .models import OfertaProducto
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
    list_display = ("nombre", "descuento", "fecha_vencimiento")

class OfertaProductoAdmin(admin.ModelAdmin):
    list_display = ("id_articulo", "id_oferta")

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "apellido", "direccion", "email", "observaciones")

class VentaAdmin(admin.ModelAdmin):
    list_display = ("numero", "comprobante", "fecha", "id_usuario", "neto", "monto_iva", "no_gravado", "total", "id_envio")

class SeleccionAdmin(admin.ModelAdmin):
    list_display = ("cantidad", "id_carrito", "id_producto")

admin.site.register(Envio, EnvioAdmin)
admin.site.register(TipoArticulo, TipoArticuloAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Oferta, OfertaAdmin)
admin.site.register(OfertaProducto, OfertaProductoAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Venta,VentaAdmin)
admin.site.register(Seleccion, SeleccionAdmin)
