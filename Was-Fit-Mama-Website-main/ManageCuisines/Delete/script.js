function isFound(cuisineName) {
    var cuisines = JSON.parse(localStorage.getItem('cuisines')) || [];
    var index = cuisines.findIndex(cuisine => cuisine.name === cuisineName);
    return index !== -1;
}

function deleteCuisine(cuisineName) {
    var cuisines = JSON.parse(localStorage.getItem('cuisines')) || [];
    var updatedCuisines = cuisines.filter(cuisine => cuisine.name !== cuisineName);
    localStorage.setItem('cuisines', JSON.stringify(updatedCuisines));
}

document.getElementById('deleteCuisineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var cuisineName = document.getElementById('cuisineName').value;

    if (isFound(cuisineName)) {
        
        document.getElementById('confirmationMessage').innerText = "Are you sure you want to delete " + cuisineName + " permanently?";
        document.getElementById('background').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
        
        document.getElementById('confirmButton').addEventListener('click', function() {
            

            deleteCuisine(cuisineName);
            document.getElementById('cuisineNameMessage').style.color = 'green';
            document.getElementById('cuisineNameMessage').innerText = "Cuisine deleted successfully.";
            
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });

        document.getElementById('cancelButton').addEventListener('click', function() {
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });
    } 
    else {
        document.getElementById('cuisineNameMessage').style.color = 'red';
        document.getElementById('cuisineNameMessage').innerText = "Cuisine not found.";
    }
});
