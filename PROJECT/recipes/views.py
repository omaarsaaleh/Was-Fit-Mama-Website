from django.shortcuts import render
from addrecipe.views import Recipe
from favourite.models import FavoriteRecipe
from signup.models import User
# Create your views here.

def recipes(request, user_name):
    all_recipes = Recipe.objects.all()
    user2 = User.objects.filter(name=user_name).first()
    if user_name!='none':
        for r in all_recipes:
            if FavoriteRecipe.objects.filter(recipe=r , user = user2).exists():
                r.isfav= True
    return render(request, 'recipes.html', {'all_recipes': all_recipes})

def cuisines_recipes(request,cuisine_name , user_name):
    all_recipes = Recipe.objects.filter(cusine=cuisine_name)
    user2 = User.objects.filter(name=user_name).first()
    if user_name!='none':
        for r in all_recipes:
            if FavoriteRecipe.objects.filter(recipe=r , user = user2).exists():
                r.isfav= True
    return render(request, 'recipes.html', {'all_recipes': all_recipes})

def occasion_recipes(request,occasion_name , user_name):
    all_recipes = Recipe.objects.filter(ocasion=occasion_name)
    user2 = User.objects.filter(name=user_name).first()
    if user_name!='none':
        for r in all_recipes:
            if FavoriteRecipe.objects.filter(recipe=r , user = user2).exists():
                r.isfav= True
    return render(request, 'recipes.html', {'all_recipes': all_recipes})