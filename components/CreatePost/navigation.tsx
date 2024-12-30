import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhotos from "./screens/SelectPhotos";
import PostCreation from "./screens/PostCreation";
import { CreatePostStackParamList } from "./types"; // Import the type you just defined

const Stack = createStackNavigator<CreatePostStackParamList>();

export default function CreatePostNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#181818" },
      }}
    >
      {/* Default screen */}
      <Stack.Screen name="SelectPhotos" component={SelectPhotos} />
      {/* Navigation to PostCreation */}
      <Stack.Screen name="PostCreation" component={PostCreation} />
    </Stack.Navigator>
  );
}
