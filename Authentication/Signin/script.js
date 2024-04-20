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
