import { View, Text, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/src/providers/CartProvider";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <Text>CartScreen</Text>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Text key={index}>
            {item.product.name} - ${item.product.price}
          </Text>
        ))
      ) : (
        <Text>Your cart is empty</Text>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
