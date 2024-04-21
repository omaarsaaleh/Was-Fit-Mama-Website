document.getElementById('OccassionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var OccassionName = document.getElementById('OccassionName').value;
    var description = document.getElementById('description').value;
    var OccassionImage = document.getElementById('OccassionImage').files[0];

    if (!OccassionImage) {
        document.getElementById('OccassionMessage').style.color = 'red';
        document.getElementById('OccassionMessage').innerText = "Please upload an image.";
        return; 
    }

    var Occassions = JSON.parse(localStorage.getItem('Occassions')) || [];
    if (Occassions.some(Occassion => Occassion.name === OccassionName)) { 
        document.getElementById('OccassionMessage').style.color = 'red';
        document.getElementById('OccassionMessage').innerText = "Occassion with the same name already exists.";
        return; 
    }
    var reader = new FileReader();
    reader.onload = function(event) {
        Occassions.push({
            name: OccassionName,
            image: event.target.result,  
            description : description
        });

        localStorage.setItem('Occassions', JSON.stringify(Occassions));
        document.getElementById('OccassionMessage').style.color = 'green';
        document.getElementById('OccassionMessage').innerText = "Occassion added successfully.";
    };
    reader.readAsDataURL(OccassionImage);
});

document.getElementById('OccassionImage').addEventListener('change', function(event) {
    var OccassionImage = event.target.files[0];
    
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Uploaded IMG: ' + OccassionImage.name;
});
