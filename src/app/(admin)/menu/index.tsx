import products from "@/assets/data/products";
import { useProductList } from "@/src/api/products";
import ProductListItem from "@/src/components/ProductListItem";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Error loading products: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
