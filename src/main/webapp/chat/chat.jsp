<%-- 
    Document   : chat
    Created on : 1 dic 2025, 12:42:59
    Author     : josep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>FoodNet</title>
        <link rel="stylesheet" href="chat.css">
    </head>
    <body>
  
        <div class="container">
            <div class="List">
                <div class="UserInfo">
                    <div class="user">
                        <img src="../img/avatar.png" data-user="user_image" alt="">
                        <h2  class="nameEdit" data-user="user_name">Joseph Pajuelo</h2>
                    </div>
                    <div class="icons">
                        <a href="../home/profile.jsp">
                        <img src="../img/more.png" alt="">
                        </a>
                        <img class="edit" src="../img/edit.png" alt="">
                    </div>
                </div>
                <div class="ChatList">
                    <div class="search">
                        <div class="searchBar">
                            <img src="../img/search.png" alt="">
                            <input type="text" id="searchInput" placeholder="Search">
                        </div>
                    </div>
                    <div id="friendContainer"></div>
                </div>
            </div>
            <div class="Chat">
                <div class="top">
                    <div class="user">
                        <img src="../img/avatar.png" data-user="amigo_img" alt="">
                        <div class="texts">
                            <span  data-user="amigo_name" id="amigo_nombre">Jane Doe</span>
                            <p data-user="amigo_mensaje">Lorem ipsum dolor sit amet1.</p>
                        </div>
                    </div>
                    <div class="icons">
                        <img src="../img/phone.png" alt="">
                        <img src="../img/plus.png" id="btnSolicitud" alt="Enviar solicitud">
                        <img src="../img/info.png" alt="">
                    </div>
                </div>
                <div class="center" id="messageContainer">
                </div>
                <div class="bottom">
                    <div class="icons">
                        <img src="../img/img.png" alt="">
                        <img src="../img/camera.png" alt="">
                        <img src="../img/mic.png" alt="">
                    </div>
                    <input type="text" placeholder="Type a message..." id="messageInput">
                    <div class="emoji">
                        <img src="../img/emoji.png" alt="">
                    </div>
                    <button class="sendButton" id="SendBTN">Send</button>
                </div>
            </div>
            <div class="Detail">
                <div class="user">
                    <img src="../img/avatar.png" data-user="user_image" alt="">
                    <h2 data-user="user_name">Joseph Pa</h2>
                    <p data-user="user_mensaje">Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="solicitudes-header">
                <h3>Solicitudes de amistad</h3>
                </div>
                <div id="solicitudesContainer"></div>
                <div class="info">
                    <a href="../index.jsp">Logout
                    </a>
                    <a href="../home/home.jsp" class="logout">Back to menu
                    </a>
                </div>
            </div>
        </div>
      <script src="chat1.js"></script>
    </body>
</html>
