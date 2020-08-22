# Generated by Django 2.2.5 on 2019-11-12 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_productpurchase'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productpurchase',
            name='user',
        ),
        migrations.AddField(
            model_name='productpurchase',
            name='order_id',
            field=models.CharField(default='abc123', max_length=120),
            preserve_default=False,
        ),
    ]
