import { View, Text } from "react-native";
import React from "react";

type Props = {
  fullname: string;
  username: string;
  bio?: string | null;
};

const UserInfo = ({ fullname, username, bio }: Props) => {
  return (
    <View className="px-4 pb-3 items-center">
      <Text className="font-semibold text-white">{fullname}</Text>
      <Text className="font-semibold text-gray-400">{username}</Text>
      {bio ? <Text className="text-white">{bio}</Text> : null}
    </View>
  );
};

export default UserInfo;
