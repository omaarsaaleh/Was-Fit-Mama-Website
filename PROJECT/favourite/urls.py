from django.urls import path
from .views import favourite_recipes,toggle_favorite

app_name = 'favourite'

urlpatterns = [
    path('favorite/<str:user_name>/', favourite_recipes, name='fav'),
    path('favorite/<str:user_name>/<str:recipe_name>/', toggle_favorite, name='follow'),
]
