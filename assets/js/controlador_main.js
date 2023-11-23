var personas = [];
class ControladorVista {
    static agregarPersonaATabla(persona) {
        const tabla = document.getElementById("tdatos");
        tabla.innerHTML += persona.obtenerFilaHTML();
        guardarEnLocalStorage();
    }

    static mostrarInformacion(persona) {
        const tabla = document.getElementById("tdatos");
        const filaHTML = `<tr>
                            <td>${persona.id}</td>
                            <td>${persona.nombre}</td>
                            <td>${persona.correo}</td>
                            <td>${persona.direccion}</td>
                            <td>${persona.telefono}</td>
                            <td>${persona.sueldo}</td>
                            <td>${persona.tipoEmpleado}</td>
                         </tr>`;
        tabla.innerHTML += filaHTML;
    }

    static limpiarTabla() {
        const tabla = document.getElementById("tdatos");
        tabla.innerHTML = '<tr><th>DI</th><th>Nombre</th><th>Correo</th><th>Dirección</th><th>Teléfono</th><th>Sueldo</th><th>Tipo Empleado</th></tr>';
    }
}

var idsAgregados = [];

function crearobjecto() {
    const id = document.getElementById("cc").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("email").value;
    const direccion = document.getElementById("Direccion").value;
    const telefono = document.getElementById("Telefono").value;
    const sueldo = document.getElementById("Sueldo").value;
    const tipoEmpleado = document.getElementById("Tipo").value;
  

    if (!id || !nombre || !correo || !direccion || !telefono || !sueldo || !tipoEmpleado) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const idRepetido = personas.some(persona => persona.id === id);
    if (idRepetido) {
        alert("ID duplicado. No se pueden agregar datos duplicados.");
        return;
    }

    const nuevaPersona = new Persona(id, nombre, correo, direccion, telefono, sueldo, tipoEmpleado);

    personas.push(nuevaPersona);

    ControladorVista.agregarPersonaATabla(nuevaPersona);

    limpiarCampos();
}
function desplegue() {
    var formulario = document.querySelector('.container2');
    var buscarContainer = document.querySelector('.container-buscar');

    formulario.style.display = (formulario.style.display === 'none' || formulario.style.display === '') ? 'block' : 'none';
    
    if (formulario.style.display === 'block') {
        buscarContainer.style.display = 'none';
        
        const tabla = document.getElementById("tdato");
        tabla.innerHTML = '<tr><th>DI</th><th>Nombre</th><th>Correo</th><th>Dirección</th><th>Teléfono</th><th>Sueldo</th><th>Tipo Empleado</th></tr>';
    }
}

function buscar() {
    var buscarContainer = document.querySelector('.container-buscar');
    var formulario = document.querySelector('.container2');

    buscarContainer.style.display = (buscarContainer.style.display === 'none' || buscarContainer.style.display === '') ? 'block' : 'none';

   
    if (buscarContainer.style.display === 'block') {
        formulario.style.display = 'none';
    }
}

const Buscar = document.getElementById("buscarEmpleado");
function buscarEmpleados() {
    const idBuscar = Buscar.value;
    const tdda= document.getElementById("tdato")
    const tabla = document.getElementById("tdato");
    tabla.innerHTML = '<tr><th>DI</th><th>Nombre</th><th>Correo</th><th>Dirección</th><th>Teléfono</th><th>Sueldo</th><th>Tipo Empleado</th></tr>';
   
    const personaEnArreglo = personas.find(persona => persona.id === idBuscar);
    if (personaEnArreglo) {
       
        const filaHTML = `<tr><td>${personaEnArreglo.id}</td><td>${personaEnArreglo.nombre}</td><td>${personaEnArreglo.correo}</td><td>${personaEnArreglo.direccion}</td><td>${personaEnArreglo.telefono}</td><td>${personaEnArreglo.sueldo}</td><td>${personaEnArreglo.tipoEmpleado}</td></tr>`;
        tdda.innerHTML+=filaHTML;
    } else {
       
        const personasStr = localStorage.getItem('personas');
        const personasLocalStorage = personasStr ? JSON.parse(personasStr) : [];

        const personaEnLocalStorage = personasLocalStorage.find(persona => persona.id === idBuscar);

        if (personaEnLocalStorage) {
            const filaHTML = `<tr><td>${personaEnLocalStorage.id}</td><td>${personaEnLocalStorage.nombre}</td><td>${personaEnLocalStorage.correo}</td><td>${personaEnLocalStorage.direccion}</td><td>${personaEnLocalStorage.telefono}</td><td>${personaEnLocalStorage.sueldo}</td><td>${personaEnLocalStorage.tipoEmpleado}</td></tr>`;
            tdda.innerHTML+=filaHTML;
        } else {
            
    
            alert(`No se encontró ninguna persona con el ID: ${idBuscar}`);
        }
    }
    limpiarCampos();
    


    
}
buscar.addEventListener("input",buscarEmpleados);





