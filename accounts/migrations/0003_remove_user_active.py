# Generated by Django 2.2.5 on 2019-11-08 23:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='active',
        ),
    ]
