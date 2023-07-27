import { Button, Paragraph, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { getUserBlocked } from "../../storage/blocked";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationParams } from "../../routes/routesTypes";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { userBlockedScreen } from "./styles";
import { AccessDeniedSVG } from "../../svg/AccessDenied";

type Props = StackScreenProps<StackNavigationParams, "UserBlocked">;

export function UserBlockedScreen(props: Props) {
  const [time, setTime] = useState<Date>(new Date());
  const openSigaButtonPressed = () => {
    WebBrowser.openBrowserAsync("https://siga.cps.sp.gov.br/aluno/login.aspx");
  };

  useEffect(() => {
    getUserBlocked().then((userBlocked) => {
      if (userBlocked) {
        setTime(userBlocked);
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    });
  }, [props]);

  return (
    <SafeAreaView style={userBlockedScreen.container}>
      <AccessDeniedSVG width={300} height={300} />
      <Text variant="titleLarge">Seu acesso ao app foi bloqueado!</Text>
      <Paragraph style={userBlockedScreen.paragraph}>
        Para sua segurança seu acesso, somente ao app foi bloquado. Isso é uma
        medida de segurança para evitar o bloqueio de sua conta no SIGA. Você
        ainda pode acessar o SIGA pelo site. Para acessar novamente pelo app,{" "}
        {formatDistanceToNow(time, { addSuffix: true, locale: ptBR })}
      </Paragraph>
      <Button onPress={openSigaButtonPressed} style={userBlockedScreen.button}>
        Acessar o SIGA
      </Button>
    </SafeAreaView>
  );
}
