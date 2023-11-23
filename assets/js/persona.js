
class Persona {
    constructor(id, nombre, correo, direccion, telefono, sueldo, tipoEmpleado) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.sueldo = sueldo;
        this.tipoEmpleado = tipoEmpleado;
    }

    obtenerFilaHTML() {
        return `<tr>
                    <td>${this.id}</td>
                    <td>${this.nombre}</td>
                    <td>${this.correo}</td>
                    <td>${this.direccion}</td>
                    <td>${this.telefono}</td>
                    <td>${this.sueldo}</td>
                    <td>${this.tipoEmpleado}</td>
                </tr>`;
    }
}
