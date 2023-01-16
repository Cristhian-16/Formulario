document.addEventListener("DOMContentLoaded", function () {
  /* Variables */
  const emailId = document.querySelector("#email");
  const asuntoId = document.querySelector("#asunto");
  const mensajeId = document.querySelector("#mensaje");
  const destinatarioId = document.querySelector("#destinatario");
  const formulario = document.querySelector("#formulario");
  const spinner = document.querySelector('#spinner');
  const btnFormulario = document.querySelector(
    "#formulario button[type='submit']"
  );
  const btnFormularioRest = document.querySelector(
    "#formulario button[type='reset']"
  );

  const email = {
    email: "",
    destinatario: '',
    asunto: "",
    mensaje: "",
  };

  emailId.addEventListener("blur", validarCampos);
  asuntoId.addEventListener("blur", validarCampos);
  mensajeId.addEventListener("blur", validarCampos);
  destinatarioId.addEventListener("blur", validarCampos);
  formulario.addEventListener('submit', enviarFormulario);

  btnFormularioRest.addEventListener('click', function (e) {
    e.preventDefault();
    resetTodo()
  })


  function validarCampos(e) {
    const leerDato = e.target.value.trim();
    const leerId = e.target.id;
    if (leerDato === "") {
      mostrarMensaje(
        `El campo ${leerId} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarMensaje("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    if (e.target.id === 'destinatario' && !validarEmail(e.target.value)) {
      mostrarMensaje("El destinatario no es valido", e.target.parentElement);
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    /* Pasa todas las validaciones */
    email[e.target.name] = e.target.value.trim().toLowerCase();
    // console.log(email);
    comprobarEmail();
  }

  function mostrarMensaje(mensaje, referencia) {
    /* Comprobar si ya existe la alerta */
    limpiarAlerta(referencia);
    /* Mostrar mensaje si el input esta vacio */
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "p-2", "text-white", "text-center");

    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnFormulario.disabled = true;
      btnFormulario.classList.add("opacity-50");
    } else {
      btnFormulario.disabled = false;
      btnFormulario.classList.remove('opacity-50');
    }
  }
  function resetTodo() {

    email.email = '';
    email.asunto = '';
    email.mensaje = '';
    email.destinatario = '';

    formulario.reset();
    comprobarEmail();
  }

  function enviarFormulario(e) {
    e.preventDefault();
    spinner.classList.remove('hidden')

    setTimeout(() => {
      spinner.classList.add('hidden');
      resetTodo();

      /* CREAR ALERTA */
      const alertaExito = document.createElement('p');
      alertaExito.textContent = 'Datos Guardados';
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold',
        'text-sm', 'uppercase');

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 2000);

    }, 3000);

  }
});


