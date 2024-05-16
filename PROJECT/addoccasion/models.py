from django.db import models
import os
# Create your models here. 

def recipe_directory_path(instance,filename):
    return f"dynamicImages/occasions_images/occasion_{instance.identifier}/{filename}"

class Occasion(models.Model):
    name =  models.CharField(max_length=100, blank=False, null=False)
    identifier =  models.CharField(max_length=100, blank=False, null=False, default='') 
    disc = models.TextField(blank=True, null= False, default="")
    image = models.ImageField(upload_to=recipe_directory_path)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old_instance = Occasion.objects.get(pk=self.pk)
                if old_instance.image and self.image != old_instance.image:
                    if os.path.isfile(old_instance.image.path):
                        os.remove(old_instance.image.path)
            except Occasion.DoesNotExist:
                pass

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

