import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRef, useState } from "react";
import Papeleta from "../components/Papeleta";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";

const VotarScreen = ({ route, navigation }) => {
  const { listas, eleccion, usuario } = route.params;
  const [papeletaAMostrar, setPapeletaAMostrar] = useState(1);
  const [alcaldeSeleccionado, setAlcaldeSeleccionado] = useState({
    seleccionado: null,
    candidato: null,
  });
  const [prefectoSeleccionado, setPrefectoSeleccionado] = useState({
    seleccionado: null,
    candidato: null,
  });
  const [listaconcejalesSeleccionado, setListaConcejalesSeleccionada] =
    useState({ seleccionado: null, candidatos: null });

  const controladorBotonSiguiente = () => {
    if (papeletaAMostrar >= 3) return;
    setPapeletaAMostrar(papeletaAMostrar + 1);
  };
  const animacion = useRef(null);

  const controladorBotonAnterior = () => {
    if (papeletaAMostrar <= 1) return;
    setPapeletaAMostrar(papeletaAMostrar - 1);
  };

  const controlarFinalizarVotacion = () => {
    const votoElectronico = usuario.votar(
      alcaldeSeleccionado?.candidato,
      prefectoSeleccionado?.candidato,
      listaconcejalesSeleccionado?.candidatos
    );
    console.log(`El usuario voto:`);
    console.log(votoElectronico);
    eleccion.agregarVotoElectronico(votoElectronico);

    axios
      .patch(`http://192.168.100.72:4000/api/votosElectronicos/`, {
        alcalde: alcaldeSeleccionado.candidato
          ? alcaldeSeleccionado.candidato
          : null,
        prefecto: prefectoSeleccionado.candidato
          ? prefectoSeleccionado.candidato
          : null,
        listaconcejales: listaconcejalesSeleccionado.candidatos
          ? listaconcejalesSeleccionado.candidatos
          : null,
        fechaVotacion: new Date(),
        parroquia: usuario.obtenerParroquia(),
        votanteC: usuario.obtenerCedula(),
      })
      .then(() => {
        Alert.alert(
          "Exito",
          "Tu voto se realizo con exito.\nVuelve a Iniciar sesion una vez hayan finalizado las votaciones o cuando desees revisar tu certificado de votacion"
        );
        navigation.replace("InicioSesionScreen");
      })
      .catch(() => {});
  };

  if (!usuario.puedeVotar()) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AnimatedLottieView
          source={require("../assets/mbyaregistrado.json")}
          ref={animacion}
          onLayout={() => {
            animacion.current?.play();
          }}
          colorFilters={[{ color: "#FFC107", keypath: "Bia ho so" }]}
          autoSize
        />
        <Text style={{ width: "70%", textAlign: "center" }}>
          Ya realizaste tu votacion, dirigete a Certificado para visualizar tu
          Certificado de Votacion
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {papeletaAMostrar === 1 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Papeleta
                key={index}
                lista={lista}
                dignidad={lista.obtenerCandidatoAlcalde()}
                onPress={() => {
                  setAlcaldeSeleccionado({
                    seleccionado: lista.obtenerNumero(),
                    candidato: lista.obtenerCandidatoAlcalde(),
                  });
                }}
                seleccionada={
                  alcaldeSeleccionado.seleccionado === lista.obtenerNumero()
                }
              />
            );
          }
        })}
      {papeletaAMostrar === 2 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Papeleta
                key={index}
                lista={lista}
                dignidad={lista.obtenerCandidatoPrefecto()}
                onPress={() => {
                  setPrefectoSeleccionado({
                    seleccionado: lista.obtenerNumero(),
                    candidato: lista.obtenerCandidatoPrefecto(),
                  });
                }}
                seleccionada={
                  prefectoSeleccionado.seleccionado === lista.obtenerNumero()
                }
              />
            );
          }
        })}
      {papeletaAMostrar === 3 &&
        listas.map((lista, index) => {
          if (lista.esValida()) {
            return (
              <Papeleta
                key={index}
                lista={lista}
                dignidades={lista.obtenerCandidatosConcejal()}
                onPress={() => {
                  setListaConcejalesSeleccionada({
                    seleccionado: lista.obtenerNumero(),
                    candidatos: lista.obtenerCandidatosConcejal(),
                  });
                }}
                seleccionada={
                  listaconcejalesSeleccionado.seleccionado ===
                  lista.obtenerNumero()
                }
              />
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
          onPress={controlarFinalizarVotacion}
        >
          <Text>Finalizar Votacion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VotarScreen;
