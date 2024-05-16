
function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage"); 
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 


document.getElementById('OccassionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var OccassionName = document.getElementById('OccassionName').value;
    var description = document.getElementById('description').value;
    var OccassionImage = document.getElementById('OccassionImage').files[0];

    if (!OccassionImage) {
        displayMessage('Please upload an image!','error');
        return;
    }
    if (!OccassionName || !description) {
        displayMessage('All Fields are required!','error');
        return;
    }

    var formData = new FormData(); 
    
    formData.append('name', OccassionName );    
    formData.append('disc', description);
    formData.append('image', OccassionImage); 

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/addoccasion/', true);
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
    var OccassionImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + OccassionImage.name;
});
