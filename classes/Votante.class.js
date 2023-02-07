import Persona from "./Persona.class";
import VotoElectronico from "./VotoElectronico.class";

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

  votar(candidatoAlcalde, candidatoPrefecto, listaConsejales) {
    this.voto = true;
    return new VotoElectronico(
      candidatoAlcalde,
      candidatoPrefecto,
      listaConsejales,
      new Date(),
      this.obtenerParroquia()
    );
  }
}
