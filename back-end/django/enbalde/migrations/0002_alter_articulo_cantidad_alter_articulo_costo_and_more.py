# Generated by Django 4.2.1 on 2023-05-22 02:01

from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import enbalde.models


class Migration(migrations.Migration):

    dependencies = [
        ('enbalde', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articulo',
            name='cantidad',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='articulo',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=10, max_length=10, validators=[django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='articulo',
            name='precio',
            field=models.DecimalField(decimal_places=2, max_digits=10, max_length=10, validators=[django.core.validators.MinValueValidator(0.01)]),
        ),
        migrations.AlterField(
            model_name='carrito',
            name='fecha',
            field=models.DateField(validators=[enbalde.models.aceptar_solo_fechas_futuras]),
        ),
        migrations.AlterField(
            model_name='envio',
            name='monto',
            field=models.DecimalField(decimal_places=2, max_digits=10, max_length=10, validators=[django.core.validators.MinValueValidator(Decimal('0'))]),
        ),
        migrations.AlterField(
            model_name='oferta',
            name='descuento',
            field=models.DecimalField(decimal_places=2, max_digits=4, max_length=4, validators=[django.core.validators.MinValueValidator(0.01)]),
        ),
        migrations.AlterField(
            model_name='oferta',
            name='fecha_vencimiento',
            field=models.DateField(validators=[enbalde.models.aceptar_solo_fechas_futuras]),
        ),
        migrations.AlterField(
            model_name='seleccion',
            name='cantidad',
            field=models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='venta',
            name='comprobante',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='venta',
            name='fecha',
            field=models.DateField(validators=[enbalde.models.aceptar_solo_fechas_pasadas]),
        ),
        migrations.AlterField(
            model_name='venta',
            name='numero',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='venta',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10, max_length=10, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))]),
        ),
    ]
