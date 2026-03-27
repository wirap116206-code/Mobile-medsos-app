import { View, Text, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { collors } from "@/utils/collor";

type Props = {
  image?: string | null;
  followerCount: number;
  followingCount: number;
};

const UserProfileHeader = ({ image, followerCount, followingCount }: Props) => {
  return (
    <View className="flex-row justify-evenly items-center px-5 py-4 ">
      <View className="items-center">
        <Text className="font-semibold text-white">{followerCount}</Text>
        <Text className="text-gray-400">Followers</Text>
      </View>
      {image ? (
        <Image className="w-28 h-28 rounded-full" source={{ uri: image }} />
      ) : (
        <Feather name="user" size={65} color={collors.gray} />
      )}
      <View className="items-center">
        <Text className="font-semibold text-white">{followingCount}</Text>
        <Text className="text-gray-400">Following</Text>
      </View>
    </View>
  );
};

export default UserProfileHeader;
