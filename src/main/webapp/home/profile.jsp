<%-- 
    Document   : profile
    Created on : 1 dic 2025, 12:56:49
    Author     : josep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Perfil — FoodNet</title>
  <link rel="stylesheet" href="home.css">
  <style>
    :root{ --profile-img-w: 380px; --profile-img-h: 320px; }
    .profile-panel{ display:flex; gap:24px; align-items:flex-start; margin-bottom:18px; }
    .profile-hero{ display:flex; gap:20px; align-items:flex-start; width:100%; }
    .profile-avatar{ width:var(--profile-img-w); height:var(--profile-img-h); border-radius:12px; overflow:hidden; flex:0 0 var(--profile-img-w); background:#111; }
    .profile-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
    .profile-meta{ flex:1; color:var(--text); }
    .profile-meta h2{ margin:0 0 6px 0; font-size:1.6rem; }
    .profile-meta p.email{ margin:0 0 12px 0; opacity:.8; }
    .profile-meta p.bio{ margin-top:6px; opacity:.9; }
  #gallery{ display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:12px; align-items:start; }
  #gallery .gallery-item{ height:160px; overflow:hidden; border-radius:10px; background:#000; }
    #gallery .gallery-item img{ width:100%; height:100%; object-fit:cover; display:block; }

    @media (max-width:900px){ :root{ --profile-img-w: 220px; --profile-img-h: 180px; } .profile-panel{ flex-direction:column; } }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <img src="../img/logo.png" alt="logo" />
      <h2>FoodNet</h2>
    </div>
    <nav>
      <ul>
        <li><a href="home.jsp">Inicio</a></li>
        <li><a href="#" id="openChat">Chat</a></li>
        <li><a href="profile.jsp" class="active">Perfil</a></li>
        <li>
          <a href="#" id="toggleChatBtn" class="chat-toggle" aria-expanded="true" title="Ocultar chat">
            <span class="arrow">❯</span>
          </a>
        </li>
        <li><a href="#" id="logoutBtn">Cerrar sesión</a></li>
      </ul>
    </nav>
  </header>

  <main class="main-container" style="padding:24px; min-height: calc(100vh - 80px);">
    <section style="max-width:980px; margin:0 auto; display:flex; gap:24px; flex-wrap:wrap;">
      <div style="width:100%; background:var(--panel); padding:20px; border-radius:10px;">
        <div class="profile-panel">
          <div id="profileView">
            <div class="profile-hero">
            <div class="profile-avatar">
              <img id="photoPreview" src="../img/avatar.png" alt="avatar" />
            </div>
            <div class="profile-meta">
              <h2 id="viewName">Nombre Apellido</h2>
              <p class="email" id="viewEmail">email@example.com</p>
              <p class="bio" id="viewBio">Editar tu perfil para añadir una pequeña descripción.</p>
              <div style="margin-top:12px;"><button id="editToggle" type="button" style="padding:8px 12px; border-radius:8px; background:var(--accent); color:white; border:none;">Modificar información</button></div>
            </div>
            </div>
          </div>

        </div>

        <form id="profileForm" style="display:none; margin-top:16px;">
          <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
            <div style="flex:0 0 auto;">
              <div style="width:var(--profile-img-w);">
                <label style="display:block;">Foto de perfil</label>
                <input id="photoInput" type="file" accept="image/*">
                <small style="opacity:.8; display:block; margin-top:6px;">Sube una imagen (se guarda en localStorage)</small>
              </div>
            </div>
            <div style="flex:1 1 420px; display:flex; flex-direction:column; gap:10px;">
              <div id="profileMsg" style="min-height:20px; color:#ffb4b4; font-size:0.95rem;"></div>

              <label for="firstName" style="font-size:0.85rem; opacity:0.9;">Nombre</label>
              <input id="firstName" type="text" placeholder="Nombre" style="width:100%; padding:8px; border-radius:6px; border:none;" />

              <label for="lastName" style="font-size:0.85rem; opacity:0.9;">Apellido</label>
              <input id="lastName" type="text" placeholder="Apellido" style="width:100%; padding:8px; border-radius:6px; border:none;" />

              <label for="email" style="font-size:0.85rem; opacity:0.9;">Correo electrónico</label>
              <input id="email" type="email" placeholder="correo@ejemplo.com" style="width:100%; padding:8px; border-radius:6px; border:none;" />

              <label for="password" style="font-size:0.85rem; opacity:0.9;">Contraseña</label>
              <input id="password" type="password" placeholder="Cambiar contraseña si se desea" style="width:100%; padding:8px; border-radius:6px; border:none;" />

              <label for="bio" style="font-size:0.85rem; opacity:0.9;">Descripción pública</label>
              <textarea id="bio" placeholder="Escribe una descripción pública" rows="3" style="width:100%; padding:8px; border-radius:6px; border:none;"></textarea>

              <div style="display:flex; gap:8px; margin-top:6px;">
                <button id="saveProfile" type="button" style="padding:10px 16px; border-radius:8px; background:var(--accent); color:white; border:none;">Guardar</button>
                <button id="cancelProfile" type="button" style="padding:10px 12px; border-radius:8px; background:#444; color:white; border:none;">Cancelar</button>
              </div>
            </div>
          </div>
        </form>

        <hr style="margin:18px 0 12px 0; border-color: #ffffff10;" />
        <h3 style="margin:0 0 8px 0;">Mis publicaciones</h3>
        <p style="opacity:.8; margin:0 0 12px 0;">Tus fotos y recetas subidas.</p>
        <div id="gallery" style="margin-top:6px;">
          <!-- gallery items injected here -->
        </div>
      </div>
    </section>
  </main>

  <script src="profile.js"></script>
</body>
</html>
