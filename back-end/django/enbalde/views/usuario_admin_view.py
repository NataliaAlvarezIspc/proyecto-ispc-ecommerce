from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from ..serializers import UsuarioSerializer
from ..models import Usuario


class UsuarioAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def update(self, request, *args, **kwargs):
        usuario = self.get_object()

        nueva_direccion = request.data.get('direccion')
        nuevo_email = request.data.get('email')
        nueva_clave = request.data.get('clave')
        nuevo_telefono = request.data.get('telefono')
        nuevas_observaciones = request.data.get('observaciones')
        nuevo_nombre = request.data.get('nombre')
        nuevo_apellido = request.data.get('apellido')
        nuevo_tipo = int(request.data.get('tipo'))

        usuario.direccion = nueva_direccion
        usuario.email = nuevo_email
        usuario.telefono = nuevo_telefono
        usuario.observaciones = nuevas_observaciones

        if nueva_clave:
            usuario.set_password(nueva_clave)

        if nuevo_nombre:
            usuario.first_name = nuevo_nombre

        if nuevo_apellido:
            usuario.last_name = nuevo_apellido

        if nuevo_tipo == Usuario.TipoUsuario.CLIENTE.value:
            usuario.is_staff = False
            usuario.tipo = Usuario.TipoUsuario.CLIENTE
        elif nuevo_tipo == Usuario.TipoUsuario.ADMINISTRADOR.value:
            usuario.is_staff = True
            usuario.tipo = Usuario.TipoUsuario.ADMINISTRADOR

        usuario.save()

        serializer = self.get_serializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
