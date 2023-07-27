import { View, ScrollView, Dimensions } from "react-native";
import { Button, Paragraph, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { welcomeScreenStyles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationParams } from "../../routes/routesTypes";
import { WelcomeSVG } from "../../svg/Welcome";
import { getUserBlocked } from "../../storage/blocked";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const buttonTimer = 5 * 1000;

type Props = StackScreenProps<StackNavigationParams, "Welcome">;

export function WelcomeScreen(props: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const buttonClick = async () => {
    if (buttonDisabled) return;

    if (currentPage === 3) {
      await AsyncStorage.setItem("welcomeScreen", "true");
      if (await getUserBlocked()) {
        props.navigation.navigate("UserBlocked");

        return;
      }
      props.navigation.navigate("Login");
      return;
    }

    const x = (Dimensions.get("screen").width - 32) * (currentPage + 1);
    scrollViewRef.current?.scrollTo({ x, y: 0, animated: true });
    setCurrentPage(currentPage + 1);
    setButtonDisabled(true);
    window.setTimeout(() => {
      setButtonDisabled(false);
    }, buttonTimer);
  };

  useEffect(() => {
    window.setTimeout(() => {
      setButtonDisabled(false);
    }, buttonTimer);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("welcomeScreen").then(async (value) => {
      if (value === "true") {
        if (await getUserBlocked()) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "UserBlocked" }],
          });
        } else {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      }
      window.setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    });
  }, []);

  return (
    <SafeAreaView style={welcomeScreenStyles.container}>
      <WelcomeSVG width={300} height={300} />

      <Text variant="titleLarge">Bem vindo ao SIGA App</Text>
      <Text variant="titleMedium">Leia com atenção:</Text>
      <ScrollView
        horizontal
        style={welcomeScreenStyles.content}
        scrollEnabled={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <View style={welcomeScreenStyles.textArea}>
          <Paragraph style={welcomeScreenStyles.paragraph}>
            Este aplicativo é um cliente não oficial do SIGA, o Sistema
            Integrado de Gestão Acadêmica do Centro Paula Souza. Somente para os
            alunos da FATEC!
          </Paragraph>
        </View>
        <View style={welcomeScreenStyles.textArea}>
          <Paragraph style={welcomeScreenStyles.paragraph}>
            Este aplicativo não tem nenhuma relação com o Centro Paula Souza,
            Fatecs ou Etecs. E é fruto do trabalho de um aluno do curso de
            Tecnologia em Análise e Desenvolvimento de Sistemas da Fatec de Mogi
            das Cruzes.
          </Paragraph>
        </View>
        <View style={welcomeScreenStyles.textArea}>
          <Paragraph style={welcomeScreenStyles.paragraph}>
            É muito importante que caso você se depare com alguma informação que
            pareça errada, confira no site do SIGA antes de entrar em contato
            com o profesor, coordenador ou secretaria.
          </Paragraph>
          <Paragraph style={welcomeScreenStyles.paragraphAndBold}>
            Sempre confira as informações no site do SIGA antes de tomar
            qualquer decisão.
          </Paragraph>
        </View>
        <View style={welcomeScreenStyles.textArea}>
          <Paragraph style={welcomeScreenStyles.paragraph}>
            Para sua segurança, este aplicativo não envia nenhuma informação
            para servidores externos. Todas as informações são obtidas
            diretamente do SIGA. {"\n"}Além disso para evitar bloqueio de acesso
            ao SIGA, este aplicativo não permite digitar a senha incorretamente
            mais de 2 vezes.
            {"\n"}Caso você digite a senha incorretamente mais de 2 vezes, você
            precisará esperar 1 hora para tentar novamente. E recomenda-se que
            você acessa o SIGA pelo site para verificar se sua senha está
            correta.
          </Paragraph>
        </View>
      </ScrollView>
      <Button
        onPress={buttonClick}
        disabled={buttonDisabled}
        style={welcomeScreenStyles.button}
      >
        Continuar
      </Button>
    </SafeAreaView>
  );
}
