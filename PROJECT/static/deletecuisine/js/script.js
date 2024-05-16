function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 


document.getElementById('deleteCuisineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var cuisineName = document.getElementById('cuisineName').value;
    document.getElementById('confirmationMessage').innerText = "Are you sure you want to delete " + cuisineName + " permanently?";
    document.getElementById('background').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    
    document.getElementById('confirmButton').addEventListener('click', function() {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/deletecuisine/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
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

        xhr.send(JSON.stringify({ name: cuisineName }));
        
        
        document.getElementById('background').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    });

    document.getElementById('cancelButton').addEventListener('click', function() {
        
        document.getElementById('background').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    });

    
    
});
