from django.db import models
from django.contrib.auth import get_user_model
from addrecipe.models import Recipe
User = get_user_model()

class FavoriteRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe')

    class Meta:
        unique_together = ('user', 'recipe')

    def __str__(self):
        return f"{self.user.name}'s favorite recipe: {self.recipe.name}"