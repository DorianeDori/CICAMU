
from .models import Adherent, Pret, Cotisation, Annonce, Transaction, Amortissement
from datetime import datetime
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from .forms import LoginForm
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import CommentaireForm
from django.urls import reverse


def index(request):
    return render(request, 'index.html')

def about(request): 
    return render(request, 'about.html')

def auth(request):
    return render(request, 'auth.html')

def demande(request):
    return render(request, 'demande.html')

def mediatheque(request):
    return render(request, 'mediatheque.html')

def profil(request):
    return render(request, 'profil.html')

def demande_pret(request):
    return render(request, 'demande_pret.html')

def letter_demande(request):
    return render(request, 'letter_demande.html')

def historiques(request):
    return render(request, 'historiques.html')

def vuePret(request):
    return render(request, 'vuePret.html')

def comptes(request):
    return render(request, 'comptes.html')

def register_view(request):
    if request.method == 'POST':
        matricule = request.POST.get('matricule', None)
        email = request.POST.get('email', None)
        first_name = request.POST.get('first_name', None)
        last_name = request.POST.get('last_name', None)
        password = request.POST.get('password', None)
        
        if not matricule:
            messages.error(request, "Le matricule doit être renseigné.")
            return render(request, 'auth.html')

        if Adherent.objects.filter(matricule=matricule).exists():
            messages.error(request, "Matricule déjà utilisé.")
            return render(request, 'auth.html')

        try:
            user = User.objects.create_user(
                matricule=matricule,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password  
            )
            
            adherent = Adherent.objects.create(
                user=user,
                matricule=matricule
            )

            user = authenticate(username=matricule, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
        except Exception as e:
            messages.error(request, f"Erreur lors de l'inscription: {e}")

    return render(request, 'auth.html')



def login_view(request):
    if request.method == 'POST':
        matricule = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=matricule, password=password)
        print(f"Authentification de l'utilisateur : {matricule}")  
        if user is not None:
            login(request, user)
            print("Connexion réussie")  
            return redirect('index')
        else:
            messages.error(request, "Matricule ou mot de passe incorrect.")
            print("Échec de la connexion, utilisateur non trouvé.")  
    return render(request, 'auth.html')


@login_required  
def simuler_amortissement(request):
    first_name = request.user.first_name
    last_name = request.user.last_name

    context = {
        'first_name': first_name,
        'last_name': last_name,
    }
    
    return render(request, 'demande_pret.html', context)



def annonces(request):
    annonces = Annonce.objects.all().order_by('-date_creation')
    print("Annonces récupérées :", annonces)
    return render(request, 'annonces.html', {'annonces': annonces})

def ajouter_annonce(request):
    if request.method == 'POST':
        titre = request.POST.get('titre')  
        contenu = request.POST.get('contenu_html')  

        if titre and contenu:
            Annonce.objects.create(titre=titre, contenu=contenu)  
            return redirect('annonces')

    return render(request, 'ajouter_annonce.html')



def detail_annonce(request, annonce_id):
    annonce = get_object_or_404(annonce, id=annonce_id)
    commentaires = annonce.commentaires.all()

    if request.method == 'POST':
        form = CommentaireForm(request.POST)
        if form.is_valid():
            commentaire = form.save(commit=False)
            commentaire.annonce = annonce
            commentaire.save()
            return redirect('detail_annonce', annonce_id=annonce.id)
    else:
        form = CommentaireForm()

    return render(request, 'detail_annonce.html', {
        'annonce': annonce,
        'commentaires': commentaires,
        'form': form
    })

def supprimer_commentaire(request, commentaire_id):
    commentaire = get_object_or_404(commentaire, id=commentaire_id)
    commentaire.delete()
    return redirect('annonces')  

def supprimer_annonce(request, id):
    annonce = get_object_or_404(annonce, id=id)
    annonce.delete()
    messages.success(request, "L'annonce a été supprimée avec succès.")
    return redirect(reverse('annonces'))







def calcul_amorti(request, pret_id):
    pret = get_object_or_404(Pret, id=pret_id)
    montant_du = pret.montant_pret
    taux_mensuel = (pret.taux_interet_annuel / 100) / 12
    mensualite = (montant_du * taux_mensuel) / (1 - (1 + taux_mensuel) ** -pret.duree_remb)
    total_interet = 0

    amortissement = []
    for numero in range(1, pret.duree_remb + 1):
        interet = montant_du * taux_mensuel
        remb_nominal = mensualite - interet
        montant_du -= remb_nominal
        total_interet += interet

        amortissement.append({
            'mois': numero,
            'Date': pret.date_debut.replace(month=(pret.date_debut.month + numero - 1) % 12 + 1),
            'Interets': interet,
            'Rembour_nominal': remb_nominal,
            'montant_du': montant_du,
            'total_interet': total_interet,
            'mensualite': mensualite
        })
    return render(request, 'table_amorti.html', {'amortissement': amortissement, 'pret': pret})


def demande_pret(request):
    if request.method == "POST":
        montant = request.POST['montant']
        taux_interet = request.POST['taux_interet']
        duree_remb = request.POST['duree_remb']
        date_debut = request.POST['date_debut']
        adherent = request.user.adherent  

        pret = Pret.objects.create(
            montant_pret=montant,
            taux_interet_annuel=taux_interet,
            duree_remb=duree_remb,
            date_debut=date_debut,
            adherent=adherent
        )
        return redirect('calcul_amorti', pret_id=pret.id)

    return render(request, 'demande_pret.html')
