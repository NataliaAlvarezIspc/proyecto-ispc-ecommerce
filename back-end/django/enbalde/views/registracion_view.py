from rest_framework import generics, status
from rest_framework.serializers import ValidationError
from rest_framework.request import Request
from rest_framework.permissions import AllowAny
from ..serializers import RegistroSerializer
from ..models import Usuario
from ..views.common import crear_respuesta


class SignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

    def create(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                return crear_respuesta("Usuario registrado exitosamente", serializer.data, status.HTTP_201_CREATED)
            except ValidationError as ex:
                return crear_respuesta(str(ex.detail[0]), status_code=status.HTTP_400_BAD_REQUEST)

        return crear_respuesta("Error registrando usuario", serializer.errors, status.HTTP_400_BAD_REQUEST)
