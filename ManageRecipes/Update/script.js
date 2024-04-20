document.getElementById('updateRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var recipeName = document.getElementById('recipeName').value;
    var recipeNew = document.getElementById('recipeNew').value;
    var cuisineNew = document.getElementById('cuisineNew').value;
    var occasionNew = document.getElementById('occasionNew').value;
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Find the index of the recipe to update
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    if (index === -1) {
        document.getElementById('recipeErrorMessage').innerText = "Recipe not found.";
        return; // Exit the function if the recipe doesn't exist
    }

    // Update the recipe with new values
    recipes[index].name = recipeNew || recipes[index].name;
    recipes[index].cuisine = cuisineNew || recipes[index].cuisine;
    recipes[index].occasion = occasionNew || recipes[index].occasion;

    // Save the updated recipes back to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Show confirmation message
    document.getElementById('confirmMessage').innerText = "Recipe updated successfully.";
});