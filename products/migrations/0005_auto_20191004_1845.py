# Generated by Django 2.2.5 on 2019-10-04 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20191003_2136'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(default='abc'),
        ),
    ]
