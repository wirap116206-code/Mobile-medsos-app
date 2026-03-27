import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { User } from "@/types/auth";
import customAPI from "@/config/api";
import ListUser from "@/components/ListUser";

const SearchHomeScreen = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const [debounceQuery, setDebounceQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debounceQuery) {
      setUser([]);
      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await customAPI.get(
          `/user/search?username=${debounceQuery}`,
        );
        setUser(res.data.data || res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [debounceQuery]);

  return (
    <SafeAreaView className="flex-1 bg-base100">
      <Header />
      <Text className="text-white font-semibold text-lg text-center my-3">
        Search User by Username
      </Text>
      <View
        className="px-4 md3
     "
      >
        <TextInput
          placeholder="cari usename..."
          placeholderTextColor="#9CA3AF"
          className="rounded-full bg-base200 pl-4 ml-2 text-white"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>
      {/* loading */}
      {loading && (
        <ActivityIndicator size={"large"} className="mt-5 text-primary" />
      )}
      {/* list User */}
      <FlatList
        data={user}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListUser item={item} />}
        ListEmptyComponent={
          !loading && debounceQuery ? (
            <View className="items-center mt-10 text-lg">
              <Text className="text-gray-400">User Tidak ditemukan!</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default SearchHomeScreen;
