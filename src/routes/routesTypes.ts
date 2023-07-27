import { ParamListBase } from "@react-navigation/native";

export interface DrawerNavigationParams extends ParamListBase {
  Home: undefined;
  Grade: undefined;
  History: undefined;
  PartialNotes: undefined;
  PartialAbsences: undefined;
  TeachingPlan: {
    id: string;
  };
  ExamsCalendar: undefined;
}

export interface StackNavigationParams extends ParamListBase {
  Wallet: undefined;
  Account: undefined;
  Login: undefined;
  Welcome: undefined;
  UserBlocked: undefined;
  Drawer: DrawerNavigationParams;
}
