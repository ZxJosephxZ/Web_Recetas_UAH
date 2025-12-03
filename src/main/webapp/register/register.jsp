<%-- 
    Document   : register
    Created on : 1 dic 2025, 13:19:42
    Author     : josep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="../login/login.css">
</head>
<body>
    <div class="login-container">
        <div class="form-box">
            <h1>Crear cuenta</h1>
            <form id="registerForm">
                <div class="input-group">
                    <label for="name">Nombre de usuario</label>
                    <input type="text" id="name" placeholder="Tu nombre" required>
                </div>

                <div class="input-group">
                    <label for="lastName">Apellido</label>
                    <input type="text" id="lastName" placeholder="Tu apellido" required>
                </div>

                <div class="input-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" placeholder="ejemplo@correo.com" required>
                </div>

                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" placeholder="********" required>
                </div>

                <button type="submit">Registrarse</button>
            </form>

            <p class="register-link">
                ¿Ya tienes cuenta? <a href="../login/login.jsp">Inicia sesión</a>
            </p>
        </div>
    </div>

    <script>
        document.getElementById("registerForm").addEventListener("submit", function(e){
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const user = { firstName: name, lastName: lastName, name: (name + (lastName ? ' ' + lastName : '')).trim(), email, password };
            const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
            accounts.push(user);
            localStorage.setItem("accounts", JSON.stringify(accounts));
            alert("Usuario registrado con éxito ✅");
            window.location.href = "../login/login.jsp";
        });
    </script>
</body>
</html>
