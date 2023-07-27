import { StyleSheet } from "react-native";

export const gradeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButtons: {
    flexGrow: 0,
  },
  segmentedButtonsContent: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
    padding: 16,
  },
  noClassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
