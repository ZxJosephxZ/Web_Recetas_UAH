//Los datos siguientes son de prueba

const usuarioo=
    {nombre: "Joseph", apellido: "Pajuelo", img: "../../../img/avatar.png"}
;

const amigos=[
    {nombre: "Ana Ruiz", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Jane Duo", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Carlos Perez", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../../../img/avatar.png"},
    {nombre: "Lucia Torrez", mensaje: "Hello", img:"../../../img/avatar.png"},
];
const desconocidos=[
    {nombre: "X", mensaje: "X", img:"../../../img/avatar.png"},
    {nombre: "jorge", mensaje: "Y", img:"../../../img/avatar.png"},
    {nombre: "Z", mensaje: "Z", img:"../../../img/avatar.png"},
];
const container = document.getElementById("friendContainer");
const searchInput = document.getElementById("searchInput");

const nameUser = document.getElementById("user1");
const imgUser= document.getElementById("img_user1");
const nameUser2 = document.getElementById("user2");
const imgUser2= document.getElementById("img_user2");
nameUser.textContent = usuarioo.nombre+ " "+ usuarioo.apellido;
nameUser2.textContent = usuarioo.nombre + " "+ usuarioo.apellido;
imgUser.src = usuarioo.img;
imgUser2.src = usuarioo.img;


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
        container.appendChild(item);
    });
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