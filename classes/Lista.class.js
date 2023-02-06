export default class Lista {
  constructor(nombrePartido, numero) {
    this.nombrePartido = nombrePartido;
    this.numero = numero;
    this.candidatoAlcalde = null;
    this.candidatoPrefecto = null;
    this.candidatosConcejal = [];
    this.votosAlcalde = 0;
    this.votosPrefecto = 0;
    this.votosConcejales = 0;
  }

  obtenerNombrePartido() {
    return this.nombrePartido;
  }

  obtenerNumero() {
    return this.numero;
  }

  obtenerCandidatoAlcalde() {
    return this.candidatoAlcalde;
  }

  obtenerCandidatoPrefecto() {
    return this.candidatoPrefecto;
  }

  esValida() {
    return this.candidatoAlcalde!== null && this.candidatoPrefecto!== null && this.candidatosConcejal >= 6;
  }

  obtenerCandidatosConcejal() {
    return this.candidatosConcejal;
  }

  agregarConcejal(candidato) {
    this.candidatosConcejal.push(candidato);
  }

  establecerCandidatoAlcalde(candidato) {
    this.candidatoAlcalde = candidato;
  }

  establecerCandidatoPrefecto(candidato) {
    this.candidatoPrefecto = candidato;
  }

  puedeInscribirseAlcalde() {
    return this.candidatoAlcalde === null;
  }

  puedeInscribirsePrefecto() {
    return this.candidatoPrefecto === null;
  }

  puedeInscribirseConcejal() {
    return this.candidatosConcejal.length < 7;
  }

  incrementarVotosAlcalde() {
    this.votosAlcalde++;
  }

  incrementarVotosPrefecto() {
    this.votosPrefecto++;
  }

  incrementarVotosConcejales() {
    this.votosConcejales++;
  }
}
