import { Image, Keyboard, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginScreenStyles } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationParams } from "../../routes/routesTypes";
import { useAlert } from "../../components/alert";
import { SigaSingleton } from "../../services/siga";
import { setUserBlocked } from "../../storage/blocked";
import { useLoadingScreen } from "../../components/loadingScreen";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<StackNavigationParams, "Login">;

function stringsEndsWithSpace(str: string) {
  return str[str.length - 1] === " ";
}

export function LoginScreen(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorTries, setPasswordErrorTries] = useState(0);

  const Alert = useAlert();
  const Loading = useLoadingScreen();

  const logInButttonPressed = useCallback(async () => {
    const currentPasswordErrorTries = passwordErrorTries + 1;
    Keyboard.dismiss();

    if (!username) {
      await Alert.showAlert("Erro", "Preencha o campo de usuário!");
      return;
    }

    if (!password) {
      await Alert.showAlert("Erro", "Preencha o campo de senha!");
      return;
    }

    if (stringsEndsWithSpace(password)) {
      const response = await Alert.showPrompt({
        title: "Atenção",
        message:
          "A senha que você digitou termina com um espaço. Deseja continuar?",
        buttons: [
          {
            title: "Cancelar",
            id: "cancel",
            mode: "text",
          },
          {
            title: "Continuar",
            id: "continue",
            mode: "contained",
          },
        ],
      });
      if (response === "cancel") return;
    }

    Loading.showLoading();

    fetch("https://siga-cookie.vercel.app/api/siga")
      .then((res) => res.json())
      .then(({ cookie }) =>
        SigaSingleton.authenticate(username, password, cookie)
      )
      .then(async (siga) => {
        const isAvailable = await SecureStore.isAvailableAsync();

        if (isAvailable) {
          const response = await Alert.showPrompt({
            title: "Atenção",
            message: "Deseja salvar suas credenciais?",
            buttons: [
              {
                title: "Não",
                id: "cancel",
                mode: "text",
              },
              {
                title: "Sim",
                id: "continue",
                mode: "contained",
              },
            ],
          });

          if (response === "continue") {
            await SecureStore.setItemAsync(
              "credentials",
              JSON.stringify({ username, password }),
              {
                authenticationPrompt:
                  "Autentique-se para salvar suas credenciais",
                requireAuthentication: true,
              }
            );
            await AsyncStorage.setItem(
              "credentialsSaved",
              JSON.stringify(true)
            );
          }
        }

        const studentData = siga.getStudentData();
        await Alert.showAlert(
          "Olá",
          "Seja bem vindo ao SIGA! " + studentData.studentName
        );
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Drawer" }],
        });
      })
      .catch(async (err) => {
        console.log(err);
        if (currentPasswordErrorTries >= 2) {
          await setUserBlocked();
          props.navigation.reset({
            index: 0,
            routes: [{ name: "UserBlocked" }],
          });
        } else {
          await Alert.showAlert("Erro", "Usuário ou senha incorretos!");
        }
      })
      .finally(() => {
        Loading.hideLoading();
        setPasswordErrorTries(currentPasswordErrorTries);
      });
  }, [
    username,
    password,
    Alert,
    Loading,
    passwordErrorTries,
    props.navigation,
  ]);

  useEffect(() => {
    Loading.showLoading();
    let username: string;
    let password: string;
    AsyncStorage.getItem("credentialsSaved")
      .then((value) => {
        if (value === "true")
          return SecureStore.getItemAsync("credentials", {
            authenticationPrompt:
              "Autentique-se para recuperar suas credenciais",
            requireAuthentication: true,
          });
        throw new Error("Credentials not saved");
      })
      .then((value) => {
        if (!value) {
          throw new Error("Credentials not saved");
        }
        const result = JSON.parse(value);
        username = result.username;
        password = result.password;
        return fetch("https://siga-cookie.vercel.app/api/siga");
      })
      .then((res) => res.json())
      .then(({ cookie }) =>
        SigaSingleton.authenticate(username, password, cookie)
      )
      .then(async (siga) => {
        const studentData = siga.getStudentData();
        await Alert.showAlert(
          "Olá",
          "Seja bem vindo ao SIGA! " + studentData.studentName
        );
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Drawer" }],
        });
      })
      .catch(async (err) => {
        if (err.message === "Credentials not saved") return;

        console.log(err);
        await Alert.showAlert("Erro", "Usuário ou senha incorretos!");
      })
      .finally(() => {
        Loading.hideLoading();
        setPasswordErrorTries((a) => a + 1);
      });
  }, []);

  return (
    <View style={loginScreenStyles.container}>
      <Image
        source={require("../../assets/siga_logo.png")}
        style={loginScreenStyles.logo}
      />
      <TextInput
        label="Usuário"
        style={loginScreenStyles.textInput}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Senha"
        style={loginScreenStyles.textInput}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            animated
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => {
              setShowPassword((a) => !a);
            }}
          />
        }
      />
      <Button
        mode="contained"
        style={loginScreenStyles.button}
        onPress={logInButttonPressed}
      >
        Entrar
      </Button>
    </View>
  );
}
