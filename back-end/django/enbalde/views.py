from .models import Articulo
from .serializers import ArticuloSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status


def crear_respuesta(mensaje: str, data: any, status_code: status = status.HTTP_200_OK):
    return JsonResponse({ "mensaje": mensaje, "data": data, "status": status_code }, status=status_code, safe=False)


# Create your views here.
class MuchosArticulos(APIView):
    def get(self, request: Request, format=None):
        articulos = Articulo.objects.all()
        serializer = ArticuloSerializer(articulos, many=True)
        return crear_respuesta("Artículos retornados exitosamente", serializer.data)

    def post(self, request: Request, format=None):
        serializer = ArticuloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Artículo creado exitosamente", serializer.data, status.HTTP_201_CREATED)

        respuesta = crear_respuesta("Error creando artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)
        print(respuesta)
        return respuesta


class UnArticulo(APIView):
    def get_object(self, pk):
        try:
            return Articulo.objects.get(pk=pk)
        except Articulo.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk, format=None):
        articulo = self.get_object(pk)
        serializer = ArticuloSerializer(articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk, format=None):
        articulo = self.get_object(pk)
        articulo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
