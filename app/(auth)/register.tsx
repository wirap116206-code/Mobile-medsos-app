import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import customAPI from "@/config/api";
import { useAuthStore } from "@/stores/authStore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { setTokenData } = useAuthStore();
  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.post("/auth/register", {
        email: email,
        password: password,
        fullname: fullname,
        username: username,
      });

      await setTokenData(data.data, data.token);
      Alert.alert("Success", "Berhasil Register!");
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
          <Text className="text-4xl font-bold text-white">
            Create <Text className="text-primary font-main">Account</Text>
          </Text>
          <Text className="text-gray-400">
            Join and start sharing your moment 😹
          </Text>
        </View>
        {/* form */}
        <View className="mt-5">
          <TextInput
            placeholderTextColor="white"
            placeholder="Fullname"
            className="bg-base300 rounded-full mb-4 text-white pl-4"
            autoCapitalize="none"
            value={fullname}
            onChangeText={setFullname}
          />
          <TextInput
            placeholderTextColor="white"
            placeholder="Username"
            className="bg-base300 rounded-full mb-4 text-white pl-4"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholderTextColor="white"
            placeholder="Email"
            className="bg-base300 rounded-full mb-4 text-white pl-4"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholderTextColor="white"
            placeholder="Password"
            className="bg-base300 rounded-full mb-4 text-white pl-4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="bg-primary p-3 rounded-full"
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-center">
                Register
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View className="items-center mt-4 mb-10 flex-row justify-center font-main">
          <Text className="text-gray-400">
            Already have an Account?{" "}
            <Link href={"/(auth)/login"} className="text-secondary">
              Login
            </Link>{" "}
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
