export default class ZonaMetropolitanaClass {
  constructor(administacionZonal) {
    this.administacionZonal = administacionZonal;
    this.parroquias = [];
  }

  agregarParroquia(parroquia) {
    this.parroquias.push(parroquia);
  }
  obtenerParroquias() {
    return this.parroquias;
  }
  obtenerAdministracionZonal() {
    return this.administacionZonal;
  }
  obtenerParroquia(nombre) {
    return this.parroquias.find(parroquia => parroquia.nombre === nombre);
  }

  eliminarParroquia(nombre) {
    this.parroquias = this.parroquias.filter(parroquia => parroquia.nombre!== nombre);
  }
}