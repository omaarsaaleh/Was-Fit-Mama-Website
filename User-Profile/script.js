document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('Profileform');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var newUsername = document.getElementById('newUsername').value;
        var oldPassword = document.getElementById('oldPassword').value;
        var newPassword = document.getElementById('newPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var newEmail = document.getElementById('newEmail').value;
        var newImage = document.getElementById('newImage').files[0]; // Get the selected image file

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Update the username in the sidebar
        var usernameElement = document.querySelector('.profile h4');
        usernameElement.textContent = newUsername;

        // Update the user image in the sidebar
        if (newImage) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var profileImageElement = document.querySelector('.profile img');
                profileImageElement.src = e.target.result; // Set the source of the image to the base64 string
            };

            reader.readAsDataURL(newImage); // Convert the image to base64 string
        }

        // Create an object to store user data
        var userData = {
            username: newUsername,
            oldPassword: oldPassword,
            newPassword: newPassword,
            email: newEmail,
            profileImage: newImage ? newImage.name : null // Store the image name or null if no new image selected
        };

        // Convert the object to JSON string
        var userDataJSON = JSON.stringify(userData);

        // Store the data in local storage
        localStorage.setItem('userData', userDataJSON);

        // Optionally, you can redirect the user or show a success message
        alert("Profile updated successfully!");
    });
});
