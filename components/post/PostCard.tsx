import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const width = Dimensions.get("window").width;

type Props = {
  id: number;
  caption: string;
  image: string;
};

const PostCard = ({ id, caption, image }: Props) => {
  return (
    <View>
      <Link
        href={{
          pathname: "/(detail)/post/[id]",
          params: { id: id.toString() },
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: width / 3, height: width / 3 }}
          className=""
        />
      </Link>
      <View className="absolute bottom-1 left-1 bg-black/40 px-1 rounded">
        <Text className="text-white text-xs">{caption.slice(0, 10)}...</Text>
      </View>
    </View>
  );
};

export default PostCard;
