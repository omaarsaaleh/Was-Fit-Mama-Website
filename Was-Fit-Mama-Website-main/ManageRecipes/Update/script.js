document.getElementById("updateRecipeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var recipeName = document.getElementById("recipeName").value.trim();
    var newRecipeName = document.getElementById("recipeNew").value.trim();
    var newCuisine = document.getElementById("cuisineNew").value.trim();
    var newOccasion = document.getElementById("occasionNew").value.trim();
    var description = document.getElementById("description").value.trim();
    var recipeImage = document.getElementById("recipeImage").files[0];
    
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    var recipeToUpdate = recipes.find(function(recipe) {
        return recipe.name === recipeName;
    });
    
    if (!recipeToUpdate) {
        document.getElementById("confirmMessage").textContent = "Recipe not found";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if (newRecipeName !== "" && recipes.some(recipe => recipe.name === newRecipeName)) {
        document.getElementById("confirmMessage").textContent = "New recipe name already exists. Please choose a different one.";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if (newRecipeName === "" && newCuisine === "" && newOccasion === "" && description === "" && !recipeImage) {
        document.getElementById("confirmMessage").textContent = "Please provide at least one update";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    recipeToUpdate.name = newRecipeName || recipeToUpdate.name;
    recipeToUpdate.cuisine = newCuisine || recipeToUpdate.cuisine;
    recipeToUpdate.occasion = newOccasion || recipeToUpdate.occasion;
    recipeToUpdate.description = description || recipeToUpdate.description;

    if (recipeImage) {
        var reader = new FileReader();
        reader.onload = function(event) {
            recipeToUpdate.image = event.target.result;
            localStorage.setItem('recipes', JSON.stringify(recipes));
            document.getElementById("confirmMessage").textContent = "Recipe updated successfully";
            document.getElementById("confirmMessage").style.color = "green";
        };
        reader.readAsDataURL(recipeImage);
    } else {
        localStorage.setItem('recipes', JSON.stringify(recipes));
        document.getElementById("confirmMessage").textContent = "Recipe updated successfully";
        document.getElementById("confirmMessage").style.color = "green";
    }
});
