import Persona from "./Persona.class";
import VotoElectronico from "./VotoElectronico.class";
import Eleccion from "./Eleccion.class";

export default class Votante extends Persona {
  constructor(
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero
  ) {
    super(
      nombres,
      apellidos,
      fechaNacimiento,
      cedula,
      contrasenia,
      parroquia,
      genero
    );
    this.voto = false;
  }

  puedeVotar() {
    return !this.voto;
  }

  establecerEstadoVoto(voto) {
    this.voto = voto;
  }

  votar(candidatoAlcalde, candidatoPrefecto, listaConsejales, parroquia) {
    this.voto = true;
    const votoActual = new VotoElectronico(
      candidatoAlcalde,
      candidatoPrefecto,
      listaConsejales,
      new Date(),
      parroquia
    );
    Eleccion.agregarVotoElectronico(votoActual);
  }
}
