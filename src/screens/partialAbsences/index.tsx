import { ScrollView, View } from "react-native";
import { SigaSingleton } from "../../services/siga";
import { useEffect, useState } from "react";
import {
  PartialAbsence,
  PartialNoteSubject,
  Subject,
} from "siga-fatec/src/types";
import { ActivityIndicator, Card, Text } from "react-native-paper";

export function PartialAbsencesScreen() {
  const [partialAbsences, setPartialAbsences] = useState<PartialAbsence[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getPartialAbsences()
      .then((subjects) => {
        const ordenedSubjects = subjects.sort((a, b) => {
          if (a.subject > b.subject) return 1;
          if (a.subject < b.subject) return -1;
        });
        setIsLoaded(true);
        setPartialAbsences(ordenedSubjects);
      });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {isLoaded &&
        partialAbsences.map((a, i) => (
          <Card key={i}>
            <Card.Title
              title={a.subject}
              subtitle={a.code}
              titleNumberOfLines={2}
            />
            <Card.Content>
              <Text>Presenças: {a.presence}</Text>
              <Text>Faltas: {a.absence}</Text>
            </Card.Content>
          </Card>
        ))}
      {!isLoaded && (
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
    </ScrollView>
  );
}
