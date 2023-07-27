import AsyncStorage from "@react-native-async-storage/async-storage";
import { addHours } from "date-fns";
const key = "user-blocked";

export const setUserBlocked = async () => {
  const date = addHours(new Date(), 1);
  await AsyncStorage.setItem(key, date.toString());
};

export const getUserBlocked = async () => {
  const value = await AsyncStorage.getItem(key);
  if (value === null) return false;

  const date = new Date(value);

  if (date < new Date()) {
    await AsyncStorage.removeItem(key);
    return false;
  }

  return date;
};
