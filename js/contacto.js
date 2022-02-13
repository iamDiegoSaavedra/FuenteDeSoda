document.getElementById("nombre").addEventListener("blur", (evento) => {
    const input = evento.currentTarget;
    const txtNombre = input.value;

    //const textOK = document.createTextNode("Nombre esta Ok");
    //const textError = document.createTextNode("Nombre muy corto");

    const feedbackNombre = document.getElementById("feedback-nombre")

    if(txtNombre.length < 3){
        console.log("Nombre muy corto")
        feedbackNombre.innerHTML = "Nombre muy corto";
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        feedbackNombre.className = "invalid-feedback";
    }else{
        console.log("Nombre está OK!")
        feedbackNombre.innerHTML = "Nombre esta OK!";
        input.classList.remove("is-invalid");
        input.classList.Add("is-valid");
        feedbackNombre.className = "valid-feedback";
    }
});









/*function manejarFormulario(evento){
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;

    console.log("on-submit formulario contacto...");
    
    return false;
}

document.getElementById("formulario-contacto").addEventListener('submit', manejarFormulario);
*/