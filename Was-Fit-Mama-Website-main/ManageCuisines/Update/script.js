document.getElementById("updateCuisineForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var cuisineName = document.getElementById("CuisineName").value.trim();
    var newCuisineName = document.getElementById("CuisineNew").value.trim();
    var description = document.getElementById("description").value.trim();
    var cuisineImage = document.getElementById("CuisineImage").files[0];
    
    
    var cuisines = JSON.parse(localStorage.getItem('cuisines')) || [];
    
    var cuisineToUpdate = cuisines.find(function(cuisine) {
        return cuisine.name === cuisineName;
    });
    
    if (!cuisineToUpdate) {
        document.getElementById("confirmMessage").textContent = "Cuisine not found";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if ( newCuisineName === "" && description === "" && !cuisineImage)  {
        document.getElementById("confirmMessage").textContent = "Please provide at least one update";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if (cuisines.some(cuisine => cuisine.name === newCuisineName)) {
        document.getElementById("confirmMessage").textContent = "New name already exists. Please choose a different one.";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }
    
    cuisineToUpdate.name = newCuisineName || cuisineToUpdate.name;
    cuisineToUpdate.description = description || cuisineToUpdate.description;
    if (cuisineImage) {
        var reader = new FileReader();
        reader.onload = function(event) {
            cuisineToUpdate.image = event.target.result;
            localStorage.setItem('cuisines', JSON.stringify(cuisines));

        };
        reader.readAsDataURL(cuisineImage);
    } 
    else {
        localStorage.setItem('cuisines', JSON.stringify(cuisines));
    }

    document.getElementById("confirmMessage").textContent = "Cuisine updated successfully";
    document.getElementById("confirmMessage").style.color = "green";
});
