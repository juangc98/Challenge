let boton = document.querySelector(".boton-editar");
let form = document.querySelector(".edit-movie");
let cerrar = document.querySelector(".boton-cerrar");

boton.addEventListener("click", function () {
    event.preventDefault();
    form.classList.toggle("apagado");
})

cerrar.addEventListener("click", function () {
    event.preventDefault();
    form.classList.toggle("apagado");
})
