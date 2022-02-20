window.addEventListener("DOMContentLoaded", (eventoLoad) => {
    document.querySelector("form").addEventListener("submit", (eventoSubmit) => {
        eventoSubmit.preventDefault();

        // Vanilla JS
        const nombre    = document.getElementById("nombre").value;
        const email     = document.getElementById("email").value;
        const mensaje   = document.getElementById("txtMensajes").value;
    
        const mensajeError = [];

        // validaciones 
        const nombreValido  = validarNombre(nombre);
        const emailValido   = validarEmail(email);
        const mensajeValido = validarMensaje(mensaje);

            
        if( nombreValido.length > 0 ) {
            mensajeError.push( nombreValido );
        };

    
        if( emailValido.length > 0 ) {
            mensajeError.push( emailValido );
        };

        if(mensajeValido > 0){
            mensajeError.push(mensajeValido);
        }

        if( nombreValido.length == 0 && emailValido.length == 0 && mensajeValido.length == 0){
            guardarDatosContacto(nombre, email, mensaje);
        } else {
            const mostrarMensajesErrores = document.getElementById("mensajeContacto")
            mostrarMensajesErrores.innerHTML = mensajeError.join(", ");
            mostrarMensajesErrores.classList.remove("d-none");
        }
        return false;
    });
});

function guardarDatosContacto(nombre, email , mensaje) {
    const urlSupabase   = 'https://jczhhpbmbdlszmosozet.supabase.co';
    const apiKey        = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemhocGJtYmRsc3ptb3NvemV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2NzE5ODAsImV4cCI6MTk2MDI0Nzk4MH0.Y8wy8phGSIXR6oIDCigZpISf6umr650jHKYAXfIgw5s';
    const apiURL        = '/rest/v1/contacto'; // reemplazar con el nombre de su tabla 

    // Javascript Object Notation (JSON)
    const contacto = {
        nombre, // debe llamarse igual que la columna de la BD y la variable o constante de su código.
        email,
        mensaje
    }; 

    const url = urlSupabase + apiURL; // url = https://jczhhpbmbdlszmosozet.supabase.co/rest/v1/contacto
    const resultadoFetch = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey,
            "authorization": "Bearer "+apiKey,
            "Prefer": "return=representation" //Prefer: return=representation
        },
        body: JSON.stringify( contacto )
    }).then( response => {
        if( response.ok ) {
            const r = response.json();
            return r;
        } else {
            alert("Ocurrió un error al invocar la API de Supabase");
        }
    }).then( data => {
        mostrarMensajeAlContacto( data );
    }).catch( err => alert("Hubo un error en la red, intenté otra vez.")); // se invoca catch() cuando hay un error en la red 
    ;
}

//validaciones
function validarNombre(nombre) {
	if(nombre.length < 3) {
		return "Escriba Nombre Valido";
	} else {
		return "";
	}
};

function validarEmail(email){
    if(email == "" || email.length < 10) {
		return "Escriba un Mail valido";
	} else {
		return "";
	}
};

function validarMensaje(mensaje){
    if(mensaje == "" || mensaje.length < 10) {
		return "Escriba un mensaje valido";
	} else {
		return "";
	}
};

//Mensaje al usuario
function mostrarMensajeAlSuscriptor(data) {
    // muestra mensaje de generación correcta boleta 
    alert("Mensaje Enviado, su mensaje es el N°: "+data[0].id);
};
