from django.urls import path
from . import views

app_name = 'addcuisine'

urlpatterns = [
    path('',views.addcuisine,name="addcuisine"), 

]

