import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import CartListItem from "@/src/components/CartListItem";

const OrderDetailsView = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);
  if (!order) {
    return <Text>Order not found</Text>;
  }
  const items = order.order_items!;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={items}
        ListHeaderComponent={<OrderListItem order={order} />}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.products.name} - ${item.products.price}
            </Text>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default OrderDetailsView;
