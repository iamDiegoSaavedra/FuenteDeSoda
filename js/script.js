window.addEventListener("DOMContentLoaded", (loadEvent) => {
    $("header").load("includes/header.html");
    $("footer").load("includes/footer.html");
});


document.getElementById('doc-tributarios')
    .addEventListener('submit', (submitEvent)=>{
    submitEvent.preventDefault();


    const tipoDocumento = submitEvent.currentTarget;

    

    if(form[0].checked){
        //boleta
        console.log("boleta")
    }else if(form[1].checked){
        //fatura
        console.log("factura")
    }else{
        //nota credito
        console.log("nota credito")
    }




    return false;
})