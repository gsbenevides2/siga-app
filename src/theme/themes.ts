import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,

  colors: {
    primary: "rgb(189, 15, 7)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 212)",
    onPrimaryContainer: "rgb(65, 0, 0)",
    secondary: "rgb(177, 44, 30)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 212)",
    onSecondaryContainer: "rgb(65, 0, 0)",
    tertiary: "rgb(0, 105, 113)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(132, 243, 255)",
    onTertiaryContainer: "rgb(0, 32, 35)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 25)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 25)",
    surfaceVariant: "rgb(245, 221, 218)",
    onSurfaceVariant: "rgb(83, 67, 65)",
    outline: "rgb(133, 115, 112)",
    outlineVariant: "rgb(216, 194, 190)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 46)",
    inverseOnSurface: "rgb(251, 238, 236)",
    inversePrimary: "rgb(255, 180, 168)",
    elevation: {
      level0: "transparent",
      level1: "rgb(252, 239, 243)",
      level2: "rgb(250, 232, 235)",
      level3: "rgb(248, 225, 228)",
      level4: "rgb(247, 223, 225)",
      level5: "rgb(246, 218, 220)",
    },
    surfaceDisabled: "rgba(32, 26, 25, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
    backdrop: "rgba(59, 45, 43, 0.4)",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    primary: "rgb(255, 180, 168)",
    onPrimary: "rgb(105, 0, 0)",
    primaryContainer: "rgb(147, 0, 0)",
    onPrimaryContainer: "rgb(255, 218, 212)",
    secondary: "rgb(255, 180, 168)",
    onSecondary: "rgb(105, 0, 0)",
    secondaryContainer: "rgb(143, 17, 8)",
    onSecondaryContainer: "rgb(255, 218, 212)",
    tertiary: "rgb(63, 217, 232)",
    onTertiary: "rgb(0, 54, 59)",
    tertiaryContainer: "rgb(0, 79, 85)",
    onTertiaryContainer: "rgb(132, 243, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(32, 26, 25)",
    onBackground: "rgb(237, 224, 221)",
    surface: "rgb(32, 26, 25)",
    onSurface: "rgb(237, 224, 221)",
    surfaceVariant: "rgb(83, 67, 65)",
    onSurfaceVariant: "rgb(216, 194, 190)",
    outline: "rgb(160, 140, 137)",
    outlineVariant: "rgb(83, 67, 65)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(237, 224, 221)",
    inverseOnSurface: "rgb(54, 47, 46)",
    inversePrimary: "rgb(189, 15, 7)",
    elevation: {
      level0: "transparent",
      level1: "rgb(43, 34, 32)",
      level2: "rgb(50, 38, 36)",
      level3: "rgb(57, 43, 41)",
      level4: "rgb(59, 45, 42)",
      level5: "rgb(63, 48, 45)",
    },
    surfaceDisabled: "rgba(237, 224, 221, 0.12)",
    onSurfaceDisabled: "rgba(237, 224, 221, 0.38)",
    backdrop: "rgba(59, 45, 43, 0.4)",
  },
};
