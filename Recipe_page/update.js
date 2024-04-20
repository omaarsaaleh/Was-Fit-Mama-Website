const Search = () => {
    const searchbox = document.getElementById("search_item").value.toUpperCase();
    const recipes = document.querySelectorAll(".card");

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector('h3');
        if (recipeName) {
            const textValue = recipeName.textContent || recipeName.innerHTML;
            if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                recipe.style.display = "";
            } else {
                recipe.style.display = "none";
            }
        }
    });
}


function go_to_recipe_page(){
    var image = document.getElementById("image1").src;
    localStorage.setItem("image", image);
    window.location.hash = "recipe_page.html";
}



const logo = document.getElementById('logo');

logo.addEventListener('click', function() {
    window.location.href = '../Home_page/Home Page.html'; 
});
