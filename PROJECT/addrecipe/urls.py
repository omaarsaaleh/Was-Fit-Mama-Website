from django.urls import path
from . import views

app_name = 'addrecipe'

urlpatterns = [
    path('',views.addrecipe,name="addrecipe"), 

]

