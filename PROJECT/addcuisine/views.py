from django.shortcuts import render

# Create your views here.
import secrets
import string
from django.http import JsonResponse
from .models import Cuisine

def createID(length=32):
    
    alphabet = string.ascii_letters + string.digits
    session_token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return session_token

def addcuisine(request):
    if request.method == 'POST':
        cuisine_name = request.POST.get('name')
        description = request.POST.get('disc')
        image_file = request.FILES.get('image')

        if any([cuisine_name, description, image_file]) is None:
                return JsonResponse({'status_message': "Please fill all required fields!", 'message_class': "error" }, status=400)
        if Cuisine.objects.filter(name=cuisine_name).exists():
                return JsonResponse({'status_message': "Cuisine already exists!", 'message_class': "error" }, status=400)

        token = createID()
        newCuisine = Cuisine.objects.create(
            name=cuisine_name,
            disc=description,
            identifier=token,
            image=image_file
        )
        return JsonResponse({'status_message': "Cuisine Created Successfully", 'message_class': "success"},status=200)

    else :
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic} 
        return render(request, 'addcuisine.html', context)
    
from .models import Cuisine

def cuisines(request):
    all_cuisines = Cuisine.objects.all()
    return render(request, 'cuisines.html',  {'all_cuisines': all_cuisines})

import json
from django.http import JsonResponse

def deleteCuisine(request):
    if request.method == 'POST' :
        data = json.loads(request.body)
        name = data.get('name', '')
        if not name:
            return JsonResponse({'status_message': 'Please Provide a name!','message_class': "error"}, status=400)

        cuisine = Cuisine.objects.filter(name=name).first()
        if not cuisine:
            return JsonResponse({'status_message': 'Cuisine not found!','message_class': "error"}, status=404)

        cuisine.delete()
        return JsonResponse({'status_message': 'Cuisine deleted successfully','message_class': "success"},status=200)
    else : 
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic} 
        return render(request, 'deletecuisine.html', context)

def updateCuisine(request):
    if request.method == 'POST' :
        name = request.POST.get('name')
        description = request.POST.get('disc')
        newname = request.POST.get('newname')
        image_file = request.FILES.get('image')

        if(name is None):
            return JsonResponse({'status_message': "Please Provide a cuisine Name!", 'message_class': "error" }, status=400)
        
        cuisine = Cuisine.objects.filter(name=name).first()
        if not cuisine:
            return JsonResponse({'status_message': 'Cuisine not found.', 'message_class': "error" }, status=404)
        if(newname and Cuisine.objects.filter(name=newname).first()) :
            return JsonResponse({'status_message': 'A Cuisine with the same name already exists!', 'message_class': "error" }, status=400)
        elif(newname) :
            cuisine.name = newname
        
        if(description):
            cuisine.disc = description
        if(image_file):
            cuisine.image = image_file
        
        cuisine.save()
        return JsonResponse({'status_message': 'Cuisine updated successfully', 'message_class': "success" }, status=200)
    else : 
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic}  
        return render(request, 'updatecuisine.html', context)