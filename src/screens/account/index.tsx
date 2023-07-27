import { ScrollView, View } from "react-native";
import { Avatar, Card, IconButton, List, Text } from "react-native-paper";
import { useToogleTheme } from "../../theme";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { StudentData } from "siga-fatec/src/types";
import { SigaSingleton } from "../../services/siga";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationParams } from "../../routes/routesTypes";

type Props = StackScreenProps<StackNavigationParams, "Account">;

export function AccountScreen(props: Props) {
  const toogleTheme = useToogleTheme();
  const [studentData, setStudentData] = useState<StudentData>();

  const openSourceButtonPressed = () => {
    WebBrowser.openBrowserAsync("https://github.com/gsbenevides2/siga-app");
  };

  const logOutButtonPressed = async () => {
    await SigaSingleton.logout();
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    async function loadStudentData() {
      const studentData = SigaSingleton.getInstace().getStudentData();
      setStudentData(studentData);
    }
    loadStudentData();
  }, []);

  if (!studentData) return <View />;

  return (
    <ScrollView>
      <Card
        style={{
          margin: 16,
        }}
      >
        <Card.Title
          title={studentData.studentName}
          subtitle={`RA: ${studentData.RA}`}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{
                uri: studentData.photoUrl,
              }}
            />
          )}
        />
        <Card.Content>
          <Text>
            Curso: {studentData.courseName} - {studentData.coursePeriod}
          </Text>
          <Text>Unidade: {studentData.collegeName}</Text>
          <Text>
            Email Institucional: {studentData.institutionalEmail}
            {"\n"}
          </Text>
          <Text variant="labelLarge">Rendimento no Curso:</Text>
          <Text>PP (Percentual de Progressão): {studentData.PP}%</Text>
          <Text>PR (Percentual de Rendimento): {studentData.PR}%</Text>
          <Text>PR Máximo: {studentData.maxPR}%</Text>
          <Text variant="labelLarge">Prazo de Integralização:</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Cursado: {studentData.cursedSemesters}</Text>
            <Text>Restante: {studentData.remainingSemesters}</Text>
            <Text>Máximo: {studentData.maxSemesters}</Text>
          </View>
        </Card.Content>
      </Card>

      <List.Section>
        <List.Subheader>Opções:</List.Subheader>
        <List.Item
          title="Alternar Tema"
          description="Alterar entre o tema claro e escuro."
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          onPress={toogleTheme}
        />
        <List.Item
          title="Sair"
          description="Sair com segurança da aplicação."
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logOutButtonPressed}
        />
        <List.Item
          title="Código Fonte"
          description="Código fonte da Aplicação no Github."
          onPress={openSourceButtonPressed}
          left={(props) => <List.Icon {...props} icon="code-tags" />}
        />
        <List.Item
          title="Accessar o Siga"
          description="Acessar o Siga no navegador."
          onPress={() => {
            WebBrowser.openBrowserAsync("https://siga.cps.sp.gov.br/aluno/");
          }}
          left={(props) => <List.Icon {...props} icon="web" />}
        />
      </List.Section>
    </ScrollView>
  );
}
