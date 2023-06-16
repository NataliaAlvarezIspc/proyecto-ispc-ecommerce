from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers import UsuarioSerializer
from ..models import Usuario


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def update(self, request, *args, **kwargs):
        usuario = self.get_object()

        nueva_direccion = request.data.get('direccion')
        nuevo_email = request.data.get('email')
        nueva_clave = request.data.get('clave')
        nuevo_telefono = request.data.get('telefono')
        nuevas_observaciones = request.data.get('observaciones')

        usuario.direccion = nueva_direccion
        usuario.email = nuevo_email
        usuario.telefono = nuevo_telefono
        usuario.observaciones = nuevas_observaciones

        if nueva_clave:
            usuario.set_password(nueva_clave)

        usuario.save()

        serializer = self.get_serializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
