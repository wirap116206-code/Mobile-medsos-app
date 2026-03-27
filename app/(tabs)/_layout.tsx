import { collors } from "@/utils/collor";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Dimensions, View } from "react-native";

const TabsLayout = () => {
  const { width, height } = Dimensions.get("window");
  const buttonSize = width * 0.18;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: collors.primary,
        tabBarInactiveTintColor: collors.inactiver,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: height * 0.09,
          backgroundColor: collors.base200,
          paddingTop: height * 0.02,
          marginHorizontal: width * 0.05,
          bottom: height * 0.04,
          borderRadius: buttonSize / 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: width * 0.17,
                height: width * 0.17,
                borderRadius: buttonSize / 2,
                backgroundColor: collors.secondary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="plus" size={30} color="black" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="update"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="settings" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
