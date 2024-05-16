from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

def signin(request): 
    if request.method == 'POST':

        form = json.loads(request.body.decode('utf-8'))

        
        email = form.get('email')
        password = form.get('password')

        user = authenticate(request, email=email, password=password)

        if user is None:
            return JsonResponse({'status_message': "Invalid Login Credentials!", 'message_class': "error"}, status=400)
       
        else:
            login(request, user)
            return redirect('home')

    
    else : return render(request, 'signin.html')

from django.shortcuts import redirect

def logout_view(request):
    logout(request)
    return redirect('signin:signin')