document.addEventListener('DOMContentLoaded', function() {
    var recipeName = document.querySelector('.recipe-name').getAttribute('data-recipe-name');
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/get_recipe_details/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken); // Set CSRF token in request header
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            
            document.getElementById('recipe-image').src = data.image;
            document.querySelector('.Total').textContent = data.cook_time + data.prep_time + ' min';
            document.querySelector('.Preparation').textContent = data.prep_time + ' min';
            document.querySelector('.Cooking').textContent = data.cook_time + ' min';
            
            var ingredientsList = '';
            var ingredients = data.ingreds.split(':');
            ingredients.forEach(function(ingredient) {
                ingredientsList += '<li>' + ingredient + '</li>';
            });
            document.querySelector('.Ingrediants').innerHTML = ingredientsList;
            
            var stepsList = '';
            var steps = data.steps.split(':');
            steps.forEach(function(step) {
                stepsList += '<li>' + step + '</li>';
            });
            document.querySelector('.Steps').innerHTML = stepsList;
            
            document.querySelector('.Fats').textContent = data.fats;
            document.querySelector('.Calories').textContent = data.calories;
            document.querySelector('.Protiens').textContent = data.protein;
            document.querySelector('.Carbs').textContent = data.carbs;
        }
        else if (xhr.readyState === 4) {
            console.error('Error: ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify({ 'name': recipeName }));
});