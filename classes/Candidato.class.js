import Persona from "./Persona.class";

export default class Candidato extends Persona {
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
    this.dignidad = null;
    this.lista = null;
  }

  establecerDignidad(dignidad) {
    this.dignidad = dignidad;
  }

  establecerLista(lista) {
    this.lista = lista;
  }

  obtenerTipoDignidad() {
    return this.dignidad;
  }

  obtenerLista() {
    return this.lista;
  }
}
