
let boton = document.querySelector(".boton-editar");
let form = document.querySelector(".edit-movie");
let cerrar = document.querySelector(".boton-cerrar");
let small = document.querySelectorAll(".error-msg");

boton.addEventListener("click", function () {
    event.preventDefault();
    form.classList.toggle("apagado");
})

cerrar.addEventListener("click", function () {
    event.preventDefault();
    form.classList.toggle("apagado");
})

 if (small.innerHtml == "Campo obligatorio") {
    form.classList.toggle("apagado");
 }
