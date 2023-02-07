import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 15,
    paddingVertical: 10,
    width: "80%",
    borderRadius: 4,
    backgroundColor: "white",
    elevation: 5,
  },
});

const Papeleta = ({
  lista,
  onPress,
  dignidad,
  dignidades,
  seleccionada = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {lista.obtenerNombrePartido()}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {lista.obtenerNumero()}
      </Text>
      {dignidad && (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {dignidad.dignidad}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {dignidad.nombres.join(" ") + " " + dignidad.apellidos.join(" ")}
          </Text>
        </>
      )}
      {dignidades && (
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Concejales</Text>
      )}
      {dignidades &&
        dignidades.map((dignidad, index) => (
          <View key={index + 20} style={{ alignItems: "center" }}>
            <Text key={index}>Concejal #{index + 1}</Text>
            <Text key={index + 10}>
              {dignidad.nombres.join(" ") + " " + dignidad.apellidos.join(" ")}
            </Text>
          </View>
        ))}
      <View style={{ marginTop: 15 }}>
        <Checkbox value={seleccionada} />
      </View>
    </TouchableOpacity>
  );
};

export default Papeleta;
