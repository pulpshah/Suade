import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhotos from "./screens/SelectPhotos";
import PostCreation from "./screens/PostCreation";
import { CreatePostStackParamList } from "./types";

const Stack = createStackNavigator<CreatePostStackParamList>();

export default function CreatePostNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Already handled by the Layout component
        cardStyle: { backgroundColor: "#181818" },
      }}
    >
      <Stack.Screen name="SelectPhotos" component={SelectPhotos} />
      <Stack.Screen name="PostCreation" component={PostCreation} />
    </Stack.Navigator>
  );
}
