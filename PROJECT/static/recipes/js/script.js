const Search = () => {
    const searchbox = document.getElementById("search_item").value.toUpperCase();
    const recipes = document.querySelectorAll(".card");

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector('h3');
        if (recipeName) {
            const textValue = recipeName.textContent || recipeName.innerHTML;
            if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                recipe.style.display = "";
            } 
            else {
                recipe.style.display = "none";
            }
        }
    });
}



// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelectorAll('.card').forEach(function(card) {
//         card.addEventListener('click', function() {
//             var recipeId = this.getAttribute('data-recipe-id');
//             var url = '/recipe/' + recipeId + '/';

//             var xhr = new XMLHttpRequest();
//             xhr.open('GET', url);

//             xhr.onload = function() {
//                 if (xhr.status === 200) {
//                     var data = JSON.parse(xhr.responseText);
//                     document.querySelector('.recipe-name').textContent = data.name;
//                     document.querySelector('#recipe_image').src = data.image;
//                     document.querySelector('.Total').textContent = data.prep_time + data.cook_time;
//                     document.querySelector('.Preparation').textContent = data.prep_time;
//                     document.querySelector('.Cooking').textContent = data.cook_time;

//                     var ingredientsList = document.querySelector('.Ingrediants');
//                     ingredientsList.innerHTML = '';
//                     data.ingredients.forEach(function(ingredient) {
//                         var li = document.createElement('li');
//                         li.innerHTML = '<p>' + ingredient + '</p>';
//                         ingredientsList.appendChild(li);
//                     });

//                     var stepsList = document.querySelector('.Steps');
//                     stepsList.innerHTML = '';
//                     data.steps.forEach(function(step) {
//                         var li = document.createElement('li');
//                         li.innerHTML = '<p>' + step + '</p>';
//                         stepsList.appendChild(li);
//                     });

//                     document.querySelector('.Fats').textContent = data.fats;
//                     document.querySelector('.Calories').textContent = data.calories;
//                     document.querySelector('.Protiens').textContent = data.protein;
//                 } else {
//                     console.error('Request failed. Status:', xhr.status);
//                 }
//             };

//             xhr.send();
//         });
//     });
// });
