document.getElementById('updateRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get all the form inputs
    var recipeName = document.getElementById('recipeName').value;
    var recipeNew = document.getElementById('recipeNew').value;
    var cuisineNew = document.getElementById('cuisineNew').value;
    var occasionNew = document.getElementById('occasionNew').value;
    var ingredientsInput = document.getElementById('ingredients').value;
    var stepsInput = document.getElementById('steps').value;
    var totalTime = parseInt(document.getElementById('totalTime').value);
    var preparationTime = parseInt(document.getElementById('preparationTime').value);
    var protein = parseInt(document.getElementById('protein').value);
    var fats = parseInt(document.getElementById('fats').value);
    var carbs = parseInt(document.getElementById('carbs').value);

    // Calculate cooking time
    var cookingTime = Math.abs(totalTime - preparationTime);

    // Parse ingredients into an array
    var ingredients = ingredientsInput.split(',');

    // Parse steps into an array
    var steps = stepsInput.split('Then');

    // Calculate calories
    var calories = (protein * 4) + (carbs * 4) + (fats * 9);

    // Get recipes from local storage
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Find the index of the recipe to update
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    if (index === -1) {
        document.getElementById('recipeErrorMessage').innerText = "Recipe not found.";
        document.getElementById('confirmMessage').innerText = "";
        return; // Exit the function if the recipe doesn't exist
    }

    // Check if the new recipe name already exists
    if (recipeNew.trim() !== '' && recipeNew !== recipeName && recipes.some(recipe => recipe.name === recipeNew)) {
        document.getElementById('recipeErrorMessage').innerText = "Recipe name already exists.";
        document.getElementById('confirmMessage').innerText = "";
        return; // Exit the function if the new recipe name already exists
    }

    // If a new recipe name is provided and it's different from the old one, update it
    if (recipeNew.trim() !== '' && recipeNew !== recipeName) {
        recipes[index].name = recipeNew;
    }

    // Update other recipe details
    if (cuisineNew.trim() !== '') {
        recipes[index].cuisine = cuisineNew;
    }
    if (occasionNew.trim() !== '') {
        recipes[index].occasion = occasionNew;
    }
    if (ingredientsInput.trim() !== '') {
        recipes[index].ingredients = ingredients;
    }
    if (stepsInput.trim() !== '') {
        recipes[index].steps = steps;
    }
    if (!isNaN(totalTime)) {
        recipes[index].totalTime = totalTime;
    }
    if (!isNaN(preparationTime)) {
        recipes[index].preparationTime = preparationTime;
    }
    if (!isNaN(protein)) {
        recipes[index].protein = protein;
    }
    if (!isNaN(fats)) {
        recipes[index].fats = fats;
    }
    if (!isNaN(carbs)) {
        recipes[index].carbs = carbs;
    }
    recipes[index].cookingTime = cookingTime;
    recipes[index].calories = calories;

    // Save the updated recipes back to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Show confirmation message
    document.getElementById('confirmMessage').innerText = "Recipe updated successfully.";
});
