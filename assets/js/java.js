var idsAgregados = []; 

function enviardatos() {
    var cc = document.getElementById("cc").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var rol = document.getElementById("rol").value;

    
    if (idsAgregados.includes(cc)) {
        alert("ID duplicado. No se pueden agregar datos duplicados.");
        return; 
    }

    
    idsAgregados.push(cc);

    var table = document.getElementById("tdatos");
    var newRow = table.insertRow(-1);

    var datos = [cc, nombre, email, password, confirm_password, rol];

    for (var i = 0; i < datos.length; i++) {
        var cell = newRow.insertCell(i);
        cell.innerHTML = datos[i];
    }
}

