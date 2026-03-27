import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LatoRegular: require("../assets/font/Lato/LatoRegular.ttf"),
    LatoBold: require("../assets/font/Lato/LatoBold.ttf"),
    CookieRegular: require("../assets/font/Cookie/CookieRegular.ttf"),
  });


  const { token, isLoading, loadToken, user } = useAuthStore();
  useEffect(() => {
    loadToken();
  }, [token]);

  if (!fontsLoaded || isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!token || !user ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
