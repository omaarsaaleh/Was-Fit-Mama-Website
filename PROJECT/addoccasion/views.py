from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Occasion
# Create your views here.

import secrets
import string
def createID(length=32):
    alphabet = string.ascii_letters + string.digits
    session_token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return session_token 


def addOccasion(request):
    if request.method == 'POST':
        occassion_name = request.POST.get('name')
        description = request.POST.get('disc')
        image_file = request.FILES.get('image')

        if any([occassion_name, description, image_file]) is None:
                return JsonResponse({'status_message': "Please fill all required fields!", 'message_class': "error" }, status=400)
        if Occasion.objects.filter(name=occassion_name).exists():
                return JsonResponse({'status_message': "Occassion already exists!", 'message_class': "error" }, status=400)

        token = createID()
        newOccassion = Occasion.objects.create(
            name=occassion_name,
            disc=description,
            identifier=token,
            image=image_file
        )
        return JsonResponse({'status_message': "Occassion Created Successfully", 'message_class': "success"},status=200)

    else :
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic} 
        return render(request, 'addoccasion.html', context)


def updateOccasion(request):
    if request.method == 'POST' :
        name = request.POST.get('name')
        description = request.POST.get('disc')
        newname = request.POST.get('newname')
        image_file = request.FILES.get('image')

        if(name is None):
            return JsonResponse({'status_message': "Please Provide an occasion Name!", 'message_class': "error" }, status=400)
        
        occasion = Occasion.objects.filter(name=name).first()
        if not occasion:
            return JsonResponse({'status_message': 'Occasion not found.', 'message_class': "error" }, status=404)
        if(newname and Occasion.objects.filter(name=newname).first()) :
            return JsonResponse({'status_message': 'An Occasion with the same name already exists!', 'message_class': "error" }, status=400)
        elif(newname) :
            occasion.name = newname
        
        if(description):
            occasion.disc = description
        if(image_file):
            occasion.image = image_file
        
        occasion.save()
        return JsonResponse({'status_message': 'Occasion updated successfully', 'message_class': "success" }, status=200)
    else : 
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic}  
        return render(request, 'updateoccasion.html', context)

def deleteOccasion(request):
    if request.method == 'POST' :
        data = json.loads(request.body)
        name = data.get('name', '')
        if not name:
            return JsonResponse({'status_message': 'Please Provide a name!','message_class': "error"}, status=400)

        occasion = Occasion.objects.filter(name=name).first()
        if not occasion:
            return JsonResponse({'status_message': 'Occasion not found!','message_class': "error"}, status=404)

        occasion.delete()
        return JsonResponse({'status_message': 'Occasion deleted successfully','message_class': "success"},status=200)
    else : 
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic} 
        return render(request, 'deleteoccasion.html', context)

def occasions(request):
    all_occasions = Occasion.objects.all()
    return render(request, 'occasions.html',  {'all_occasions': all_occasions})

import json
from django.http import JsonResponse