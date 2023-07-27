import "react-native-gesture-handler";
import { StackNavigation } from "./src/routes";
import { AlertProvider } from "./src/components/alert";
import { ThemeProvider } from "./src/theme";
import { LoadingScreenProvider } from "./src/components/loadingScreen";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <LoadingScreenProvider>
          <StackNavigation />
        </LoadingScreenProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
