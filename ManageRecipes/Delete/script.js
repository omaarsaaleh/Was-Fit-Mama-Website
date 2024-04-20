// Function to show the confirmation modal
function showModal(recipeName) {
    document.getElementById('recipeToDelete').innerText = recipeName;
    document.getElementById('background').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

// Function to hide the confirmation modal
function hideModal() {
    document.getElementById('background').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

// Function to delete the recipe
function deleteRecipe(recipeName) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var index = recipes.findIndex(recipe => recipe.name === recipeName);
    if (index !== -1) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        return true; // Recipe found and deleted
    }
    return false; // Recipe not found
}

document.getElementById('deleteRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var recipeName = document.getElementById('recipeName').value;

    // Check if the recipe exists before showing the confirmation modal
    if (deleteRecipe(recipeName)) {
        // Recipe found, show confirmation modal
        showModal(recipeName);
        document.getElementById('recipeNamemessage').innerText = ""; // Clear any previous error message
    } else {
        // Recipe not found, display error message
        document.getElementById('recipeNamemessage').innerText = "Recipe not found.";
    }
});

document.getElementById('confirmButton').addEventListener('click', function() {
    var recipeName = document.getElementById('recipeName').value;

    deleteRecipe(recipeName);

    hideModal();

    // Show message only if the recipe was found and deleted
    if (deleteRecipe(recipeName)) {
        document.getElementById('recipeNamemessage').innerText = "Recipe deleted successfully.";
    }
});

document.getElementById('cancelButton').addEventListener('click', function() {
    // Hide the modal
    hideModal();
});
