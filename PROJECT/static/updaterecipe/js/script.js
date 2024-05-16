function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 


document.getElementById("updateRecipeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var recipeName = document.getElementById("recipeName").value.trim();
    var newRecipeName = document.getElementById("recipeNew").value.trim();
    var newCuisine = document.getElementById("cuisineNew").value.trim();
    var newOccasion = document.getElementById("occasionNew").value.trim();
    var description = document.getElementById("description").value.trim();
    var recipeImage = document.getElementById("recipeImage").files[0];
    
    var formData = new FormData();
    if(recipeName) formData.append('name', recipeName);
    else {displayMessage('Please Provide a Recipe Name!', 'error');  return;}  
    
    if(!newRecipeName && !newCuisine && !newOccasion && !description && !recipeImage){
        displayMessage('Please Provide at least one paramter to update!', 'error');  return;
    }

    if(newRecipeName) formData.append('newname', newRecipeName) 
    if(newCuisine) formData.append('cusine', newCuisine);  
    if(newOccasion) formData.append('ocasion', newOccasion);
    if(description) formData.append('disc', description);
    if(recipeImage) formData.append('image', recipeImage);

    

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/updaterecipe/', true);
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 500) {
            var response = JSON.parse(xhr.responseText);
            displayMessage(response.status_message, response.message_class);
        }
        else{
            displayMessage(xhr.status, 'error');
        }
    };
    xhr.onerror = function() {
        displayMessage("Request Failed, Please try again later." , 'error');
    };
    xhr.send(formData);
});


document.getElementById('recipeImage').addEventListener('change', function(event) {
    var recipeImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + recipeImage.name;
});
  