# Generated by Django 3.2.17 on 2023-02-11 05:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0002_auto_20230211_1031'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pay_mode', models.CharField(default='', max_length=20)),
                ('charges', models.IntegerField()),
                ('pay_status', models.CharField(default='', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_date', models.DateField(default='2020-12-31')),
                ('end_time', models.TimeField(default='11:59:00')),
                ('updated_by', models.IntegerField(default=-1)),
                ('updated_by_type', models.CharField(default='', max_length=20)),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core_app.city')),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core_app.customer')),
                ('payment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core_app.payment')),
                ('restaurant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core_app.restaurant')),
            ],
        ),
    ]
