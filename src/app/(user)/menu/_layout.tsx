import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const MenuStack = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ), // Hide the header right button
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }}></Stack.Screen>
    </Stack>
  );
};

export default MenuStack;
