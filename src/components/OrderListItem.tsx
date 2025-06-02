import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Order } from "../types";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { Link, useSegments } from "expo-router";

interface OrderListItemProps {
  order: Order;
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  const destination = `/${segments[0]}/orders/${order.id}`;

  return (
    <Link href={destination as any} asChild>
      <TouchableOpacity style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>20 hours ago</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OrderListItem;
