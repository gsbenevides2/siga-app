import { DrawerHeaderProps } from "@react-navigation/drawer";
import { StackHeaderProps } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";

export const Header = (props: StackHeaderProps | DrawerHeaderProps) => {
  const screensNotDrawer = ["Account"];
  const title = props.options.title || props.route.name;

  const goToMyAccount = () => {
    props.navigation.navigate("Account");
  };

  return (
    <Appbar.Header
      mode={
        screensNotDrawer.includes(props.route.name) ? "small" : "center-aligned"
      }
    >
      {screensNotDrawer.includes(props.route.name) ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={() => {
            // @ts-ignore
            if (props.navigation.openDrawer)
              // @ts-ignore
              props.navigation.openDrawer();
          }}
        />
      )}
      <Appbar.Content title={title} />
      {screensNotDrawer.includes(props.route.name) ? (
        <></>
      ) : (
        <Appbar.Action icon="account-circle-outline" onPress={goToMyAccount} />
      )}
    </Appbar.Header>
  );
};
