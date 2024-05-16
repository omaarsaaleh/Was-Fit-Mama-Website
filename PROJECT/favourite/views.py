from django.http import JsonResponse
from django.shortcuts import render
from .models import FavoriteRecipe
from addrecipe.models import Recipe
from signup.models import User
from django.http import HttpResponse
def favourite_recipes(request, user_name):
    user2 = User.objects.filter(name=user_name).first()
    user_favs = FavoriteRecipe.objects.all()
    all_recipes = []
    for favorite in user_favs:
        if favorite.user==user2:
            all_recipes.append(favorite.recipe)
            r =Recipe.objects.filter(name = favorite.recipe.name).first()
            r.isfav = True
    return render(request, 'favourite.html', {'all_recipes': all_recipes})

def toggle_favorite(request, user_name, recipe_name):
    user = User.objects.filter(name=user_name).first()
    recipe = Recipe.objects.filter(name=recipe_name).first()
    favrec = FavoriteRecipe.objects.filter(user=user, recipe=recipe).exists()
    if favrec :
        r =FavoriteRecipe.objects.filter(user=user, recipe=recipe).first()
        r.delete()
    else :
        FavoriteRecipe.objects.create(user=user, recipe=recipe)
    return HttpResponse(status=204)
