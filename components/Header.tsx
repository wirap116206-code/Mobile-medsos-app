import { useAuthStore } from "@/stores/authStore";
import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const Header = () => {
  const { removeToken } = useAuthStore();
  const handleLogout = async () => {
    try {
      await removeToken();
      Alert.alert("Logout", "Kamu berhasil Logout!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="justify-between flex-row items-center bg-base100 px-4">
      <Text className="text-white text-3xl font-title">RickGram</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Feather name="log-out" color={"red"} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
