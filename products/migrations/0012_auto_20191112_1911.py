# Generated by Django 2.2.5 on 2019-11-13 01:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_productfile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productfile',
            old_name='filte',
            new_name='file',
        ),
    ]
