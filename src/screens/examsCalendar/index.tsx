import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { SigaSingleton } from "../../services/siga";
import { ExamSubject } from "siga-fatec/src/types";
import { format, parseISO } from "date-fns";

function formatToBRDate(date: string) {
  if (date === "0000-00-00T00:00:00") return "Data não definida";
  const dateParsed = parseISO(date);
  return format(dateParsed, "dd/MM/yyyy");
}

export function ExamsCalendarScreen() {
  const [examsSubject, setExamSubject] = useState<ExamSubject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getExamsCalendar()
      .then((exams) => {
        setExamSubject(exams);
        setLoaded(true);
      });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {!loaded && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 16,
          }}
        >
          <ActivityIndicator size={"large"} />
          <Text variant="titleLarge">Carregando...</Text>
        </View>
      )}

      {loaded &&
        examsSubject.map((examSubject, i) => (
          <Card>
            <Card.Title
              title={examSubject.name}
              subtitle={examSubject.code}
              titleNumberOfLines={2}
            />
            <Card.Content>
              <Text>
                {examSubject.exams.length === 0 && "Nenhuma prova cadastrada"}
                {examSubject.exams
                  .map(
                    (e) => `Prova: ${e.name} - Data: ${formatToBRDate(e.date)}`
                  )
                  .join("\n")}
              </Text>
            </Card.Content>
          </Card>
        ))}
    </ScrollView>
  );
}
