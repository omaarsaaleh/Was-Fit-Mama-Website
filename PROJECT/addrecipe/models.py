from django.db import models
import os

# Create your models here.
def recipe_directory_path(instance,filename):
    return f"dynamicImages/recipes_images/recipe_{instance.identifier}/{filename}"

class Recipe(models.Model):
    name =  models.CharField(max_length=100, blank=False, null=False)
    identifier =  models.CharField(max_length=100, blank=False, null=False, default='')
    disc = models.TextField(blank=True, null= False, default="")
    isfav = models.BooleanField(default=False)
    cusine =  models.CharField(max_length=100, blank=True, null=False, default="")
    ocasion =  models.CharField(max_length=100, blank=True, null=False, default="")
    ingreds = models.TextField(blank=True, null= False, default="")
    steps = models.TextField(blank=True, null= False, default="")
    cook_time = models.IntegerField(blank=True, null=True)  
    prep_time = models.IntegerField(blank=True, null=True)  
    protein = models.FloatField(blank=True, null=True)      
    fats = models.FloatField(blank=True, null=False, default=0)         
    carbs = models.FloatField(blank=True, null=False, default=0)      
    image = models.ImageField(upload_to=recipe_directory_path)
    def total_time(self):
        if self.cook_time is not None and self.prep_time is not None:
            return self.cook_time + self.prep_time
    def total_calories(self):
        if self.protein is not None and self.carbs is not None and self.fats is not None:
            return (self.protein * 4) + (self.carbs * 4) + (self.fats * 9)
        else:
            return None
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old_instance = Recipe.objects.get(pk=self.pk)
                if old_instance.image and self.image != old_instance.image:
                    if os.path.isfile(old_instance.image.path):
                        os.remove(old_instance.image.path)
            except Recipe.DoesNotExist:
                pass

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)
