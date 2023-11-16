// Variables globales para almacenar los personajes
let charactersData = [];

//Obtener personajes de la API y mostrarlos en el contenedor
 async function obtenerPersonajes() {
     try {
         const respuesta = await fetch('https://localhost:7010/api/Personajes');
         const data = await respuesta.json();
         charactersData = data; // Almacenar los personajes en la variable global
         return data;
     } catch (error) {
         console.error("No se pudo acceder a la API", error);
         return [];
     }
}
// const obtenerPersonajes = () =>
//     fetch('https://localhost:7010/api/Personajes')
//     .then(respuesta => respuesta.json())
//     .then(data => mostrarPersonajes(data))
//     .catch(error => console.error("No se pudo acceder a la api.", error));



function mostrarPersonajes(data) {
    const container = document.getElementById('characterCards');
    if (!container) {
        console.error('El elemento "characterCards" no se encontró en el HTML');
        return;
    }

    // Limpia el contenido actual del contenedor para evitar duplicados
    container.innerHTML = '';

    data.slice(0, 21).forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("div");
    card.classList.add("col-sm-4");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card", "mb-3");
    cardContent.style.height = "22rem";
    cardContent.style.cursor = "pointer";

    const image = document.createElement("img");
    image.src = character.rutaImagen;
    image.alt = character.nombre;
    image.classList.add("card-img-top");
    image.style.padding = ".5rem";
    image.style.height = "15rem";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const name = document.createElement("h5");
    name.textContent = character.nombre;
    name.classList.add("card-title");

    const age = document.createElement("p");
    age.textContent = `Edad: ${character.edad}`;
    age.classList.add("card-text");


    cardBody.appendChild(name);
    cardBody.appendChild(age);

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
        mostrarModal();
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

function mostrarPersonajesT(data) {
    const tbody = document.getElementById ('personajesTb');
    tbody.innerHTML = "";

    data.forEach(character => {
        let tr = tbody.insertRow();

        let id = document.createTextNode(character.id);
        let tdId = tr.insertCell(0);
        tdId.appendChild(id);
        tdId.id = "tdId";


        let nombre = document.createTextNode(character.nombre);
        let tdNombre = tr.insertCell(1);
        tdNombre.appendChild(nombre);
        tdNombre.id = "tdNombre";


        let edad = document.createTextNode(character.edad);
        let tdEdad = tr.insertCell(2);
        tdEdad.appendChild(edad);
        tdEdad.id = "tdEdad";


        let habilidades = document.createTextNode(character.habilidades);
        let tdHabilidades = tr.insertCell(3);
        tdHabilidades.appendChild(habilidades);
        tdHabilidades.id = "tdHabilidades";

        // Obtener el texto completo de habilidades
        let habilidadesCompleto = character.habilidades;

        // Definir la longitud máxima para mostrar
        let longitudMaxima = 25;
    
        // Truncar el texto si es necesario
        let habilidadesVisibles = habilidadesCompleto.length > longitudMaxima
            ? habilidadesCompleto.substring(0, longitudMaxima) + '...'
            : habilidadesCompleto;
    
        // Mostrar el texto truncado en la celda
        tdHabilidades.textContent = habilidadesVisibles;


        let descripcion = document.createTextNode(character.descripcion);
        let tdDescripcion = tr.insertCell(4);
        tdDescripcion.appendChild(descripcion);
        tdHabilidades.id = "tdDescripcion";


        let descripcionCompleta = character.descripcion;

        // Definir la longitud máxima para mostrar
        let longitudMaximaDescripcion = 70;

        // Truncar el texto si es necesario para descripción
        let descripcionVisible = descripcionCompleta.length > longitudMaximaDescripcion
            ? descripcionCompleta.substring(0, longitudMaximaDescripcion) + '...'
            : descripcionCompleta;

        // Mostrar el texto truncado en la celda de descripción
        tdDescripcion.textContent = descripcionVisible;


        let imagen = document.createElement('img');
        imagen.src = character.rutaImagen;
        imagen.style.height = "5rem";
        imagen.style.width = "8rem";
        let tdImagen = tr.insertCell(5);
        tdImagen.appendChild(imagen);

        let editar = document.createElement('button');
        let tdEditar = tr.insertCell(6);
        editar.title = "Editar producto";
        editar.style.width = "3.5rem";
        editar.style.height = "2rem";
        editar.style.border = "none"; 
        editar.style.borderRadius = "3px";
        editar.style.backgroundColor = "#ffee00";
        editar.setAttribute('onclick', `BuscarValorPersonaje(${character.id})`);
        tdEditar.appendChild(editar);   

        let iconEditar = document.createElement('i');
        iconEditar.classList.add('fa-solid', 'fa-pen-to-square');
        editar.appendChild(iconEditar);


        let eliminar = document.createElement('button');
        let tdEliminar = tr.insertCell(7);
        tdEliminar.appendChild(eliminar);
        eliminar.title = "Eliminar producto";
        eliminar.style.width = "3.5rem";
        eliminar.style.height = "2rem";
        eliminar.style.border = "none";
        eliminar.style.borderRadius = "3px"; 
        eliminar.style.backgroundColor = "red";

        let iconEliminar = document.createElement('i');
        iconEliminar.classList.add('fa-solid', 'fa-trash');
        eliminar.appendChild(iconEliminar);
    })
}

function agregarPersonaje() {
    var nuevoPersonaje = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        habilidades: document.getElementById('habilidades').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: document.getElementById('imagen').value,
    }
    fetch('https://localhost:7010/api/Personajes',
        {
            method: 'POST',
            headers: {
                'Acept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPersonaje)
        }
    )
    .then(respuesta => respuesta.json())
    .then(() => {
        document.getElementById('nombre').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('habilidades').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('imagen').value = "";
        $('#agregarPersonaje').modal('hide');
        obtenerPersonajes();
    })
    .catch(error => console.error("No se pudo insertar el nuevo producto", error));

    
}
function BuscarValorPersonaje(id) {
    fetch(`https://localhost:7010/api/Personajes/${id}`,{
         method: 'GET'
    })
    .then(respuesta => respuesta.json())
    .then( data => 
    {
         document.getElementById('idEditar').value = data.id;   
         document.getElementById('nombreEditar').value = data.nombre;
         document.getElementById('edadEditar').value = data.edad;
         document.getElementById('habilidadesEditar').value = data.habilidades;
         document.getElementById('descripcionEditar').value = data.descripcion;
         document.getElementById('imagenEditar').value = data.imagen;
         $('#editarPersonaje').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api.", error));
}

function EditarPersonaje() {
    let id = document.getElementById('idEditar').value;
    
    let editarPersonaje = {
        id: document.getElementById('idEditar').value,
        nombre: document.getElementById('nombreEditar').value,
        edad: document.getElementById('edadEditar').value,
        habilidades: document.getElementById('habilidadesEditar').value,
        descripcion: document.getElementById('descripcionEditar').value,
        imagen: document.getElementById('imagenEditar').value

    }

    fetch(`https://localhost:7010/api/Personajes/${id}`,
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(editarPersonaje)
    }
    )
    .then(() => {
        document.getElementById('idEditar').value = 0;
        document.getElementById('nombreEditar').value = "";
        document.getElementById('edadEditar').value = "";
        document.getElementById('habilidadesEditar').value = "";
        document.getElementById('descripcionEditar').value = "";
        document.getElementById('imagenEditar').value = "";
        $('#editarPersonaje').modal('hide');
        obtenerPersonajes();
    })
    .catch(error => console.error("No se pudo editar el personaje", error));
}


obtenerPersonajes().then(mostrarPersonajes); // Llamada inicial para obtener los personajes al cargar la página
obtenerPersonajes().then(mostrarPersonajesT);
