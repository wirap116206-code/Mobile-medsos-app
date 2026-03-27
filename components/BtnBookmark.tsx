import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import customAPI from "@/config/api";
import { collors } from "@/utils/collor";
import { Feather } from "@expo/vector-icons";

const BtnBookmark = ({ postId }: { postId: string }) => {
  const [saved, setSaved] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const checkBookmarkPost = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.get(`/bookmark/${Number(postId)}`);
      setSaved(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSavedPost = async () => {
    try {
      await customAPI.post(`/bookmark/${Number(postId)}`);
      checkBookmarkPost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkBookmarkPost();
  }, []);

  if (loading) {
    return (
      <TouchableOpacity>
        <ActivityIndicator color="#fff" />
      </TouchableOpacity>
    );
  }
  return (
    <>
      {saved ? (
        <TouchableOpacity onPress={toggleSavedPost} disabled={loading}>
          <Feather name="bookmark" size={24} color={collors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleSavedPost} disabled={loading}>
          <Feather name="bookmark" size={24} color={collors.gray} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default BtnBookmark;
