from django.db import models
import uuid #unique id
import os
from django.core.validators import MinLengthValidator, RegexValidator #password validation
from django.contrib.auth.hashers import make_password #password hashing

# Create your models here.

from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin 

class CustomUserManager(UserManager) :
    def _create_user(self,email,password,**extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self.db)   
        return user 
    
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password,**extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password,**extra_fields)

def user_directory_path(instance, filename):
    return f"profile_pictures/user_{instance.user_id}/{filename}"

class User(AbstractBaseUser, PermissionsMixin):

    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=150, validators=[
        MinLengthValidator(8, message="Password must be at least 8 characters long."),
        RegexValidator(
            regex='[0-9]',
            message="Password must contain at least one digit.",
        ),
        RegexValidator(
            regex='[a-z]',
            message="Password must contain at least one lowercase letter.",
        ),
        RegexValidator(
            regex='[A-Z]',
            message="Password must contain at least one uppercase letter.",
        )  
    ])
    profile_image = models.ImageField(upload_to=user_directory_path, null=True, blank=True, default=None)
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False) 

    objects = CustomUserManager()
    REQUIRED_FIELDS = ['name', 'password']

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email' 

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old_instance = User.objects.get(pk=self.pk)
                if old_instance.profile_image and self.profile_image != old_instance.profile_image:
                    if os.path.isfile(old_instance.profile_image.path):
                        os.remove(old_instance.profile_image.path)
                        # print(self.pk)
            except User.DoesNotExist:
                pass

        super().save(*args, **kwargs)
