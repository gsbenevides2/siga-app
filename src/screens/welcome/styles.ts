import { Dimensions, StyleSheet } from "react-native";

export const welcomeScreenStyles = StyleSheet.create({
  container: {
    // flex: 1,
    //justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  textArea: {
    // flex: 1,
    width: Dimensions.get("window").width - 32,
  },

  content: {
    // flex: 1,
  },

  paragraph: {
    textAlign: "justify",
  },

  paragraphAndBold: {
    textAlign: "justify",
    fontWeight: "bold",
  },
  button: {
    width: "90%",
  },
});
