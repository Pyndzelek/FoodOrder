import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { Product } from "../types";
import { Link, useSegments } from "expo-router";
import { Tables } from "../database.types";

const defaulPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const destination = `/${segments[0]}/menu/${product.id}`;

  return (
    <Link href={destination as any} asChild>
      <TouchableOpacity style={styles.container}>
        <Image
          source={{ uri: product.image || defaulPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </TouchableOpacity>
    </Link>
  );
};
export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});
