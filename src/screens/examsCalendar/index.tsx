import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { SigaSingleton } from "../../services/siga";
import { ExamSubject } from "siga-fatec/src/types";

export function ExamsCalendarScreen() {
  const [exams, setExams] = useState<ExamSubject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getExamsCalendar()
      .then((exams) => {
        setExams(exams);
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
        exams.map((e, i) => (
          <Card>
            <Card.Title
              title={e.name}
              subtitle={e.code}
              titleNumberOfLines={2}
            />
            <Card.Content>
              {e.exams.length === 0 && <Text>Nenhuma prova cadastrada</Text>}
              {e.exams
                .map((e) => `Prova: ${e.name} - Data: ${e.date}`)
                .join("\n")}
            </Card.Content>
          </Card>
        ))}
    </ScrollView>
  );
}
