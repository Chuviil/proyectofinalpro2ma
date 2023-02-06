export default class Eleccion {
  constructor() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.alcaldeGanador = null;
    this.prefectoGanador = null;
    this.listaConsejalesGanadora = null;
  }

  static votosElectronicos = [];

  establecerFechaInicio(fechaInicio) {
    this.fechaInicio = fechaInicio;
  }

  establecerFechaFin(fechaFin) {
    this.fechaFin = fechaFin;
  }

  static agregarVotoElectronico(votoElectronico) {
    this.votosElectronicos.push(votoElectronico);
  }

  obtenerFechaInicio() {
    return this.fechaInicio;
  }

  obtenerFechaFin() {
    return this.fechaFin;
  }

  obtenerAcaldeGanador() {
    return this.alcaldeGanador;
  }

  obtenerPrefectoGanador() {
    return this.prefectoGanador;
  }

  obtenerListaConsejalesGanadora() {
    return this.listaConsejalesGanadora;
  }

  obtenerVotosValidos() {
    return this.votosElectronicos.filter((voto) => voto.esValido());
  }

  obtenerVotosBlancos() {
    return this.votosElectronicos.filter((voto) => voto.esBlanco());
  }

  calcularResultados() {
    this.votosElectronicos.forEach((votoElectronico) => {
      if (votoElectronico.esValido()){

      }
    })
  }
}