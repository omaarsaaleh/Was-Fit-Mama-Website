
// name
function displayMessage(message, messageClass) {
    var messageElement = document.getElementById("statusMessage");
    messageElement.textContent = message;
    messageElement.className = messageClass;
} 

 

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
        
        // send ajax request

        const newName = nameField.value;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/myprofile/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        xhr.setRequestHeader('X-CSRFToken', csrftoken);


        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById('name').innerText = nameField.value ;
                displayMessage(response.status_message, response.message_class);
            } 
            else {
                displayMessage("error"+xhr.statusText, 'error');
            }
        };
        xhr.onerror = function() {
            displayMessage("Request Failed, Please try again later." , 'error');
        };
        xhr.send(JSON.stringify({ new_name: newName }));
    }
});


// email

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailEditIcon = document.getElementById('NewEmailIcon');
EmailEditIcon.addEventListener('click', function() {
    
    const EmailField = document.getElementById("EmailField");

    if(EmailEditIcon.firstElementChild.innerHTML==='edit'){    
        EmailEditIcon.firstElementChild.innerHTML = 'check';
        EmailField.removeAttribute('readonly');
    }
    else{
        // if(EmailField.value === oldEmail){
        //     EmailEditIcon.firstElementChild.innerHTML = 'edit';
        //     EmailField.setAttribute('readonly','readonly');
        // }
        // else 
        if(!emailRegex.test( EmailField.value)){
            document.getElementById("statusMessage").innerText = "Please enter a valid email!";
            document.getElementById("statusMessage").className = 'error' ;
        } 
        else{

            const newEmail = EmailField.value
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/myprofile/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            xhr.setRequestHeader('X-CSRFToken', csrftoken); 


            xhr.onload = function() {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    displayMessage(response.status_message, response.message_class);
                    EmailEditIcon.firstElementChild.innerHTML = 'edit';
                    EmailField.setAttribute('readonly','readonly');
                } 
                else {
                    if(response) displayMessage(response.status_message, response.message_class);
                    else displayMessage(xhr.statusText, 'error');
                }
            };
            xhr.onerror = function() {
                displayMessage("Request Failed, Please try again later." , 'error');
            };
            xhr.send(JSON.stringify({ new_email: newEmail }));
        }


    }
        
    
});


// picture


document.getElementById('ChangeProfilePic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file){
        var formData = new FormData() ;
        formData.append('image', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/myprofile/', true);
        var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        xhr.setRequestHeader('X-CSRFToken', csrftoken); 
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayMessage(response.status_message, 'success');
            } 
            else {
                displayMessage('NOT DONE', 'error');
            }
        };
        xhr.send(formData);
    }
});

