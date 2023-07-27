import { Dimensions, StyleSheet } from "react-native";
import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

export const homeScreenStyles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    gap: 16,
    // flex: 1,
    paddingBottom: 16,
  },

  goToWallet: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
  },
});
