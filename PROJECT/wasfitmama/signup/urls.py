from django.urls import path
from . import views

app_name = 'signup'  

urlpatterns = [
    path('', views.getpage, name='getpage')
]