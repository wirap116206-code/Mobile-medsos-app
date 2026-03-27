import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "@/stores/authStore";
import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { collors } from "@/utils/collor";
import customAPI from "@/config/api";

const UpdateProfileScreen = () => {
  const { user, loadToken, setTokenData, token } = useAuthStore();

  // ✅ SAFE STATE (tidak ambil dari user langsung)
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  // ✅ SYNC DATA USER
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setFullname(user.fullname || "");
      setBio(user.bio || "");
    }
  }, [user]);

  // ambil gambar
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdatePhoto = async () => {
    if (!image) return;

    try {
      setLoadingPhoto(true);

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "profile.png",
        type: "image/jpeg",
      } as any);

      const { data } = await customAPI.put(
        "/user/update-photo-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTokenData(data.data, token!);
      loadToken();

      Alert.alert("Success", "Photo Profile berhasil diupdate!");
      setImage(null);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoadingProfile(true);

      const data = await customAPI.put("/user/update-user", {
        fullname,
        username,
        bio,
      });

      setTokenData(data.data.data, token!);
      loadToken();

      Alert.alert("Success", "Berhasil update data profile");
    } catch (error: any) {
      const errorMsg = error.response?.data?.message;
      const errorData = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;

      Alert.alert("Error", errorData || "Terjadi kesalahan");
      console.log(error);
    } finally {
      setLoadingProfile(false);
    }
  };

  // ✅ OPTIONAL: loading awal kalau user belum ada
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-base100">
        <ActivityIndicator size="large" color={collors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-base100">
      <Header />

      <View className="px-5">
        {/* Photo profile */}
        <View className="items-center mb-6 pt-4">
          <View className="flex-row justify-evenly">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-24 h-24 rounded-full"
              />
            ) : user?.image ? (
              <Image
                source={{ uri: user.image }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Feather
                name="user"
                color={collors.gray}
                size={50}
              />
            )}
          </View>

          <TouchableOpacity onPress={pickImage}>
            <Text className="text-secondary mt-3">
              Ganti Photo Profile
            </Text>
          </TouchableOpacity>

          {image && (
            <TouchableOpacity
              onPress={handleUpdatePhoto}
              disabled={loadingPhoto}
              className="mt-3 bg-primary px-4 py-2 rounded-lg"
            >
              {loadingPhoto ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold">
                  Update Photo Profile
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* form */}
        <View className="mb-4">
          <Text className="text-white font-semibold">Fullname</Text>
          <TextInput
            className="rounded-full bg-base200 mt-2 pl-3 text-white"
            placeholder="Ganti Fullname anda!"
            placeholderTextColor="#9CA3AF"
            value={fullname}
            onChangeText={setFullname}
          />

          <Text className="text-white font-semibold mt-3">
            Username
          </Text>
          <TextInput
            className="rounded-full bg-base200 mt-2 pl-3 text-white"
            placeholder="Ganti Username anda!"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
          />

          <Text className="text-white font-semibold mt-3">Bio</Text>
          <TextInput
            className="rounded-full bg-base200 mt-2 pl-3 text-white"
            placeholder="Ganti Biodata anda!"
            placeholderTextColor="#9CA3AF"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>

        <TouchableOpacity
          disabled={loadingProfile}
          onPress={handleUpdateProfile}
          className="bg-primary py-3 rounded-xl items-center"
        >
          {loadingProfile ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">
              Update User
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;