document.addEventListener("DOMContentLoaded", () =>{
    const formulario = document.getElementById("formulario");
    const userInput = document.getElementById("nombre");
    const errorUser = document.getElementById("error-nombre");
    const passInput = document.getElementById("password");
    const errorPass = document.getElementById("error-password");
    const botonLimpiar = document.getElementById("limpiar");


//Validar Nombre Usuario
function validarUser(user){
    const formatoUser = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    user = user.trim();
    if(!user.trim()){
        errorUser.textContent ="Nombre obligatorio";
        errorUser.style.display = "block";
        return false;
    }

    if(user.length > 20 ){
        errorUser.textContent = "El nombre no puede tener más de 20 caracteres"
        errorUser.style.display = "block";
        return false;
    }


    if(!formatoUser.test(user)){
        errorUser.textContent = "Nombre inválido"
        errorUser.style.display = "block";
        return false;
    }
    errorUser.textContent = "";
    errorUser.style.display = "none";
    return true;
}

//Validar Contraseña
function validarPassword(password){
    const formatoPass = /^[A-Za-z0-9.$%&/()]{8,16}$/;
    if(!password.trim()){
        errorPass.textContent = "La contraseña es obligatoria";
        errorPass.style.display = "block";
        return false;
    }
    if(password.length > 16 || password.length < 8 || !formatoPass.test(password)) {
        errorPass.textContent = "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres s ·$%&/().";
        errorPass.style.display = "block";
        return false;
    }
    errorPass.textContent = "";
    errorPass.style.display = "none";
    return true;
}


//Eventos al perder el foco(blur)
userInput.addEventListener("blur", () => {
    validarUser(userInput.value);
});

passInput.addEventListener("blur", () => {
    validarPassword(passInput.value);
});

 //Validar el formulario completo
 function Validarformulario(){
    let valido = true;

    if(!validarUser(userInput.value)){
        valido = false;
    } 
    if(!validarPassword(passInput.value)){
        valido = false;
    } 
    return valido;
 }

 formulario.addEventListener("submit", async (event) =>{
    event.preventDefault(); //Evita el envío automatico
    if(Validarformulario()){
        location.href = "./main.html"
    }
 })

  // Botoón de Limpiar
 botonLimpiar.addEventListener("click", () =>{
    formulario.reset();
    
    const mensajes = document.querySelectorAll(".error-message");
    mensajes.forEach((error)=>{
        error.textContent = "";
        error.style.display = "none";
    })
 })

});