function createOccasionElement(imgSrc, name, description) {

    var occasionDiv = document.createElement("div");
    occasionDiv.classList.add("occasion");

    var occasionLink = document.createElement("a");
    occasionLink.href = "#";

    var occasionImg = document.createElement("img");
    occasionImg.src = imgSrc;

    var occasionName = document.createElement("h4");
    occasionName.textContent = name;

    var occasionDescription = document.createElement("p");
    occasionDescription.textContent = description;

    occasionLink.appendChild(occasionImg);
    occasionLink.appendChild(occasionName);
    occasionDiv.appendChild(occasionLink);
    occasionDiv.appendChild(occasionDescription);

    var contentDiv = document.querySelector(".content");
    contentDiv.appendChild(occasionDiv);
}


let lista = JSON.parse(localStorage.getItem("cuisines"));

for (let i = 0; i < lista.length;i++ ) {
    let r = lista[i];
    createOccasionElement(r.image, r.name, r.description);
}

const logo = document.getElementById('logo');
        
logo.addEventListener('click', function() {
  window.location.href = '../Home_page/Home Page.html'; 
});