function limpiarCampos() {
    const elementosDeEntrada = document.querySelectorAll('input, select');

    for (let i = 0; i < elementosDeEntrada.length; i++) {
        const elemento = elementosDeEntrada[i];

        if (elemento.type === 'checkbox' || elemento.type === 'radio') {
            elemento.checked = false;
        } else {
            elemento.value = '';
        }
    }
}


function eliminarFilaSeleccionada() {
    const id = document.getElementById("cc").value;

    const indice = personas.findIndex(persona => persona.id === id);

    if (indice !== -1) {
        personas.splice(indice, 1);

        guardarEnLocalStorage();

        const tabla = document.getElementById("tdatos");
        const fila = tabla.getElementsByTagName("tr");

        for (let i = 0; i < fila.length; i++) {
            const celda = fila[i].getElementsByTagName("td");

            if (celda.length > 0 && celda[0].innerText === id) {
                fila[i].remove();
                alert("Datos eliminados correctamente.");
                return;
            }
        }
    } else {
        alert("No se puede eliminar, el ID no existe.");
    }
    limpiarCampos();
}



function actualizarFilaSeleccionada() {
  
    const id = document.getElementById("cc").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("email").value;
    const direccion = document.getElementById("Direccion").value;
    const telefono = document.getElementById("Telefono").value;
    const sueldo = document.getElementById("Sueldo").value;
    const tipoEmpleado = document.getElementById("Tipo").value;

   
    if (!id || !nombre || !correo || !direccion || !telefono || !sueldo || !tipoEmpleado) {
        alert("Por favor, complete todos los campos.");
        return;
    }
  
    const indice = personas.findIndex(persona => persona.id === id);
   
    if (indice !== -1) {
       
        personas[indice].nombre = nombre;
        personas[indice].correo = correo;
        personas[indice].direccion = direccion;
        personas[indice].telefono = telefono;
        personas[indice].sueldo = sueldo;
        personas[indice].tipoEmpleado = tipoEmpleado;
        guardarEnLocalStorage();
        const tabla = document.getElementById("tdatos");
        const filas = tabla.getElementsByTagName("tr");

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName("td");
            if (celdas.length > 0 && celdas[0].innerText === id) {
                celdas[1].innerText = nombre;
                celdas[2].innerText = correo;
                celdas[3].innerText = direccion;
                celdas[4].innerText = telefono;
                celdas[5].innerText = sueldo;
                celdas[6].innerText = tipoEmpleado;
                alert("Datos actualizados correctamente.");
                limpiarCampos();
                return;
                
            }
        }
    } else {
        alert("No se puede actualizar, el ID no existe.");
    }
    
}




function guardarEnLocalStorage() {
    localStorage.setItem('personas', JSON.stringify(personas));
    
}



function cargarDesdeLocalStorage() {
    const tabla = document.getElementById("tdatos");
    const personasStr = localStorage.getItem('personas');
    

    if (!personasStr) {
        alert("No hay datos almacenados en el localStorage.");
        return;
    }
    personas = JSON.parse(personasStr);
    tabla.innerHTML = '<tr><th>DI</th><th>Nombre</th><th>Correo</th><th>Dirección</th><th>Teléfono</th><th>Sueldo</th><th>Tipo Empleado</th></tr>';
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        const filaHTML = `<tr><td>${persona.id}</td><td>${persona.nombre}</td><td>${persona.correo}</td><td>${persona.direccion}</td><td>${persona.telefono}</td><td>${persona.sueldo}</td><td>${persona.tipoEmpleado}</td></tr>`;
        tabla.innerHTML += filaHTML;
        
    }

    alert("Datos cargados correctamente.");
}


