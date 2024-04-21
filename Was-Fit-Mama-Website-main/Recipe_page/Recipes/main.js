function createCard(name, dis, img, idx ) {

    const card = document.createElement('div');
    card.className = 'card';

    const front = document.createElement('div');
    front.className = 'front';


    const image = document.createElement('img');
    image.src = img;
    image.id = 'image1';
    image.alt = '';
    front.appendChild(image);

    const back = document.createElement('div');
    back.className = 'back';

    const title = document.createElement('h3');
    title.textContent = name;

    const description = document.createElement('p');
    description.textContent = dis;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button_';

    const button = document.createElement('button');
    button.className = 'button-85';

    const link = document.createElement('a');
    link.href = `../Recipe/rp${idx}.html`;
    link.textContent = 'Recipe';

    button.appendChild(link);
    buttonContainer.appendChild(button);

    const divNum = document.createElement('div');

    back.appendChild(title);
    back.appendChild(description);
    back.appendChild(buttonContainer);
    back.appendChild(divNum);

    card.appendChild(front);
    card.appendChild(back);

    let x = document.getElementById("all_recipe");

    x.appendChild(card);


}

let lista = JSON.parse(localStorage.getItem("recipes"));

for (let i = 0; i < lista.length;i++ ) {
    let r = lista[i];
    createCard(r.name, r.description, r.image, i);
}




