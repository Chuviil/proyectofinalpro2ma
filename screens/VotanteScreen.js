import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BotonTarjeta from "../components/BotonTarjeta";

const cards = {
  vote: {
    SVG: require("../assets/votesvgbtn.svg").default,
    title: "Votar",
    description: "Realiza tu votacion",
    color: "#09936e",
  },
  resultados: {
    SVG: require("../assets/resultsvgbtn.svg").default,
    title: "Resultados",
    description: "Revisa los resultados de las votaciones",
    color: "#f3eb66",
  },
  certificado: {
    SVG: require("../assets/certificatesvgbtn.svg").default,
    title: "Certificado",
    description: "Visualiza tu certificado de votacion",
    color: "#4653cb",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 25,
  },
  salirBtn: {
    width: "90%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#b73232",
    alignSelf: "center",
  },
});

const VotanteScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { usuario, listas, eleccion } = route.params;
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingRight: insets.right + 8,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 8,
        },
      ]}
    >
      <ScrollView>
        <Text style={styles.title}>
          {usuario.obtenerGenero() === "MASCULINO"
            ? "Bienvenido"
            : "Bienvenida"}
        </Text>
        <Text>{usuario.obtenerNombreCompleto()}</Text>
        <View style={styles.btnContainer}>
          <BotonTarjeta
            card={cards.vote}
            onPress={() => {
              navigation.navigate("VotarScreen", { listas });
            }}
          />
          <BotonTarjeta card={cards.resultados} />
          <BotonTarjeta card={cards.certificado} />
        </View>
        <TouchableOpacity
          style={styles.salirBtn}
          onPress={() => {
            navigation.replace("InicioSesionScreen");
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Cerrar Sesion
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VotanteScreen;
