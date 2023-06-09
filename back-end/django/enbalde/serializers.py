from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo, Carrito, Seleccion, Venta
from .views.common import quitar_clave_de_respuesta


class UsuarioSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(required=True, source="username")
    clave = serializers.CharField(min_length=6, required=True, source="password")
    nombre = serializers.CharField(required=True, source="first_name")
    apellido = serializers.CharField(required=True, source="last_name")

    class Meta:
        model = Usuario
        fields = ['id', 'usuario', 'clave', 'tipo', 'nombre', 'apellido', 'email', 'direccion', 'telefono', 'observaciones']

    def to_representation(self, instance):
        return quitar_clave_de_respuesta(super().to_representation(instance))


class RegistroSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(required=True, source="first_name")
    apellido = serializers.CharField(required=True, source="last_name")
    usuario = serializers.CharField(required=True, source="username")
    clave = serializers.CharField(required=True, source="password")
    direccion = serializers.CharField(required=True)
    telefono = serializers.CharField(required=False)
    email = serializers.CharField(required=True)
    tipo = serializers.IntegerField(required=True)
    observaciones = serializers.CharField(required=False)

    class Meta:
        model = Usuario
        fields = ["nombre", "apellido", "usuario", "clave", "direccion", "telefono", "email", "tipo", "observaciones"]

    def create(self, validated_data):
        self._validar_que_no_exista_usuario(validated_data["username"])

        usuario = Usuario(username=validated_data["username"], password=validated_data["password"],
                          tipo=validated_data["tipo"], first_name=validated_data["first_name"],
                          last_name=validated_data["last_name"], email=validated_data["email"],
                          direccion=validated_data["direccion"], telefono=validated_data["telefono"],
                          observaciones="")
        usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario

    def to_representation(self, instance):
        return quitar_clave_de_respuesta(super().to_representation(instance))

    def _validar_que_no_exista_usuario(self, username):
        existe = Usuario.objects.filter(username=username)
        if existe:
            raise serializers.ValidationError("El nombre de usuario seleccionado ya existe")


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class CarritoSerializer(serializers.ModelSerializer):
    cliente = UsuarioSerializer()

    class Meta:
        model = Carrito
        fields = ['id', 'cliente', 'fecha']


class SeleccionSerializer(serializers.ModelSerializer):
    articulo = ArticuloSerializer()

    class Meta:
        model = Seleccion
        fields = ['id', 'cantidad', 'articulo']


class VentaSerializer(serializers.ModelSerializer):
    carrito = CarritoSerializer()

    class Meta:
        model = Venta
        fields = ['numero', 'comprobante', 'fecha', 'total', 'envio', 'carrito']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        carrito = representation.pop("carrito")
        cliente = carrito.get("cliente")
        representation.update({"cliente": f"{cliente.get('nombre')} {cliente.get('apellido')}"})

        objeto_carrito = Carrito.objects.get(pk=carrito.get("id"))
        selecciones = Seleccion.objects.filter(carrito=objeto_carrito)

        serializer = SeleccionSerializer(selecciones, many=True)
        representation.update({"selecciones": serializer.data})
        return representation
