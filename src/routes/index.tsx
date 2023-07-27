import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { WalletScreen } from "../screens/wallet";
import { AccountScreen } from "../screens/account";
import { LoginScreen } from "../screens/login";
import { DrawerNavigationParams, StackNavigationParams } from "./routesTypes";
import { useNavigationTheme } from "../theme";
import { WelcomeScreen } from "../screens/welcome";
import { UserBlockedScreen } from "../screens/userBlocked";
import { GradeScreen } from "../screens/grade";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HistoryScreen } from "../screens/history";
import { PartialNotesScreen } from "../screens/partialNotes";
import { PartialAbsencesScreen } from "../screens/partialAbsences";
import { TeachingPlanScreen } from "../screens/teachingPlan";
import { ExamsCalendarScreen } from "../screens/examsCalendar";
import { Header } from "./header";
import { DrawerContent } from "./drawer";

export const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator<DrawerNavigationParams>();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
        }}
      />

      <Drawer.Screen
        name="Grade"
        component={GradeScreen}
        options={{
          title: "Horário",
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Histórico",
        }}
      />
      <Drawer.Screen
        name="PartialNotes"
        component={PartialNotesScreen}
        options={{
          title: "Notas Parciais",
        }}
      />
      <Drawer.Screen
        name="PartialAbsences"
        component={PartialAbsencesScreen}
        options={{
          title: "Faltas Parciais",
        }}
      />
      <Drawer.Screen
        name="TeachingPlan"
        component={TeachingPlanScreen}
        options={{
          title: "Plano de Ensino",
        }}
      />
      <Drawer.Screen
        name="ExamsCalendar"
        component={ExamsCalendarScreen}
        options={{
          title: "Calendário de Provas",
        }}
      />
    </Drawer.Navigator>
  );
};

export const StackNavigation = () => {
  const Stack = createStackNavigator<StackNavigationParams>();
  const theme = useNavigationTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserBlocked"
          component={UserBlockedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: "Minha Conta",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
