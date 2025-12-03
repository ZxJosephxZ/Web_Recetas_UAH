//Los datos siguientes son de prueba

const usuarioo=
    {nombre: "Joseph", apellido: "Pajuelo", img: "../img/avatar.png"}
;
const usuario = JSON.parse(localStorage.getItem('user'));

const solicitudes = [
    { nombre: "Carlos Mendoza", img: "../img/avatar.png" },
    { nombre: "Ana Lucero", img: "../img/avatar.png" },
    { nombre: "Marta Ruiz", img: "../img/avatar.png" }
];
const contenedor = document.getElementById("solicitudesContainer");

function mostrarSolicitudes(lista) {
    contenedor.innerHTML = ""; 

    if (lista.length === 0) {
        contenedor.innerHTML = "<p> No tienes solicitudes de amistad</p>";
        return;
    }

    lista.forEach((solicitud, index) => {
        const card = document.createElement("div");
        card.classList.add("solicitud");

        card.innerHTML = `
            <img src="${solicitud.img}" alt="">
            <div class="info">
                <span>${solicitud.nombre}</span>
                <div class="acciones">
                    <button class="aceptar">Aceptar</button>
                    <button class="rechazar">Rechazar</button>
                </div>
            </div>
        `;

        // Eventos
        card.querySelector(".aceptar").addEventListener("click", () => {
            aceptarSolicitud(index);
        });

        card.querySelector(".rechazar").addEventListener("click", () => {
            rechazarSolicitud(index);
        });

        contenedor.appendChild(card);
    });
}

function aceptarSolicitud(index) {
    const user = solicitudes[index];
    console.log("Solicitud aceptada:", user.nombre);

    // Aquí luego llamarás al backend (fetch POST)
    solicitudes.splice(index, 1);
    mostrarSolicitudes(solicitudes);
}

function rechazarSolicitud(index) {
    const user = solicitudes[index];
    console.log("Solicitud rechazada:", user.nombre);

    // Igual, luego harás fetch DELETE
    solicitudes.splice(index, 1);
    mostrarSolicitudes(solicitudes);
}

mostrarSolicitudes(solicitudes);
if (usuario)
{
    document.querySelectorAll('[data-user="user_name"]').forEach(el => {
    el.textContent = usuario.firstName+ " "+ usuario.lastName;
});
}

const imgEdit = document.querySelector('.edit');
const nameEdit = document.querySelector('.nameEdit');

imgEdit.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = nameEdit.textContent;
    input.classList.add("edit-input");

    nameEdit.textContent = "";
    nameEdit.appendChild(input);
    input.focus();

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
        {
            const nuevoNombre = input.value.trim();
            if (nuevoNombre !== "")
            {
                nameEdit.textContent = nuevoNombre;

                const usuario = JSON.parse(localStorage.getItem("user") || {});
                usuario.firstName = nuevoNombre.split(" ")[0];
                usuario.lastName = nuevoNombre.split(" ")[1] || {};
                localStorage.setItem("user", JSON.stringify(usuario));
                document.querySelectorAll('[data-user="user_name"]').forEach(el => {
                    el.textContent = usuario.firstName + " " + usuario.lastName;});
            }
            else
            {
                nameEdit.textContent = usuario.firstName+" "+usuario.lastName;
            }
        }
    });
    input.addEventListener("blur", () => {
        nameEdit.textContent = input.value.trim() || (usuario.firstName+" "+usuario.lastName);
    });

});


