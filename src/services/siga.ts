import { Siga } from "siga-fatec/src";
import * as SecureStore from "expo-secure-store";

export class SigaSingleton {
  private static instance: Siga;

  private constructor() {}

  public static async authenticate(
    username: string,
    password: string,
    cookie: string
  ): Promise<Siga> {
    if (!SigaSingleton.instance) {
      SigaSingleton.instance = await Siga.login({ username, password, cookie });
    }
    return SigaSingleton.instance;
  }

  public static getInstace(): Siga {
    if (!SigaSingleton.instance) {
      throw new Error("Siga not authenticated");
    }
    return SigaSingleton.instance;
  }

  public static async logout(): Promise<void> {
    if (SigaSingleton.instance) {
      await SecureStore.deleteItemAsync("credentials");
      SigaSingleton.instance = null;
    }
  }
}
