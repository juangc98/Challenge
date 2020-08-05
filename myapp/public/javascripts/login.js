let loginBtn = document.querySelector(".boton-login");
let loginForm = document.querySelector(".login-card");
let loginClose = document.querySelector(".login-cerrar");

loginBtn.addEventListener("click", function () {
    loginForm.classList.toggle("apagado");
})

loginClose.addEventListener("click", function () {
    loginForm.classList.toggle("apagado");
})