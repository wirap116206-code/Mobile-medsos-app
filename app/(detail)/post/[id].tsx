import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import customAPI from "@/config/api";
import { DetailFeed } from "@/types/Feed";
import { collors } from "@/utils/collor";
import { Feather } from "@expo/vector-icons";
import FormatDate from "@/config/date";
import { useAuthStore } from "@/stores/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import BtnLike from "@/components/BtnLike";
import BtnBookmark from "@/components/BtnBookmark";

const DetailFeedScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<DetailFeed>();
  const { user } = useAuthStore();
  const [content, setContent] = useState("");

  const detailPostData = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.get(`/feed/${id}`);
      setPost(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async () => {
    try {
      await customAPI.post("/comment", {
        content,
        postId: id,
      });
      setContent("");
      detailPostData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await customAPI.delete(`/comment/${commentId}`);
      Alert.alert("Delete", "delete comment berhasil");
      detailPostData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailPostData();
  }, []);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size={"large"} color={collors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header navvigaion back> */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4 border-b border-gray-400">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={collors.primary} />
        </TouchableOpacity>
        <Text className="font-semibold text-lg text-white">Post</Text>
        <Feather name="more-vertical" size={22} color={collors.primary} />
      </View>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* user info */}
          <View className="flex-row items-center px-4 py-3">
            {post?.user.image ? (
              <Image
                source={{ uri: post.user.image }}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <Feather name="user" size={35} color="#9CA3AF" />
            )}
            <View className="ml-3 ">
              <Text className="font-semibold text-white">
                {post?.user.fullname}
              </Text>
              <Text className="text-gray-300">
                {FormatDate(post?.createdAt)}
              </Text>
            </View>
          </View>
          {/* image */}
          <Image
            source={{ uri: post?.image }}
            className="w-full h-96"
            resizeMode="cover"
          />
          {/* action */}
          <View className="flex-row justify-between px-4 py-3">
            <View className="flex-row gap-4">
              <BtnLike postId={id as string} />
            </View>
            <BtnBookmark postId={id as string} />
          </View>
          {/* info like count */}
          <View className="px-4  ">
            <Text className="font-semibold text-white">
              {post?.likeCount} Likes
            </Text>
          </View>
          {/* caption */}
          <View className="px-4 mt-2">
            <Text className="font-semibold text-white">
              {post?.user.username}{" "}
              <Text className="text-gray-400">{post?.caption}</Text>
            </Text>
          </View>
          {/* comment */}
          <View className="px-4 mt-2">
            <Text className="font-semibold mb-3 text-xl text-secondary">
              Comments
            </Text>
            {post?.comments.length ? (
              <View>
                {post.comments.map((item) => (
                  <View
                    className="flex-1 flex-row justify-between mb-1"
                    key={"comment" + item.id}
                  >
                    <View className="mb-3 flex-1">
                      <Text className="font-semibold text-white">
                        {item.user.username}{" "}
                        <Text className="text-gray-400">{item.content}</Text>
                      </Text>
                      <Text className="text-xs text-gray-400 mt-2">
                        {FormatDate(item.createdAt)}
                      </Text>
                    </View>
                    {user.id === item.user.id && (
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(item.id)}
                      >
                        <Feather
                          name="trash"
                          size={15}
                          color={collors.danger}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-gray-400">Belum ada Komentar</Text>
            )}
          </View>
        </ScrollView>
        <View className="flex-row items-center px-4 justify-between gap-2  py-3 border-t border-gray-400 bg-base100 mb-4  ">
          <TextInput
            placeholder="Add a comment..."
            placeholderTextColor="white"
            className="flex-1 text-white px-4 py-3 bg-base300 rounded-full"
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity onPress={handleCreateComment}>
            <Feather name="send" color={collors.primary} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailFeedScreen;
