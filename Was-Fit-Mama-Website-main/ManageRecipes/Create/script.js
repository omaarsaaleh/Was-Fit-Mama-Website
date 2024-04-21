document.getElementById('recipeForm').addEventListener('submit', function(event) {
    var recipeName = document.getElementById('recipeName').value;
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var cuisine = document.getElementById('cuisine').value;
    var occasion = document.getElementById('occasion').value;
    var recipeMessage = document.getElementById('recipeMessage');

    if (recipes.find(recipe => recipe.name === recipeName)) {
        recipeMessage.style.display = 'block'; 
        event.preventDefault();
        return;
    } else {
        recipeMessage.innerText = ""; 
        recipeMessage.style.display = 'none'; 
    }

    recipes.push({
        name: recipeName,
        cuisine: cuisine,
        occasion: occasion
    });
    localStorage.setItem('recipes', JSON.stringify(recipes));
});
