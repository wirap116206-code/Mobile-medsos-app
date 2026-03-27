import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { User } from "@/types/auth";
import { Feather } from "@expo/vector-icons";
import BtnFollow from "./post/BtnFollow";
import { collors } from "@/utils/collor";
import { useRouter } from "expo-router";

const ListUser = ({ item }: { item: User }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: "/(detail)/(user)/[username]",
      params: { username: item.username },
    });
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b-gray-400">
      {/* 🔥 AREA KIRI (bisa diklik) */}
      <TouchableOpacity
        onPress={handleNavigate}
        activeOpacity={0.7}
        className="flex-row items-center"
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <Feather name="user" color={collors.gray} size={50} />
        )}

        <View className="ml-3">
          <Text className="font-semibold text-white">{item.fullname}</Text>
          <Text className="text-gray-400">@{item.username}</Text>
        </View>
      </TouchableOpacity>

      {/* 🔥 FOLLOW BUTTON (tidak ikut ke-trigger) */}
      <BtnFollow userId={item.id} />
    </View>
  );
};

export default ListUser;
