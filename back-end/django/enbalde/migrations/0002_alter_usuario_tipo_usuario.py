# Generated by Django 4.2.1 on 2023-05-18 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enbalde', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='tipo_usuario',
            field=models.IntegerField(choices=[(1, 'Administrador'), (2, 'Cliente')]),
        ),
    ]
