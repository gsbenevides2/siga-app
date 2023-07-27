import { createContext, useContext, useEffect, useState } from "react";
import {
  MD3Theme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { darkTheme, lightTheme } from "./themes";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextData {
  theme: MD3Theme;
  setTheme?: (theme: MD3Theme) => void;
}

const defaultTheme = lightTheme;

const ThemeContext = createContext<ThemeContextData>({
  theme: defaultTheme,
});

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<MD3Theme>(defaultTheme);

  useEffect(() => {
    const navigationsTheme = adaptNavigationTheme({
      reactNavigationLight: lightTheme,
      //@ts-ignore
      reactNavigationDark: darkTheme,
    });

    const navTheme = theme.dark
      ? navigationsTheme.DarkTheme
      : navigationsTheme.LightTheme;

    NavigationBar.setBackgroundColorAsync(navTheme.colors.background);
  }, [theme]);

  useEffect(() => {
    async function loadTheme() {
      const theme = await AsyncStorage.getItem("@theme");
      if (theme) {
        setTheme(JSON.parse(theme));
      }
    }
    loadTheme();
  }, []);

  useEffect(() => {
    async function saveTheme() {
      await AsyncStorage.setItem("@theme", JSON.stringify(theme));
    }
    saveTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <PaperProvider theme={theme}>{props.children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useToogleTheme() {
  const context = useContext(ThemeContext);
  return () => {
    if (context.theme.dark) {
      context.setTheme?.(lightTheme);
    } else {
      context.setTheme?.(darkTheme);
    }
  };
}

export function useNavigationTheme() {
  const context = useContext(ThemeContext);
  const navigationsTheme = adaptNavigationTheme({
    reactNavigationLight: lightTheme,
    //@ts-ignore
    reactNavigationDark: darkTheme,
  });

  if (context.theme.dark) {
    return navigationsTheme.DarkTheme;
  } else {
    return navigationsTheme.LightTheme;
  }
}
