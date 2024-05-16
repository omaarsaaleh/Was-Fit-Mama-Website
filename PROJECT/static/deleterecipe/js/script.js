function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 



document.getElementById('deleteRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var recipeName = document.getElementById('recipeName').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deleterecipe/', true);
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

    xhr.send(JSON.stringify({ name: recipeName }));
});
