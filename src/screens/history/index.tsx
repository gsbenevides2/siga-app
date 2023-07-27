import { ScrollView, View } from "react-native";
import { SigaSingleton } from "../../services/siga";
import { useEffect, useState } from "react";
import { Subject } from "siga-fatec/src/types";
import { ActivityIndicator, Card, Text } from "react-native-paper";

export function HistoryScreen() {
  const [history, setHistory] = useState<Subject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SigaSingleton.getInstace()
      .getHistory()
      .then((subjects) => {
        const ordenedSubjects = subjects.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
        });
        setIsLoaded(true);
        setHistory(ordenedSubjects);
      });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {isLoaded &&
        history.map((a, i) => (
          <Card
            key={i}
            style={{
              backgroundColor: a.approved
                ? "#d4edda"
                : a.observation.includes("Em Curso")
                ? "#c3cfe3"
                : "#f8d7da",
            }}
          >
            <Card.Title
              title={a.name}
              subtitle={a.code}
              titleNumberOfLines={2}
              titleStyle={{ color: "black" }}
              subtitleStyle={{ color: "black" }}
            />
            <Card.Content>
              <Text style={{ color: "black" }}>Periodo: {a.period}</Text>
              <Text style={{ color: "black" }}>
                Media: {parseFloat(a.average).toFixed(2)}
              </Text>
              <Text style={{ color: "black" }}>Frequência: {a.frequency}%</Text>
              <Text style={{ color: "black" }}>
                Observação: {a.observation}
              </Text>
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
