import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  tab: "posts" | "bookmarks";
  setTab: (value: "posts" | "bookmarks") => void;
};

const UserProfileTab = ({ tab, setTab }: Props) => {
  return (
    <View className="flex-row border-y my-3 ">
      <TouchableOpacity
        className={`flex-1 py-3 items-center rounded-full ${tab === "posts" ? "border-b-2 border-secondary" : ""}`}
        onPress={() => setTab("posts")}
      >
        <Text
          className={`${tab === "posts" ? "font-semibold text-white" : "text-gray-400"}`}
        >
          Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 py-3 items-center rounded-full ${tab === "bookmarks" ? "border-b-2 border-secondary" : ""}`}
        onPress={() => setTab("bookmarks")}
      >
        <Text
          className={`${tab === "bookmarks" ? "font-semibold text-white" : "text-gray-400"}`}
        >
          Bookmark
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileTab;
