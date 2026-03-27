import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListPost from "@/components/ListPost";
import Header from "@/components/Header";
// import { useAuthStore } from "@/stores/authStore";
import customAPI from "@/config/api";
import { Feed } from "@/types/Feed";
import { Feather } from "@expo/vector-icons";
import { collors } from "@/utils/collor";

const Home = () => {
  // const { token, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<Feed[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const isEnd = page > totalPage;

  const fetchFeed = async (pageNumber = page) => {
    try {
      if (loading) return;
      if (pageNumber > totalPage) return;

      setLoading(true);

      const { data } = await customAPI.get(`/feed?page=${pageNumber}&limit=3`);

      setPostData((prev) => {
        const newPosts = data.data.filter(
          (post: Feed) => !prev.some((p) => p.id === post.id),
        );

        return [...prev, ...newPosts];
      });

      setTotalPage(data.totalPages);
      setPage(pageNumber + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    setPostData([]);
    setPage(1);

    await fetchFeed(1);

    setRefreshing(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <SafeAreaView className="bg-background flex-1">
      <Header />

      <FlatList
        data={postData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListPost item={item} onReload={handleRefresh} />
        )}
        className="mt-4"
        onEndReached={() => fetchFeed()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <View className="items-center">
              <Text className="text-xl font-semibold text-gray-400">
                Tidak ada Postingan
              </Text>
              <Text className="text-sm my-2 text-gray-400">
                Silahkan Follow User lain dihalaman Search{" "}
                <Feather name="search" size={15} color="#fff" />
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={() => {
          if (loading) {
            return (
              <ActivityIndicator size="large" style={{ marginVertical: 20 }} color={collors.primary} />
            );
          }

          if (isEnd && postData.length > 0) {
            return (
              <View className="items-center pb-36">
                <Text className="text-gray-400">
                  Semua Post sudah tampil 🐱
                </Text>
              </View>
            );
          }

          return null;
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
