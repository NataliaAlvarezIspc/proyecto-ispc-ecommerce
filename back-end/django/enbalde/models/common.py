from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


def aceptar_solo_fechas_futuras(date):
    if date < timezone.now():
        raise ValidationError(_("La fecha no puede ser pasada."))


def aceptar_solo_fechas_pasadas(date):
    if timezone.now() < date:
        raise ValidationError(_("La fecha no puede ser futura."))
