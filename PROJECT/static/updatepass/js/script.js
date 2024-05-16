var correctPass = false ;
var matchingPass = false ;

const submitButton = document.getElementById('SumbitButton') ;

function validateForm() {
    if ( correctPass && matchingPass)
        submitButton.removeAttribute("disabled");
    else
        submitButton.setAttribute("disabled","disabled");
}


const digitRegex = /^(?=.*\d)/;
const lowercaseRegex = /^(?=.*[a-z])/;
const uppercaseRegex = /^(?=.*[A-Z])/;
const lengthRegex = /^.{8,20}$/;

const NewPassField = document.getElementById('NewPass');
let MSG = document.getElementById("passwordMessage");
var pass

NewPassField.addEventListener('input', function() {
    pass = this.value;
    
    if ((digitRegex.test(pass) && 
    lowercaseRegex.test(pass) && 
    uppercaseRegex.test(pass) && 
    lengthRegex.test(pass)))  {
        
        correctPass = true;
        NewPassField.style.borderColor = "green";
        MSG.style.color = "green";
        MSG.innerText = "Valid password.";
    }
    
    else{
        correctPass = false;
        NewPassField.style.borderColor = "red";
        MSG.style.color = "red";
        if (!lengthRegex.test(pass))
            MSG.innerText = "Password must be between 8 and 20 characters long."
        
        else if(!lowercaseRegex.test(pass))
            MSG.innerText = "Password must contain at least one lowercase letter."

        else if( !digitRegex.test(pass))
            MSG.innerText = "Password must contain at least one digit."

        else if(!uppercaseRegex.test(pass)) 
            MSG.innerText = "Password must contain at least one uppercase letter."

    }

    validateForm();

});

const ConfirmNewPassField = document.getElementById('ConfirmNewPass');
let MSG2= document.getElementById("ConfirmPasswordMessage");

ConfirmNewPassField.addEventListener('input', function() {
    cp = this.value;
    if (cp != pass || cp.length==0) {
        matchingPass = false;
        ConfirmNewPassField.style.borderColor = "red";
        MSG2.style.color = "red";
        MSG2.innerText = "Password doesn't match."
    }
    else {
        matchingPass = true ;
        ConfirmNewPassField.style.borderColor = "green";
        MSG2.style.color = "green";
        MSG2.innerText = "Matched!";

    }

    validateForm(); 
});


function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMSG");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 


document.getElementById('ProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const oldpass = document.getElementById("OldPass").value;
    const NewPass = document.getElementById("NewPass").value;
    console.log(oldpass);
    console.log(NewPass);

    const xhr = new XMLHttpRequest(); 
    xhr.open('POST', '/updatepass/' , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken)
    ;
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
    xhr.send(JSON.stringify({ old_password: oldpass, new_password: NewPass}));

});



document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('OldPass');
    const visibilityToggle = document.getElementById('visibility-toggle1');
  
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

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('NewPass');
    const ConfirmPasswordInput = document.getElementById('ConfirmNewPass');
    const visibilityToggle = document.getElementById('visibility-toggle2');
  
    visibilityToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; 
            ConfirmPasswordInput.type = 'text';
            visibilityToggle.textContent = 'visibility'; 
        } 
      
        else {
            passwordInput.type = 'password';
            ConfirmPasswordInput.type = 'password'
            visibilityToggle.textContent = 'visibility_off'; 
        }
    });
}); 

