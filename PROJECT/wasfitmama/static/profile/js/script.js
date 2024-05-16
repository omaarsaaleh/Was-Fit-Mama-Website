var users = JSON.parse(localStorage.getItem('users'));
const CurrentUserEmail = localStorage.getItem('CurrentUser');
const CurrentUserDataIDX = users.findIndex(user => user.email === CurrentUserEmail);

// name

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("NameField").value = users[CurrentUserDataIDX].username;
    document.getElementById("EmailField").value = users[CurrentUserDataIDX].email;
    document.getElementById("name").innerText = users[CurrentUserDataIDX].username;
    if(users[CurrentUserDataIDX].image){
        document.getElementById("ProfilePic").src = users[CurrentUserDataIDX].image ;
        document.getElementById("ProfilePic1").src = users[CurrentUserDataIDX].image ;
    }
});

const NameEditIcon = document.getElementById('NewNameIcon');
NameEditIcon.addEventListener('click', function() {
    
    const nameField = document.getElementById("NameField");


    if(NameEditIcon.firstElementChild.innerHTML==='edit'){    
        NameEditIcon.firstElementChild.innerHTML = 'check';
        nameField.removeAttribute('readonly');

    }
    else{
        NameEditIcon.firstElementChild.innerHTML = 'edit';
        nameField.setAttribute('readonly','readonly');
        // change in local storage
        users[CurrentUserDataIDX].username = nameField.value ; 
        localStorage.setItem('users', JSON.stringify(users));
        // change in page
        document.getElementById("name").innerText = users[CurrentUserDataIDX].username;

    }
});

// email

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailEditIcon = document.getElementById('NewEmailIcon');
EmailEditIcon.addEventListener('click', function() {
    
    const EmailField = document.getElementById("EmailField");
    var oldEmail = CurrentUserEmail;

    if(EmailEditIcon.firstElementChild.innerHTML==='edit'){    
        EmailEditIcon.firstElementChild.innerHTML = 'check';
        EmailField.removeAttribute('readonly');
    }
    else{

        
        if(EmailField.value === oldEmail){
            EmailEditIcon.firstElementChild.innerHTML = 'edit';
            EmailField.setAttribute('readonly','readonly');
        }
        else if(!emailRegex.test( EmailField.value)){
            document.getElementById("statusMSG").innerText = "Please enter a valid email.";
            document.getElementById("statusMSG").style.color = "red";  
        }
        
        else if (users.some(user => user.email === EmailField.value) ){
            document.getElementById("statusMSG").innerText = "This email is already in use. Please try to use a different email.";
            document.getElementById("statusMSG").style.color = "red";        
        }    
        else{
            EmailEditIcon.firstElementChild.innerHTML = 'edit';
            EmailField.setAttribute('readonly','readonly');
            // change in local storage
            users[CurrentUserDataIDX].email = EmailField.value ; 
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('CurrentUser', EmailField.value);
            document.getElementById("statusMSG").innerText = "Email has been updated successfully";
            document.getElementById("statusMSG").style.color = "green"; 
        }
    }
});


// picture


document.getElementById('ChangeProfilePic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file){
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const image = e.target.result;
            users[CurrentUserDataIDX].image = image ;
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById("ProfilePic").src = users[CurrentUserDataIDX].image ;
            document.getElementById("ProfilePic1").src = users[CurrentUserDataIDX].image ;

        };
        reader.readAsDataURL(file);

    }
});

function logout() {
		
    localStorage.setItem("ADMIN", false);
    localStorage.setItem("logged", false);
    window.location = "../Home_page/Home Page.html";
}

let logged =localStorage.getItem("logged");
let admin = localStorage.getItem("ADMIN");

if (logged==="true" && admin === "true") {
    var elements = document.querySelectorAll('.AdminOnly');
    elements.forEach(function(element) {
        element.style.display = 'block';
    });
}