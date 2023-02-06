import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";

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
    marginVertical: 15,
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
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    width: "60%",
  },
});

const RegistroScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState({ valida: false, valor: "" });
  const [nombres, setNombres] = useState({ validos: false, valor: [] });
  const [apellidos, setApellidos] = useState({ validos: false, valor: [] });
  const [contrasenia, setContrasenia] = useState({ valida: false, valor: "" });
  const [fechaNacimiento, setFechaNacimiento] = useState({
    valida: true,
    valor: new Date(new Date().getTime() - 18 * 365.25 * 24 * 60 * 60 * 1000),
  });
  const [genero, setGenero] = useState("MASCULINO");
  const [dignidad, setDignidad] = useState("ALCALDE");
  const [parroquia, setParroquia] = useState("NANEGAL");
  const [esCandidato, setEsCandidato] = useState(false);
  const [puedeRegistrarse, setPuedeRegistrarse] = useState(false);
  const animacion = useRef(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setPuedeRegistrarse(
      cedula.valida &&
        nombres.validos &&
        apellidos.validos &&
        contrasenia.valida
    );
  }, [cedula, nombres, apellidos, contrasenia]);

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

  const controlarNombres = (valor) => {
    setNombres({
      validos: /^[a-zA-Z\s]+$/.test(valor) && valor[0] !== " ",
      valor: valor.split(" "),
    });
  };

  const controlarApellidos = (valor) => {
    setApellidos({
      validos: /^[a-zA-Z\s]+$/.test(valor) && valor[0] !== " ",
      valor: valor.split(" "),
    });
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: "date",
      onChange: (valor) => {
        setFechaNacimiento({
          ...fechaNacimiento,
          valor: new Date(valor.nativeEvent.timestamp),
        });
      },
      value: fechaNacimiento.valor,
      is24Hour: true,
      maximumDate: new Date(
        new Date().getTime() - 18 * 365.25 * 24 * 60 * 60 * 1000
      ),
      minimumDate: new Date("1923-01-02"),
    });
  };

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

  const registrarUsuario = () => {
    setCargando(true);
    console.log(
      `Registrando usuario con: 
      Cedula: ${cedula.valor}
      Nombres: ${nombres.valor}
      Apellidos: ${apellidos.valor}
      Contrasenia: ${contrasenia.valor}
      FechaNacimiento: ${fechaNacimiento.valor}
      Genero: ${genero}
      Parroquia: ${parroquia}
      Dignidad: ${dignidad}`
    );
    axios
      .post("https://proyectofinalprogii.onrender.com/api/personas", {
        nombres: nombres.valor,
        apellidos: apellidos.valor,
        cedula: cedula.valor,
        fechaNacimiento: fechaNacimiento.valor,
        contrasenia: contrasenia.valor,
        parroquia,
        genero,
        dignidad: esCandidato ? dignidad : null,
      })
      .then((res) => {
        console.log(`Correctamente registrado: ${res.data}`);
        Alert.alert(
          "Exito",
          "Correctamente registrado, ahora puede iniciar sesión"
        );
        navigation.goBack();
      })
      .catch((e) => {
        setCargando(false);
        Alert.alert(
          "Error",
          e.response.data.message
            ? e.response.data.message
            : "Ocurrio un error, vuelava a intentarlo"
        );
        console.log(e);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 50,
            width: "60%",
            color: cedula.valida ? "black" : "#e12626",
          }}
        >
          Cedula
        </Text>
        <TextInput
          placeholder={"Cedula"}
          keyboardType={"numeric"}
          style={cedula.valida ? styles.input : styles.inputInvalido}
          onChangeText={(valor) => controlarCedula(valor)}
          value={cedula.valor}
        />
        <Text
          style={{ width: "60%", color: nombres.validos ? "black" : "#e12626" }}
        >
          Nombres
        </Text>
        <TextInput
          placeholder="Nombres"
          value={nombres.valor.join(" ")}
          onChangeText={(valor) => {
            controlarNombres(valor);
          }}
          style={nombres.validos ? styles.input : styles.inputInvalido}
        />
        <Text
          style={{
            width: "60%",
            color: apellidos.validos ? "black" : "#e12626",
          }}
        >
          Apellidos
        </Text>
        <TextInput
          placeholder="Apellidos"
          style={apellidos.validos ? styles.input : styles.inputInvalido}
          value={apellidos.valor.join(" ")}
          onChangeText={(valor) => {
            controlarApellidos(valor);
          }}
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
        />
        <Text
          style={{
            width: "60%",
          }}
        >
          Fecha de Nacimiento
        </Text>
        <TouchableOpacity
          style={[
            styles.input,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
          onPress={showDatePicker}
        >
          <Text>{fechaNacimiento.valor.toLocaleDateString()}</Text>
          <FontAwesomeIcon icon={faCalendar} />
        </TouchableOpacity>
        <Text
          style={{
            width: "60%",
          }}
        >
          Genero
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={genero}
            onValueChange={(seleccionado) => {
              setGenero(seleccionado);
            }}
          >
            <Picker.Item label="Masculino" value="MASCULINO" />
            <Picker.Item label="Femenino" value="FEMENINO" />
          </Picker>
        </View>
        <Text
          style={{
            width: "60%",
          }}
        >
          Parroquia
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={parroquia}
            onValueChange={(seleccionado) => {
              setParroquia(seleccionado);
            }}
          >
            <Picker.Item label="Nanegal" value="NANEGAL" />
            <Picker.Item label="Pacto" value="PACTO" />
            <Picker.Item
              label="Gualea y Nanegalito"
              value="GUALEA_Y_NANEGALITO"
            />
            <Picker.Item label="El Condado" value="EL_CONDADO" />
            <Picker.Item label="Ponceano" value="PONCEANO" />
            <Picker.Item
              label="San Antonio de Pichincha"
              value="SAN_ANTONIO_DE_PICHINCHA"
            />
            <Picker.Item label="Nono" value="NONO" />
            <Picker.Item label="Cotocollao" value="COTOCOLLAO" />
            <Picker.Item label="Pomasqui" value="POMASQUI" />
            <Picker.Item label="Calacali" value="CALACALI" />
            <Picker.Item label="Comite del Pueblo" value="COMITE_DEL_PUEBLO" />
            <Picker.Item label="Carcelen" value="CARCELEN" />
            <Picker.Item label="Calderon" value="CALDERON" />
            <Picker.Item label="Llano Chico" value="LLANO_CHICO" />
            <Picker.Item label="Nayon" value="NAYON" />
            <Picker.Item label="Zambiza" value="ZAMBIZA" />
            <Picker.Item label="Puellaro" value="PUELLARO" />
            <Picker.Item label="Chavezpamba" value="CHAVEZPAMBA" />
            <Picker.Item label="Atahualpa" value="ATAHUALPA" />
            <Picker.Item label="San Jose de Minas" value="SAN_JOSE_DE_MINAS" />
            <Picker.Item
              label="Perucho y Guayllabamba"
              value="PERUCHO_Y_GUAYLLABAMBA"
            />
            <Picker.Item label="La Concepcion" value="LA_CONCEPCION" />
            <Picker.Item label="Mariscal Sucre" value="MARISCAL_SUCRE" />
            <Picker.Item label="Belisario Quevedo" value="BELISARIO_QUEVEDO" />
            <Picker.Item
              label="San Isidro del Inca"
              value="SAN_ISIDRO_DEL_INCA"
            />
            <Picker.Item label="Rumipamba" value="RUMIPAMBA" />
            <Picker.Item label="Kennedy" value="KENNEDY" />
            <Picker.Item label="Iniaquito" value="INIAQUITO" />
            <Picker.Item label="Centro Historico" value="CENTRO_HISTORICO" />
            <Picker.Item
              label="Cochapamba y Jipijapa"
              value="COCHAPAMBA_Y_JIPIJAPA"
            />
            <Picker.Item label="Puengasi" value="PUENGASI" />
            <Picker.Item label="San Juan" value="SAN_JUAN" />
            <Picker.Item
              label="La Libertad e Itchimbia"
              value="LA_LIBERTAD_E_ITCHIMBIA"
            />
            <Picker.Item label="Chilibulo" value="CHILIBULO" />
            <Picker.Item label="San Bartolo" value="SAN_BARTOLO" />
            <Picker.Item label="Chimbacalle" value="CHIMBACALLE" />
            <Picker.Item label="La Argelia" value="LA_ARGELIA" />
            <Picker.Item label="Solanda" value="SOLANDA" />
            <Picker.Item label="Lloa" value="LLOA" />
            <Picker.Item label="La Mena" value="LA_MENA" />
            <Picker.Item label="La Magdalena" value="LA_MAGDALENA" />
            <Picker.Item label="La Ferroviaria" value="LA_FERROVIARIA" />
            <Picker.Item label="Chillogallo" value="CHILLOGALLO" />
            <Picker.Item label="Guamani" value="GUAMANI" />
            <Picker.Item label="Quitumbe" value="QUITUMBE" />
            <Picker.Item
              label="Turubamba y la Ecuatoriana"
              value="TURUBAMBA_Y_LA_ECUATORIANA"
            />
            <Picker.Item label="Conocoto" value="CONOCOTO" />
            <Picker.Item label="Pintag" value="PINTAG" />
            <Picker.Item label="Amaguania" value="AMAGUANIA" />
            <Picker.Item label="Alangasi" value="ALANGASÍ" />
            <Picker.Item
              label="Guangopolo y la Merced"
              value="GUANGOPOLO_Y_LA_MERCED"
            />
            <Picker.Item label="Tumbaco" value="TUMBACO" />
            <Picker.Item label="Cumbaya" value="CUMBAYA" />
            <Picker.Item label="Pifo" value="PIFO" />
            <Picker.Item label="Yaruqui" value="YARUQUI" />
            <Picker.Item label="El Quinche" value="EL_QUINCHE" />
            <Picker.Item label="Puembo" value="PUEMBO" />
            <Picker.Item label="Checa y Tababela" value="CHECA_Y_TABABELA" />
          </Picker>
        </View>
        <View
          style={{
            marginVertical: 15,
            width: "58%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Es candidato?</Text>
          <Checkbox value={esCandidato} onValueChange={setEsCandidato} />
        </View>
        {esCandidato && (
          <>
            <Text
              style={{
                width: "60%",
              }}
            >
              Dignidad
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={dignidad}
                onValueChange={(seleccionado) => {
                  setDignidad(seleccionado);
                }}
              >
                <Picker.Item label="Alcalde" value="ALCALDE" />
                <Picker.Item label="Prefecto" value="PREFECTO" />
                <Picker.Item label="Concejal" value="CONCEJAL" />
              </Picker>
            </View>
          </>
        )}
        <TouchableOpacity
          style={
            puedeRegistrarse
              ? styles.ingresarBtn
              : styles.ingresarBtnDesactivado
          }
          onPress={registrarUsuario}
          disabled={!puedeRegistrarse}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegistroScreen;
