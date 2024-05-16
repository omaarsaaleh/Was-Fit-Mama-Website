document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const visibilityToggle = document.getElementById('visibility-toggle');
  
    visibilityToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; 
            visibilityToggle.textContent = 'visibility'; 
        } 
      
        else {
            passwordInput.type = 'password';
            visibilityToggle.textContent = 'visibility_off'; 
        }
    });
}); 

// const logo = document.getElementById('logo');

// logo.addEventListener('click', function() {
//     window.location.href = '../../Home_page/Home Page.html'; 
// });





document.getElementById('submitButton').addEventListener('click', function(e) {
    e.preventDefault(); 

    var formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };


    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signin/'); 
    
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken); // Set CSRF token in request header
    
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                displayMessage("Logged in Successfully!", "success");
                window.location.href='/';
            }   
            else {
                var response = JSON.parse(xhr.responseText); 
                displayMessage(response.status_message, 'error');
            }
        }
    };
    
    xhr.onerror = function() {
        displayMessage('Network Error occurred', 'error');
    };

    xhr.send(JSON.stringify(formData));
});

function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
}
