function isFound(recipeName) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    return index !== -1;
}

function deleteRecipe(recipeName) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
}

document.getElementById('deleteRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var recipeName = document.getElementById('recipeName').value;

    if (isFound(recipeName)) {
        
        document.getElementById('confirmationMessage').innerText = "Are you sure you want to delete " + recipeName + " permanently?";
        document.getElementById('background').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
        
        document.getElementById('confirmButton').addEventListener('click', function() {
            

            deleteRecipe(recipeName);
            document.getElementById('recipeNamemessage').style.color = 'green';
            document.getElementById('recipeNamemessage').innerText = "Recipe deleted successfully.";
            
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });

        document.getElementById('cancelButton').addEventListener('click', function() {
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });
    } 
    else {
        document.getElementById('recipeNamemessage').style.color = 'red';
        document.getElementById('recipeNamemessage').innerText = "Recipe not found.";
    }
});
