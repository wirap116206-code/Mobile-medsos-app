import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import customAPI from "@/config/api";
import { useAuthStore } from "@/stores/authStore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { setTokenData } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.post("/auth/login", {
        email: email,
        password: password,
      });

      await setTokenData(data.data, data.token);
      Alert.alert("Success", "Berhasil Login!");
      router.push("/(tabs)");
    } catch (error: any) {
      const errorMsg = error.response.data.message;
      const errorData = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;
      Alert.alert("Error", errorData);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1 justify-center px-8 bg-base100 ">
        {/*Logo */}
        <View className="items-center">
          <Text className="text-6xl font-title text-white">RickGram</Text>
          <Text className="text-gray-400 font-main">
            Welcome <Text className="text-primary">Back</Text> 🐱
          </Text>
        </View>
        {/* form */}
        <View className="mt-5">
          <TextInput
            placeholderTextColor="white"
            placeholder="Email"
            className="bg-base300 rounded-full mb-4 text-base  text-white pl-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholderTextColor="white"
            placeholder="Password"
            className="bg-base300 rounded-full mb-4 text-base  text-white pl-4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className=" bg-primary p-3 rounded-full"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-center ">
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View className="items-center mt-4 mb-10 flex-row justify-center font-main">
          <Text className="text-gray-400">
            Don{"'"}t Have an Account?{" "}
            <Link href={"/(auth)/register"} className="text-secondary">
              Sign Up
            </Link>{" "}
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
