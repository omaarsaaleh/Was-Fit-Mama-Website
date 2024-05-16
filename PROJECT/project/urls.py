"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from signin import views as signinviews
from myprofile import views as profile_views
from django.conf.urls.static import static
from django.conf import settings
from recipe.views import *
from addcuisine.views import *
from addoccasion.views import *
from favourite import urls as fav_urls
urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('signup/', include('signup.urls', namespace='signup')),
    path('signin/', include('signin.urls', namespace='signin')),
    path('myprofile/', include('myprofile.urls', namespace='myprofile')),
    path('logout/', signinviews.logout_view, name='logout'),
    path('addrecipe/', include('addrecipe.urls', namespace='addrecipe')),
    path('recipes/', include('recipes.urls', namespace='recipes')),
    path('recipe/', include('recipe.urls', namespace='recipe')),
    path('get_recipe_details/', get_recipe_details, name='get_recipe_details'), # return recipe details in json
    path('updaterecipe/', updateRecipe, name='updaterecipe'),
    path('deleterecipe/', deleteRecipe, name='deleterecipe'),
    path('about/', about, name='about'),
    path('dashboard/', dashboard, name='dashboard'),
    
    path('addcuisine/', include('addcuisine.urls', namespace='addcuisine')),
    path('deletecuisine/', deleteCuisine, name='deletecuisine'),
    path('updatecuisine/', updateCuisine, name='updatecuisine'),
    path('cuisines/', cuisines, name='cuisines'),
    
    
    path('addoccasion/', addOccasion, name='addoccasion'),
    path('updateoccasion/', updateOccasion, name='updateoccasion'),
    path('deleteoccasion/', deleteOccasion, name='deleteoccasion'),
    path('occasions/', occasions, name='occasions'),
    path('updatepass/', profile_views.updatepass , name='updatepass'),
    path('', include(fav_urls, namespace='favourite')),  

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
