# Generated by Django 2.2.5 on 2019-11-15 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_productfile_user_required'),
    ]

    operations = [
        migrations.AddField(
            model_name='productfile',
            name='name_cus',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]