import React from "react";
import { Stack } from "expo-router";

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }}></Stack.Screen>
    </Stack>
  );
};

export default MenuStack;