const amigos=[
    {nombre: "Ana Ruiz", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Jane Duo", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Carlos Perez", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../img/avatar.png"},
];
const desconocidos=[
    {nombre: "X", mensaje: "X", img:"../img/avatar.png"},
    {nombre: "jorge", mensaje: "Y", img:"../img/avatar.png"},
    {nombre: "Z", mensaje: "Z", img:"../img/avatar.png"},
];
const container = document.getElementById("friendContainer");
const searchInput = document.getElementById("searchInput");

document.querySelectorAll('[data-user="user_image"]').forEach(el => {
    el.textContent = usuarioo.img;
});

const messageContainer = document.getElementById('messageContainer');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('SendBTN');

function agregarMensaje(texto, esPropio = false)
{
    const div = document.createElement('div');
    div.classList.add('message');
    if (esPropio) div.classList.add('own');
    const hora = new Date().toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
    if (esPropio)
    {
        div.innerHTML = `
            <div class="texts">
            <p>${texto}</p>
            <span>${hora}</span>
            </div>`;
    }else{
        div.innerHTML = `
        <img src ="../img/avatar.png" alt="">
        <div class="texts">
        <p>${texto}</p>
        <span>${hora}</span>
        </div>`;
    }
    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto === '') return;

  agregarMensaje(texto, true); // el usuario envía
  input.value = '';

  // Simular respuesta del otro usuario (solo para demo)
  setTimeout(() => {
    agregarMensaje("Recibido 👍", false);
  }, 1000);
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

function mostrarAmigos(lista)
{
    container.innerHTML = "";
    if (lista.length === 0)
    {
        container.innerHTML= `<p>No se encontraron resultados</p>`;
        return;
    }
    lista.forEach(amigo => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML= `
        <img src="${amigo.img}" alt="">
        <div class="texts">
        <span>${amigo.nombre}</span>
        <p>${amigo.mensaje}</p>
        </div>`;
        //Mostrar los datos onclik
        item.addEventListener("click", () => {
            actualizarPanelChat(amigo);
        });
        container.appendChild(item);
    });
}

//Funcion de actualizado de panel
function actualizarPanelChat(amigo)
{
    document.querySelector('[data-user="amigo_name"]').textContent = amigo.nombre;
    document.querySelector('[data-user="amigo_mensaje"]').textContent = amigo.mensaje;
    document.querySelector('[data-user="amigo_img"]').textContent = amigo.img;
    actualizarBotonSolicitud(amigo.nombre);
}

mostrarAmigos(amigos);


searchInput.addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = amigos.filter(a =>
        a.nombre.toLowerCase().includes(texto)
    );

    if (texto.trim() === "")
    {
        mostrarAmigos(amigos);
        return;
    }
    if (filtrados.length === 0)
    {
        try{
            //const rep = await fetch(``);
            //const data = await rep.json();
            //cambiar desconocidos por data cuando el servidor este operativo
            if (desconocidos.length > 0)
            {
                mostrarAmigos(desconocidos);
            }else
            {
                container.innerHTML=`<p>No se encontro ningun usuario</p>`;
            }
        }
        catch (err){
            console.err("Error al buscar en la bse de datos");
            container.innerHTML=`<p>Error al buscar usuarios</p>`;
        }
          
    }else{
            mostrarAmigos(filtrados);
        } 

    
});





// Cuando clickeas "Enviar solicitud"
btnSolicitud.addEventListener("click", () => {

    const nombreActual = document.querySelector('[data-user="amigo_name"]').textContent.trim();

    let solicitudesEnviadas = JSON.parse(localStorage.getItem("solicitudesEnviadas")) || [];

    if (!solicitudesEnviadas.includes(nombreActual)) {
        solicitudesEnviadas.push(nombreActual);
        localStorage.setItem("solicitudesEnviadas", JSON.stringify(solicitudesEnviadas));
    }

    btnSolicitud.style.display = "none";
    alert("Solicitud enviada a " + nombreActual);
});

function actualizarBotonSolicitud(nombreUsuario) {

    const btnSolicitud = document.getElementById("btnSolicitud");

    let solicitudesEnviadas = JSON.parse(localStorage.getItem("solicitudesEnviadas")) || [];

    // Verificar si ya es amigo
    const esAmigo = amigos.some(a => a.nombre === nombreUsuario);

    if (esAmigo) {
        btnSolicitud.style.display = "none";
        return;
    }

    if (solicitudesEnviadas.includes(nombreUsuario)) {
        btnSolicitud.style.display = "none";
        return;
    }

    // Si no es amigo ni tiene solicitud enviada → mostrar
    btnSolicitud.style.display = "inline";
}