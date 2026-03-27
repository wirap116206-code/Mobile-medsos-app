import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { collors } from "@/utils/collor";
import { Feed } from "@/types/Feed";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import customAPI from "@/config/api";
import BtnLike from "./BtnLike";
import BtnBookmark from "./BtnBookmark";

const ListPost = ({
  item,
  onReload,
}: {
  item: Feed;
  onReload: () => Promise<void>;
}) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleDeletePost = async (postId: string) => {
    try {
      await customAPI.delete(`/feed/${postId}`);
      onReload();
      Alert.alert("Delete", "delete berhasil");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mb-4">
      {/* Post Header */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center px-4 mb-2">
          {item.user.image ? (
            <Image
              source={{ uri: item.user.image }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Feather name="user" size={30} color="#9CA3AF" />
          )}

          <Link
            className="ml-4"
            href={
              user?.id !== item.user.id
                ? {
                    pathname: "/(detail)/(user)/[username]",
                    params: { username: item.user.username },
                  }
                : {
                    pathname: "/(tabs)/profile",
                  }
            }
          >
            <Text className="ml-4 font-semibold text-white">
              {item.user.username}
            </Text>
          </Link>
        </View>
        {user?.id === item.user.id && (
          <TouchableOpacity
            onPress={() => handleDeletePost(item.id.toString())}
          >
            <Feather
              name="trash"
              size={20}
              color={"red"}
              className="px-4 py-3"
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/post/[id]",
            params: { id: item.id },
          })
        }
      >
        {/* Post image */}
        <Image
          className="w-full h-96"
          resizeMode="cover"
          source={{ uri: item.image }}
        />
      </TouchableOpacity>
      {/* Action */}
      <View className="flex-row justify-between px-4 py-3">
        <View className="flex-row gap-3">
          <BtnLike postId={item.id.toString()} />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/post/[id]",
                params: { id: item.id },
              })
            }
          >
            <Feather
              name="message-circle"
              size={26}
              color={collors.inactiver}
            />
          </TouchableOpacity>
        </View>
     <BtnBookmark postId={item.id.toString()}/>
      </View>
      {/* captio */}
      <View className="px-4">
        <Text>
          <Text className="font-semibold text-white ">
            {item.user.username}
          </Text>
          {"  "}
          <Text className="text-gray-400">{item.caption}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ListPost;
