import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link } from "expo-router";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Link href="/(user)" asChild>
        <Button text="user" />
      </Link>
      <Link href="/(admin)" asChild>
        <Button text="admin" />
      </Link>
      <Link href="/sign-in" asChild>
        <Button text="auth" />
      </Link>
    </View>
  );
};

export default index;
