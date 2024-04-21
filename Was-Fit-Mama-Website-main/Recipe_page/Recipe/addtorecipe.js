function fillRecipePage(recipeData, idx) {
    var ingredientsList = document.querySelector(`.Ingrediants${idx}`);
    if( ingredientsList === null ) return;
    
    recipeData.ingredients.forEach(function(ingredient) {
        var li = document.createElement('li');
        li.innerHTML = '<p>' + ingredient + '</p>';
        ingredientsList.appendChild(li);
    });


    document.querySelector(`.recipe-name${idx}`).textContent = recipeData.name;

    

    var stepsList = document.querySelector(`.Steps${idx}`);
    recipeData.steps.forEach(function(step) {
        var li = document.createElement('li');
        li.innerHTML = '<p>' + step + '</p>';
        stepsList.appendChild(li);
    });

    document.querySelector(`.Total${idx}`).textContent = recipeData.totalTime;
    document.querySelector(`.Preparation${idx}`).textContent = recipeData.preparationTime;
    document.querySelector(`.Cooking${idx}`).textContent = recipeData.cookingTime;

    document.getElementById(`recipe1_image${idx}`).src = recipeData.image;

    document.querySelector(`.Fats${idx}`).textContent = recipeData.fats;
    document.querySelector(`.Calories${idx}`).textContent = recipeData.calories;
    document.querySelector(`.Protiens${idx}`).textContent = recipeData.protein;
}


let lista = JSON.parse(localStorage.getItem("recipes"));

for (let i = 0; i < lista.length ; i++) {
    fillRecipePage(lista[i],i);
}



const logo = document.getElementById('logo');

logo.addEventListener('click', function() {
    window.location.href = '../../Home_page/Home Page.html'; 
});
