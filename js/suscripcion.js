window.addEventListener("DOMContentLoaded", (eventoLoad) => {
    document.querySelector("form").addEventListener("submit", (eventoSubmit) => {
        eventoSubmit.preventDefault();

        // Vanilla JS
        //const nombre    = document.getElementById("nombre").value;
        //const email     = document.getElementById("email").value;

        // jQuery 
        const nombre    = $("#nombre").val();
        const email     = $("#email").val(); 

        // validaciones 
        const nombreValido  = validarNombre(nombre);
        const emailValido   = validarEmail(email);

        if( nombreValido && emailValido){
            guardarDatosSuscriptor(nombre, email);
        } else {
            mostrarMensajeError();
        }
        return false;
    });
});

function guardarDatosSuscriptor(nombre, email) {
    const urlSupabase   = 'https://jczhhpbmbdlszmosozet.supabase.co';
    const apiKey        = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemhocGJtYmRsc3ptb3NvemV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2NzE5ODAsImV4cCI6MTk2MDI0Nzk4MH0.Y8wy8phGSIXR6oIDCigZpISf6umr650jHKYAXfIgw5s';
    const apiURL        = '/rest/v1/suscriptores'; // reemplazar con el nombre de su tabla 

    // Javascript Object Notation (JSON)
    const suscriptor = {
        nombre,
        email
    }; // por ej. {nombre: 'Juanito Perez', email: 'juanito@123.cl'}

    const url = urlSupabase + apiURL; // url = https://hqkjyiudhohhocdkuslx.supabase.co/rest/v1/suscriptores
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
            console.error("Ocurrió un error al invocar la API de Supabase");
        }
    }).then( data => {
        console.dir( data );
    }).catch( err => console.dir(err) ) // se invoca catch() cuando hay un error en la red 
    ;
}

function mostrarMensajeError(){} // Uds. lo implementan 
function validarNombre(nombre){ return true; } // Uds. lo implementan
function validarEmail(email){ return true; } // Uds. lo implementan