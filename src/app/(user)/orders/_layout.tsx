import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const OrdersStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Orders",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#f8f8f8" },
          headerTitleStyle: { color: "#333" },
        }}
      />
    </Stack>
  );
};

export default OrdersStack;
