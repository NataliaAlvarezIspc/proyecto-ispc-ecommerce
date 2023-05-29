from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo


class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, required=True)

    class Meta:
        model = Usuario
        fields = ['username', 'password', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']

    # TODO: Se puede usar el serializador en lugar de el post del usuario?
    def create(self, validated_data):
        print(validated_data["password"])
        usuario = Usuario(validated_data["username"], validated_data["password"], validated_data["tipo"],
                       validated_data["first_name"], validated_data["last_name"], validated_data["email"],
                       validated_data["direccion"], validated_data["telefono"], validated_data["observaciones"])
        usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)
    tipo = TipoArticuloSerializer()

    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']
