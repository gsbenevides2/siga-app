import { ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  adaptNavigationTheme,
  useTheme,
} from "react-native-paper";
import { homeScreenStyles } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";

import { StackNavigationParams } from "../../routes/routesTypes";
import { SigaSingleton } from "../../services/siga";
import { useEffect, useState } from "react";
import { ClassOfDay, Grade } from "siga-fatec/src/types";
import { darkTheme, lightTheme } from "../../theme/themes";
import * as NavigationBar from "expo-navigation-bar";

type Props = StackScreenProps<StackNavigationParams, "Home">;

interface NextClass {
  state: "inCLass" | "nextClass" | "noClass";
  name: string;
  date: string;
}

interface Exams {
  subject: string;
  date: string;
  name: string;
}

const days = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wendsday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export function HomeScreen(props: Props) {
  const [nextClass, setNextClass] = useState<NextClass>();
  const [exams, setExams] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    const retriveDate = (c, n) => {
      const startHour = c.classTime.split("-")[n];
      const startHourNumber = parseInt(startHour.split(":")[0]);
      const startMinuteNumber = parseInt(startHour.split(":")[1]);
      const today = new Date();
      today.setHours(startHourNumber);
      today.setMinutes(startMinuteNumber);
      today.setSeconds(0);
      today.setMilliseconds(0);
      return today;
    };

    const retriveName = (classe: ClassOfDay, grades: Grade) => {
      const nameSplited = grades.subjects
        .find((a) => a.code === classe.classCode)
        ?.name.split(" - ");
      nameSplited.pop();
      return nameSplited.join(" - ");
    };

    SigaSingleton.getInstace()
      .getGrade()
      .then((grades) => {
        const thisDay = new Date().getDay();
        const thisDayInString = days[thisDay];

        const result = grades.daysOfWeek[thisDayInString] as ClassOfDay[];
        if (!result.length) {
          setNextClass({ state: "noClass", name: "", date: "" });
          return;
        }

        const ordenedClass = result.sort((a, b) => {
          const aDate = retriveDate(a, 0);
          const bDate = retriveDate(b, 0);

          if (aDate > bDate) return 1;
          if (aDate < bDate) return -1;
          return 0;
        });

        const filterClass = ordenedClass.filter((c) => {
          const cDate = retriveDate(c, 1);
          const now = new Date();

          if (cDate > now) return true;
          return false;
        });

        if (!filterClass.length) {
          setNextClass({ state: "noClass", name: "", date: "" });
          return;
        }

        const nextClass = filterClass[0];

        const nextClassDate = retriveDate(nextClass, 0);
        const now = new Date();

        if (nextClassDate > now) {
          setNextClass({
            state: "nextClass",
            name: retriveName(nextClass, grades),
            date: nextClass.classTime,
          });
          return;
        }

        const nextClassDate2 = retriveDate(nextClass, 1);
        if (nextClassDate2 > now) {
          setNextClass({
            state: "inCLass",
            name: retriveName(nextClass, grades),
            date: nextClass.classTime,
          });
          return;
        }
      });
  }, []);

  useEffect(() => {
    const navigationsTheme = adaptNavigationTheme({
      reactNavigationLight: lightTheme,
      //@ts-ignore
      reactNavigationDark: darkTheme,
    });

    const navTheme = theme.dark
      ? navigationsTheme.DarkTheme
      : navigationsTheme.LightTheme;

    NavigationBar.setBackgroundColorAsync(navTheme.colors.background);
  }, [theme]);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getExamsCalendar()
      .then((subjecs) => {
        const thisMonth = new Date().getMonth();
        const exams = subjecs
          .flatMap((s) => {
            return s.exams.map((e) => ({
              subject: s,
              ...e,
            }));
          })
          .filter((e) => {
            const date = new Date(e.date);
            return date.getMonth() === thisMonth;
          })
          .map((e) => ({
            subject: e.subject.name,
            date: e.date,
            name: e.name,
          }))
          .sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);

            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
            return 0;
          })
          .map((e) => `${e.date} - ${e.name} - ${e.subject}`)
          .join("\n");

        setExams(exams);
      });
  }, []);

  const goToGrade = () => {
    props.navigation.navigate("Grade");
  };

  const goToWallet = () => {
    props.navigation.navigate("Wallet");
  };

  const goToExamsCalendar = () => {
    props.navigation.navigate("ExamsCalendar");
  };

  return (
    <View style={homeScreenStyles.container}>
      <ScrollView
        contentContainerStyle={homeScreenStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card onPress={goToGrade}>
          <Card.Title
            title={
              nextClass?.state === "inCLass"
                ? "Aula Atual"
                : nextClass?.state === "nextClass"
                ? "Proxima Aula"
                : "Sem Aula"
            }
            subtitle={
              nextClass?.state !== "noClass"
                ? nextClass?.name
                : "Você não tem aula hoje"
            }
            left={(props) => <Avatar.Icon {...props} icon="bell" />}
          />
        </Card>
        <Card onPress={goToExamsCalendar}>
          <Card.Title
            title={exams.length ? "Próximas Provas" : "Sem provas esse mês!"}
          />
          <Card.Content>
            <Text variant="bodyMedium">{exams}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
      <Button
        style={homeScreenStyles.goToWallet}
        mode="contained"
        onPress={goToWallet}
      >
        Acessar a Carteirinha
      </Button>
    </View>
  );
}
