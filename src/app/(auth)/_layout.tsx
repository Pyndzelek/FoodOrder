import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

const AuthStack = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false, // Hide the header for the sign-in screen
          title: "Sign in",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default AuthStack;
