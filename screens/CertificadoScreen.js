import { Text, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useRef } from "react";

const CertificadoScreen = ({ route }) => {
  const { usuario } = route.params;
  const animation = useRef(null);

  if (usuario.puedeVotar()) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AnimatedLottieView
          source={require("../assets/mbnovoted.json")}
          ref={animation}
          onLayout={() => {
            animation.current?.play();
          }}
          style={{ width: 350, height: 350 }}
        />
        <Text style={{ width: "70%", textAlign: "center" }}>
          Para visualizar el certificado de votacion necesitas votar primero
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>
        Certificado de Votacion
      </Text>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Nombres: </Text>
        <Text>{usuario.obtenerNombres().join(" ")}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Apellidos: </Text>
        <Text>{usuario.obtenerApellidos().join(" ")}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Cedula: </Text>
        <Text>{usuario.obtenerCedula()}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Parroquia: </Text>
        <Text>{usuario.nombreParroquia}</Text>
      </View>
    </View>
  );
};

export default CertificadoScreen;
