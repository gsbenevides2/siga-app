import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Card,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { gradeScreenStyles } from "./styles";
import { View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { SigaSingleton } from "../../services/siga";
import { ClassOfDay, Grade } from "siga-fatec/src/types";

export function GradeScreen() {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [grade, setGrade] = useState<Grade>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getGrade()
      .then((grades) => {
        setIsLoaded(true);
        setGrade(grades);
      });
  }, []);

  const classOfDay = useMemo(() => {
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
    if (!grade) return [];
    const result = grade.daysOfWeek[selectedDay] as ClassOfDay[];

    const ordenedClass = result.sort((a, b) => {
      const aDate = retriveDate(a, 0);
      const bDate = retriveDate(b, 0);

      if (aDate > bDate) return 1;
      if (aDate < bDate) return -1;
      return 0;
    });

    return ordenedClass.map((a) => {
      return {
        ...a,
        subject: grade.subjects.find((b) => b.code === a.classCode),
      };
    });

    return;
  }, [grade, selectedDay]);

  return (
    <View style={gradeScreenStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={gradeScreenStyles.segmentedButtons}
        contentContainerStyle={gradeScreenStyles.segmentedButtonsContent}
      >
        <SegmentedButtons
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value)}
          buttons={[
            { label: "Segunda", value: "monday" },
            {
              label: "Terça",
              value: "tuesday",
            },
            {
              label: "Quarta",
              value: "wednesday",
            },
            {
              label: "Quinta",
              value: "thursday",
            },
            {
              label: "Sexta",
              value: "friday",
            },
            {
              label: "Sábado",
              value: "saturday",
            },
          ]}
        />
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={gradeScreenStyles.content}
        contentContainerStyle={gradeScreenStyles.contentContainer}
      >
        {isLoaded == true &&
          classOfDay.map((a, i) => {
            return (
              <Card key={i.toString()}>
                <Card.Title
                  titleNumberOfLines={2}
                  subtitleNumberOfLines={2}
                  title={`${a.classCode} - ${a.subject.name}`}
                  subtitle={`Professor: ${a.subject.teacher}`}
                />
                <Card.Content>
                  <Text>Horario: {a.classTime}</Text>
                  <Text>Turma: {a.subject.class}</Text>
                </Card.Content>
              </Card>
            );
          })}

        {!classOfDay.length && isLoaded && (
          <View style={gradeScreenStyles.noClassContainer}>
            <Text variant="titleLarge">Não há aulas neste dia!</Text>
          </View>
        )}

        {!isLoaded && (
          <View style={gradeScreenStyles.noClassContainer}>
            <ActivityIndicator size="large" />
            <Text variant="titleLarge">Carregando...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
