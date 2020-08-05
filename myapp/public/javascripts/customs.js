let boton = document.querySelector(".boton-editar");
let form = document.querySelector(".edit-movie");
let cerrar = document.querySelector(".boton-cerrar");

boton.addEventListener("click", function(){
    form.classList.toggle("apagado");
})

cerrar.addEventListener("click", function () {
    form.classList.toggle("apagado");
})
