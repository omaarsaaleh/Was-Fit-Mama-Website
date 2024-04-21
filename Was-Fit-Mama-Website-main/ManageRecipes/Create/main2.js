document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var recipeName = document.getElementById('recipeName').value;
    var description = document.getElementById('description').value;
    var cuisine = document.getElementById('cuisine').value;
    var occasion = document.getElementById('occasion').value;
    var cookingTime = parseInt(document.getElementById('cookingTime').value);
    var preparationTime = parseInt(document.getElementById('preparationTime').value);
    var protein = parseInt(document.getElementById('protein').value);
    var fats = parseInt(document.getElementById('fats').value);
    var carbs = parseInt(document.getElementById('carbs').value);
    var recipeImage = document.getElementById('recipeImage').files[0];

    var totalTime = cookingTime + preparationTime;

    var ingredients = [];
    var ingredientInputs = document.querySelectorAll('#ingredients-container input[type="text"]');
    ingredientInputs.forEach(function(input) {
        var ingredient = input.value.trim();
        if (ingredient !== '') {
            ingredients.push(ingredient);
        }
    });

    // Collecting steps
    var steps = [];
    var stepInputs = document.querySelectorAll('#steps-container input[type="text"]');
    stepInputs.forEach(function(input) {
        var step = input.value.trim();
        if (step !== '') {
            steps.push(step);
        }
    });

    var calories = (protein * 4) + (carbs * 4) + (fats * 9);

    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (recipes.some(recipe => recipe.name === recipeName)) { 
        document.getElementById('recipeMessage').style.color = 'red';
        document.getElementById('recipeMessage').innerText = "Recipe with the same name already exists.";
        return; 
    }
    if (recipeImage) {
        var reader = new FileReader();
        reader.onload = function(event) {
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
                calories: calories,
                image: event.target.result,  
                description : description
            });

            localStorage.setItem('recipes', JSON.stringify(recipes));
            document.getElementById('recipeMessage').style.color = 'green';
            document.getElementById('recipeMessage').innerText = "Recipe added successfully.";
        };
        reader.readAsDataURL(recipeImage);
    } 
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipe-form');
    const ingredientsContainer = document.getElementById('ingredients-container');
    const stepsContainer = document.getElementById('steps-container');
    const addIngredientButton = document.getElementById('add-ingredient-button');
    const addStepButton = document.getElementById('add-step-button');
    
    let ingredientCount = 2;
    let stepCount = 2;
    
    addIngredientButton.addEventListener('click', function() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');
    
        const label = document.createElement('label');
        label.textContent = `Ingredient ${ingredientCount}:`;
        ingredientDiv.appendChild(label);
    
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `ingredient${ingredientCount}`;
        input.placeholder = 'Enter recipe ingredient';
        ingredientDiv.appendChild(input);
    
        ingredientsContainer.appendChild(ingredientDiv);
        
        ingredientCount++;
    });

    addStepButton.addEventListener('click', function() {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
    
        const label = document.createElement('label');
        label.textContent = `Step ${stepCount}:`;
        stepDiv.appendChild(label);
    
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `step${stepCount}`;
        input.placeholder = 'Enter recipe step';
        stepDiv.appendChild(input);
    
        stepsContainer.appendChild(stepDiv);
        
        stepCount++;
    });
});


document.getElementById('recipeImage').addEventListener('change', function(event) {
    var recipeImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + recipeImage.name;
  });
  