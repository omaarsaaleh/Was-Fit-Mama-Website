function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 

document.getElementById("updateOccassionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var occasionName = document.getElementById("OccassionName").value.trim();
    var newOccasionName = document.getElementById("OccassionNew").value.trim();
    var description = document.getElementById("description").value.trim();
    var occasionImage = document.getElementById("OccassionImage").files[0];

    if (newOccasionName === "" && description === "" && !occasionImage)  {
        displayMessage("Please provide at least one update", "error");
        return;
    }

    var formData = new FormData();
    if(occasionName) formData.append('name', occasionName);
    else {displayMessage('Please Provide a Occasion Name!', 'error');  return;}  
    
    if(!newOccasionName && !description && !occasionImage){
        displayMessage('Please Provide at least one paramter to update!', 'error');  return;
    }

    if(newOccasionName) formData.append('newname', newOccasionName) 
    if(description) formData.append('disc', description);
    if(occasionImage) formData.append('image', occasionImage);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/updateoccasion/', true);
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


document.getElementById('OccassionImage').addEventListener('change', function(event) {
    var Image = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + Image.name;
});
  