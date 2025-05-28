import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";

const sizes = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, index) => (
          <View key={index} style={styles.size}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "500" },
});

export default ProductDetails;
