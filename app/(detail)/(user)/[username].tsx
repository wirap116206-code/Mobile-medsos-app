import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import customAPI from "@/config/api";
import { collors } from "@/utils/collor";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DetailUserType } from "@/types/user";
import UserProfileHeader from "@/components/post/UserProfileHeader";
import UserInfo from "@/components/post/UserInfo";
import BtnFollow from "@/components/post/BtnFollow";
import UserProfileTab from "@/components/post/UserProfileTab";
import PostCard from "@/components/post/PostCard";

const DetailUserScreen = () => {
  const { username } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [detailUserData, setDetailUserData] = useState<DetailUserType | null>(
    null,
  );
  const router = useRouter();
  const [tab, setTab] = useState<"posts" | "bookmarks">("posts");

  const fetchDetailUser = async () => {
    setLoading(true);
    try {
      const res = await customAPI.get(`/user/${username}`);
      setDetailUserData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-base100">
        <ActivityIndicator size={"large"} color={collors.primary} />
      </View>
    );
  }

  if (!detailUserData) {
    return (
      <View className="flex-1 items-center mt-24 bg-base100">
        <Text className="text-white">User Tidak ditemukan!</Text>
      </View>
    );
  }
  const gridData =
    tab === "posts"
      ? detailUserData.posts
      : detailUserData.bookmarks.map((b) => b.post);
  return (
    <SafeAreaView className=" flex-1 bg-base100 ">
      <View className="bg-base100">
        <View className="flex-row items-center  px-4 pt-14 pb-4 border-b border-gray-400">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={collors.primary} />
          </TouchableOpacity>
          <Text className="font-semibold text-lg text-white ml-4">
            Detail User
          </Text>
        </View>
        <Text>DetailUser</Text>
      </View>
      {/* detail */}
      <FlatList
        data={gridData}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 3, paddingBottom: 120 }}
        columnWrapperStyle={{ gap: 3 }}
        ListHeaderComponent={
          <View>
            <UserProfileHeader
              image={detailUserData.image}
              followerCount={detailUserData.followerCount}
              followingCount={detailUserData.followingCount}
            />

            <UserInfo
              username={detailUserData.username}
              fullname={detailUserData.fullname}
              bio={detailUserData.bio}
            />

            <BtnFollow userId={detailUserData.id} />
            <UserProfileTab tab={tab} setTab={setTab} />
          </View>
        }
        renderItem={({ item }) => (
          <PostCard image={item.image} caption={item.caption} id={item.id} />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <View className="items-center font-semibold">
              <Text className="text-lg font-semibold text-white">
                {tab === "posts" ? "Belum ada Postingan" : "Belum ada Bookmark"}
              </Text>
              <Text className="text-lg font-semibold text-gray-400 mt-2">
                {tab === "posts"
                  ? "Postingan akan muncul disini"
                  : "Simpan Postingan disini!"}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DetailUserScreen;
