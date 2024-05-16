from django.apps import AppConfig

from django.contrib.auth import get_user_model

class SignupConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'signup'
    def ready(self):
        User = get_user_model()