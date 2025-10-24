// Verificar si el usuario ha iniciado sesión
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  // si no hay usuario, llevar a login
  window.location.href = "login.html";
} else {
  console.log("Usuario conectado:", user.name);
}

// Cerrar sesión
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("Has cerrado sesión 👋");
    window.location.href = "../index.html";
  });
}

// --- control de mostrar/ocultar chat ---
const mainContainer = document.querySelector(".main-container");
const toggleChatBtn = document.getElementById("toggleChatBtn");

const chatHidden = localStorage.getItem("chatHidden") === "true";
if (chatHidden && mainContainer) {
  mainContainer.classList.add("no-chat");
  if (toggleChatBtn) toggleChatBtn.setAttribute('aria-expanded', 'false');
} else {
  if (toggleChatBtn) toggleChatBtn.setAttribute('aria-expanded', 'true');
}

if (toggleChatBtn) {
  toggleChatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!mainContainer) return;
    toggleChatBtn.classList.add('pressed');
    setTimeout(() => toggleChatBtn.classList.remove('pressed'), 260);

    const hidden = mainContainer.classList.toggle("no-chat");
    localStorage.setItem("chatHidden", hidden);
    toggleChatBtn.setAttribute('aria-expanded', hidden ? 'false' : 'true');
    toggleChatBtn.title = hidden ? 'Mostrar chat' : 'Ocultar chat';

    runResponsiveCheck();
  });
}

const conversations = {
  "Jane Doe": [
    { author: "Jane Doe", text: "¿Probaste la receta?", time: "1 min ago" },
    { author: "me", text: "¡Perfecto! Lo voy a intentar hoy.", time: "30 sec ago" },
    { author: "Jane Doe", text: "Avísame cómo te quedó 😊", time: "just now" }
  ],
  "Mark Lee": [
    { author: "Mark Lee", text: "¡Gracias por el consejo!", time: "2 min ago" },
    { author: "me", text: "De nada, cuando quieras comparto más recetas.", time: "1 min ago" }
  ]
};

function renderConversation(name) {
  const chatList = document.querySelector(".chat-list");
  const header = document.querySelector('.chat-header');
  if (!chatList || !header) return;

  header.innerHTML = `
    <button class="back-button" aria-label="Volver a chats">←</button>
    <h3>${name}</h3>
  `;

  chatList.innerHTML = `
    <div class="chat-panel-header">
      <div class="chat-panel-user">
  <img src="../../../img/avatar.png" alt="${name}">
        <div>
          <h4>${name}</h4>
          <p class="status">En línea</p>
        </div>
      </div>
    </div>
    <div class="chat-messages" style="padding:15px; max-height:60vh; overflow:auto; display:flex; flex-direction:column; gap:12px;"></div>
  `;

  // Añadir comportamiento al botón de volver
  const backBtn = header.querySelector('.back-button');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showChatList();
    });
  }

  const messagesContainer = chatList.querySelector(".chat-messages");
  const msgs = conversations[name] || [];

  msgs.forEach(m => {
    const msgEl = document.createElement("div");
    msgEl.className = m.author === "me" ? "message own" : "message";
    msgEl.style.display = "flex";
    msgEl.style.gap = "10px";
    msgEl.style.alignItems = "flex-end";

    if (m.author !== "me") {
      msgEl.innerHTML = `
  <img src="../../../img/avatar.png" alt="" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
        <div style="display:flex; flex-direction:column; gap:6px;">
          <p style="margin:0; padding:10px 14px; background:rgba(255,255,255,0.08); border-radius:10px; max-width:300px;">${m.text}</p>
          <span style="font-size:12px; color:#ddd;">${m.time}</span>
        </div>
      `;
    } else {
      msgEl.style.justifyContent = "flex-end";
      msgEl.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
          <p style="margin:0; padding:10px 14px; background:#5183fe; border-radius:10px; color:#fff; max-width:300px;">${m.text}</p>
          <span style="font-size:12px; color:#ddd;">${m.time}</span>
        </div>
      `;
    }

    messagesContainer.appendChild(msgEl);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  runResponsiveCheck();
}

// Mostrar la lista de conversaciones
function showChatList(){
  const chatList = document.querySelector('.chat-list');
  const header = document.querySelector('.chat-header');
  if(!chatList || !header) return;

  header.innerHTML = '<h3>Mensajes</h3>';

  let html = '';
  for(const name of Object.keys(conversations)){
    const preview = conversations[name] && conversations[name].length ? conversations[name][0].text : '';
    html += `
      <div class="chat-item">
  <img src="../../../img/avatar.png" alt="">
        <div>
          <h4>${name}</h4>
          <p>${preview}</p>
        </div>
      </div>
    `;
  }
  chatList.innerHTML = html;

  runResponsiveCheck();
}

// Small helper: detect if feed and chat overlap and switch chat to overlay mode when necessary
function runResponsiveCheck(){
  const feedEl = document.querySelector('.feed');
  const chatEl = document.querySelector('.chat-sidebar');
  if(!feedEl || !chatEl || !mainContainer) return;

  chatEl.classList.remove('overlay');

  const feedRect = feedEl.getBoundingClientRect();
  const chatRect = chatEl.getBoundingClientRect();

  const gap = 20; 
  const overlaps = feedRect.right > (chatRect.left - gap);

  if (overlaps && window.innerWidth > 720) {
    chatEl.classList.add('overlay');
  } else {
    chatEl.classList.remove('overlay');
  }
}

// Run check initially and on resize
window.addEventListener('resize', () => runResponsiveCheck());
window.addEventListener('load', () => runResponsiveCheck());

// Abrir la sección de chat 
const openChatBtn = document.getElementById("openChat");
if (openChatBtn) {
  openChatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const sidebar = document.querySelector(".chat-sidebar");
    if (!sidebar) return;
    // Si el chat está oculto, mostrarlo primero
    if (mainContainer && mainContainer.classList.contains("no-chat")) {
      mainContainer.classList.remove("no-chat");
      localStorage.setItem("chatHidden", false);
      if (toggleChatBtn) toggleChatBtn.setAttribute('aria-expanded', 'true');
    }
    renderConversation("Jane Doe");
    sidebar.scrollIntoView({ behavior: "smooth", block: "end" });
  });
}

// Permitir abrir conversaciones al clicar los items 
document.addEventListener("click", (e) => {
  const item = e.target.closest(".chat-item");
  if (!item) return;
  const name = item.querySelector("h4") ? item.querySelector("h4").textContent.trim() : null;
  if (name) {
    // Si el chat está oculto, mostrarlo
    if (mainContainer && mainContainer.classList.contains("no-chat")) {
      mainContainer.classList.remove("no-chat");
      localStorage.setItem("chatHidden", false);
      if (toggleChatBtn) toggleChatBtn.textContent = "Ocultar chat";
    }
    renderConversation(name);
  }
});