import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Candidato from "../classes/Candidato.class";
import AnimatedLottieView from "lottie-react-native";
import Votante from "../classes/Votante.class";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#b9b9b9",
    borderRadius: 5,
    padding: 5,
    width: "60%",
    marginBottom: 15,
  },
  inputInvalido: {
    borderWidth: 1,
    borderColor: "#e12626",
    borderRadius: 5,
    padding: 5,
    width: "60%",
    marginBottom: 15,
  },
  ingresarBtn: {
    width: "40%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#303030",
  },
  ingresarBtnDesactivado: {
    width: "40%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#737373",
  },
});

const InicioSesionScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState({ valida: false, valor: "" });
  const [contrasenia, setContrasenia] = useState({ valida: false, valor: "" });
  const [puedeIniciarSesion, setPuedeIniciarSesion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const animacion = useRef(null);

  useEffect(() => {
    setPuedeIniciarSesion(cedula.valida && contrasenia.valida);
  }, [cedula, contrasenia]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <AnimatedLottieView
          source={require("../assets/mbloading.json")}
          ref={animacion}
          onLayout={() => {
            animacion.current?.play();
          }}
        />
      </View>
    );
  }

  const controlarCedula = (valor) => {
    setCedula({
      valida: valor.length === 10 && /^\d+$/.test(valor),
      valor,
    });
    setContrasenia({
      valida:
        contrasenia.valor.indexOf(" ") === -1 && contrasenia.valor.length > 0,
      valor: contrasenia.valor,
    });
  };

  const controlarContrasenia = (valor) => {
    setContrasenia({
      valida: valor.indexOf(" ") === -1 && valor.length > 0,
      valor,
    });
  };

  const controlarInicioSesion = () => {
    setCargando(true);
    console.log(
      `Iniciando sesión: Cedula: ${cedula.valor} Contrasenia:${contrasenia.valor}`
    );
    axios
      .get(
        `https://proyectofinalprogii.onrender.com/api/personas/${cedula.valor}`,
        {
          params: { contrasenia: contrasenia.valor },
        }
      )
      .then((res) => {
        const { __t } = res.data;
        let usuario;
        if (__t === "Candidato") {
          console.log("El usuario es candidato");
          const {
            nombres,
            apellidos,
            cedula,
            contrasenia,
            dignidad,
            fechaNacimiento,
            genero,
            lista,
            parroquia,
          } = res.data;
          usuario = new Candidato(
            nombres,
            apellidos,
            fechaNacimiento,
            cedula,
            contrasenia,
            parroquia,
            genero
          );
          usuario.establecerLista(lista);
          usuario.establecerDignidad(dignidad);
          console.log(`Datos de usuario: ${JSON.stringify(usuario)}`);
          navigation.replace("CandidatoScreen", { usuario });
        } else {
          console.log("El usuario es votante");
          const {
            nombres,
            apellidos,
            cedula,
            contrasenia,
            fechaNacimiento,
            genero,
            parroquia,
            voto,
          } = res.data;
          usuario = new Votante(
            nombres,
            apellidos,
            fechaNacimiento,
            cedula,
            contrasenia,
            parroquia,
            genero
          );
          usuario.establecerEstadoVoto(voto);
          console.log(`Datos de usuario: ${JSON.stringify(usuario)}`);
          navigation.replace("VotanteScreen", { usuario });
        }
      })
      .catch((e) => {
        Alert.alert("Error", "Cedula o contraseña incorrecta");
        console.log(e);
        setCargando(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{ width: "60%", color: cedula.valida ? "black" : "#e12626" }}
      >
        Cedula
      </Text>
      <TextInput
        placeholder={"Cedula"}
        keyboardType={"number-pad"}
        style={cedula.valida ? styles.input : styles.inputInvalido}
        onChangeText={(valor) => controlarCedula(valor)}
        value={cedula.valor}
      />
      <Text
        style={{
          width: "60%",
          color: contrasenia.valida ? "black" : "#e12626",
        }}
      >
        Contraseña
      </Text>
      <TextInput
        placeholder={"Contraseña"}
        style={contrasenia.valida ? styles.input : styles.inputInvalido}
        onChangeText={(valor) => controlarContrasenia(valor)}
        value={contrasenia.valor}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={
          puedeIniciarSesion
            ? styles.ingresarBtn
            : styles.ingresarBtnDesactivado
        }
        onPress={controlarInicioSesion}
        disabled={!puedeIniciarSesion}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("RegistroScreen")}
      >
        <Text>Registrarse</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default InicioSesionScreen;