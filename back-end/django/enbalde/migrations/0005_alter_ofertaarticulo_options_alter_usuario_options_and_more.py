# Generated by Django 4.2.1 on 2023-05-18 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('enbalde', '0004_usuario'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ofertaarticulo',
            options={'verbose_name': 'Relación Oferta/Artículos', 'verbose_name_plural': 'OfertasArticulos'},
        ),
        migrations.AlterModelOptions(
            name='usuario',
            options={'verbose_name': 'Listado de usuarios', 'verbose_name_plural': 'Usuarios'},
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id_venta', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.IntegerField()),
                ('comprobante', models.IntegerField()),
                ('fecha', models.DateField()),
                ('neto', models.DecimalField(decimal_places=2, max_digits=10, max_length=10)),
                ('monto_iva', models.DecimalField(decimal_places=2, max_digits=10, max_length=10)),
                ('no_gravado', models.DecimalField(decimal_places=2, max_digits=10, max_length=10)),
                ('total', models.DecimalField(decimal_places=2, max_digits=10, max_length=10)),
                ('id_envio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='enbalde.envio')),
                ('id_usuarios', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='enbalde.usuario')),
            ],
            options={
                'verbose_name': 'Listado de Ventas',
                'verbose_name_plural': 'Ventas',
                'db_table': 'Venta',
            },
        ),
    ]