# Generated by Django 3.0.8 on 2020-07-22 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Challenge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(choices=[('CREATED', 'CREATED'), ('SENT', 'SENT'), ('STARTED', 'STARTED'), ('PASSED', 'PASSED'), ('FAILED', 'FAILED')], default='CREATED', max_length=30)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now_add=True)),
                ('started', models.CharField(blank=True, max_length=150, null=True)),
            ],
        ),
    ]
