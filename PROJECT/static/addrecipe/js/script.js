
function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage"); 
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 




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

    // Collecting ingredients
    var ingredients = "";
    var ingredientInputs = document.querySelectorAll('#ingredients-container input[type="text"]');
    ingredientInputs.forEach((input, index) => {
        if (index > 0) {
            ingredients += ':';
        }
        ingredients += input.value;
    });

    // Collecting steps
    var steps = "";
    var stepInputs = document.querySelectorAll('#steps-container input[type="text"]');
    stepInputs.forEach((input, index) => {
        if (index > 0) {
            steps += ':';
        }
        steps += input.value;
    });

    var formData = new FormData();
    
    formData.append('name', recipeName);    
    formData.append('disc', description);
    formData.append('cusine', cuisine); 
    formData.append('ocasion', occasion);
    formData.append('ingreds', ingredients) 
    formData.append('steps', steps)     
    formData.append('cook_time', cookingTime);
    formData.append('prep_time', preparationTime);
    formData.append('protein', protein);
    formData.append('fats', fats);
    formData.append('carbs', carbs);
    formData.append('image', recipeImage);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/addrecipe/', true);
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        displayMessage(response.status_message, response.message_class);
        
    };
    xhr.onerror = function() {
        displayMessage("Request Failed, Please try again later." , 'error');
    };
    xhr.send(formData);

});

// STEPS + INGREDIENTS
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


// FILE NAME DISPLAY
document.getElementById('recipeImage').addEventListener('change', function(event) {
    var recipeImage = event.target.files[0]; 
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + recipeImage.name;
});
  