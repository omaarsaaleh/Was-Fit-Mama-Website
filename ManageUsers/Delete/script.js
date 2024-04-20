const submitButton = document.getElementById('submitButton') ;

// Event handler for EMAIL
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email_ele = document.getElementById('email');
let war3 = document.getElementById("emailMessage");

email_ele.addEventListener('input', function() {
    
    if (emailRegex.test( email_ele.value)) {
        email_ele.style.borderColor = "green";
        war3.innerText = ""; 
        submitButton.removeAttribute("disabled");
    }
    else{ 
        email_ele.style.borderColor = "red";
        war3.style.color = "red";
        war3.innerText = "Please enter a valid email."
        submitButton.setAttribute("disabled","disabled");
    }
});


const modal = document.getElementById('modal');
const background = document.getElementById('background');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const confirmationMessage = document.getElementById('confirmationMessage');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (emailRegex.test(email_ele.value)) {
        confirmationMessage.textContent = `Are you sure you want to delete ${email_ele.value} permanently?`;
        background.style.display = 'block';
        modal.style.display = 'block';
    }
});

cancelButton.addEventListener('click', function() {
    modal.style.display = 'none';
    background.style.display = 'none';
});

confirmButton.addEventListener('click', function() {
    modal.style.display = 'none';
    background.style.display = 'none';
    // DELETE HERE
});

