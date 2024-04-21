function isFound(OccassionName) {
    var Occassions = JSON.parse(localStorage.getItem('Occassions')) || [];
    var index = Occassions.findIndex(Occassion => Occassion.name === OccassionName);
    return index !== -1;
}

function deleteOccassion(OccassionName) {
    var Occassions = JSON.parse(localStorage.getItem('Occassions')) || [];
    var updatedOccassions = Occassions.filter(Occassion => Occassion.name !== OccassionName);
    localStorage.setItem('Occassions', JSON.stringify(updatedOccassions));
}

document.getElementById('deleteOccassionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var OccassionName = document.getElementById('OccassionName').value;

    if (isFound(OccassionName)) {
        
        document.getElementById('confirmationMessage').innerText = "Are you sure you want to delete " + OccassionName + " permanently?";
        document.getElementById('background').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
        
        document.getElementById('confirmButton').addEventListener('click', function() {
            

            deleteOccassion(OccassionName);
            document.getElementById('OccassionNameMessage').style.color = 'green';
            document.getElementById('OccassionNameMessage').innerText = "Occassion deleted successfully.";
            
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });

        document.getElementById('cancelButton').addEventListener('click', function() {
            
            document.getElementById('background').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        });
    } 
    else {
        document.getElementById('OccassionNameMessage').style.color = 'red';
        document.getElementById('OccassionNameMessage').innerText = "Occassion not found.";
    }
});
