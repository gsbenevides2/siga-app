import { Image, ImageBackground, View } from "react-native";
import { Text, adaptNavigationTheme, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { walletScreenStyles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StudentData } from "siga-fatec/src/types";
import { SigaSingleton } from "../../services/siga";
import { darkTheme, lightTheme } from "../../theme/themes";

function retriveDate(ra: string) {
  const year = ra.substring(6, 8);
  const semester = ra.substring(8, 9);

  if (semester === "1") {
    return "02/" + year;
  } else {
    return "07/" + year;
  }
}

function retrivePeriod(ra: string) {
  const semester = ra.substring(8, 9);
  const year = ra.substring(6, 8);

  if (semester === "1") {
    return "12/" + parseInt(year) + 3;
  }
  return "06/" + (parseInt(year) + 4);
}

export function WalletScreen() {
  const [studentData, setStudentData] = useState<StudentData>();
  const theme = useTheme();
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#590000");
    return () => {
      const navigationsTheme = adaptNavigationTheme({
        reactNavigationLight: lightTheme,
        //@ts-ignore
        reactNavigationDark: darkTheme,
      });

      const navTheme = theme.dark
        ? navigationsTheme.DarkTheme
        : navigationsTheme.LightTheme;

      NavigationBar.setBackgroundColorAsync(navTheme.colors.background);
    };
  }, []);

  useEffect(() => {
    const studentData = SigaSingleton.getInstace().getStudentData();
    setStudentData(studentData);
  }, []);

  if (!studentData) return <View></View>;

  return (
    <SafeAreaView style={walletScreenStyles.container}>
      <StatusBar style="dark" />
      <View style={walletScreenStyles.header}>
        <Image
          source={require("../../assets/fatec_logo.png")}
          style={walletScreenStyles.fatecLogo}
        />
        <Image
          source={require("../../assets/cps_logo.png")}
          style={walletScreenStyles.cpsLogo}
        />
        <Image
          source={require("../../assets/gov_logo.png")}
          style={walletScreenStyles.stateLogo}
        />
      </View>
      <View style={walletScreenStyles.content}>
        <Image
          source={{
            uri: studentData.photoUrl,
          }}
          style={walletScreenStyles.photo}
        />
        <ImageBackground
          source={require("../../assets/wallet_bg.png")}
          style={walletScreenStyles.textArea}
        >
          <View style={walletScreenStyles.textAreaHeader}>
            <Text variant="titleMedium" style={walletScreenStyles.text}>
              {studentData.studentName}
            </Text>
            <Text variant="bodyMedium" style={walletScreenStyles.text}>
              {studentData.courseName}
            </Text>
            <Text variant="bodyMedium" style={walletScreenStyles.text}>
              {studentData.collegeName}
            </Text>
            <View style={walletScreenStyles.textAreaHeaderInfo1}>
              <Text variant="bodyMedium" style={walletScreenStyles.text}>
                Emitido em: {retriveDate(studentData.RA)}
              </Text>
              <Text variant="bodyMedium" style={walletScreenStyles.text}>
                Válido até: {retrivePeriod(studentData.RA)}
              </Text>
            </View>
            <View style={walletScreenStyles.textAreaHeaderInfo2}>
              <Text variant="bodyMedium" style={walletScreenStyles.text}>
                RA: {studentData.RA}
              </Text>
              <Text variant="bodyMedium" style={walletScreenStyles.text}>
                Periodo: {studentData.coursePeriod}
              </Text>
            </View>
            <QRCode value={studentData.RA} size={200} quietZone={10} />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
