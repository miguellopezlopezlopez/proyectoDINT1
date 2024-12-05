document.addEventListener("DOMContentLoaded", () =>{
    const formulario = document.getElementById("formulario");
    const userInput = document.getElementById("nombre");
    const errorUser = document.getElementById("error-nombre");
    const passInput = document.getElementById("password");
    const errorPass = document.getElementById("error-password");


//Validar Nombre Usuario
function validarUser(user){
    const formatoUser = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    user = user.trim();
    if(!user.trim()){
        errorUser.textContent ="Nombre obligatorio";
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
        errorUser.style.display = "block";
        return false;
    }
    errorPass.textContent = "";
    errorPass.style.display = "none";
    return true;
}




userInput.addEventListener("blur", () => {
    validarUser(userInput.value);
  });

  passInput.addEventListener("blur", () => {
    validarPassword(passInput.value);
  });


  
});