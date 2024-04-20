document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var recipeName = document.getElementById('recipeName').value;
    var cuisine = document.getElementById('cuisine').value;
    var occasion = document.getElementById('occasion').value;
    var ingredientsInput = document.getElementById('ingredients').value;
    var stepsInput = document.getElementById('steps').value;
    var totalTime = parseInt(document.getElementById('totalTime').value);
    var preparationTime = parseInt(document.getElementById('preparationTime').value);
    var protein = parseInt(document.getElementById('protein').value);
    var fats = parseInt(document.getElementById('fats').value);
    var carbs = parseInt(document.getElementById('carbs').value);
    var recipeImage = document.getElementById('recipeImage').files[0];

    var cookingTime = Math.abs(totalTime - preparationTime);

    var ingredients = ingredientsInput.split(',');

    var steps = stepsInput.split('Then');

    var calories = (protein * 4) + (carbs * 4) + (fats * 9);

    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (recipes.some(recipe => recipe.name === recipeName)) {
        document.getElementById('recipeMessage').innerText = "Recipe with the same name already exists.";
        return; 
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem('recipeImage', event.target.result);
    };
    reader.readAsDataURL(recipeImage);

    recipes.push({
        name: recipeName,
        cuisine: cuisine,
        occasion: occasion,
        ingredients: ingredients,
        steps: steps,
        totalTime: totalTime,
        preparationTime: preparationTime,
        protein: protein,
        fats: fats,
        carbs: carbs,
        cookingTime: cookingTime,
        calories: calories
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));

    document.getElementById('recipeMessage').innerText = "Recipe added successfully.";
});
