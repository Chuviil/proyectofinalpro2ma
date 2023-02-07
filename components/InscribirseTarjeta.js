import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  btn: {
    width: "30%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFC107",
  },
  btnDesactivado: {
    width: "30%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#D3D3D3",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});

const InscribirseTarjeta = ({ lista, onPress, desactivado }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Lista {lista.obtenerNumero()}
      </Text>
      <Text style={{ fontSize: 17, marginVertical: 10 }}>
        {lista.obtenerNombrePartido()}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={desactivado ? styles.btnDesactivado : styles.btn}
        disabled={desactivado}
      >
        <Text style={{ textAlign: "center", color: "#333333" }}>
          Inscribirse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InscribirseTarjeta;
