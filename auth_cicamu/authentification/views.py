from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.contrib.auth.models import User

def register_view(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        matricule = request.POST.get('matricule')
        password = request.POST.get('password')

        if User.objects.filter(username=matricule).exists():
            messages.error(request, "Matricule déjà utilisé.")
            return render(request, 'auth.html')

        user = User.objects.create_user(
            username=matricule,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        messages.success(request, "Inscription réussie ! Vous pouvez vous connecter.")
        return redirect('login')  

    return render(request, 'auth.html')

def login_view(request):
    if request.method == 'POST':
        matricule = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=matricule, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  
        else:
            messages.error(request, "Matricule ou mot de passe incorrect.")
    
    return render(request, 'auth.html')
