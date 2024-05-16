from django.shortcuts import render


from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse
import json

# Create your views here.

from django.contrib.auth import get_user_model
from .models import User

def getpage(request):
    if request.method == 'POST':
        form = json.loads(request.body.decode('utf-8'))  
        username = form.get('name')
        email = form.get('email')
        password = form.get('password')
        confirmPassword = form.get('confirmPassword')
        termsAccepted = form.get('terms')
        isadmin = form.get('admin') 

        if not (username and email and password and confirmPassword and termsAccepted):
            return JsonResponse({'status_message': "All fields are required and Terms must be accepted!", 'message_class': "error"})

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({'status_message': "Please Enter a Valid Email!", 'message_class': "error"})
        
        if get_user_model().objects.filter(email=email).exists():
            return JsonResponse({'status_message': "Email already exists! Please try to sign in or use a different email.", 'message_class': "error"})


        if password != confirmPassword:
            return JsonResponse({'status_message': "Passwords did not match!", 'message_class': "error"})

        if not (8 <= len(password) <= 20 and any(c.islower() for c in password) and any(c.isupper() for c in password) and any(c.isdigit() for c in password)):
            return JsonResponse({'status_message': "Password must be between 8 and 20 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.", 'message_class': "error"})
        
        if isadmin :
            get_user_model().objects.create_superuser(name=username, email=email, password=password)

        else :
            get_user_model().objects.create_user(name=username, email=email, password=password)


        return JsonResponse({'status_message': "Signup Successful, You Can Login Now! ", 'message_class': "success"})

    else:
        return render(request, 'signup.html')