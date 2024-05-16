from django.urls import path
from . import views
app_name = 'recipes'

urlpatterns = [
    path('<str:user_name>',views.recipes,name="recipes"),  
    path('cuisines/<str:cuisine_name>/<str:user_name>/',views.cuisines_recipes,name="cuisine_recipes"),  
    path('occasions/<str:occasion_name>/<str:user_name>/',views.occasion_recipes,name="occasion_recipes"),  

]

