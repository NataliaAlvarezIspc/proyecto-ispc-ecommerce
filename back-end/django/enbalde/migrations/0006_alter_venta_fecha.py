# Generated by Django 4.2.1 on 2023-06-07 22:49

from django.db import migrations, models
import enbalde.models


class Migration(migrations.Migration):

    dependencies = [
        ('enbalde', '0005_alter_usuario_email_alter_usuario_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='fecha',
            field=models.DateTimeField(validators=[enbalde.models.aceptar_solo_fechas_pasadas]),
        ),
    ]
