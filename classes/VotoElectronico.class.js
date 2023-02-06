export default class VotoElectronico {
  constructor(
    candidatoAlcalde,
    candidatoPrefecto,
    listaConsejales,
    fechaVotacion,
    parroquia
  ) {
    this.candidatoAlcalde = candidatoAlcalde;
    this.candidatoPrefecto = candidatoPrefecto;
    this.listaConsejales = listaConsejales;
    this.fechaVotacion = fechaVotacion;
    this.parroquia = parroquia;
  }

  esValido() {
    return (
      this.candidatoAlcalde !== null &&
      this.candidatoPrefecto !== null &&
      this.listaConsejales !== null
    );
  }

  esBlanco() {
    return (
      this.candidatoAlcalde === null ||
      this.candidatoPrefecto === null ||
      this.listaConsejales === null
    );
  }

  obtenerCandidatoAlcalde() {
    return this.candidatoAlcalde;
  }

  obtenerCandidatoPrefecto() {
    return this.candidatoPrefecto;
  }

  obtenerListaConsejales() {
    return this.listaConsejales;
  }

}
