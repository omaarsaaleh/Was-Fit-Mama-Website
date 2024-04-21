document.getElementById("updateOccassionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var OccassionName = document.getElementById("OccassionName").value.trim();
    var newOccassionName = document.getElementById("OccassionNew").value.trim();
    var description = document.getElementById("description").value.trim();
    var OccassionImage = document.getElementById("OccassionImage").files[0];
    
    
    var Occassions = JSON.parse(localStorage.getItem('Occassions')) || [];
    
    var OccassionToUpdate = Occassions.find(function(Occassion) {
        return Occassion.name === OccassionName;
    });
    
    if (!OccassionToUpdate) {
        document.getElementById("confirmMessage").textContent = "Occassion not found";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if ( newOccassionName === "" && description === "" && !OccassionImage)  {
        document.getElementById("confirmMessage").textContent = "Please provide at least one update";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }

    if (Occassions.some(Occassion => Occassion.name === newOccassionName)) {
        document.getElementById("confirmMessage").textContent = "New name already exists. Please choose a different one.";
        document.getElementById("confirmMessage").style.color = "red";
        return;
    }
    
    OccassionToUpdate.name = newOccassionName || OccassionToUpdate.name;
    OccassionToUpdate.description = description || OccassionToUpdate.description;
    if (OccassionImage) {
        var reader = new FileReader();
        reader.onload = function(event) {
            OccassionToUpdate.image = event.target.result;
            localStorage.setItem('Occassions', JSON.stringify(Occassions));

        };
        reader.readAsDataURL(OccassionImage);
    } 
    else {
        localStorage.setItem('Occassions', JSON.stringify(Occassions));
    }

    document.getElementById("confirmMessage").textContent = "Occassion updated successfully";
    document.getElementById("confirmMessage").style.color = "green";
});
