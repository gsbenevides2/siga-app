import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";
import { SigaSingleton } from "../services/siga";
import { DrawerNavigationParams } from "./routesTypes";

type IconSource = keyof DrawerNavigationParams;
type IconSourceMap = {
  [key in IconSource]: string;
};

const iconSource: IconSourceMap = {
  Home: "home",
  Grade: "calendar",
  History: "history",
  PartialNotes: "notebook",
  PartialAbsences: "account-alert",
  ExamsCalendar: "calendar-clock",
};

type DrawerContentProps = {
  state: DrawerNavigationState<DrawerNavigationParams>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};
export const DrawerContent = (props: DrawerContentProps) => {
  const [teachingPlans, setTeachingPlans] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const studentData = SigaSingleton.getInstace().getStudentData();

    setTeachingPlans(studentData.teachingPlans);
  }, []);

  const teachingPlanIndex = props.state.routes.findIndex(
    (a) => a.name === "TeachingPlan"
  );

  const currentIndex = props.state.index;
  const currentRoute = props.state.routes[currentIndex];

  const teachingPlanRoute = props.state.routes[teachingPlanIndex];

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, gap: 16 }}>
        <Drawer.Section title="Menu">
          {props.state.routes
            .filter((a) => a.name !== "TeachingPlan")
            .map((route, index) => (
              <Drawer.Item
                key={index}
                active={currentRoute.name === route.name}
                label={
                  props.descriptors[route.key]?.options.title || route.name
                }
                icon={iconSource[route.name]}
                onPress={() => props.navigation.navigate(route.name)}
              />
            ))}
        </Drawer.Section>
        <Drawer.Section title="Planos de Ensino" showDivider={false}>
          {teachingPlans.map((teachingPlan, index) => (
            <Drawer.Item
              key={teachingPlan.id}
              label={teachingPlan.name}
              icon="book"
              active={
                currentRoute.key === teachingPlanRoute.key &&
                // @ts-ignore
                teachingPlanRoute.params?.id === teachingPlan.id
              }
              onPress={() => {
                props.navigation.navigate("TeachingPlan", {
                  id: teachingPlan.id,
                });
              }}
            />
          ))}
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
