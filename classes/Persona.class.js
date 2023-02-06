export default class Persona {
  constructor(
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero
  ) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.cedula = cedula;
    this.contrasenia = contrasenia;
    this.parroquia = parroquia;
    this.genero = genero;
  }

  obtenerNombreCompleto() {
    return this.nombres.join(" ") + " " + this.apellidos.join(" ");
  }

  obtenerNombres() {
    return this.nombres;
  }

  obtenerApellidos() {
    return this.apellidos;
  }

  obtenerFechaNacimiento() {
    return this.fechaNacimiento;
  }

  obtenerCedula() {
    return this.cedula;
  }

  obtenerParroquia() {
    return this.parroquia;
  }

  obtenerGenero() {
    return this.genero;
  }
}
