function sendMessage(to, input) {
  if (!input.value.trim()) return;
  
  const newMsg = {
    author: "me",
    text: input.value.trim(),
    time: "ahora"
  };
  
  if (!conversations[to]) {
    conversations[to] = [];
  }
  
  conversations[to].push(newMsg);
  
  // Actualizar UI
  const messages = document.querySelector(".chat-messages");
  const msgEl = document.createElement("div");
  msgEl.className = "message sent";
  msgEl.textContent = newMsg.text;
  messages.appendChild(msgEl);
  
  // Limpiar input y scroll
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}