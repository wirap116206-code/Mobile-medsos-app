import customAPI from "@/config/api";
import { collors } from "@/utils/collor";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const BtnLike = ({ postId }: { postId: string }) => {
  const [like, setLike] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const checkLikePost = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.get(`/like/${Number(postId)}`);
      setLike(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      await customAPI.post(`/like/${Number(postId)}`);
      checkLikePost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLikePost();
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
      {like ? (
        <TouchableOpacity onPress={toggleLike} disabled={loading}>
          <Feather name="heart" size={24} color={collors.danger} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleLike} disabled={loading}>
          <Feather name="heart" size={24} color={collors.gray} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default BtnLike;
