from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from signup.views import User

# Create your views here.
def profile(request): 
   name = request.user.name
   email = request.user.email
   user = request.user

   if request.method == 'POST' :
      if request.content_type == 'application/json':
         data = json.loads(request.body)
         new_name = data.get('new_name')
         new_email = data.get('new_email')   


         if new_name:
            user.name = new_name
         if new_email:
            try:
               validate_email(new_email)
            except ValidationError:
               return JsonResponse({'status_message': "Please enter a valid email!", 'message_class': "error" }, status=400)
            if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
               return JsonResponse({'status_message':'Email is already in use!', 'message_class':'error' }, status=400)
            else:
               user.email = new_email
      else :
         image = request.FILES['image']
         if(image) :
            user.profile_image = image

      user.save()

      return JsonResponse({'status_message': "Profile updated successfully!", 'message_class': "success"}, status = 200)


      
   else:  
      user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
      context = {'name':name, 'email':email, 'user_profile_pic': user_profile_pic}
      return render(request, 'profile.html', context)

from django.contrib.auth.hashers import make_password, check_password

def updatepass(request):
   if request.method == 'POST' :
      data = json.loads(request.body.decode('utf-8'))
      print(data)
      old_password = data.get('old_password')
      new_password = data.get('new_password') 
      
      user = request.user
      if check_password(old_password, user.password): 
         if 20 >= len(new_password) >= 8 and any(char.isdigit() for char in new_password) and any(char.islower() for char in new_password) and any(char.isupper() for char in new_password):
               user.password = make_password(new_password)
               user.save()
               return JsonResponse({'status_message': "Password updated successfully!", 'message_class': "success"}, status=200)
         else:
               return JsonResponse({'status_message': "New password does not meet the criteria!", 'message_class': "error"}, status=400)
      else: 
         return JsonResponse({'status_message': "Old password is incorrect!", 'message_class': "error"}, status=400)

   
   else:  
      name = request.user.name
      user_profile_pic = request.user.profile_image.url if request.user.profile_image else None
      context = {'name':name, 'user_profile_pic': user_profile_pic}
      return render(request, 'updatepass.html', context)