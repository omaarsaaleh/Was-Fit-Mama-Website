function deleteRecipe(recipeName) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    if (index !== -1) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}

document.getElementById('deleteRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var recipeName = document.getElementById('recipeName').value;

    // Delete the recipe
    deleteRecipe(recipeName);

    // Show message
    document.getElementById('recipeNamemessage').innerText = "Recipe deleted successfully.";
});

function deleteRecipe(recipeName) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    if (index !== -1) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}

document.getElementById('deleteRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var recipeName = document.getElementById('recipeName').value;

    // Delete the recipe
    deleteRecipe(recipeName);

    // Show message
    document.getElementById('recipeNamemessage').innerText = "Recipe deleted successfully.";
});
