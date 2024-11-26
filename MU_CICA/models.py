from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone

class Adherent(models.Model):
    USER_TYPE_CHOICES = [
        ('president', 'Président'),
        ('employe', 'Employé'),
        ('secretaire', 'Secrétaire'),
        ('commissaire', 'Commissaire'),
    ]
    matricule = models.CharField(max_length=20, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type_utilisateur = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='employe')

    def __str__(self) -> str:
        return self.matricule
    
class Pret(models.Model):
    adherent = models.ForeignKey(Adherent, on_delete=models.CASCADE)
    montant_pret = models.DecimalField(max_digits=10, decimal_places=2)
    date_demande = models.DateField(auto_now_add=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    duree_remb = models.PositiveIntegerField()
    taux_interet_annuel = models.DecimalField(max_digits=5, decimal_places=2, default=5.0)
    type_pret = models.CharField(max_length=50, choices=[
        ('ordinaire', 'Pret ordinaire'),
        ('speciale_PI', 'Pret speciale sur la PI'),
        ('speciale_13e_mois', 'Pret speciale sur le 13e mois')])
    statut = models.CharField(max_length=15, choices=[('en attente', 'En attente'), ('approuve', 'Approuvé'), ('refuse', 'Refusé')])

    def __str__(self) -> str:
        return f"Pret de {self.montant_pret} pour {self.adherent.user.username} ({self.type_pret})"
    
    def clean(self):
        if self.date_fin <= self.date_debut:
            raise ValidationError('La date de fin doit être après la date de début.')


class Cotisation(models.Model):
    adherent = models.ForeignKey(Adherent, on_delete=models.CASCADE)
    montant_coti = models.DecimalField(max_digits=10, decimal_places=2, default=13000.00)
    date_coti = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Cotisation de {self.montant_coti} par {self.adherent.user.username}"
    
class Annonce(models.Model):
    titre=models.CharField(max_length=100)
    contenu=models.TextField()
    date_creation=models.DateTimeField(default=timezone.now)

    def _str_(self):
        return self.titre
    
class Commentaire(models.Model):
    annonce = models.ForeignKey(Annonce, on_delete=models.CASCADE, related_name='commentaires')
    texte = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commentaire sur {self.annonce.titre}"
    
class Transaction(models.Model):
    adherent = models.ForeignKey(Adherent, on_delete=models.CASCADE)
    montant_tr = models.DecimalField(max_digits=10, decimal_places=2)
    date_tr = models.DateField(auto_now_add=True)
    type_tr = models.CharField(max_length=10, choices=[('banque', 'Banque'), ('caisse', 'Caisse')])

    def __str__(self) -> str:
        return f"Transaction de {self.montant_tr} de {self.adherent.user.username} par {self.type_tr}"
    
class Amortissement(models.Model):
    pret = models.ForeignKey(Pret, on_delete=models.CASCADE)
    numero = models.PositiveIntegerField()
    periode = models.DateField()
    reste_a_payer = models.DecimalField(max_digits=10, decimal_places=2)
    remb_nominal = models.DecimalField(max_digits=10, decimal_places=2)
    interet = models.DecimalField(max_digits=10, decimal_places=2)
    mensualite = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"Tableau d'amortissement de {self.pret.adherent.user.username}"
    
