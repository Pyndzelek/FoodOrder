import { View, Text, FlatList } from "react-native";
import React from "react";
import products from "@/assets/data/products";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";

const OrdersList = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item: order }) => <OrderListItem order={order} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrdersList;
