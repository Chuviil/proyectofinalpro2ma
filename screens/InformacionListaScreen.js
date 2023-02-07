import { StyleSheet, Text, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useRef } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const InformacionListaScreen = ({ route }) => {
  const { usuario } = route.params;
  const animation = useRef(null);

  if (usuario.puedeInscribirse()) {
    return (
      <View style={styles.container}>
        <AnimatedLottieView
          source={require("../assets/mbnovoted.json")}
          ref={animation}
          onLayout={() => {
            animation.current?.play();
          }}
          style={{ width: 350, height: 350 }}
        />
        <Text style={{ textAlign: "center", width: "80%" }}>
          Primero debes inscribirte en una lista para visualizar la informacion
          de la misma
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Lista #{usuario.obtenerLista().numero}
      </Text>
      <Text style={{ fontSize: 18 }}>
        Partido {usuario.obtenerLista().nombrePartido}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Alcalde: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatoAlcalde?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatoAlcalde?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Prefecto: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatoPrefecto?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatoPrefecto?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 1: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[0]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[0]?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 2: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[1]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[1]?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 3: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[2]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[2]?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 4: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[3]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[3]?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 5: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[4]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[4]?.apellidos.join(" ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Concejal 6: </Text>
        <Text style={{ fontSize: 16 }}>
          {usuario.obtenerLista().candidatosConsejal[5]?.nombres.join(" ") +
            " " +
            usuario.obtenerLista().candidatosConsejal[5]?.apellidos.join(" ")}
        </Text>
      </View>
    </View>
  );
};

export default InformacionListaScreen;
