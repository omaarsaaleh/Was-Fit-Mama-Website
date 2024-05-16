function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 

document.getElementById("updateCuisineForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var cuisineName = document.getElementById("CuisineName").value.trim();
    var newCuisineName = document.getElementById("CuisineNew").value.trim();
    var description = document.getElementById("description").value.trim(); 
    var cuisineImage = document.getElementById("CuisineImage").files[0];

    if ( newCuisineName === "" && description === "" && !cuisineImage)  {
        displayMessage("Please provide at least one update", "error");
        return;
    }

    var formData = new FormData();
    if(cuisineName) formData.append('name', cuisineName);
    else {displayMessage('Please Provide a cuisine Name!', 'error');  return;}  
    
    if(!newCuisineName && !description && !cuisineImage){
        displayMessage('Please Provide at least one paramter to update!', 'error');  return;
    }

    if(newCuisineName) formData.append('newname', newCuisineName) 
    if(description) formData.append('disc', description);
    if(cuisineImage) formData.append('image', cuisineImage);

    

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/updatecuisine/', true);
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


document.getElementById('CuisineImage').addEventListener('change', function(event) {
    var Image = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + Image.name;
});
  