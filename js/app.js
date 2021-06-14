const formularioContactos = document.querySelector("#contacto");
const listadoContactos = document.querySelector("#listado-contactos tbody");
const inputBuscador = document.querySelector("#buscar");

evenListeners();

function evenListeners() {
  // cuando el formulario se ejecuta

  formularioContactos.addEventListener("submit", leerFormulario);

  // listener para eliminar el boton
  if (listadoContactos) {
    listadoContactos.addEventListener("click", eliminarContacto);
  }
  //buscador
  inputBuscador.addEventListener("input", buscarContactos);

  numeroContactos();
}

function leerFormulario(e) {
  e.preventDefault();

  //leer datos inputs

  const nombre = document.querySelector("#nombre").value,
    empresa = document.querySelector("#empresa").value,
    telefono = document.querySelector("#telefono").value;
  accion = document.querySelector("#accion").value;

  if (nombre === "" || empresa === "" || telefono === "") {
    //dos parametros texto y clasese
    mostrarNotificacion("todos los campos son obligatorios", "error");
  } else {
    //llamar ajax
    const infoContacto = new FormData();
    infoContacto.append("nombre", nombre);
    infoContacto.append("empresa", empresa);
    infoContacto.append("telefono", telefono);
    infoContacto.append("accion", accion);

    if (accion === "crear") {
      //crear nuevo contacto
      insetarBD(infoContacto);
    } else {
      //editar contacto
      //leer el id
      const idRegistro = document.querySelector("#id").value;
      infoContacto.append("id", idRegistro);
      actualizarRegistro(infoContacto);
    }
  }
}

function insetarBD(datos) {
  //llamando a ajax
  //crear objeto
  const xhr = new XMLHttpRequest();
  //abrir conexion
  xhr.open("POST", "includes/modelos/modelo-contactos.php", true);
  //pasar los datos
  xhr.onload = function () {
    if (this.status === 200) {
      //respuesta php
      const respuesta = JSON.parse(xhr.responseText);
      // inserta nuevo elemento tabla

      const nuevoContacto = document.createElement("tr");

      nuevoContacto.innerHTML = `
            <td>${respuesta.datos.nombre}</td>
            <td>${respuesta.datos.empresa}</td>
            <td>${respuesta.datos.telefono}</td>
            
      `;

      // crear contenedor para los botones

      const contenedorBotones = document.createElement("td");

      //boton editar
      const iconoEditar = document.createElement("i");
      iconoEditar.classList.add("fas", "fa-pen-square");

      const btnEditar = document.createElement("a");
      btnEditar.appendChild(iconoEditar);
      btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
      btnEditar.classList.add("btn", "btn-editar");

      contenedorBotones.appendChild(btnEditar);

      //boton eliminar
      const iconoEliminar = document.createElement("i");
      iconoEliminar.classList.add("fas", "fa-trash-alt");

      const btnEliminar = document.createElement("button");
      btnEliminar.appendChild(iconoEliminar);
      btnEliminar.setAttribute("data-id", respuesta.datos.id_insertado);
      btnEliminar.classList.add("btn", "btn-borrar");

      contenedorBotones.appendChild(btnEliminar);

      nuevoContacto.appendChild(contenedorBotones);

      listadoContactos.appendChild(nuevoContacto);

      //resetear formmulario
      document.querySelector("form").reset();
      // mostrar notificacion

      mostrarNotificacion("Contacto Creado Correctamente", "correcto");

      numeroContactos();
    }
  };
  //enviar los datos
  xhr.send(datos);
}

function actualizarRegistro(datos) {
  //crear objeto
  const xhr = new XMLHttpRequest();
  //abrir conexion
  xhr.open("POST", "includes/modelos/modelo-contactos.php", true);
  //leer respuesta
  xhr.onload = function () {
    if (this.status === 200) {
      const respuesta = JSON.parse(xhr.responseText);

      if (respuesta.respuesta === "correcto") {
        mostrarNotificacion("Contacto Editado Correctamente", "correcto");
      } else {
        mostrarNotificacion("Hubo un Error", "error");
      }

      setTimeout(() => {
        window.location.href = "index.php";
      }, 4000);
    }
  };
  //enviar peticion
  xhr.send(datos);
}
//eliminar contacto

function eliminarContacto(e) {
  if (e.target.parentElement.classList.contains("btn-borrar")) {
    //tomar ID
    const id = e.target.parentElement.getAttribute("data-id");
    //preguntar
    const respuesta = confirm("¿Estas Seguro?");

    if (respuesta) {
      //llamado a ajax
      //crear objeto
      const xhr = new XMLHttpRequest();
      //abrir conexion
      xhr.open(
        "GET",
        `includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`,
        true
      );
      //leer respuesta
      xhr.onload = function () {
        if (this.status === 200) {
          const resultado = JSON.parse(xhr.responseText);

          if (resultado.respuesta === "correcto") {
            e.target.parentElement.parentElement.parentElement.remove();
            mostrarNotificacion("Contacto eliminado", "correcto");

            numeroContactos();
          } else {
            mostrarNotificacion("Hubo un error", "error");
          }
        }
      };
      //enviar peticion
      xhr.send();
    }
  }
}

//notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
  const notificacion = document.createElement("div");
  notificacion.classList.add(clase, "notificacion", "sombra");
  notificacion.textContent = mensaje;

  //formulario
  formularioContactos.insertBefore(
    notificacion,
    document.querySelector("form legend")
  );

  //ocultar y mostrar notificaciones

  setTimeout(() => {
    notificacion.classList.add("visible");

    setTimeout(() => {
      notificacion.classList.remove("visible");

      setTimeout(() => {
        notificacion.remove();
      }, 500);
    }, 3000);
  }, 100);
}

function buscarContactos(e) {
  const expresion = new RegExp(e.target.value, "i");
  registros = document.querySelectorAll("tbody tr");

  registros.forEach((registro) => {
    registro.style.display = "none";

    if (
      registro.childNodes[1].textContent.replace(/\s/g, "").search(expresion) !=
      -1
    ) {
      registro.style.display = "table-row";
    }
    numeroContactos();
  });
}

function numeroContactos() {
  const totalContactos = document.querySelectorAll("tbody tr");
  const contenedorNumero = document.querySelector(".total-contactos span");
  let total = 0;

  totalContactos.forEach((contacto) => {
    if (
      contacto.style.display === "" ||
      contacto.style.display === "table-row"
    ) {
      total++;
    }
  });

  contenedorNumero.textContent = total;
}
