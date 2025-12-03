<%-- 
    Document   : home
    Created on : 1 dic 2025, 12:51:35
    Author     : josep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Página principal</title>
  <link rel="stylesheet" href="home.css" />
</head>
<body>
  <header>
    <div class="logo">
  <img src="../img/logo3.png" alt="logo" />
      <h2>FoodNet</h2>
    </div>
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#" id="openChat">Chat</a></li>
        <li><a href="profile.jsp">Perfil</a></li>
        <li>
          <a href="#" id="toggleChatBtn" class="chat-toggle" aria-expanded="true" title="Ocultar chat">
            <span class="arrow">❯</span>
          </a>
        </li>
        <li><a href="#" id="logoutBtn">Cerrar sesión</a></li>
      </ul>
    </nav>
  </header>

  <main class="main-container">
    <section class="feed" id="feed">
      <div class="post" data-post-id="1">
        <figure class="image">
          <img src="../img/plato1.png" alt="Plato 1">
        </figure>
        <div class="info">
          <h3>Desayuno healthy</h3>
          <p>Pan tostado con huevo y aguacate. Nutritivo y fácil de hacer, perfecto para tus mañanas.</p>
          <button class="recipe-btn">Ver receta completa</button>
          <div class="post-actions">
            <button class="like-btn" title="Me gusta">❤️ <span class="like-count">0</span></button>
            <button class="comment-btn" title="Comentar">💬 <span class="comment-count">0</span></button>
          </div>
          <div class="comments-section" style="display:none;">
            <div class="comments-list"></div>
            <div class="comment-input-box">
              <input type="text" class="comment-input" placeholder="Añade un comentario...">
              <button class="send-comment-btn">Enviar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="post" data-post-id="2">
        <figure class="image">
          <img src="../img/mojito.png" alt="Plato 2">
        </figure>
        <div class="info">
          <h3>Mojito</h3>
          <p>Prueba un refrescante mojito con hierbabuena y limon. Ideal para acompañar en una tarde calurosa..</p>
          <button class="recipe-btn">Ver receta completa</button>
          <div class="post-actions">
            <button class="like-btn" title="Me gusta">❤️ <span class="like-count">0</span></button>
            <button class="comment-btn" title="Comentar">💬 <span class="comment-count">0</span></button>
          </div>
          <div class="comments-section" style="display:none;">
            <div class="comments-list"></div>
            <div class="comment-input-box">
              <input type="text" class="comment-input" placeholder="Añade un comentario...">
              <button class="send-comment-btn">Enviar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="post" data-post-id="3">
        <figure class="image">
          <img src="../img/pollo.png" alt="Plato 3">
        </figure>
        <div class="info">
          <h3>Pollo a la mostaza y miel</h3>
          <p>Decantate por este pollo a la mostaza con miel. Acompañado de pure de patatas para completar una dieta equilibrada</p>
          <button class="recipe-btn">Ver receta completa</button>
          <div class="post-actions">
            <button class="like-btn" title="Me gusta">❤️ <span class="like-count">0</span></button>
            <button class="comment-btn" title="Comentar">💬 <span class="comment-count">0</span></button>
          </div>
          <div class="comments-section" style="display:none;">
            <div class="comments-list"></div>
            <div class="comment-input-box">
              <input type="text" class="comment-input" placeholder="Añade un comentario...">
              <button class="send-comment-btn">Enviar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="post" data-post-id="4">
        <figure class="image">
          <img src="../img/brownie.png" alt="Plato 4">
        </figure>
        <div class="info">
          <h3>Brownie</h3>
          <p>Prueba estos deliciosos brownies. Perfecto para cerrar tus comidas con algo dulce.</p>
          <button class="recipe-btn">Ver receta completa</button>
          <div class="post-actions">
            <button class="like-btn" title="Me gusta">❤️ <span class="like-count">0</span></button>
            <button class="comment-btn" title="Comentar">💬 <span class="comment-count">0</span></button>
          </div>
          <div class="comments-section" style="display:none;">
            <div class="comments-list"></div>
            <div class="comment-input-box">
              <input type="text" class="comment-input" placeholder="Añade un comentario...">
              <button class="send-comment-btn">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Columna lateral tipo chat -->
    <aside class="chat-sidebar">
      <div class="chat-header">
        <h3>Mensajes</h3>
      </div>

      <!-- Vista lista de chats -->
      <div class="chat-list">
        <div class="chat-item">
          <img src="../img/avatar.png" alt="">
          <div>
            <h4>Jane Doe</h4>
            <p>¿Probaste la receta?</p>
          </div>
        </div>
        <div class="chat-item">
          <img src="../img/avatar.png" alt="">
          <div>
            <h4>Mark Lee</h4>
            <p>¡Gracias por el consejo!</p>
          </div>
        </div>
      </div>

      <!-- Vista conversación individual -->
      <div class="chat-conversation" style="display: none;">
        <div class="chat-messages"></div>
        <div class="chat-input">
          <input type="text" id="messageInput" placeholder="Escribe un mensaje...">
          <button id="sendMessage">Enviar</button>
        </div>
      </div>

      <!-- Botón para ir a mensajes completos -->
      <div style="padding: 12px; border-top: 1px solid rgba(255,200,200,0.1); margin-top: auto;">
        <a href="../chat/chat.jsp" style="display: block; width: 100%; background: var(--accent); color: white; text-align: center; padding: 8px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: all 0.2s;" onmouseover="this.style.background='var(--hover-accent)'" onmouseout="this.style.background='var(--accent)'">
          📬 Ver todos los mensajes
        </a>
      </div>
    </aside>
  </main>

  <script src="home.js"></script>
  <script src="chat.js"></script>
  <script src="posts.js"></script>
</body>
</html>
