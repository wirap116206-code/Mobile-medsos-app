import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import customAPI from "@/config/api";

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleCreateFeed = async () => {
    if (!caption || !image) {
      Alert.alert("Error", "Caption wajib disis!");
      return;
    }
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", {
      uri: image,
      name: "post.jpg",
      type: "image/jpeg",
    } as any);
    try {
      setLoading(true);
      await customAPI.post("feed/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(null);
      setCaption("");
      setLoading(false);
      Alert.alert("Berhasil", "anda berhasil buat post baru");
      router.push("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-base100">
      <SafeAreaView>
        <Header />
        <View className="p-5">
          {/* image upload */}
          <View className="bg-base200 rounded-2xl p-4 shadow-white mb-5">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-full h-64 rounded-xl mb-4"
              />
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <View className="w-full h-64 rounded-xl bg-base300 justify-center items-center">
                  <Feather name="image" size={40} color={"gray"} />
                  <Text className="text-gray-400 mt-2 ">
                    Upload Gmabar Postingan!
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View className="bg-base200 rounded-2xl p-4 shadow-white mb-5">
            <Text className="text-white text-lg font-semibold ">Caption</Text>
            <TextInput
              placeholder="Tulis sesuatu untuk postingan anda..."
              value={caption}
              onChangeText={setCaption}
              multiline
              className=" rounded-full bg-base300 pl-4 my-2 text-white"
              placeholderTextColor={"gray"}
            />
          </View>
          <TouchableOpacity
            onPress={handleCreateFeed}
            disabled={loading}
            className="bg-primary py-4 rounded-xl items-center mx-3"
          >
            {loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Upload Post!
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateScreen;
