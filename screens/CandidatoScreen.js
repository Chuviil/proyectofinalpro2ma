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
  inscribirse: {
    SVG: require("../assets/votesvgbtn.svg").default,
    title: "Inscribirse",
    description: "Inscribete en tu lista",
    color: "#09936e",
  },
  resultados: {
    SVG: require("../assets/resultsvgbtn.svg").default,
    title: "Resultados",
    description: "Revisa los resultados de las votaciones",
    color: "#f3eb66",
  },
  informacionLista: {
    SVG: require("../assets/certificatesvgbtn.svg").default,
    title: "Informacion Lista",
    description: "Visualiza la informacion de tu lista",
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

const CandidatoScreen = ({ navigation, route }) => {
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
            card={cards.inscribirse}
            onPress={() => {
              navigation.navigate("InscribirseScreen", { listas, usuario });
            }}
          />
          <BotonTarjeta card={cards.resultados} />
          <BotonTarjeta
            card={cards.informacionLista}
            onPress={() => {
              navigation.navigate("InformacionListaScreen", { usuario });
            }}
          />
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

export default CandidatoScreen;
