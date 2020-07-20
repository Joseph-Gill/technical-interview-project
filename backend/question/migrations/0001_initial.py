# Generated by Django 3.0.8 on 2020-07-20 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('program', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Question', max_length=100)),
                ('instructions', models.CharField(max_length=2500)),
                ('difficulty', models.CharField(choices=[('E', 'Easy'), ('I', 'Intermediate'), ('H', 'Hard')], max_length=1)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now_add=True)),
                ('program', models.ManyToManyField(related_name='question_program', to='program.Program')),
            ],
        ),
    ]
