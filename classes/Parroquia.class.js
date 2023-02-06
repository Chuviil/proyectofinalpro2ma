export default class Parroquia {
  constructor(nombre) {
    this.nombre = nombre;
    this.votantes = [];
  }

  obtenerNombre() {
    return this.nombre;
  }

  obtenerVotantes() {
    return this.votantes;
  }

  agregarVotante(votante) {
    this.votantes.push(votante);
  }
}