import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "./screens/IntroScreen";
import InicioSesionScreen from "./screens/InicioSesionScreen";
import RegistroScreen from "./screens/RegistroScreen";
import CandidatoScreen from "./screens/CandidatoScreen";
import VotanteScreen from "./screens/VotanteScreen";
import InscribirseScreen from "./screens/InscribirseScreen";
import InformacionListaScreen from "./screens/InformacionListaScreen";
import VotarScreen from "./screens/VotarScreen";
import CertificadoScreen from "./screens/CertificadoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"InicioSesionScreen"}
          component={InicioSesionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"RegistroScreen"}
          component={RegistroScreen}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name={"CandidatoScreen"}
          component={CandidatoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"InscribirseScreen"}
          component={InscribirseScreen}
          options={{ title: "Inscribirse", animation: "slide_from_right" }}
        />
        <Stack.Screen
          name={"InformacionListaScreen"}
          component={InformacionListaScreen}
          options={{ title: "Informacion Lista" }}
        />
        <Stack.Screen
          name={"VotanteScreen"}
          component={VotanteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"VotarScreen"}
          component={VotarScreen}
          options={{ title: "Votar" }}
        />
        <Stack.Screen
          name={"CertificadoScreen"}
          component={CertificadoScreen}
          options={{ title: "Certificado" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
