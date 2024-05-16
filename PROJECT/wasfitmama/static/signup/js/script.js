// ************************************************************
// password visibilty
// ************************************************************

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const visibilityToggle = document.getElementById('visibility-toggle');
  
    visibilityToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; 
            confirmPasswordInput.type = 'text'; 
            visibilityToggle.textContent = 'visibility'; 
        } 
      
        else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
            visibilityToggle.textContent = 'visibility_off'; 
        }
    });
});

// ************************************************************
// disable the form if the info is not valid 
// ************************************************************


var correctPass = false ;
var matchingPass = false ;
var correctEmail = false ;

const submitButton = document.getElementById('submitButton') ;


function validateForm() {
    if (correctEmail && correctPass && matchingPass)
        submitButton.removeAttribute("disabled");
    else
        submitButton.setAttribute("disabled","disabled");
}

// ************************************************************
//Event handler for the passsword
// ************************************************************


const pass_ele = document.getElementById('password');
let war = document.getElementById("passwordMessage");

const digitRegex = /^(?=.*\d)/;
const lowercaseRegex = /^(?=.*[a-z])/;
const uppercaseRegex = /^(?=.*[A-Z])/;
const lengthRegex = /^.{8,20}$/;


pass_ele.addEventListener('input', function() {
    pass = this.value;
    
    if ((digitRegex.test(pass) && 
    lowercaseRegex.test(pass) && 
    uppercaseRegex.test(pass) && 
    lengthRegex.test(pass)))  {
        
        correctPass = true;
        pass_ele.style.borderColor = "green";
        war.innerText = "";
    }
    
    else{
        correctPass = false;
        pass_ele.style.borderColor = "red";
        war.className = "error";
        if (!lengthRegex.test(pass))
            war.innerText = "Password must be between 8 and 20 characters long."
        
        else if(!lowercaseRegex.test(pass))
            war.innerText = "Password must contain at least one lowercase letter."

        else if( !digitRegex.test(pass))
            war.innerText = "Password must contain at least one digit."

        else if(!uppercaseRegex.test(pass)) 
            war.innerText = "Password must contain at least one uppercase letter."

    }

    validateForm();

});

// ************************************************************
// Event handler for confirm password 
// ************************************************************

const cp_ele = document.getElementById('confirmPassword');
let war2= document.getElementById("confirmpMessage");

cp_ele.addEventListener('input', function() {
    cp = this.value;
    if (cp != pass || cp.length==0) {
        matchingPass = false;
        cp_ele.style.borderColor = "red";
        war2.className = "error";
        war2.innerText = "Password doesn't match."
    }
    else {
        matchingPass = true ;
        cp_ele.style.borderColor = "green";
        war2.innerText = "";
    }

    validateForm();
});

// ************************************************************
// Event handler for EMAIL
// ************************************************************

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email_ele = document.getElementById('email');
let war3 = document.getElementById("emailMessage");

email_ele.addEventListener('input', function() {
    
    if (emailRegex.test( email_ele.value)) {
        correctEmail = true ;
        email_ele.style.borderColor = "green";
        war3.innerText = "";
    }
    else{ 
        correctEmail = false;
        email_ele.style.borderColor = "red";
        war3.className = "error";
        war3.innerText = "Please enter a valid email."

    }
    validateForm();
});

// ************************************************************
// post request on sumbit
// ************************************************************


document.getElementById("submitButton").addEventListener("click", function(event) {
        
    event.preventDefault(); // Prevent form submission    

    if (! document.getElementById("terms").checked) {
        document.getElementById("statusMessage").innerText = "You must accept our terms and policy";
        document.getElementById("statusMessage").className = "error";   
        return;
    }

    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        terms: document.getElementById("terms").checked,
        admin: document.getElementById("admin").checked
    };



    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken); // Set CSRF token in request header
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                
                displayMessage(response.status_message, response.message_class);
            }
            else  displayMessage(xhr.status, "error");    
        }
    };
    
    xhr.send(JSON.stringify(formData));
});


function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
}



// const logo = document.getElementById('logo');

// logo.addEventListener('click', function() {
//     window.location.href = '../../Home_page/Home Page.html'; 
// });

