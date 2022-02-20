window.addEventListener("DOMContentLoaded", (eventoLoad) => {
    document.querySelector("form").addEventListener("submit", (eventoSubmit) => {
        eventoSubmit.preventDefault();

        // Vanilla JS
        const nombre    = document.getElementById("nombre").value;
        const email     = document.getElementById("email").value;

    
        const mensajeError = [];

        // validaciones 
        const nombreValido  = validarNombre(nombre);
        const emailValido   = validarEmail(email);

            
        if( nombreValido.length > 0 ) {
            mensajeError.push( nombreValido );
        };

    
        if( emailValido.length > 0 ) {
            mensajeError.push( emailValido );
        };

        if( nombreValido.length == 0 && emailValido.length == 0){
            guardarDatosSuscriptor(nombre, email);
        } else {
            const mostrarMensajesErrores = document.getElementById("mensajesErrores")
            mostrarMensajesErrores.innerHTML = mensajeError.join(", ");
            mostrarMensajesErrores.classList.remove("d-none");
        }
        return false;
    });
});

function guardarDatosSuscriptor(nombre, email) {
    const urlSupabase   = 'https://jczhhpbmbdlszmosozet.supabase.co';
    const apiKey        = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemhocGJtYmRsc3ptb3NvemV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2NzE5ODAsImV4cCI6MTk2MDI0Nzk4MH0.Y8wy8phGSIXR6oIDCigZpISf6umr650jHKYAXfIgw5s';
    const apiURL        = '/rest/v1/suscriptor'; // reemplazar con el nombre de su tabla 

    // Javascript Object Notation (JSON)
    const suscriptor = {
        nombre, // debe llamarse igual que la columna de la BD y la variable o constante de su código.
        email
    }; 

    const url = urlSupabase + apiURL; // url = https://jczhhpbmbdlszmosozet.supabase.co/rest/v1/suscriptor
    const resultadoFetch = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey,
            "authorization": "Bearer "+apiKey,
            "Prefer": "return=representation" //Prefer: return=representation
        },
        body: JSON.stringify( suscriptor )
    }).then( response => {
        if( response.ok ) {
            const r = response.json();
            return r;
        } else {
            alert("Ocurrió un error al invocar la API de Supabase");
        }
    }).then( data => {
        mostrarMensajeAlSuscriptor( data );
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

//Mensaje al usuario
function mostrarMensajeAlSuscriptor(data) {
    // muestra mensaje de generación correcta boleta 
    alert("Suscripcion creada, su id es: "+data[0].id);
};
