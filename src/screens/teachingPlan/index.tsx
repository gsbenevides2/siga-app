import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerNavigationParams } from "../../routes/routesTypes";
import { View } from "react-native";
import { ActivityIndicator, Avatar, Card, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Subject, TeachingPlan } from "siga-fatec/src/types";
import { SigaSingleton } from "../../services/siga";

type Props = DrawerScreenProps<DrawerNavigationParams, "TeachingPlan">;

export function TeachingPlanScreen(props: Props) {
  const [teachingPlan, setTeachingPlan] = useState<TeachingPlan>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = props.route.params.id;
    SigaSingleton.getInstace()
      .getTeachingPlan(id)
      .then((teachingPlan) => {
        setTeachingPlan(teachingPlan);
        setIsLoaded(true);
      });
  }, [props.route.params.id]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {isLoaded && teachingPlan && (
        <>
          <Card>
            <Card.Title
              left={(props) => <Avatar.Icon {...props} icon="book" />}
              title={teachingPlan.subjectName}
              subtitle={teachingPlan.professorName}
              titleNumberOfLines={2}
              subtitleNumberOfLines={2}
            />
            <Card.Content>
              <Text>
                Código: {teachingPlan.subjectCode} - Turma:
                {teachingPlan.classLetter}
              </Text>
              <Text>Período Ofertado: {teachingPlan.periodOfOffer}</Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Title title="Ementa:" />
            <Card.Content>
              <Text style={{ textAlign: "justify" }}>
                {teachingPlan.subjectSyllabus}
              </Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Title title="Descrição: " />
            <Card.Content>
              <Text style={{ textAlign: "justify" }}>
                {teachingPlan.subjectObjective}
              </Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Title title="Carga Horária: " />
            <Card.Content>
              <Text>Semanais: {teachingPlan.subjectWeekLoad}</Text>
              <Text>Teórica: {teachingPlan.subjectTheoreticalLoad}</Text>
              <Text>Prática: {teachingPlan.subjectPracticalLoad}</Text>
              <Text>Total: {teachingPlan.subjectTotalLoad}</Text>
            </Card.Content>
          </Card>
        </>
      )}
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
