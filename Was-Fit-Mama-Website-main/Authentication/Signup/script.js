document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordField');
    const confirmPasswordInput = document.getElementById('confirmpField');
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

//Event handler for the passsword


const pass_ele = document.getElementById('passwordField');
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
        war.style.color = "green";
        war.innerText = "Valid password.";
    }
    
    else{
        correctPass = false;
        pass_ele.style.borderColor = "red";
        war.style.color = "red";
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


// Event handler for confirm password 

const cp_ele = document.getElementById('confirmpField');
let war2= document.getElementById("confirmpMessage");

cp_ele.addEventListener('input', function() {
    cp = this.value;
    if (cp != pass || cp.length==0) {
        matchingPass = false;
        cp_ele.style.borderColor = "red";
        war2.style.color = "red";
        war2.innerText = "Password doesn't match."
    }
    else {
        matchingPass = true ;
        cp_ele.style.borderColor = "green";
        war2.style.color = "green";
        war2.innerText = "Matched!";

    }

    validateForm();
});


// Event handler for EMAIL
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
        war3.style.color = "red";
        war3.innerText = "Please enter a valid email."

    }
    validateForm();
});

const logo = document.getElementById('logo');

logo.addEventListener('click', function() {
    window.location.href = '../../Home_page/Home Page.html'; 
});


class User {
    constructor(username, email, pass) {
        this.username = username;
        this.email = email;
        this.pass = pass;
    }
}

function signup(event) {
    event.preventDefault();
    
    let email = email_ele.value;
    let pass = pass_ele.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        document.getElementById("statusMSG").innerText = "This email is already in use. Please try to sign in or use a different email.";
        document.getElementById("statusMSG").style.color = "red";        
        return;
    }

    let newUser = new User(document.getElementById("Username").value, email, pass);

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // alert("Signup Successful, You Can Login Now!");
    document.getElementById("statusMSG").innerText = "Signup Successful, You Can Login Now!";
    document.getElementById("statusMSG").style.color = "green";
    setTimeout(function() {
        window.location.href = '../Signin/Signin.html';
    }, 3000);
}
