from django.urls import path
from . import views

app_name = 'signin'

urlpatterns = [
    path('',views.signin,name="signin")
]

