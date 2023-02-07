import { Alert, Text, View } from "react-native";
import InscribirseTarjeta from "../components/InscribirseTarjeta";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";
import { useRef } from "react";

const InscribirseScreen = ({ navigation, route }) => {
  const { listas, usuario } = route.params;
  const animacionYaRegistrado = useRef(null);

  const controlarInscripcion = (lista) => {
    switch (usuario.obtenerTipoDignidad()) {
      case "ALCALDE":
        console.log(`Inscribiendo alcalde en ${lista.obtenerNombrePartido()}`);
        usuario.establecerLista(lista);
        lista.establecerCandidatoAlcalde(usuario);
        break;
      case "PREFECTO":
        console.log(`Inscribiendo prefecto en ${lista.obtenerNombrePartido()}`);
        usuario.establecerLista(lista);
        lista.establecerCandidatoPrefecto(usuario);
        break;
      case "CONCEJAL":
        console.log(`Inscribiendo concejal en ${lista.obtenerNombrePartido()}`);
        usuario.establecerLista(lista);
        lista.agregarConcejal(usuario);
        break;
    }
    axios
      .patch(
        `http://192.168.100.72:4000/api/personas/candidato/lista/${usuario.obtenerCedula()}?numero=${lista.obtenerNumero()}`
      )
      .then(() => {
        Alert.alert(
          "Exito",
          "Se ha inscrito correctamente a su lista.\nVuelva a iniciar sesion cuando desee revisar resultados o consultar informacion de su lista"
        );
        navigation.replace("InicioSesionScreen");
      })
      .catch(() => {
        Alert.alert("Error", "No se ha podido inscribir a su lista");
      });
  };

  if (!usuario.puedeInscribirse()) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AnimatedLottieView
          source={require("../assets/mbyaregistrado.json")}
          ref={animacionYaRegistrado}
          onLayout={() => {
            animacionYaRegistrado.current?.play();
          }}
          colorFilters={[{ color: "#FFC107", keypath: "Bia ho so" }]}
          autoSize
        />
        <Text style={{ width: "70%", textAlign: "center" }}>
          Ya estas registrado en una lista, ahora puedes consultar la
          informacion de tu lista en Informacion Lista
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontWeight: "bold",
          marginHorizontal: 15,
        }}
      >
        Selecciona la lista a la que te inscribiras como{" "}
        {usuario.obtenerTipoDignidad()}
      </Text>
      {listas.map((lista, index) => {
        const disponible = () => {
          switch (usuario.obtenerTipoDignidad()) {
            case "ALCALDE":
              return !lista.puedeInscribirseAlcalde();
            case "PREFECTO":
              return !lista.puedeInscribirsePrefecto();
            case "CONCEJAL":
              return !lista.puedeInscribirseConcejal();
          }
        };
        return (
          <InscribirseTarjeta
            key={index}
            lista={lista}
            onPress={() => {
              controlarInscripcion(lista);
            }}
            desactivado={disponible()}
          />
        );
      })}
    </View>
  );
};

export default InscribirseScreen;
