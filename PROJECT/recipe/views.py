from django.shortcuts import render
# Create your views here.

def recipe(request, recipe_name):
    return render(request, 'recipe.html', {'recipe_name': recipe_name})

import json
from django.http import JsonResponse
from addrecipe.models import Recipe

def get_recipe_details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            if not name:
                return JsonResponse({'error': 'Name not provided.'}, status=400)

            recipe = Recipe.objects.filter(name=name).first()
            if not recipe:
                return JsonResponse({'error': 'Recipe not found.'}, status=404)

            recipe_data = {
                'name': recipe.name,
                'disc': recipe.disc,
                'cusine': recipe.cusine,
                'ocasion': recipe.ocasion,
                'ingreds': recipe.ingreds,
                'steps': recipe.steps,
                'cook_time': recipe.cook_time,
                'prep_time': recipe.prep_time,
                'protein': recipe.protein,
                'fats': recipe.fats,
                'carbs': recipe.carbs,
                'image': recipe.image.url,
                'calories':recipe.total_calories(),
            }
            return JsonResponse(recipe_data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


def updateRecipe(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('disc')
        cusine= request.POST.get('cusine')   
        ocasion = request.POST.get('ocasion') 
        newname = request.POST.get('newname')
        image_file = request.FILES.get('image')

        if(name is None):
            return JsonResponse({'status_message': "Please Provide a Recipe Name!", 'message_class': "error" }, status=400)
        
        recipe = Recipe.objects.filter(name=name).first()
        if not recipe:
            return JsonResponse({'status_message': 'Recipe not found.', 'message_class': "error" }, status=404)
        if(newname and Recipe.objects.filter(name=newname).first()) :
            return JsonResponse({'status_message': 'A Reecipe with the same name already exists!', 'message_class': "error" }, status=400)
        elif(newname) :
            recipe.name = newname
        
        if(description):
            recipe.disc = description
        if(cusine):
            recipe.cusine = cusine
        if(ocasion):
            recipe.ocasion = ocasion
        if(image_file):
            recipe.image = image_file
        
        recipe.save()
        return JsonResponse({'status_message': 'Recipe updated successfully', 'message_class': "success" }, status=200)
    else :
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic}
        return render(request, 'updaterecipe.html', context)




def deleteRecipe(request):
    if(request.method == 'POST') :
        data = json.loads(request.body)
        name = data.get('name', '')
        if not name:
            return JsonResponse({'status_message': 'Please Provide a name!','message_class': "error"}, status=400)

        recipe = Recipe.objects.filter(name=name).first()
        if not recipe:
            return JsonResponse({'status_message': 'Recipe not found!','message_class': "error"}, status=404)

        recipe.delete()
        return JsonResponse({'status_message': 'Recipe deleted successfully','message_class': "success"},status=200)
    else :
        name = request.user.name
        user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
        context = {'name':name, 'user_profile_pic': user_profile_pic}
        return render(request, 'deleterecipe.html', context)
    
def about(request):
    return render(request, 'about.html')
def home(request):
    return render(request, 'home.html')

from signup.models import User
from addrecipe.models import Recipe
from addcuisine.models import Cuisine 
from addoccasion.models import Occasion
def dashboard(request):
    name = request.user.name
    user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
    num_users = User.objects.count()
    num_recipes = Recipe.objects.count()
    num_occasions = Occasion.objects.count()
    num_cuisines = Cuisine.objects.count()

    context = {'name':name, 'user_profile_pic': user_profile_pic, 'num_users':num_users, 'num_recipes':num_recipes, 
               'num_occasions': num_occasions, 'num_cuisines': num_cuisines }
    return render(request, 'dashboard.html', context)