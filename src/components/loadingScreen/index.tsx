import { createContext, useCallback, useContext, useState } from "react";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

interface LoadingScreenContext {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingScreenContext = createContext<LoadingScreenContext>({
  showLoading: () => {},
  hideLoading: () => {},
});

export function LoadingScreenProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <LoadingScreenContext.Provider value={{ showLoading, hideLoading }}>
      <Portal>
        <Modal visible={loading} dismissable={false}>
          <ActivityIndicator animating />
        </Modal>
      </Portal>
      {props.children}
    </LoadingScreenContext.Provider>
  );
}

export const useLoadingScreen = () => {
  return useContext(LoadingScreenContext);
};
