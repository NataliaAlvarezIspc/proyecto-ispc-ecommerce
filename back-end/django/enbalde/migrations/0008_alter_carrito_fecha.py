# Generated by Django 4.2.1 on 2023-06-07 23:58

from django.db import migrations, models
import enbalde.models


class Migration(migrations.Migration):

    dependencies = [
        ('enbalde', '0007_carrito_comprado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrito',
            name='fecha',
            field=models.DateTimeField(validators=[enbalde.models.aceptar_solo_fechas_futuras]),
        ),
    ]
