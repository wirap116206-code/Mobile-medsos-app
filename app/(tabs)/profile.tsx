import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailUserType } from "@/types/user";
import customAPI from "@/config/api";
import { useAuthStore } from "@/stores/authStore";
import { collors } from "@/utils/collor";
import Header from "@/components/Header";
import UserProfileHeader from "@/components/post/UserProfileHeader";
import UserInfo from "@/components/post/UserInfo";
import UserProfileTab from "@/components/post/UserProfileTab";
import PostCard from "@/components/post/PostCard";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [detailUserData, setDetailUserData] = useState<DetailUserType | null>(
    null,
  );

  const [tab, setTab] = useState<"posts" | "bookmarks">("posts");
  const { user } = useAuthStore();

  const fetchDetailUser = async () => {
    setLoading(true);
    try {
      const res = await customAPI.get(`/user/${user.username}`);
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
      <Header />
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
                  : "Simpan Postingan"}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
