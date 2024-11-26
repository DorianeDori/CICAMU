from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
urlpatterns = [
    path('', views.auth, name='auth'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('index/', views.index, name='index'),
    path('about/', views.about, name='about'),

    path('annonces/', views.annonces, name='annonces'),
    path('ajouter_annonce/', views.ajouter_annonce, name='ajouter_annonce'),
    path('commentaire/supprimer/<int:commentaire_id>/', views.supprimer_commentaire, name='supprimer_commentaire'),
    path('<int:annonce_id>/', views.detail_annonce, name='detail_annonce'),
    path('supprimer/<int:id>/', views.supprimer_annonce, name='supprimer_annonce'),
    
    path('demande/', views.demande, name='demande'), 
    path('mediatheque/', views.mediatheque, name='mediatheque'),
    path('profil/', views.profil, name='profil'),
    path('demande_pret/', views.demande_pret, name='demande_pret'),
    path('calcul-amorti/<int:pret_id>/', views.calcul_amorti, name='calcul_amorti'),
    path('mediatheque/', views.mediatheque, name='mediatheque'),
    path('letter_demande/', views.letter_demande, name='letter_demande'),
    path('historiques/', views.historiques, name='historiques'),
    path('vuePret/', views.vuePret, name='vuePret'),
    path('comptes/', views.comptes, name='comptes'),
    path('simuler_amortissement/', views.simuler_amortissement, name='simuler_amortissement'),
]
