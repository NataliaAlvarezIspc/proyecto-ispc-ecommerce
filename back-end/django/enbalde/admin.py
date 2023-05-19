from django.contrib import admin
from .models import Articulo
from .models import TipoArticulo
from .models import Envio
from .models import Oferta
from .models import ArticulosEnOferta
from .models import Usuario
from .models import Venta
from .models import Seleccion
from .models import Carrito


# Register your models here.
class EnvioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "monto")


class TipoArticuloAdmin(admin.ModelAdmin):
    list_display = ["nombre"]


class ArticuloAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion", "precio", "costo", "alicuota", "cantidad", "imagen", "tipo")


class OfertaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descuento", "fecha_vencimiento")


class ArticulosEnOfertaAdmin(admin.ModelAdmin):
    list_display = ("obtener_nombre_articulo", "obtener_nombre_oferta")

    @admin.display(ordering='articulo__nombre', description='Artículo')
    def obtener_nombre_articulo(self, obj):
        return obj.articulo.nombre

    @admin.display(ordering='oferta__nombre', description='Oferta')
    def obtener_nombre_oferta(self, obj):
        return obj.oferta.nombre


class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "apellido", "direccion", "email", "observaciones")


class VentaAdmin(admin.ModelAdmin):
    list_display = ("numero", "comprobante", "fecha", "id_usuario", "neto", "monto_iva", "no_gravado", "total", "id_envio")


class SeleccionAdmin(admin.ModelAdmin):
    list_display = ("obtener_nombre_cliente", "cantidad", "obtener_nombre_articulo")

    @admin.display(ordering='carrito__cliente__nombre', description='Cliente')
    def obtener_nombre_cliente(self, obj):
        return obj.carrito.cliente.nombre

    @admin.display(ordering='articulo__nombre', description='Artículo')
    def obtener_nombre_articulo(self, obj):
        return obj.articulo.nombre


class CarritoAdmin(admin.ModelAdmin):
    list_display = ("obtener_nombre_cliente", "fecha")

    @admin.display(ordering='usuario__nombre', description='Cliente')
    def obtener_nombre_cliente(self, obj):
        return obj.cliente.nombre


admin.site.register(Envio, EnvioAdmin)
admin.site.register(TipoArticulo, TipoArticuloAdmin)
admin.site.register(Articulo, ArticuloAdmin)
admin.site.register(Oferta, OfertaAdmin)
admin.site.register(ArticulosEnOferta, ArticulosEnOfertaAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Venta,VentaAdmin)
admin.site.register(Seleccion, SeleccionAdmin)
admin.site.register(Carrito, CarritoAdmin)