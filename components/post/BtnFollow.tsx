import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import customAPI from "@/config/api";

const BtnFollow = ({ userId }: { userId: number }) => {
  const { user } = useAuthStore();
  const [checkUser, setCheckUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const checkFollowUser = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.get(`/follow/${userId}`);
      setCheckUser(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const unFollowUser = async() => {
    setLoading(true)
    try {
      await customAPI.delete(`/follow/${userId}`)
      checkFollowUser()
    } catch (error) {
      console.log(error);
      
    }
  }

 const followUser = async() => {

  try {
    await customAPI.post(`/follow`, {followUserId: userId})
    checkFollowUser()
  } catch (error) {
  console.log(error);
    
  }
 }

  useEffect(() => {
    checkFollowUser();
  }, []);

  if (loading) {
    return (
      <TouchableOpacity className="mx-5 p-5 rounded-full items-center bg-gray">
        <ActivityIndicator color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <>
      {user && user.id.toString() === userId.toString() ? null : checkUser ? (
        <TouchableOpacity className=" p-3 rounded-full items-center bg-danger"onPress={unFollowUser} >
          <Text className="font-semibold text-white">Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className=" p-3 rounded-full items-center bg-primary" onPress={followUser}>
          <Text className="font-semibold text-white">Follow</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BtnFollow;
