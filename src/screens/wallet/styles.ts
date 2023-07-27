import { Dimensions, StyleSheet } from "react-native";

export const walletScreenStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    //gap: 16,
  },
  cpsLogo: {
    maxHeight: Dimensions.get("window").height * 0.1,
    maxWidth: Dimensions.get("window").width * 0.25,
    resizeMode: "contain",
  },
  fatecLogo: {
    maxHeight: Dimensions.get("window").height * 0.1,
    maxWidth: Dimensions.get("window").width * 0.29,
    resizeMode: "contain",
  },
  stateLogo: {
    maxHeight: Dimensions.get("window").height * 0.1,
    maxWidth: Dimensions.get("window").width * 0.32,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 80,
    backgroundColor: "#f1f1f1",
  },
  photo: {
    //top: -70,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 10,
    resizeMode: "cover",
    transform: [{ translateY: -50 }, { scale: 1.15 }],
  },
  textArea: {
    backgroundColor: "#B20000",
    flex: 1,
  },
  textAreaHeader: {
    paddingTop: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },

  textStudentName: {
    color: "#fff",
    textAlign: "center",
  },

  textAreaHeaderInfo1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  textAreaHeaderInfo2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
