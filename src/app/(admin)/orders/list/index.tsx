import { Text, FlatList } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      ListFooterComponent={() => (
        <Button
          text="Sign Out"
          onPress={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error("Error signing out:", error.message);
            }
          }}
        />
      )}
    />
  );
}
