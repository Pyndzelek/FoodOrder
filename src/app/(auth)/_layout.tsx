import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hide the header for the sign-in screen
          title: "Sign in",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default AuthStack;
