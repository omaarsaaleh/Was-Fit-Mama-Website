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

});



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailElements = document.querySelectorAll('.email');

emailElements.forEach(email_ele => {
    let war3 = email_ele.nextElementSibling; 

    email_ele.addEventListener('input', function() {
        if (emailRegex.test(email_ele.value)) {
            email_ele.style.borderColor = "green";
            war3.innerText = ""; 
        } else { 
            email_ele.style.borderColor = "red";
            war3.style.color = "red";
            war3.innerText = "Please enter a valid email.";
        }
    });
});




