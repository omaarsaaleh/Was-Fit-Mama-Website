from django.shortcuts import render

# Create your views here.

# ID
import secrets
import string
def createID(length=32):
    
    alphabet = string.ascii_letters + string.digits
    session_token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return session_token

import json
from django.http import JsonResponse
from .models import Recipe

def addrecipe(request):
    if request.method == 'POST':
        try:
            recipe_name = request.POST.get('name')
            description = request.POST.get('disc')
            cusine= request.POST.get('cusine')  
            ocasion = request.POST.get('ocasion') 
            ingreds = request.POST.get('ingreds')
            steps = request.POST.get('steps')
            cook_time = request.POST.get('cook_time') 
            prep_time = request.POST.get('prep_time')
            protein = request.POST.get('protein')
            fats = request.POST.get('fats')
            carbs = request.POST.get('carbs')
            image_file = request.FILES.get('image')

            if any([recipe_name, description, cusine, ingreds, steps, cook_time, prep_time, protein, fats, carbs, image_file]) is None:
                return JsonResponse({'status_message': "Please fill all required fields!", 'message_class': "error" }, status=400)



            if Recipe.objects.filter(name=recipe_name).exists():
                return JsonResponse({'status_message': "Recipe already exists!", 'message_class': "error" }, status=400)

            token = createID()
            newRecipe = Recipe.objects.create(
                name=recipe_name,
                disc=description,
                cusine=cusine,
                identifier=token,
                steps=steps,
                ocasion=ocasion,
                ingreds=ingreds,
                cook_time=cook_time,
                prep_time=prep_time,
                protein=float(protein),
                fats=float(fats),
                carbs=float(carbs),
                image=image_file
            )
            return JsonResponse({'status_message': "Recipe Created Successfully", 'message_class': "success"},status=200)
        except Exception as e:
            return JsonResponse({'status_message': str(e), 'message_class': "error"}, status=400)
    
    
    else:    
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic}
        return render(request, 'addrecipe.html', context)