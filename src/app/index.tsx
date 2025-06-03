import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Welcome {session?.user?.email || "Guest"}!
      </Text>
      <Link href="/(user)" asChild>
        <Button text="user" />
      </Link>
      <Link href="/(admin)" asChild>
        <Button text="admin" />
      </Link>
      <Link href="/sign-in" asChild>
        <Button text="auth" />
      </Link>
      <Button
        text="Sign Out"
        onPress={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("Error signing out:", error.message);
          }
        }}
      />
    </View>
  );
};

export default index;
