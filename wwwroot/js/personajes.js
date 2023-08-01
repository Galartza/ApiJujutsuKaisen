// Variables globales para almacenar los personajes
let charactersData = [];

//Obtener personajes de la API y mostrarlos en el contenedor
function obtenerPersonajes() {
    return fetch('https://localhost:7010/api/Personajes')
        .then(respuesta => respuesta.json())
        .then(data => {
            charactersData = data; // Almacenar los personajes en la variable global
            return data;
        })
        .catch(error => {
            console.error("No se pudo acceder a la API", error);
            return [];
        });
}

function mostrarPersonajes(data) {
    const container = document.getElementById('characterCards');
    if (!container) {
        console.error('El elemento "characterCards" no se encontró en el HTML');
        return;
    }

    // Limpia el contenido actual del contenedor para evitar duplicados
    container.innerHTML = '';

    data.slice(0, 9).forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("div");
    card.classList.add("col-sm-4");


    const cardContent = document.createElement("div");
    cardContent.classList.add("card", "mb-3");
    cardContent.style.height = "20rem";

    const image = document.createElement("img");
    image.src = character.rutaImagen;
    image.alt = character.nombre;
    image.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const name = document.createElement("h4");
    name.textContent = character.nombre;
    name.classList.add("card-title");

    const age = document.createElement("p");
    age.textContent = `Edad: ${character.edad}`;
    age.classList.add("card-text");
    age.style.fontWeight = ('600');

    // const abilities = document.createElement("p");
    // abilities.textContent = `Habilidades: ${character.habilidades}`;
    // abilities.classList.add("card-text");

    // const description = document.createElement("p");
    // description.textContent = `Descripción: ${character.descripcion}`;
    // description.classList.add("card-text");

    cardBody.appendChild(name);
    cardBody.appendChild(age);
    // cardBody.appendChild(abilities);
    // cardBody.appendChild(description);

    cardContent.appendChild(image);
    cardContent.appendChild(cardBody);

    // Agrega un evento click para mostrar el modal cuando se haga clic en la card
    cardContent.addEventListener("click", () => mostrarModal(character));

    card.appendChild(cardContent);

    return card;
}

function buscarPersonaje() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    if (searchInput === "") {
        console.error("Ingresa un nombre de personaje para buscar.");
        return;
    }

    const foundCharacter = charactersData.find(character =>
        character.nombre.toLowerCase() === searchInput
    );

    if (foundCharacter) {
        mostrarModal(foundCharacter);
    } else {
        console.error("No se encontró ningún personaje con ese nombre.");
    }
}

function mostrarModal(character) {
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    if (!modalTitle || !modalContent) {
        console.error('Los elementos "modalTitle" o "modalContent" no se encontraron en el HTML');
        return;
    }

    modalTitle.textContent = character.nombre;
    modalContent.innerHTML = `
        <p>Edad: ${character.edad}</p>
        <p>Habilidades: ${character.habilidades}</p>
        <p>Descripción: ${character.descripcion}</p>
        <img src="${character.rutaImagen}" alt="${character.nombre}" class="img-fluid">
    `;

    const characterModal = document.getElementById("characterModal");
    if (!characterModal) {
        console.error('El elemento "characterModal" no se encontró en el HTML');
        return;
    }

    characterModal.style.display = "block";
}

function cerrarModal() {
    const characterModal = document.getElementById("characterModal");
    if (characterModal) {
        characterModal.style.display = "none";
    }
}

obtenerPersonajes().then(mostrarPersonajes); // Llamada inicial para obtener los personajes al cargar la página