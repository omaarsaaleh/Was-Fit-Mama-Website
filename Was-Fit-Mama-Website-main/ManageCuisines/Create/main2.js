document.getElementById('CuisineForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var cuisineName = document.getElementById('CuisineName').value;
    var description = document.getElementById('description').value;
    var cuisineImage = document.getElementById('CuisineImage').files[0];

    if (!cuisineImage) {
        document.getElementById('CuisineMessage').style.color = 'red';
        document.getElementById('CuisineMessage').innerText = "Please upload an image.";
        return;
    }

    var cuisines = JSON.parse(localStorage.getItem('cuisines')) || [];
    if (cuisines.some(cuisine => cuisine.name === cuisineName)) { 
        document.getElementById('CuisineMessage').style.color = 'red';
        document.getElementById('CuisineMessage').innerText = "Cuisine with the same name already exists.";
        return; 
    }
    var reader = new FileReader();
    reader.onload = function(event) {
        cuisines.push({
            name: cuisineName,
            image: event.target.result,  
            description : description
        });

        localStorage.setItem('cuisines', JSON.stringify(cuisines));
        document.getElementById('CuisineMessage').style.color = 'green';
        document.getElementById('CuisineMessage').innerText = "Cuisine added successfully.";
    };
    reader.readAsDataURL(cuisineImage);
});

document.getElementById('CuisineImage').addEventListener('change', function(event) {
    var cuisineImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + cuisineImage.name;
});
