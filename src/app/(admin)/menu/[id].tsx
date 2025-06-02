import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { PizzaSize } from "@/src/types";

import { useCart } from "@/src/providers/CartProvider";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { onAddItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    onAddItem(product, selectedSize);
    router.push("/cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetails;
