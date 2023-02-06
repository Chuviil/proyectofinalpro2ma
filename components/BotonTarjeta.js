import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "color";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    height: 180,
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
});

const BotonTarjeta = ({
  card: { title, description, color: mainColor, SVG },
  onPress,
}) => {
  const darkenColor = Color(mainColor).darken(0.5).toString();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: mainColor }]}
    >
      <SVG width={90} height={90} fill={darkenColor} />
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

export default BotonTarjeta;
