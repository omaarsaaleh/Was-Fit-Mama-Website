document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('p');
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

const logo = document.getElementById('logo');

logo.addEventListener('click', function() {
    window.location.href = '../../Home_page/Home Page.html'; 
});




const passwordInput = document.getElementById('p');
let pass = '';
passwordInput.addEventListener("input", function() {
    pass =  this.value;
});

const mailInput = document.getElementById('m');
let mail = '';

mailInput.addEventListener('input', function() {
    mail = this.value;
});




function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];


    let foundUser = users.find(user => user.email === mail && user.pass === pass);

    if (foundUser) {
        localStorage.setItem("logged", true);
        alert("Logged in!");
        window.location = "../../Home_page/Home Page.html";
    } else {
        localStorage.setItem("logged", false);
        document.getElementById("statusMSG").innerText = "Invalid email or password. Please try again.";
        document.getElementById("statusMSG").style.color = "red";
    }
}
