
function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage"); 
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 


document.getElementById('CuisineForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var cuisineName = document.getElementById('CuisineName').value;
    var description = document.getElementById('description').value;
    var cuisineImage = document.getElementById('CuisineImage').files[0];

    if (!cuisineImage) {
        displayMessage('Please upload an image!','error');
        return;
    }
    if (!cuisineName || !description) {
        displayMessage('All Fields are required!','error');
        return;
    }

    var formData = new FormData();
    
    formData.append('name', cuisineName );    
    formData.append('disc', description);
    formData.append('image', cuisineImage); 

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/addcuisine/', true);
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        displayMessage(response.status_message, response.message_class);
        
    };
    xhr.onerror = function() {
        displayMessage("Request Failed, Please try again later." , 'error');
    };
    xhr.send(formData);
    
    
});

document.getElementById('CuisineImage').addEventListener('change', function(event) {
    var cuisineImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + cuisineImage.name;
});
