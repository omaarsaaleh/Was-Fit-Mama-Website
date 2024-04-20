
//Event handler for the passsword
let pass = '';

const pass_ele = document.getElementById('p');

let war = document.getElementById("c");


pass_ele.addEventListener('input', function() {
    pass = this.value;
    if (pass.length < 8) {
        war.style.color = "red";
        war.innerText = "Password must be 8 characters or more."
    }
    else  {
        
        war.style.color = "green";
        war.style.fontWeight = 'bold';
        war.innerText = "Valid password.";
    }
});
//Even handler for confirm password 
const cp_ele = document.getElementById('cp');
let cp = '';
let war2= document.getElementById("cc");

cp_ele.addEventListener('input', function() {
    cp = this.value;
    if (cp != pass) {
        war2.style.color = "red";
        war2.innerText = "Password doesn't match."
    }
    else {
        war2.style.color = "green";
        war2.style.fontWeight = 'bold';
        war2.innerText = "Matched!";
    }
});
    
