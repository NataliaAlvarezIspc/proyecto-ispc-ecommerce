from collections import OrderedDict
from django.http import JsonResponse
from rest_framework import status


def crear_respuesta(mensaje: str, data: any = None, status_code: status = status.HTTP_200_OK):
    return JsonResponse({"mensaje": mensaje, "data": data, "status": status_code}, status=status_code, safe=False)


def quitar_clave_de_respuesta(representation: OrderedDict):
    representation.pop("clave")
    return representation
