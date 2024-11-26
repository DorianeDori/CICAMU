# Generated by Django 5.1.1 on 2024-10-25 09:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Annonce',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=200)),
                ('contenu', models.TextField()),
                ('date_pub', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Adherent',
            fields=[
                ('matricule', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('type_utilisateur', models.CharField(choices=[('president', 'Président'), ('employe', 'Employé'), ('secretaire', 'Secrétaire'), ('commissaire', 'Commissaire')], default='employe', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cotisation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant_coti', models.DecimalField(decimal_places=2, default=13000.0, max_digits=10)),
                ('date_coti', models.DateField(auto_now_add=True)),
                ('adherent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MU_CICA.adherent')),
            ],
        ),
        migrations.CreateModel(
            name='Pret',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant_pret', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date_demande', models.DateField(auto_now_add=True)),
                ('date_debut', models.DateField()),
                ('date_fin', models.DateField()),
                ('duree_remb', models.PositiveIntegerField()),
                ('taux_interet_annuel', models.DecimalField(decimal_places=2, default=5.0, max_digits=5)),
                ('type_pret', models.CharField(choices=[('ordinaire', 'Pret ordinaire'), ('speciale_PI', 'Pret speciale sur la PI'), ('speciale_13e_mois', 'Pret speciale sur le 13e mois')], max_length=50)),
                ('statut', models.CharField(choices=[('en attente', 'En attente'), ('approuve', 'Approuvé'), ('refuse', 'Refusé')], max_length=15)),
                ('adherent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MU_CICA.adherent')),
            ],
        ),
        migrations.CreateModel(
            name='Amortissement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.PositiveIntegerField()),
                ('periode', models.DateField()),
                ('reste_a_payer', models.DecimalField(decimal_places=2, max_digits=10)),
                ('remb_nominal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interet', models.DecimalField(decimal_places=2, max_digits=10)),
                ('mensualite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pret', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MU_CICA.pret')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant_tr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date_tr', models.DateField(auto_now_add=True)),
                ('type_tr', models.CharField(choices=[('banque', 'Banque'), ('caisse', 'Caisse')], max_length=10)),
                ('adherent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MU_CICA.adherent')),
            ],
        ),
    ]
