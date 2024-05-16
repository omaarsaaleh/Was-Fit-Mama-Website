from django.urls import path
from . import views

app_name = 'recipe'

urlpatterns = [
    path('<str:recipe_name>/',views.recipe,name="recipe"), 

]

