import { createContext, useCallback, useContext, useState } from "react";
import { Button, Card, Modal, Paragraph, Portal } from "react-native-paper";

interface AlertContextData {
  showAlert?(title: string, message: string): Promise<void>;
  showPrompt?(promptProps: PromptProps): Promise<string>;
}

const AlertContext = createContext<AlertContextData>({});

type Props = {
  children: React.ReactNode;
};

interface ButtonPropsWithOnPress extends ButtonProps {
  onPress: () => void;
}

interface ButtonProps {
  title: string;
  id: string;
  mode: "text" | "outlined" | "contained" | undefined;
}

interface PromptProps {
  title: string;
  message: string;
  buttons: ButtonProps[];
}

export function AlertProvider(props: Props) {
  const [visiblePrompt, setVisiblePrompt] = useState(false);
  const hideModal = useCallback(() => setVisiblePrompt(false), []);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState<ButtonPropsWithOnPress[]>([]);

  const showAlert = useCallback((title: string, message: string) => {
    return new Promise<void>((resolve) => {
      setTitle(title);
      setMessage(message);
      setButtons([
        {
          title: "OK",
          id: "ok",
          mode: "contained",
          onPress: () => {
            setVisiblePrompt(false);
            resolve();
          },
        },
      ]);
      setVisiblePrompt(true);
    });
  }, []);

  const showPrompt = useCallback((promptProps: PromptProps) => {
    return new Promise<string>((resolve) => {
      setTitle(promptProps.title);
      setMessage(promptProps.message);

      setButtons(
        promptProps.buttons.map((button) => ({
          ...button,
          onPress: () => {
            setVisiblePrompt(false);
            resolve(button.id);
          },
        }))
      );
      setVisiblePrompt(true);
    });
  }, []);

  const alertContextValue = {
    showAlert,
    showPrompt,
  };
  return (
    <AlertContext.Provider value={alertContextValue}>
      <Portal>
        <Modal visible={visiblePrompt} contentContainerStyle={{ padding: 16 }}>
          <Card>
            <Card.Title title={title} />
            <Card.Content>
              <Paragraph>{message}</Paragraph>
            </Card.Content>
            <Card.Actions>
              {buttons.map((button) => (
                <Button
                  key={button.id}
                  onPress={button.onPress}
                  mode={button.mode}
                >
                  {button.title}
                </Button>
              ))}
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContext;

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
