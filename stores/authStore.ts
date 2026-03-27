import { AuthState } from "@/types/auth";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  setTokenData: async (user, token) => {
    const authData = {
      user: user,
      token: token,
    };
    await AsyncStorage.setItem("auth", JSON.stringify(authData));
    set({ user, token });
  },
  loadToken: async () => {
    set({ isLoading: true });
    try {
      const data = await AsyncStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data);
        set({ user: parsed.user, token: parsed.token });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  removeToken: async () => {
    await AsyncStorage.removeItem("auth")
    set({token: null, user: null})
  },
}));
