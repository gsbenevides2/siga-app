import { Dimensions, StyleSheet } from "react-native";

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Dimensions.get("screen").width * 0.1,
    // justifyContent: "center",
    gap: 10,
  },
  textInput: {
    width: "90%",
  },
  button: {
    width: "85%",
    marginTop: 20,
  },
  logo: {
    width: "45%",
    height: 200,
    resizeMode: "contain",
  },
});
