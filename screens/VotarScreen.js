import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const VotarScreen = ({ route }) => {
  const { listas } = route.params;
  const [papeletaAMostrar, setPapeletaAMostrar] = useState(1);

  const controladorBotonSiguiente = () => {
    if (papeletaAMostrar >= 3) return;
    setPapeletaAMostrar(papeletaAMostrar + 1);
  };

  const controladorBotonAnterior = () => {
    if (papeletaAMostrar <= 1) return;
    setPapeletaAMostrar(papeletaAMostrar - 1);
  };

  return (
    <View style={{ flex: 1 }}>
      {papeletaAMostrar === 1 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Text key={index}>Alcalde: {lista.obtenerNombrePartido()}</Text>
            );
          }
        })}
      {papeletaAMostrar === 2 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Text key={index}>Prefecto: {lista.obtenerNombrePartido()}</Text>
            );
          }
        })}
      {papeletaAMostrar === 3 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Text key={index}>
                Concejales: {lista.obtenerNombrePartido()}
              </Text>
            );
          }
        })}
      {papeletaAMostrar <= 2 && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={controladorBotonSiguiente}
        >
          <Text>Siguiente Papeleta</Text>
        </TouchableOpacity>
      )}
      {papeletaAMostrar > 1 && (
        <TouchableOpacity
          onPress={controladorBotonAnterior}
          style={{ position: "absolute", bottom: 20, left: 20 }}
        >
          <Text>Anterior Papeleta</Text>
        </TouchableOpacity>
      )}
      {papeletaAMostrar === 3 && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <Text>Finalizar Votacion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VotarScreen;
