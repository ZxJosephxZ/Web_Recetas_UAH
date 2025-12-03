(function() {
  'use strict';

  // ====== SISTEMA DE LIKES Y COMENTARIOS ======

  // Obtener el usuario actual
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("user")) || { name: "Anónimo", firstName: "Anónimo" };
  } catch (e) {
    currentUser = { name: "Anónimo", firstName: "Anónimo" };
  }

  // Inicializar datos de posts en localStorage
  function initializePostsData() {
    try {
      const existingData = localStorage.getItem("postsData");
      if (!existingData) {
        const postsData = {
          1: { likes: 0, liked: false, comments: [] },
          2: { likes: 0, liked: false, comments: [] },
          3: { likes: 0, liked: false, comments: [] },
          4: { likes: 0, liked: false, comments: [] }
        };
        localStorage.setItem("postsData", JSON.stringify(postsData));
      }
    } catch (e) {
      console.error("Error inicializando posts:", e);
    }
  }

  // Obtener datos de posts
  function getPostsData() {
    try {
      return JSON.parse(localStorage.getItem("postsData")) || {};
    } catch (e) {
      console.error("Error obteniendo datos:", e);
      return {};
    }
  }

  // Guardar datos de posts
  function savePostsData(data) {
    try {
      localStorage.setItem("postsData", JSON.stringify(data));
    } catch (e) {
      console.error("Error guardando datos:", e);
    }
  }

  // Cargar estado de likes y comentarios en cada post al iniciar
  function loadPostData() {
    const posts = document.querySelectorAll(".post");
    const postsData = getPostsData();

    posts.forEach(post => {
      const postId = post.getAttribute("data-post-id");
      if (!postId) return;

      // Obtener datos guardados del post, o crear datos por defecto
      const postData = postsData[postId] || { likes: 0, liked: false, comments: [] };

      // --- Cargar estado de likes ---
      const likeBtn = post.querySelector(".like-btn");
      const likeCount = post.querySelector(".like-count");
      
      if (likeCount) {
        likeCount.textContent = postData.likes;
      }

      // Si el usuario ya dio like, aplicar clase "liked"
      if (postData.liked && likeBtn) {
        likeBtn.classList.add("liked");
      }

      // --- Cargar contador de comentarios ---
      const commentCount = post.querySelector(".comment-count");
      if (commentCount) {
        commentCount.textContent = postData.comments.length;
      }

      // Renderizar los comentarios que existen
      renderComments(postId, postData.comments);
    });
  }

  // Renderizar comentarios - muestra todos los comentarios de un post
  function renderComments(postId, comments) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const commentsList = post.querySelector(".comments-list");
    if (!commentsList) return;
    
    commentsList.innerHTML = ""; // Limpiar comentarios previos

    // Recorrer cada comentario y agregarlo al DOM
    comments.forEach(comment => {
      const commentEl = document.createElement("div");
      commentEl.className = "comment";
      commentEl.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      commentsList.appendChild(commentEl);
    });
  }

  // Manejar clicks en el botón de likes
  document.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (!likeBtn) return;

    const post = likeBtn.closest(".post");
    const postId = post.getAttribute("data-post-id");
    const postsData = getPostsData();
    const postData = postsData[postId];

    if (!postData) return;

    // Toggle: cambiar estado de like
    if (postData.liked) {
      postData.likes--;
      postData.liked = false;
      likeBtn.classList.remove("liked");
    } else {
      postData.likes++;
      postData.liked = true;
      likeBtn.classList.add("liked");
    }

    // Actualizar interfaz
    const likeCount = post.querySelector(".like-count");
    if (likeCount) {
      likeCount.textContent = postData.likes;
    }

    savePostsData(postsData);
  });

  // Manejar mostrar/ocultar comentarios
  document.addEventListener("click", (e) => {
    if (e.target.closest(".comment-btn")) {
      const commentBtn = e.target.closest(".comment-btn");
      const post = commentBtn.closest(".post");
      const commentsSection = post.querySelector(".comments-section");

      if (commentsSection) {
        if (commentsSection.style.display === "none") {
          commentsSection.style.display = "block";
        } else {
          commentsSection.style.display = "none";
        }
      }
    }
  });

  // Manejar envío de comentarios - cuando el usuario hace click en "enviar"
  document.addEventListener("click", (e) => {
    const sendBtn = e.target.closest(".send-comment-btn");
    if (!sendBtn) return;

    const post = sendBtn.closest(".post");
    const postId = post.getAttribute("data-post-id");
    const commentInput = post.querySelector(".comment-input");
    const commentText = commentInput.value.trim();

    // Validar que no esté vacío
    if (!commentText) {
      alert("Por favor escribe un comentario");
      return;
    }

    // Obtener datos actuales del post
    const postsData = getPostsData();
    const postData = postsData[postId];

    if (!postData) return;

    // Crear nuevo comentario
    const newComment = {
      author: currentUser.name || currentUser.firstName || "Anónimo",
      text: commentText
    };

    // Agregar a la lista y actualizar UI
    postData.comments.push(newComment);
    
    const commentCount = post.querySelector(".comment-count");
    if (commentCount) {
      commentCount.textContent = postData.comments.length;
    }

    savePostsData(postsData);
    renderComments(postId, postData.comments);
    commentInput.value = ""; // Limpiar input
  });

  // Permitir enviar comentarios con Enter
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("comment-input")) {
      e.preventDefault();
      const post = e.target.closest(".post");
      if (post) {
        const sendBtn = post.querySelector(".send-comment-btn");
        if (sendBtn) {
          sendBtn.click();
        }
      }
    }
  });

  // Cargar datos cuando el DOM esté listo
  function setupPosts() {
    initializePostsData();
    loadPostData();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPosts);
  } else {
    setupPosts();
  }
})();
